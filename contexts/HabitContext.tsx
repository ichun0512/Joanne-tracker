'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Habit, CheckIn } from '@/types';
import { getHabits, saveHabit as saveHabitToStorage, deleteHabit as deleteHabitFromStorage, getCheckIns, saveCheckIn as saveCheckInToStorage } from '@/lib/storage';
import { useAuth } from './AuthContext';

interface HabitContextType {
  habits: Habit[];
  checkIns: CheckIn[];
  addHabit: (habit: Omit<Habit, 'id' | 'userId' | 'createdAt'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (habitId: string) => void;
  addCheckIn: (checkIn: Omit<CheckIn, 'id' | 'timestamp'>) => void;
  getHabitCheckIns: (habitId: string) => CheckIn[];
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const allHabits = getHabits();
      const userHabits = allHabits.filter(h => h.userId === user.id);
      setHabits(userHabits);

      const allCheckIns = getCheckIns();
      const habitIds = new Set(userHabits.map(h => h.id));
      const userCheckIns = allCheckIns.filter(c => habitIds.has(c.habitId));
      setCheckIns(userCheckIns);
    } else {
      setHabits([]);
      setCheckIns([]);
    }
  }, [user]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newHabit: Habit = {
      ...habitData,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      createdAt: new Date(),
    };

    saveHabitToStorage(newHabit);
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (habit: Habit) => {
    saveHabitToStorage(habit);
    setHabits(prev => prev.map(h => h.id === habit.id ? habit : h));
  };

  const deleteHabit = (habitId: string) => {
    deleteHabitFromStorage(habitId);
    setHabits(prev => prev.filter(h => h.id !== habitId));
    setCheckIns(prev => prev.filter(c => c.habitId !== habitId));
  };

  const addCheckIn = (checkInData: Omit<CheckIn, 'id' | 'timestamp'>) => {
    const newCheckIn: CheckIn = {
      ...checkInData,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    saveCheckInToStorage(newCheckIn);
    setCheckIns(prev => {
      const filtered = prev.filter(c => !(c.habitId === newCheckIn.habitId && c.date === newCheckIn.date));
      return [...filtered, newCheckIn];
    });
  };

  const getHabitCheckIns = (habitId: string): CheckIn[] => {
    return checkIns.filter(c => c.habitId === habitId);
  };

  return (
    <HabitContext.Provider value={{ habits, checkIns, addHabit, updateHabit, deleteHabit, addCheckIn, getHabitCheckIns }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
