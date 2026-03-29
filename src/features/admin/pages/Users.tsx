import React from 'react';
import { SectionCard } from '@/src/features/admin/components/SectionCard';
import { getAdminUsers } from '../../../lib/adminApi';
import type { Profile } from '../../../lib/supabase';

export const AdminUsersPage = () => {
  const [users, setUsers] = React.useState<Profile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    getAdminUsers(50, filter || undefined).then(data => {
      setUsers(data as Profile[]);
      setLoading(false);
    });
  }, [filter]);

  return (
    <SectionCard
      eyebrow="Users"
      title="User management"
      description="Live user accounts from Supabase."
      action={
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={filter}
            onChange={event => setFilter(event.target.value)}
            className="rounded-2xl border border-[#D8E1EC] bg-white px-4 py-3 text-[13px] font-semibold text-brand-navy"
          >
            <option value="">All roles</option>
            <option value="student">Students</option>
            <option value="child">Children</option>
            <option value="teacher">Teachers</option>
            <option value="parent">Parents</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      }
    >
      <div className="overflow-hidden rounded-[24px] border border-[#E3EAF2] bg-white">
        {loading ? (
          <div className="p-8 text-center text-brand-muted">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-brand-muted">No users found.</div>
        ) : (
          users.map(user => (
            <div
              key={user.id}
              className="flex items-center justify-between border-b border-[#EEEEEE] p-4 last:border-b-0"
            >
              <div className="flex flex-col">
                <span className="font-bold text-brand-navy">{user.full_name}</span>
                <span className="text-[12px] text-brand-muted">{user.email}</span>
              </div>
              <span className="rounded-full bg-brand-navy/10 px-2 py-1 text-[11px] font-bold capitalize text-brand-navy">
                {user.role}
              </span>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};
