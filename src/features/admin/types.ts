export type UserRole = 'student' | 'teacher' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'invited';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastActive: string;
  teacherId?: string;
}

export interface AdminContentItem {
  id: string;
  title: string;
  description: string;
  level: string;
  status: 'draft' | 'published';
  audioUrl?: string;
  audioFileName?: string;
  updatedAt: string;
}

export interface AdminClass {
  id: string;
  name: string;
  teacherId: string;
  teacherName: string;
  studentIds: string[];
  studentNames: string[];
}

export interface AdminOverview {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalContent: number;
}

export interface AnalyticsPoint {
  label: string;
  value: number;
}

export interface AdminAnalytics {
  userGrowth: AnalyticsPoint[];
  activityCount: AnalyticsPoint[];
}
