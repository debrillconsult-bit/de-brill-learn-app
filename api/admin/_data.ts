type UserRole = 'student' | 'teacher' | 'admin';
type UserStatus = 'active' | 'inactive' | 'invited';

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastActive: string;
  teacherId?: string;
}

export interface AdminContentRecord {
  id: string;
  title: string;
  description: string;
  level: string;
  status: 'draft' | 'published';
  audioUrl?: string;
  audioFileName?: string;
  updatedAt: string;
}

export interface AdminClassRecord {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
}

const now = new Date().toISOString();

const users: AdminUserRecord[] = [
  { id: 'u1', name: 'Amaka Okafor', email: 'amaka@debrilllearn.com', role: 'admin', status: 'active', createdAt: now, lastActive: '2 min ago' },
  { id: 'u2', name: 'Tunde Bello', email: 'tunde@debrilllearn.com', role: 'teacher', status: 'active', createdAt: now, lastActive: '12 min ago' },
  { id: 'u3', name: 'Halima Sani', email: 'halima@debrilllearn.com', role: 'teacher', status: 'invited', createdAt: now, lastActive: 'Pending' },
  { id: 'u4', name: 'Joel Peters', email: 'joel@student.debrilllearn.com', role: 'student', status: 'inactive', createdAt: now, lastActive: '3 days ago', teacherId: 'u2' },
  { id: 'u5', name: 'Chioma Eze', email: 'chioma@student.debrilllearn.com', role: 'student', status: 'active', createdAt: now, lastActive: 'Today', teacherId: 'u2' },
  { id: 'u6', name: 'Musa Ibrahim', email: 'musa@student.debrilllearn.com', role: 'student', status: 'active', createdAt: now, lastActive: 'Yesterday', teacherId: 'u3' },
  { id: 'u7', name: 'Ada Nwosu', email: 'ada@student.debrilllearn.com', role: 'student', status: 'active', createdAt: now, lastActive: '4 hours ago', teacherId: 'u3' },
];

const content: AdminContentRecord[] = [
  { id: 'c1', title: 'Blends Warm-Up', description: 'A short warm-up on consonant blends.', level: 'Primary 1', status: 'published', updatedAt: now },
  { id: 'c2', title: 'Long Vowel Story', description: 'Story-led reading practice with long vowels.', level: 'Primary 2', status: 'draft', updatedAt: now },
  { id: 'c3', title: 'Th Sound Drill', description: 'Focused articulation practice for /th/.', level: 'Primary 3', status: 'published', updatedAt: now },
];

const classes: AdminClassRecord[] = [
  { id: 'cl1', name: 'Primary 1 Blue', teacherId: 'u2', studentIds: ['u4', 'u5'] },
  { id: 'cl2', name: 'Primary 2 Gold', teacherId: 'u3', studentIds: ['u6', 'u7'] },
];

const analytics = {
  userGrowth: [
    { label: 'Mon', value: 4 },
    { label: 'Tue', value: 7 },
    { label: 'Wed', value: 5 },
    { label: 'Thu', value: 9 },
    { label: 'Fri', value: 6 },
    { label: 'Sat', value: 3 },
    { label: 'Sun', value: 4 },
  ],
  activityCount: [
    { label: 'Mon', value: 62 },
    { label: 'Tue', value: 74 },
    { label: 'Wed', value: 68 },
    { label: 'Thu', value: 91 },
    { label: 'Fri', value: 84 },
    { label: 'Sat', value: 55 },
    { label: 'Sun', value: 48 },
  ],
};

export const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const getUsers = () => users;
export const getContentItems = () => content;
export const getClassRecords = () => classes;
export const getAnalytics = () => analytics;

export const getOverview = () => ({
  totalUsers: users.length,
  totalStudents: users.filter(user => user.role === 'student').length,
  totalTeachers: users.filter(user => user.role === 'teacher').length,
  totalContent: content.length,
});

export const updateUserRecord = (userId: string, updates: Partial<AdminUserRecord>) => {
  const user = users.find(item => item.id === userId);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
};

export const deleteUserRecord = (userId: string) => {
  const index = users.findIndex(user => user.id === userId);
  if (index === -1) return false;
  users.splice(index, 1);
  classes.forEach(item => {
    item.studentIds = item.studentIds.filter(studentId => studentId !== userId);
    if (item.teacherId === userId) {
      const fallbackTeacher = users.find(user => user.role === 'teacher');
      if (fallbackTeacher) {
        item.teacherId = fallbackTeacher.id;
      }
    }
  });
  return true;
};

export const createContentRecord = (payload: Omit<AdminContentRecord, 'id' | 'updatedAt'>) => {
  const newRecord: AdminContentRecord = {
    id: `c${content.length + 1}`,
    updatedAt: new Date().toISOString(),
    ...payload,
  };
  content.unshift(newRecord);
  return newRecord;
};

export const updateContentRecord = (contentId: string, updates: Partial<AdminContentRecord>) => {
  const item = content.find(entry => entry.id === contentId);
  if (!item) return null;
  Object.assign(item, updates, { updatedAt: new Date().toISOString() });
  return item;
};

export const deleteContentRecord = (contentId: string) => {
  const index = content.findIndex(item => item.id === contentId);
  if (index === -1) return false;
  content.splice(index, 1);
  return true;
};

export const assignClassRecord = (classId: string, teacherId: string, studentIds: string[]) => {
  const classRecord = classes.find(item => item.id === classId);
  if (!classRecord) return null;
  classRecord.teacherId = teacherId;
  classRecord.studentIds = studentIds;
  users.forEach(user => {
    if (user.role === 'student' && studentIds.includes(user.id)) {
      user.teacherId = teacherId;
    }
  });
  return classRecord;
};

export const hydrateClass = (item: AdminClassRecord) => {
  const teacher = users.find(user => user.id === item.teacherId);
  const classStudents = users.filter(user => item.studentIds.includes(user.id));

  return {
    ...item,
    teacherName: teacher?.name ?? 'Unassigned',
    studentNames: classStudents.map(user => user.name),
  };
};
