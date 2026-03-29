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

export async function testSupabaseConnection():
  Promise<boolean> {
  try {
    const res = await fetch(
      'https://tmatdskpcunreyhheupp.supabase.co' +
      '/rest/v1/',
      {
        headers: {
          apikey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
            '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRt' +
            'YXRkc2twY3VucmV5aGhldXBwIiwicm9sZSI6Im' +
            'Fub24iLCJpYXQiOjE3NzQ3MDY4NDIsImV4cCI6' +
            'MjA5MDI4Mjg0Mn0.BB-5BaL0JBvf1wusylv6W0' +
            'yb-u7roimO5vNp1g4cp6Q'
        }
      }
    );
    return res.ok;
  } catch (err) {
    console.error('Supabase unreachable:', err);
    return false;
  }
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
      if (
        authError.message.includes('already registered') ||
        authError.message.includes('already exists') ||
        authError.message.includes('duplicate')
      ) {
        return {
          success: false,
          error: 'An account with this email already ' +
            'exists. Please log in instead.'
        };
      }
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
        email: data.email.toLowerCase().trim(),
        full_name: data.fullName,
        role: data.role,
        class_level: data.classLevel || null,
        school_name: data.schoolName || null,
        language: 'british',
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.warn(
        'Profile upsert after registration:',
        profileError.message
      );
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Registration failed. Try again.';
    return {
      success: false,
      error: message
    };
  }
}

export async function loginWithSupabase(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    console.log(
      'Attempting login with Supabase URL:',
      import.meta.env.VITE_SUPABASE_URL ||
      'URL NOT FOUND'
    );

    const supabaseUrl =
      import.meta.env.VITE_SUPABASE_URL ||
      'https://tmatdskpcunreyhheupp.supabase.co';
    const supabaseAnonKey =
      import.meta.env.VITE_SUPABASE_ANON_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYXRkc2twY3VucmV5aGhldXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDY4NDIsImV4cCI6MjA5MDI4Mjg0Mn0.BB-5BaL0JBvf1wusylv6W0yb-u7roimO5vNp1g4cp6Q';
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      12000
    );

    try {
      await fetch(`${supabaseUrl}/auth/v1/health`, {
        method: 'GET',
        headers: {
          apikey: supabaseAnonKey,
        },
        signal: controller.signal,
      });
    } catch (connectionError) {
      clearTimeout(timeoutId);
      const message =
        connectionError instanceof Error
          ? connectionError.message
          : '';
      if (
        message === 'timeout' ||
        message.includes('timeout') ||
        message.includes('aborted') ||
        message.includes('AbortError')
      ) {
        return {
          success: false,
          error: 'Connection timed out. Please check your internet and try again.'
        };
      }
    }

    clearTimeout(timeoutId);

    const { data, error } = await Promise.race([
      supabase.auth.signInWithPassword({
        email, password
      }),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('timeout')),
          12000
        )
      )
    ]);

    if (error) {
      const msg = error?.message || '';
      return {
        success: false,
        error: msg || 'Login failed.'
      };
    }

    if (!data) {
      return {
        success: false,
        error: 'Login failed.'
      };
    }

    let profile = null;
    let fetchAttempts = 0;

    while (!profile && fetchAttempts < 3) {
      fetchAttempts++;
      try {
        await new Promise(resolve =>
          setTimeout(resolve, fetchAttempts * 300)
        );
        const { data: profileData, error: profileError } =
          await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (!profileError && profileData) {
          profile = profileData;
        } else {
          console.warn(
            `Profile fetch attempt ${fetchAttempts} failed:`,
            profileError?.message
          );
        }
      } catch (e) {
        console.warn(
          `Profile fetch attempt ${fetchAttempts} threw:`, e
        );
      }
    }

    if (!profile) {
      const role =
        data.user.user_metadata?.role || 'student';
      const fullName =
        data.user.user_metadata?.full_name ||
        data.user.email?.split('@')[0] ||
        'User';

      try {
        const { data: newProfile } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: data.user.email || email,
            full_name: fullName,
            role: role,
            language: 'british',
          })
          .select()
          .single();
        profile = newProfile;
      } catch (createErr) {
        console.warn('Profile upsert failed:', createErr);
      }
    }

    return {
      success: true,
      user: profile || {
        id: data.user.id,
        email: data.user.email || email,
        full_name:
          data.user.user_metadata?.full_name || 'User',
        role: data.user.user_metadata?.role || 'student',
        language: 'british',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Profile
    };
  } catch (err) {
    console.error('Login error:', err);
    const message =
      err instanceof Error ? err.message : '';
    if (
      message === 'timeout' ||
      message.includes('timeout')
    ) {
      return {
        success: false,
        error: 'Connection timed out. Please check your internet and try again.'
      };
    }
    return {
      success: false,
      error: 'Login failed. Please try again.'
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
