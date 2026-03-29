import React from 'react';
import { GraduationCap, LayoutDashboard, Users } from 'lucide-react';
import { StatCard } from '@/src/features/admin/components/StatCard';
import { getAdminStats, AdminStats } from '../../../lib/adminApi';

export const AdminDashboardPage = () => {
  const [stats, setStats] = React.useState<AdminStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    getAdminStats()
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load stats');
        setLoading(false);
      });
  }, []);

  return (
    <>
      {error ? (
        <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      ) : null}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Users"
          value={loading ? '...' : stats?.totalUsers || 0}
          icon={Users}
          tone="#1B3A7A"
          note="All accounts on the platform"
        />
        <StatCard
          label="Students"
          value={loading ? '...' : stats?.totalStudents || 0}
          icon={GraduationCap}
          tone="#4DBBEE"
          note="Learners enrolled in classes"
        />
        <StatCard
          label="Teachers"
          value={loading ? '...' : stats?.totalTeachers || 0}
          icon={LayoutDashboard}
          tone="#F47920"
          note="Teachers with class access"
        />
        <StatCard
          label="Classes"
          value={loading ? '...' : stats?.totalClasses || 0}
          icon={Users}
          tone="#2E7D32"
          note="Live class groups in Supabase"
        />
      </section>
    </>
  );
};
