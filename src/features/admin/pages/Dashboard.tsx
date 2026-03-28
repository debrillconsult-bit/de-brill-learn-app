import React from 'react';
import { BookOpen, GraduationCap, LayoutDashboard, Users } from 'lucide-react';
import { SectionCard } from '@/src/features/admin/components/SectionCard';
import { StatCard } from '@/src/features/admin/components/StatCard';
import { getAnalytics, getOverview } from '@/src/features/admin/services/adminApi';
import type { AdminAnalytics, AdminOverview } from '@/src/features/admin/types';
import { BarChart } from '@/src/features/admin/components/BarChart';

export const AdminDashboardPage = () => {
  const [overview, setOverview] = React.useState<AdminOverview | null>(null);
  const [analytics, setAnalytics] = React.useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [overviewData, analyticsData] = await Promise.all([getOverview(), getAnalytics()]);
        if (!isMounted) return;
        setOverview(overviewData);
        setAnalytics(analyticsData);
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Failed to load admin overview');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="rounded-[28px] bg-white p-8 text-[15px] text-brand-muted shadow-sm">Loading dashboard...</div>;
  }

  if (error || !overview || !analytics) {
    return <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-red-700">{error ?? 'Dashboard unavailable'}</div>;
  }

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value={overview.totalUsers} icon={Users} tone="#1B3A7A" note="All accounts on the platform" />
        <StatCard label="Students" value={overview.totalStudents} icon={GraduationCap} tone="#4DBBEE" note="Learners enrolled in classes" />
        <StatCard label="Teachers" value={overview.totalTeachers} icon={LayoutDashboard} tone="#F47920" note="Teachers with class access" />
        <StatCard label="Lessons" value={overview.totalContent} icon={BookOpen} tone="#2E7D32" note="Draft and published content" />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          eyebrow="Growth"
          title="User growth"
          description="A simple view of how the user base is trending this week."
        >
          <BarChart points={analytics.userGrowth} colorClassName="bg-gradient-to-t from-brand-navy to-[#4DBBEE]" />
        </SectionCard>

        <SectionCard
          eyebrow="Activity"
          title="Platform activity"
          description="Track learning and admin activity without adding a heavy chart dependency."
        >
          <BarChart points={analytics.activityCount} colorClassName="bg-gradient-to-t from-[#F47920] to-[#F5B800]" />
        </SectionCard>
      </section>
    </>
  );
};
