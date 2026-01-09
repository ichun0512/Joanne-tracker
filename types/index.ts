export type FrequencyType = 'daily' | 'weekly' | 'monthly';

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: FrequencyType;
  targetCount: number; // Number of times per frequency period
  createdAt: Date;
  userId: string;
  color?: string;
}

export interface CheckIn {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  note?: string;
  timestamp: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface HabitStats {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  completionRate: number;
}
