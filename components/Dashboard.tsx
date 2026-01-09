'use client';

import { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { useHabits } from '@/contexts/HabitContext';
import { Habit } from '@/types';
import { HabitCard } from './HabitCard';
import { Modal } from './Modal';
import { HabitForm } from './HabitForm';
import { formatDate, getCheckInByDate } from '@/lib/utils';
import { getCheckInByDate as getCheckInByDateFromStorage } from '@/lib/storage';

interface DashboardProps {
  selectedDate?: Date;
}

export const Dashboard = ({ selectedDate = new Date() }: DashboardProps) => {
  const { habits, checkIns, addHabit, updateHabit, deleteHabit, addCheckIn, getHabitCheckIns } = useHabits();
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>();

  const dateStr = formatDate(selectedDate);
  const isToday = formatDate(new Date()) === dateStr;

  const handleAddHabit = (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt'>) => {
    if (editingHabit) {
      updateHabit({
        ...editingHabit,
        ...habitData,
      });
    } else {
      addHabit(habitData);
    }
    setShowModal(false);
    setEditingHabit(undefined);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowModal(true);
  };

  const handleDeleteHabit = (habitId: string) => {
    if (confirm('確定要刪除這個習慣嗎？')) {
      deleteHabit(habitId);
    }
  };

  const handleCheckIn = (habitId: string, date: string, completed: boolean, note?: string) => {
    addCheckIn({
      habitId,
      date,
      completed,
      note,
    });
  };

  const getCheckInForHabit = (habitId: string) => {
    return checkIns.find(c => c.habitId === habitId && c.date === dateStr);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isToday ? '今日習慣' : `習慣記錄 - ${new Date(selectedDate).toLocaleDateString('zh-TW')}`}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isToday ? '完成今天的習慣目標！' : '查看或補打卡'}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingHabit(undefined);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          新增習慣
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            還沒有習慣
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            開始建立你的第一個習慣，培養更好的自己
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            新增第一個習慣
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              checkIn={getCheckInForHabit(habit.id)}
              onCheckIn={handleCheckIn}
              onEdit={handleEditHabit}
              onDelete={handleDeleteHabit}
              date={selectedDate}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingHabit(undefined);
        }}
        title={editingHabit ? '編輯習慣' : '新增習慣'}
      >
        <HabitForm
          habit={editingHabit}
          onSubmit={handleAddHabit}
          onCancel={() => {
            setShowModal(false);
            setEditingHabit(undefined);
          }}
        />
      </Modal>
    </div>
  );
};
