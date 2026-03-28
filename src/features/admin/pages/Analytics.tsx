import React from 'react';
import { SectionCard } from '@/src/features/admin/components/SectionCard';
import { BarChart } from '@/src/features/admin/components/BarChart';
import { getAnalytics } from '@/src/features/admin/services/adminApi';
import type { AdminAnalytics } from '@/src/features/admin/types';

export const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = React.useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAnalytics();
        if (!isMounted) return;
        setAnalytics(response);
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : 'Failed to load analytics');
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
    return <div className="rounded-[28px] bg-white p-8 text-[15px] text-brand-muted shadow-sm">Loading analytics...</div>;
  }

  if (error || !analytics) {
    return <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-red-700">{error ?? 'Analytics unavailable'}</div>;
  }

  const totalGrowth = analytics.userGrowth.reduce((sum, point) => sum + point.value, 0);
  const totalActivity = analytics.activityCount.reduce((sum, point) => sum + point.value, 0);

  return (
    <>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[28px] bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-muted">New users this period</p>
          <p className="mt-2 text-[34px] font-bold text-brand-navy">{totalGrowth}</p>
        </div>
        <div className="rounded-[28px] bg-white p-5 shadow-sm">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-muted">Activity events this period</p>
          <p className="mt-2 text-[34px] font-bold text-brand-navy">{totalActivity}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Users" title="User growth" description="Simple growth chart using lightweight div-based bars.">
          <BarChart points={analytics.userGrowth} colorClassName="bg-gradient-to-t from-brand-navy to-[#4DBBEE]" />
        </SectionCard>
        <SectionCard eyebrow="Activity" title="Activity count" description="Daily activity counts across lesson and admin actions.">
          <BarChart points={analytics.activityCount} colorClassName="bg-gradient-to-t from-[#F47920] to-[#F5B800]" />
        </SectionCard>
      </section>
    </>
  );
};
