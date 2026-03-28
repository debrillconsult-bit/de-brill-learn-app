import { supabase } from './supabase';
import type { Profile, UserRole } from './supabase';

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  classLevel?: string;
  schoolName?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: Profile;
}

export async function registerWithSupabase(
  data: RegisterData
): Promise<AuthResult> {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.role,
          }
        }
      });

    if (authError) {
      return {
        success: false,
        error: authError.message
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'Registration failed.'
      };
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: data.email,
        full_name: data.fullName,
        role: data.role,
        class_level: data.classLevel || null,
        school_name: data.schoolName || null,
        language: 'british',
      });

    if (profileError) {
      console.error(
        'Profile creation error:', profileError
      );
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: 'Registration failed. Try again.'
    };
  }
}

export async function loginWithSupabase(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth
      .signInWithPassword({ email, password });

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    if (!data.user) {
      return {
        success: false,
        error: 'Login failed.'
      };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return {
      success: true,
      user: profile || undefined
    };
  } catch {
    return {
      success: false,
      error: 'Login failed. Try again.'
    };
  }
}

export async function logoutFromSupabase():
  Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentProfile():
  Promise<Profile | null> {
  try {
    const { data: { user } } =
      await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return profile;
  } catch {
    return null;
  }
}

export async function updateProfile(
  updates: Partial<Profile>
): Promise<boolean> {
  try {
    const { data: { user } } =
      await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    return !error;
  } catch {
    return false;
  }
}

export async function saveProgress(params: {
  bookId: string;
  unitId: number;
  term: number;
  completed: boolean;
  score?: number;
  timeSpentSeconds?: number;
}): Promise<boolean> {
  try {
    const { data: { user } } =
      await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('progress')
      .upsert({
        user_id: user.id,
        book_id: params.bookId,
        unit_id: params.unitId,
        term: params.term,
        completed: params.completed,
        score: params.score || null,
        time_spent_seconds:
          params.timeSpentSeconds || 0,
        last_accessed: new Date().toISOString(),
      }, {
        onConflict: 'user_id,book_id,unit_id'
      });

    return !error;
  } catch {
    return false;
  }
}

export async function getUserProgress(
  bookId?: string
): Promise<unknown[]> {
  try {
    const { data: { user } } =
      await supabase.auth.getUser();
    if (!user) return [];

    let query = supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id);

    if (bookId) {
      query = query.eq('book_id', bookId);
    }

    const { data } = await query;
    return data || [];
  } catch {
    return [];
  }
}

export async function updateStreak():
  Promise<number> {
  try {
    const { data: { user } } =
      await supabase.auth.getUser();
    if (!user) return 0;

    const today = new Date()
      .toISOString().split('T')[0];

    const { data: existing } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!existing) {
      await supabase.from('streaks').insert({
        user_id: user.id,
        current_streak: 1,
        longest_streak: 1,
        last_activity_date: today,
      });
      return 1;
    }

    const lastDate = new Date(
      existing.last_activity_date
    );
    const todayDate = new Date(today);
    const diffDays = Math.floor(
      (todayDate.getTime() - lastDate.getTime())
      / (1000 * 60 * 60 * 24)
    );

    let newStreak = existing.current_streak;
    if (diffDays === 0) return newStreak;
    if (diffDays === 1) newStreak += 1;
    else newStreak = 1;

    const longest = Math.max(
      newStreak, existing.longest_streak
    );

    await supabase.from('streaks').update({
      current_streak: newStreak,
      longest_streak: longest,
      last_activity_date: today,
      updated_at: new Date().toISOString(),
    }).eq('user_id', user.id);

    return newStreak;
  } catch {
    return 0;
  }
}
