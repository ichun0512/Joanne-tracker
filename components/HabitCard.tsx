'use client';

import { Habit, CheckIn } from '@/types';
import { Check, Edit2, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

interface HabitCardProps {
  habit: Habit;
  checkIn?: CheckIn;
  onCheckIn: (habitId: string, date: string, completed: boolean, note?: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  date?: Date;
}

export const HabitCard = ({
  habit,
  checkIn,
  onCheckIn,
  onEdit,
  onDelete,
  date = new Date(),
}: HabitCardProps) => {
  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState(checkIn?.note || '');
  const isCompleted = checkIn?.completed || false;
  const dateStr = formatDate(date);

  const handleToggle = () => {
    if (!isCompleted || showNote) {
      onCheckIn(habit.id, dateStr, !isCompleted, note);
      setShowNote(false);
    } else {
      setShowNote(true);
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      style={{ borderLeft: `4px solid ${habit.color}` }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {habit.name}
            </h3>
            {habit.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {habit.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                {habit.frequency === 'daily' ? '每日' : habit.frequency === 'weekly' ? '每週' : '每月'}
              </span>
              {habit.targetCount > 1 && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                  目標：{habit.targetCount}次
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggle}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                isCompleted
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 dark:text-gray-500'
              }`}
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showNote && (
          <div className="mt-3 space-y-2">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="新增備註..."
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={handleToggle}
                className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                儲存
              </button>
              <button
                onClick={() => setShowNote(false)}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {checkIn?.note && !showNote && (
          <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">{checkIn.note}</p>
          </div>
        )}

        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setShowNote(!showNote)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            備註
          </button>
          <button
            onClick={() => onEdit(habit)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            編輯
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            刪除
          </button>
        </div>
      </div>
    </div>
  );
};
