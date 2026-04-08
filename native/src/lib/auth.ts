import { supabase } from './supabase';
import type { Profile, UserRole } from './supabase';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: Profile;
}

export async function registerUser(data: {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  classLevel?: string;
  schoolName?: string;
}): Promise<AuthResult> {
  try {
    const signUpPromise = supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          role: data.role,
        },
      },
    });

    const timeoutPromise = new Promise<never>(
      (_, reject) => setTimeout(
        () => reject(new Error('timeout')),
        15000
      )
    );

    const { data: authData, error } =
      await Promise.race([
        signUpPromise,
        timeoutPromise,
      ]) as any;

    if (error) {
      if (error.message === 'timeout') {
        return {
          success: false,
          error: 'Connection timed out. Please ' +
            'check your internet and try again.',
        };
      }
      if (error.message.includes('already')) {
        return {
          success: false,
          error: 'An account with this email ' +
            'already exists. Please log in.',
        };
      }
      return { success: false, error: error.message };
    }

    if (authData.user) {
      await supabase.from('profiles').upsert(
        {
          id: authData.user.id,
          email: data.email.toLowerCase(),
          full_name: data.fullName,
          role: data.role,
          class_level: data.classLevel || null,
          school_name: data.schoolName || null,
          language: 'british',
        },
        { onConflict: 'id' }
      );
    }

    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg === 'timeout' || msg.includes('timeout')) {
      return {
        success: false,
        error: 'Connection timed out. Please check your internet and try again.',
      };
    }
    return { success: false, error: 'Registration failed. Try again.' };
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  try {
    const signInPromise = supabase.auth.signInWithPassword({ email, password });

    const loginTimeoutPromise = new Promise<never>(
      (_, reject) => setTimeout(
        () => reject(new Error('timeout')),
        15000
      )
    );

    const { data, error } =
      await Promise.race([
        signInPromise,
        loginTimeoutPromise,
      ]) as any;

    if (error) {
      if (error.message === 'timeout') {
        return {
          success: false,
          error: 'Connection timed out. Please ' +
            'check your internet and try again.',
        };
      }
      return { success: false, error: error.message };
    }

    let profile: Profile | null = null;
    for (let i = 0; i < 3; i++) {
      await new Promise(r => setTimeout(r, (i + 1) * 300));
      const { data: p } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      if (p) {
        profile = p;
        break;
      }
    }

    if (!profile) {
      profile = {
        id: data.user.id,
        email: data.user.email || email,
        full_name: data.user.user_metadata?.full_name || 'User',
        role: data.user.user_metadata?.role || 'student',
        language: 'british',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    return { success: true, user: profile };
  } catch (err) {
    const msg = err instanceof Error ? err.message : '';
    if (msg === 'timeout' || msg.includes('timeout')) {
      return {
        success: false,
        error: 'Connection timed out. Please check your internet and try again.',
      };
    }
    return { success: false, error: 'Login failed. Try again.' };
  }
}

export async function logoutUser(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    return data;
  } catch {
    return null;
  }
}

export async function getUserProgress(userId: string) {
  try {
    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
    return data || [];
  } catch {
    return [];
  }
}
