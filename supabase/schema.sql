-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
-- Extends Supabase auth.users with app-specific data
create table public.profiles (
  id uuid references auth.users(id)
    on delete cascade primary key,
  email text not null,
  full_name text not null,
  role text not null default 'student'
    check (role in (
      'student', 'child', 'teacher',
      'parent', 'admin'
    )),
  class_level text,
  school_name text,
  avatar_index integer default 0,
  nickname text,
  language text not null default 'british'
    check (language in ('british', 'american')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id)
    on delete cascade not null,
  book_id text,
  plan_type text not null default 'trial'
    check (plan_type in (
      'trial', 'yearly_book', 'yearly_series'
    )),
  series text
    check (series in ('phonics', 'mep')),
  status text not null default 'active'
    check (status in (
      'active', 'expired', 'cancelled'
    )),
  trial_start timestamptz default now(),
  trial_end timestamptz default
    now() + interval '30 days',
  period_start timestamptz,
  period_end timestamptz,
  created_at timestamptz default now()
);

-- PROGRESS TABLE
create table public.progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id)
    on delete cascade not null,
  book_id text not null,
  unit_id integer not null,
  term integer not null default 1,
  completed boolean default false,
  score integer,
  time_spent_seconds integer default 0,
  last_accessed timestamptz default now(),
  created_at timestamptz default now(),
  unique(user_id, book_id, unit_id)
);

-- STREAKS TABLE
create table public.streaks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id)
    on delete cascade not null unique,
  current_streak integer default 0,
  longest_streak integer default 0,
  last_activity_date date default current_date,
  updated_at timestamptz default now()
);

-- CLASS GROUPS TABLE
create table public.class_groups (
  id uuid default uuid_generate_v4() primary key,
  teacher_id uuid references public.profiles(id)
    on delete cascade not null,
  name text not null,
  class_level text not null,
  created_at timestamptz default now()
);

-- CLASS MEMBERS TABLE
create table public.class_members (
  id uuid default uuid_generate_v4() primary key,
  class_id uuid references public.class_groups(id)
    on delete cascade not null,
  student_id uuid references public.profiles(id)
    on delete cascade not null,
  joined_at timestamptz default now(),
  unique(class_id, student_id)
);

-- ROW LEVEL SECURITY
alter table public.profiles
  enable row level security;
alter table public.subscriptions
  enable row level security;
alter table public.progress
  enable row level security;
alter table public.streaks
  enable row level security;
alter table public.class_groups
  enable row level security;
alter table public.class_members
  enable row level security;

-- PROFILES POLICIES
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Teachers can view student profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.class_members cm
      join public.class_groups cg
        on cm.class_id = cg.id
      where cg.teacher_id = auth.uid()
      and cm.student_id = profiles.id
    )
  );

create policy "Parents can view child profiles"
  on public.profiles for select
  using (role = 'child');

-- SUBSCRIPTIONS POLICIES
create policy "Users can view own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can insert own subscriptions"
  on public.subscriptions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own subscriptions"
  on public.subscriptions for update
  using (auth.uid() = user_id);

-- PROGRESS POLICIES
create policy "Users can view own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.progress for update
  using (auth.uid() = user_id);

create policy "Teachers can view student progress"
  on public.progress for select
  using (
    exists (
      select 1 from public.class_members cm
      join public.class_groups cg
        on cm.class_id = cg.id
      where cg.teacher_id = auth.uid()
      and cm.student_id = progress.user_id
    )
  );

-- STREAKS POLICIES
create policy "Users can view own streak"
  on public.streaks for select
  using (auth.uid() = user_id);

create policy "Users can insert own streak"
  on public.streaks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own streak"
  on public.streaks for update
  using (auth.uid() = user_id);

-- CLASS GROUPS POLICIES
create policy "Teachers can manage own classes"
  on public.class_groups for all
  using (auth.uid() = teacher_id);

create policy "Students can view their classes"
  on public.class_groups for select
  using (
    exists (
      select 1 from public.class_members
      where class_id = class_groups.id
      and student_id = auth.uid()
    )
  );

-- CLASS MEMBERS POLICIES
create policy "Teachers can manage class members"
  on public.class_members for all
  using (
    exists (
      select 1 from public.class_groups
      where id = class_members.class_id
      and teacher_id = auth.uid()
    )
  );

create policy "Students can view own membership"
  on public.class_members for select
  using (auth.uid() = student_id);

-- AUTO-UPDATE updated_at TRIGGER
create or replace function
  public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure
  public.handle_updated_at();

-- AUTO-CREATE PROFILE ON SIGNUP TRIGGER
create or replace function
  public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id, email, full_name, role
  ) values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      'User'
    ),
    coalesce(
      new.raw_user_meta_data->>'role',
      'student'
    )
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure
  public.handle_new_user();
