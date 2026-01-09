'use client';

import { useState, useEffect } from 'react';
import { Habit, FrequencyType } from '@/types';
import { Input } from './Input';
import { Button } from './Button';
import { getHabitColors } from '@/lib/utils';

interface HabitFormProps {
  habit?: Habit;
  onSubmit: (data: Omit<Habit, 'id' | 'userId' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const HabitForm = ({ habit, onSubmit, onCancel }: HabitFormProps) => {
  const [name, setName] = useState(habit?.name || '');
  const [description, setDescription] = useState(habit?.description || '');
  const [frequency, setFrequency] = useState<FrequencyType>(habit?.frequency || 'daily');
  const [targetCount, setTargetCount] = useState(habit?.targetCount || 1);
  const [color, setColor] = useState(habit?.color || getHabitColors()[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      frequency,
      targetCount,
      color,
    });
  };

  const colors = getHabitColors();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="習慣名稱"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="例如：晨跑、閱讀、冥想"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          描述
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="描述這個習慣..."
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          頻率
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['daily', 'weekly', 'monthly'] as FrequencyType[]).map((freq) => (
            <button
              key={freq}
              type="button"
              onClick={() => setFrequency(freq)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                frequency === freq
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {freq === 'daily' ? '每日' : freq === 'weekly' ? '每週' : '每月'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          目標次數（每{frequency === 'daily' ? '日' : frequency === 'weekly' ? '週' : '月'}）
        </label>
        <input
          type="number"
          min="1"
          value={targetCount}
          onChange={(e) => setTargetCount(parseInt(e.target.value) || 1)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          顏色
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-10 h-10 rounded-lg transition-transform ${
                color === c ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 scale-110' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" className="flex-1">
          {habit ? '更新習慣' : '建立習慣'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          取消
        </Button>
      </div>
    </form>
  );
};
