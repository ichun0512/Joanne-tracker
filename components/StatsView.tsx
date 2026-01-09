'use client';

import { Habit, CheckIn } from '@/types';
import { getHabitStats } from '@/lib/utils';
import { Flame, Target, TrendingUp, Award } from 'lucide-react';

interface StatsViewProps {
  habits: Habit[];
  checkIns: CheckIn[];
}

export const StatsView = ({ habits, checkIns }: StatsViewProps) => {
  const totalHabits = habits.length;
  const totalCheckIns = checkIns.filter(c => c.completed).length;

  const habitsWithStats = habits.map(habit => ({
    habit,
    stats: getHabitStats(habit, checkIns.filter(c => c.habitId === habit.id)),
  }));

  const longestStreak = Math.max(0, ...habitsWithStats.map(h => h.stats.longestStreak));
  const currentStreaks = habitsWithStats.filter(h => h.stats.currentStreak > 0);
  const avgCompletionRate = habitsWithStats.length > 0
    ? habitsWithStats.reduce((sum, h) => sum + h.stats.completionRate, 0) / habitsWithStats.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6" />
            <div className="text-2xl font-bold">{totalHabits}</div>
          </div>
          <div className="text-sm opacity-90">總習慣數</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6" />
            <div className="text-2xl font-bold">{totalCheckIns}</div>
          </div>
          <div className="text-sm opacity-90">總打卡次數</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-6 h-6" />
            <div className="text-2xl font-bold">{longestStreak}</div>
          </div>
          <div className="text-sm opacity-90">最長連續天數</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6" />
            <div className="text-2xl font-bold">{Math.round(avgCompletionRate)}%</div>
          </div>
          <div className="text-sm opacity-90">平均完成率</div>
        </div>
      </div>

      {/* Habit Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          各習慣統計
        </h2>
        <div className="space-y-4">
          {habitsWithStats.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              還沒有習慣記錄
            </p>
          ) : (
            habitsWithStats.map(({ habit, stats }) => (
              <div
                key={habit.id}
                className="p-4 rounded-lg border-l-4 bg-gray-50 dark:bg-gray-700/50"
                style={{ borderLeftColor: habit.color }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {habit.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {habit.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.currentStreak}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      目前連續
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.longestStreak}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      最長連續
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalCheckIns}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      總打卡數
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(stats.completionRate)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      完成率
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, stats.completionRate)}%`,
                        backgroundColor: habit.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
