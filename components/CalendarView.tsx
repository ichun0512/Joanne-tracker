'use client';

import { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Habit, CheckIn } from '@/types';
import { formatDate } from '@/lib/utils';

interface CalendarViewProps {
  habits: Habit[];
  checkIns: CheckIn[];
  onDateSelect: (date: Date) => void;
}

export const CalendarView = ({ habits, checkIns, onDateSelect }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const getCheckInsForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return checkIns.filter(c => c.date === dateStr && c.completed);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {format(currentDate, 'yyyy年 M月')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayCheckIns = getCheckInsForDate(day);
          const completionRate = habits.length > 0 ? (dayCheckIns.length / habits.length) * 100 : 0;
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <button
              key={day.toString()}
              onClick={() => onDateSelect(day)}
              className={`aspect-square p-2 rounded-lg transition-all relative ${
                !isCurrentMonth
                  ? 'text-gray-300 dark:text-gray-600'
                  : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              } ${
                isToday
                  ? 'ring-2 ring-primary-500 font-bold'
                  : ''
              }`}
            >
              <div className="text-sm">{format(day, 'd')}</div>
              {dayCheckIns.length > 0 && isCurrentMonth && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                  {dayCheckIns.slice(0, 3).map((checkIn, idx) => {
                    const habit = habits.find(h => h.id === checkIn.habitId);
                    return (
                      <div
                        key={idx}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: habit?.color || '#3b82f6' }}
                      />
                    );
                  })}
                  {dayCheckIns.length > 3 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500" />
          <span className="text-gray-600 dark:text-gray-400">已完成習慣</span>
        </div>
      </div>
    </div>
  );
};
