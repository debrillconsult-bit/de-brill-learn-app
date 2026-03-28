import React from 'react';
import { Search, UserCog, UserMinus } from 'lucide-react';
import { SectionCard } from '@/src/features/admin/components/SectionCard';
import {
  deleteUser,
  getUsers,
  updateUser,
  type UserFilters,
} from '@/src/features/admin/services/adminApi';
import type { AdminUser, UserRole, UserStatus } from '@/src/features/admin/types';

const PAGE_SIZE = 5;

export const AdminUsersPage = () => {
  const [filters, setFilters] = React.useState<UserFilters>({ role: 'all', status: 'all', search: '', page: 1, pageSize: PAGE_SIZE });
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [editingUserId, setEditingUserId] = React.useState<string | null>(null);
  const [drafts, setDrafts] = React.useState<Record<string, Partial<AdminUser>>>({});

  const loadUsers = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUsers(filters);
      setUsers(response.items);
      setTotal(response.total);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  React.useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const saveUser = async (userId: string) => {
    try {
      setError(null);
      await updateUser(userId, drafts[userId] ?? {});
      setEditingUserId(null);
      setDrafts(current => {
        const nextDrafts = { ...current };
        delete nextDrafts[userId];
        return nextDrafts;
      });
      await loadUsers();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to update user');
    }
  };

  const toggleStatus = async (user: AdminUser) => {
    const nextStatus: UserStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      setError(null);
      await updateUser(user.id, { status: nextStatus });
      await loadUsers();
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : 'Failed to change user status');
    }
  };

  const removeUser = async (userId: string) => {
    try {
      setError(null);
      await deleteUser(userId);
      await loadUsers();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Failed to delete user');
    }
  };

  const currentPage = filters.page ?? 1;
  const pageCount = Math.max(Math.ceil(total / PAGE_SIZE), 1);
  const start = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <SectionCard
      eyebrow="Users"
      title="User management"
      description="Search, filter, edit, delete, and activate accounts from one place."
      action={
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-2xl border border-[#D8E1EC] bg-[#F6F9FC] px-4 py-3 text-brand-muted">
            <Search size={18} />
            <input
              value={filters.search ?? ''}
              onChange={event => setFilters(current => ({ ...current, search: event.target.value, page: 1 }))}
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-brand-muted"
              placeholder="Search by name or email"
            />
          </div>
          <select
            value={filters.role ?? 'all'}
            onChange={event => setFilters(current => ({ ...current, role: event.target.value as UserRole | 'all', page: 1 }))}
            className="rounded-2xl border border-[#D8E1EC] bg-white px-4 py-3 text-[13px] font-semibold text-brand-navy"
          >
            <option value="all">All roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admins</option>
          </select>
          <select
            value={filters.status ?? 'all'}
            onChange={event => setFilters(current => ({ ...current, status: event.target.value as UserStatus | 'all', page: 1 }))}
            className="rounded-2xl border border-[#D8E1EC] bg-white px-4 py-3 text-[13px] font-semibold text-brand-navy"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="invited">Invited</option>
          </select>
        </div>
      }
    >
      {error ? <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
      <div className="overflow-hidden rounded-[24px] border border-[#E3EAF2]">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-[#F7FAFD] text-left">
              <tr className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-brand-muted" colSpan={5}>
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-brand-muted" colSpan={5}>
                    No users matched the current filters.
                  </td>
                </tr>
              ) : (
                users.map(user => {
                  const draft = drafts[user.id] ?? {};
                  const isEditing = editingUserId === user.id;

                  return (
                    <tr key={user.id} className="border-t border-[#EEF3F8] text-[13px]">
                      <td className="px-4 py-4">
                        {isEditing ? (
                          <input
                            className="w-full rounded-xl border border-[#D8E1EC] px-3 py-2"
                            value={draft.name ?? user.name}
                            onChange={event =>
                              setDrafts(current => ({
                                ...current,
                                [user.id]: { ...current[user.id], name: event.target.value },
                              }))
                            }
                          />
                        ) : (
                          <div>
                            <p className="font-bold text-brand-navy">{user.name}</p>
                            <p className="text-[12px] text-brand-muted">{user.lastActive}</p>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {isEditing ? (
                          <select
                            className="rounded-xl border border-[#D8E1EC] px-3 py-2"
                            value={draft.role ?? user.role}
                            onChange={event =>
                              setDrafts(current => ({
                                ...current,
                                [user.id]: { ...current[user.id], role: event.target.value as UserRole },
                              }))
                            }
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className="capitalize">{user.role}</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {isEditing ? (
                          <input
                            className="w-full rounded-xl border border-[#D8E1EC] px-3 py-2"
                            value={draft.email ?? user.email}
                            onChange={event =>
                              setDrafts(current => ({
                                ...current,
                                [user.id]: { ...current[user.id], email: event.target.value },
                              }))
                            }
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : user.status === 'inactive'
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => void saveUser(user.id)}
                                className="rounded-xl bg-brand-navy px-3 py-2 text-[12px] font-bold text-white"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingUserId(null)}
                                className="rounded-xl border border-[#D8E1EC] px-3 py-2 text-[12px] font-bold"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setEditingUserId(user.id)}
                                className="flex items-center gap-1 rounded-xl border border-[#D8E1EC] px-3 py-2 text-[12px] font-bold"
                              >
                                <UserCog size={14} />
                                Edit
                              </button>
                              <button
                                onClick={() => void toggleStatus(user)}
                                className="rounded-xl border border-[#D8E1EC] px-3 py-2 text-[12px] font-bold"
                              >
                                {user.status === 'active' ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                onClick={() => void removeUser(user.id)}
                                className="flex items-center gap-1 rounded-xl border border-red-200 px-3 py-2 text-[12px] font-bold text-red-700"
                              >
                                <UserMinus size={14} />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-brand-muted">
          Showing {start} to {end} of {total} users
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage <= 1}
            onClick={() => setFilters(current => ({ ...current, page: Math.max((current.page ?? 1) - 1, 1) }))}
            className="rounded-xl border border-[#D8E1EC] px-3 py-2 text-[12px] font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-[12px] font-bold text-brand-muted">
            Page {currentPage} of {pageCount}
          </span>
          <button
            disabled={currentPage >= pageCount}
            onClick={() => setFilters(current => ({ ...current, page: Math.min((current.page ?? 1) + 1, pageCount) }))}
            className="rounded-xl border border-[#D8E1EC] px-3 py-2 text-[12px] font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </SectionCard>
  );
};
