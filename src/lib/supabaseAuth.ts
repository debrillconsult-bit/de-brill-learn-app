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
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials missing. Running in mock mode.');
      return true;
    }

    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: 'GET',
      headers: {
        apikey: supabaseAnonKey,
      },
    });
    return response.ok;
  } catch (err) {
    console.error('Supabase unreachable:', err);
    return false;
  }
}

export async function registerWithSupabase(
  data: RegisterData
): Promise<AuthResult> {
  try {
    console.log('Starting Supabase registration for:', data.email);
    
    const signUpPromise = supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          role: data.role,
          class_level: data.classLevel,
          school_name: data.schoolName,
        }
      }
    });

    // Race the signUp call against a 6-second timeout.
    const signUpResult: any = await Promise.race([
      signUpPromise,
      new Promise((_, reject) => 
        setTimeout(() => {
          console.error('REGISTRATION_ERROR: SMTP/Supabase Timeout (6s)');
          reject(new Error('The email server is taking too long to respond. Please check your connection or try again.'));
        }, 6000)
      )
    ]);

    console.log('Registration call returned:', signUpResult);
    const { data: authData, error: authError } = signUpResult;


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
      return { success: false, error: 'Registration failed.' };
    }

    // Supabase silently returns a user with empty identities when the email
    // is already registered but not yet confirmed. Detect this and surface a clear error.
    if (authData.user.identities && authData.user.identities.length === 0) {
      return {
        success: false,
        error: 'An account with this email already exists. Please log in or check your inbox for a verification link.',
      };
    }

    // The handle_new_user trigger already creates the profile automatically.
    // This upsert adds extra fields (class_level, school_name, language).
    // We fire it without awaiting so an RLS/network issue never blocks registration.
    supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: data.email.toLowerCase().trim(),
        full_name: data.fullName,
        role: data.role,
        class_level: data.classLevel || null,
        school_name: data.schoolName || null,
        language: 'british',
      }, { onConflict: 'id' })
      .then(({ error }) => {
        if (error) console.warn('Profile upsert (non-critical):', error.message);
      });

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Registration failed. Try again.';
    return {
      success: false,
      error: message
    };
  }
}

export async function ensureProfileExists(user: any): Promise<Profile> {
  const { data: existing, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!fetchError && existing) return existing;

  const role = user.user_metadata?.role || 'student';
  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  const { data: created, error: createError } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      full_name: fullName,
      role: role,
      language: 'british',
    })
    .select()
    .single();

  if (createError) {
    console.error('Failed to ensure profile:', createError.message);
    return {
      id: user.id,
      email: user.email || '',
      full_name: fullName,
      role: role as UserRole,
      language: 'british',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  return created;
}

export async function loginWithSupabase(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'Login failed.' };
    }

    const profile = await ensureProfileExists(data.user);

    return {
      success: true,
      user: profile,
    };
  } catch (err) {
    console.error('Login error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred during login.',
    };
  }
}

export async function logoutFromSupabase():
  Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    try {
      // Race the profile query against a 2-second timeout to bypass RLS hangs
      const profilePromise = supabase.from('profiles').select('*').eq('id', user.id).single();
      const result: any = await Promise.race([
        profilePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000))
      ]);
      
      if (result && !result.error && result.data) {
        return result.data;
      }
    } catch (e) {
      console.warn("Profile fetch timed out or failed, using auth metadata fallback");
    }

    // Fallback: construct a profile from auth metadata if DB is unreachable
    return {
      id: user.id,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || user.user_metadata?.fullName || user.email?.split('@')[0] || 'Learner',
      role: user.user_metadata?.role || 'student',
      language: 'british',
      class_level: null,
      school_name: null,
      avatar_index: 0,
      nickname: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
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
