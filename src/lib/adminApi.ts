import { supabase } from './supabase';

export interface AdminStats {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalClasses: number;
  activeSubscriptions: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('role');

    if (error) throw error;

    const students =
      profiles?.filter(
        profile => profile.role === 'student' || profile.role === 'child'
      ).length || 0;

    const teachers =
      profiles?.filter(profile => profile.role === 'teacher').length || 0;

    const parents =
      profiles?.filter(profile => profile.role === 'parent').length || 0;

    const { data: classes } = await supabase
      .from('class_groups')
      .select('id');

    const { data: subs } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('status', 'active');

    return {
      totalUsers: profiles?.length || 0,
      totalStudents: students,
      totalTeachers: teachers,
      totalParents: parents,
      totalClasses: classes?.length || 0,
      activeSubscriptions: subs?.length || 0,
    };
  } catch (err) {
    console.error('Admin stats error:', err);
    return {
      totalUsers: 0,
      totalStudents: 0,
      totalTeachers: 0,
      totalParents: 0,
      totalClasses: 0,
      activeSubscriptions: 0,
    };
  }
}

export async function getAdminUsers(limit = 50, role?: string) {
  try {
    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (role) {
      query = query.eq('role', role);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Admin users error:', err);
    return [];
  }
}

export async function getAdminClasses() {
  try {
    const { data, error } = await supabase
      .from('class_groups')
      .select(`
        *,
        profiles!class_groups_teacher_id_fkey(
          full_name, email
        ),
        class_members(count)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Admin classes error:', err);
    return [];
  }
}

export async function getAdminProgress() {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select(`
        *,
        profiles!progress_user_id_fkey(
          full_name, role
        )
      `)
      .eq('completed', true)
      .order('last_accessed', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Admin progress error:', err);
    return [];
  }
}
