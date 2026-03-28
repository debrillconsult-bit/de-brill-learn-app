export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'student' | 'child' | 'teacher' | 'parent';
  classLevel?: string;
  schoolName?: string;
  avatar?: number;
  nickname?: string;
  language: 'british' | 'american';
  createdAt: string;
}

const USERS_KEY = 'debrilllearn_users';
const SESSION_KEY = 'debrilllearn_session';

function getUsers(): Record<string, User & { password: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, User & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(data: {
  fullName: string;
  email: string;
  password: string;
  role: User['role'];
  classLevel?: string;
  schoolName?: string;
}): { success: boolean; error?: string } {
  const users = getUsers();
  const emailKey = data.email.toLowerCase().trim();

  if (users[emailKey]) {
    return {
      success: false,
      error: 'An account with this email already exists.',
    };
  }

  const user: User & { password: string } = {
    id: 'user_' + Date.now(),
    fullName: data.fullName,
    email: emailKey,
    password: data.password,
    role: data.role,
    classLevel: data.classLevel,
    schoolName: data.schoolName,
    language: 'british',
    createdAt: new Date().toISOString(),
  };

  users[emailKey] = user;
  saveUsers(users);
  return { success: true };
}

export function loginUser(
  email: string,
  password: string
): { success: boolean; user?: User; error?: string } {
  const users = getUsers();
  const emailKey = email.toLowerCase().trim();
  const found = users[emailKey];

  if (!found) {
    return {
      success: false,
      error: 'No account found with this email.',
    };
  }

  if (found.password !== password) {
    return {
      success: false,
      error: 'Incorrect password.',
    };
  }

  const { password: _, ...user } = found;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

export function updateUserProfile(updates: Partial<User>): boolean {
  try {
    const current = getCurrentUser();
    if (!current) return false;
    const updated = { ...current, ...updates };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    const users = getUsers();
    const emailKey = current.email;
    if (users[emailKey]) {
      users[emailKey] = {
        ...users[emailKey],
        ...updates,
      };
      saveUsers(users);
    }
    return true;
  } catch {
    return false;
  }
}
