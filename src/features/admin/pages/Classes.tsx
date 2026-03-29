import React from 'react';
import { SectionCard } from '@/src/features/admin/components/SectionCard';
import { getAdminClasses } from '../../../lib/adminApi';

interface AdminClassRecord {
  id: string;
  name: string;
  class_level?: string;
  created_at?: string;
  profiles?: {
    full_name?: string | null;
    email?: string | null;
  } | null;
  class_members?: Array<{
    count?: number | null;
  }> | null;
}

export const AdminClassesPage = () => {
  const [classes, setClasses] = React.useState<AdminClassRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    getAdminClasses()
      .then(data => {
        setClasses(data as AdminClassRecord[]);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load classes');
        setLoading(false);
      });
  }, []);

  const getMemberCount = (item: AdminClassRecord) => {
    const countValue = item.class_members?.[0]?.count;
    return typeof countValue === 'number' ? countValue : 0;
  };

  return (
    <SectionCard
      eyebrow="Classes"
      title="Class list"
      description="Live class groups and teacher assignments from Supabase."
    >
      {error ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-[24px] border border-[#E3EAF2] bg-white">
        {loading ? (
          <div className="p-8 text-center text-brand-muted">Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className="p-8 text-center text-brand-muted">No classes found.</div>
        ) : (
          classes.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-[#EEEEEE] p-4 last:border-b-0"
            >
              <div className="flex flex-col">
                <span className="font-bold text-brand-navy">{item.name}</span>
                <span className="text-[12px] text-brand-muted">
                  Teacher: {item.profiles?.full_name || item.profiles?.email || 'Unassigned'}
                </span>
                <span className="text-[12px] text-brand-muted">
                  {item.class_level || 'No class level'}
                </span>
              </div>
              <span className="rounded-full bg-brand-gold/10 px-2 py-1 text-[11px] font-bold text-brand-navy">
                {getMemberCount(item)} students
              </span>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};
