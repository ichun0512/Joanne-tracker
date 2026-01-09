import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, differenceInDays } from 'date-fns';
import { CheckIn, Habit, HabitStats } from '@/types';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getDateRange = (frequency: Habit['frequency'], date: Date = new Date()) => {
  switch (frequency) {
    case 'daily':
      return { start: startOfDay(date), end: endOfDay(date) };
    case 'weekly':
      return { start: startOfWeek(date), end: endOfWeek(date) };
    case 'monthly':
      return { start: startOfMonth(date), end: endOfMonth(date) };
  }
};

export const calculateStreak = (checkIns: CheckIn[]): { current: number; longest: number } => {
  if (checkIns.length === 0) return { current: 0, longest: 0 };

  const sortedDates = checkIns
    .filter(c => c.completed)
    .map(c => c.date)
    .sort()
    .reverse();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));

  // Calculate current streak
  if (sortedDates[0] === today || sortedDates[0] === yesterday) {
    let checkDate = sortedDates[0] === today ? today : yesterday;
    for (const date of sortedDates) {
      if (date === checkDate) {
        currentStreak++;
        const dateObj = new Date(date);
        checkDate = formatDate(new Date(dateObj.getTime() - 86400000));
      } else if (new Date(date) < new Date(checkDate)) {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const diff = differenceInDays(new Date(sortedDates[i - 1]), new Date(sortedDates[i]));
      if (diff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return { current: currentStreak, longest: longestStreak };
};

export const calculateCompletionRate = (habit: Habit, checkIns: CheckIn[]): number => {
  const createdDate = new Date(habit.createdAt);
  const today = new Date();
  const daysSinceCreated = Math.max(1, differenceInDays(today, createdDate) + 1);

  const completedCheckIns = checkIns.filter(c => c.completed).length;

  let expectedCheckIns = 0;
  switch (habit.frequency) {
    case 'daily':
      expectedCheckIns = daysSinceCreated * habit.targetCount;
      break;
    case 'weekly':
      expectedCheckIns = Math.ceil(daysSinceCreated / 7) * habit.targetCount;
      break;
    case 'monthly':
      expectedCheckIns = Math.ceil(daysSinceCreated / 30) * habit.targetCount;
      break;
  }

  return expectedCheckIns > 0 ? Math.min(100, (completedCheckIns / expectedCheckIns) * 100) : 0;
};

export const getHabitStats = (habit: Habit, checkIns: CheckIn[]): HabitStats => {
  const streak = calculateStreak(checkIns);
  const completionRate = calculateCompletionRate(habit, checkIns);

  return {
    habitId: habit.id,
    currentStreak: streak.current,
    longestStreak: streak.longest,
    totalCheckIns: checkIns.filter(c => c.completed).length,
    completionRate,
  };
};

export const getHabitColors = (): string[] => {
  return [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#f43f5e', // rose
    '#f59e0b', // amber
    '#10b981', // green
    '#06b6d4', // cyan
    '#6366f1', // indigo
  ];
};
