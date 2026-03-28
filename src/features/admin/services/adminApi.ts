import { apiRequest } from '@/src/lib/api';
import type {
  AdminAnalytics,
  AdminClass,
  AdminContentItem,
  AdminOverview,
  AdminUser,
  UserRole,
  UserStatus,
} from '@/src/features/admin/types';

export const ADMIN_ROLE_STORAGE_KEY = 'debrill.user.role';

export interface UserFilters {
  role?: UserRole | 'all';
  status?: UserStatus | 'all';
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface PagedUsersResponse {
  items: AdminUser[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
  teacherId?: string;
}

export interface ContentPayload {
  title: string;
  description: string;
  level: string;
  status: 'draft' | 'published';
  audioUrl?: string;
  audioFileName?: string;
  audioDataUrl?: string;
}

export interface AssignClassPayload {
  classId: string;
  teacherId: string;
  studentIds: string[];
}

const toQueryString = (filters: UserFilters = {}) => {
  const params = new URLSearchParams();

  if (filters.role && filters.role !== 'all') params.set('role', filters.role);
  if (filters.status && filters.status !== 'all') params.set('status', filters.status);
  if (filters.search?.trim()) params.set('search', filters.search.trim());
  if (filters.page) params.set('page', String(filters.page));
  if (filters.pageSize) params.set('pageSize', String(filters.pageSize));

  const query = params.toString();
  return query ? `?${query}` : '';
};

export const getStoredUserRole = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ADMIN_ROLE_STORAGE_KEY);
};

export const setStoredUserRole = (role: UserRole | 'parent') => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ADMIN_ROLE_STORAGE_KEY, role);
};

export const getOverview = () => apiRequest<AdminOverview>('admin/overview');

export const getUsers = (filters: UserFilters = {}) =>
  apiRequest<PagedUsersResponse>(`admin/users${toQueryString(filters)}`);

export const getStudents = () => apiRequest<AdminUser[]>('admin/students');

export const getTeachers = () => apiRequest<AdminUser[]>('admin/teachers');

export const getContent = () => apiRequest<AdminContentItem[]>('admin/content');

export const createContent = (payload: ContentPayload) =>
  apiRequest<AdminContentItem>('admin/content', {
    method: 'POST',
    body: payload,
  });

export const updateContent = (contentId: string, payload: Partial<ContentPayload>) =>
  apiRequest<AdminContentItem>('admin/content', {
    method: 'PUT',
    body: { id: contentId, ...payload },
  });

export const deleteContent = (contentId: string) =>
  apiRequest<{ success: boolean }>('admin/content', {
    method: 'DELETE',
    body: { id: contentId },
  });

export const updateUser = (userId: string, payload: UpdateUserPayload) =>
  apiRequest<AdminUser>('admin/users', {
    method: 'PUT',
    body: { id: userId, ...payload },
  });

export const deleteUser = (userId: string) =>
  apiRequest<{ success: boolean }>('admin/users', {
    method: 'DELETE',
    body: { id: userId },
  });

export const getClasses = () => apiRequest<AdminClass[]>('admin/classes');

export const assignClass = (payload: AssignClassPayload) =>
  apiRequest<AdminClass>('admin/classes', {
    method: 'PUT',
    body: payload,
  });

export const getAnalytics = () => apiRequest<AdminAnalytics>('admin/analytics');
