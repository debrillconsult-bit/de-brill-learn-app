import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
}
);

export type UserRole = 'student' | 'child' | 'teacher' | 'parent' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  class_level?: string;
  school_name?: string;
  avatar_index?: number;
  nickname?: string;
  language: 'british' | 'american';
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  book_id: string;
  plan_type: 'trial' | 'yearly_book' | 'yearly_series';
  series: 'phonics' | 'mep' | null;
  status: 'active' | 'expired' | 'cancelled';
  trial_start: string;
  trial_end: string;
  period_start: string | null;
  period_end: string | null;
  created_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  book_id: string;
  unit_id: number;
  term: number;
  completed: boolean;
  score: number | null;
  time_spent_seconds: number;
  last_accessed: string;
  created_at: string;
}

export interface Streak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  updated_at: string;
}

export interface ClassGroup {
  id: string;
  teacher_id: string;
  name: string;
  class_level: string;
  created_at: string;
}

export interface ClassMember {
  id: string;
  class_id: string;
  student_id: string;
  joined_at: string;
}
