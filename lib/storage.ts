import { Habit, CheckIn, User } from '@/types';

// Local storage keys
const STORAGE_KEYS = {
  HABITS: 'habits',
  CHECK_INS: 'checkIns',
  CURRENT_USER: 'currentUser',
  USERS: 'users',
  THEME: 'theme',
};

// Generic storage functions
export const getFromStorage = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const saveToStorage = <T>(key: string, data: T): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

// Habit operations
export const getHabits = (): Habit[] => {
  const habits = getFromStorage<Habit[]>(STORAGE_KEYS.HABITS) || [];
  return habits.map(h => ({
    ...h,
    createdAt: new Date(h.createdAt),
  }));
};

export const saveHabit = (habit: Habit): void => {
  const habits = getHabits();
  const index = habits.findIndex(h => h.id === habit.id);
  if (index >= 0) {
    habits[index] = habit;
  } else {
    habits.push(habit);
  }
  saveToStorage(STORAGE_KEYS.HABITS, habits);
};

export const deleteHabit = (habitId: string): void => {
  const habits = getHabits().filter(h => h.id !== habitId);
  saveToStorage(STORAGE_KEYS.HABITS, habits);

  // Also delete associated check-ins
  const checkIns = getCheckIns().filter(c => c.habitId !== habitId);
  saveToStorage(STORAGE_KEYS.CHECK_INS, checkIns);
};

// CheckIn operations
export const getCheckIns = (): CheckIn[] => {
  const checkIns = getFromStorage<CheckIn[]>(STORAGE_KEYS.CHECK_INS) || [];
  return checkIns.map(c => ({
    ...c,
    timestamp: new Date(c.timestamp),
  }));
};

export const saveCheckIn = (checkIn: CheckIn): void => {
  const checkIns = getCheckIns();
  const index = checkIns.findIndex(
    c => c.habitId === checkIn.habitId && c.date === checkIn.date
  );
  if (index >= 0) {
    checkIns[index] = checkIn;
  } else {
    checkIns.push(checkIn);
  }
  saveToStorage(STORAGE_KEYS.CHECK_INS, checkIns);
};

export const getCheckInsByHabit = (habitId: string): CheckIn[] => {
  return getCheckIns().filter(c => c.habitId === habitId);
};

export const getCheckInByDate = (habitId: string, date: string): CheckIn | undefined => {
  return getCheckIns().find(c => c.habitId === habitId && c.date === date);
};

// User operations
export const getCurrentUser = (): User | null => {
  const user = getFromStorage<User>(STORAGE_KEYS.CURRENT_USER);
  if (!user) return null;
  return {
    ...user,
    createdAt: new Date(user.createdAt),
  };
};

export const setCurrentUser = (user: User | null): void => {
  saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
};

export const getUsers = (): User[] => {
  const users = getFromStorage<User[]>(STORAGE_KEYS.USERS) || [];
  return users.map(u => ({
    ...u,
    createdAt: new Date(u.createdAt),
  }));
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  saveToStorage(STORAGE_KEYS.USERS, users);
};

// Theme
export const getTheme = (): 'light' | 'dark' => {
  return getFromStorage<'light' | 'dark'>(STORAGE_KEYS.THEME) || 'light';
};

export const saveTheme = (theme: 'light' | 'dark'): void => {
  saveToStorage(STORAGE_KEYS.THEME, theme);
};
