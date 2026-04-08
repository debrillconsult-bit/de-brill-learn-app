import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl ||
  'https://tmatdskpcunreyhheupp.supabase.co';

const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYXRkc2twY3VucmV5aGhldXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDY4NDIsImV4cCI6MjA5MDI4Mjg0Mn0.BB-5BaL0JBvf1wusylv6W0yb-u7roimO5vNp1g4cp6Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

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
