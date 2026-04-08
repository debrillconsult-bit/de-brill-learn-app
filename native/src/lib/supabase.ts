import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl as string ||
  'https://tmatdskpcunreyhheupp.supabase.co';

const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey as string ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYXRkc2twY3VucmV5aGhldXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDY4NDIsImV4cCI6MjA5MDI4Mjg0Mn0.BB-5BaL0JBvf1wusylv6W0yb-u7roimO5vNp1g4cp6Q';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      flowType: 'pkce',
    },
    global: {
      fetch: fetch,
    },
  }
);

export type UserRole =
  'student' | 'child' | 'teacher' |
  'parent' | 'admin';

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
