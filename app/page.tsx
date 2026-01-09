'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useHabits } from '@/contexts/HabitContext';
import { AuthForm } from '@/components/AuthForm';
import { Navbar } from '@/components/Navbar';
import { Dashboard } from '@/components/Dashboard';
import { CalendarView } from '@/components/CalendarView';
import { StatsView } from '@/components/StatsView';
import { ProfileView } from '@/components/ProfileView';

export default function Home() {
  const { user, login, register } = useAuth();
  const { habits, checkIns } = useHabits();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeView, setActiveView] = useState<'dashboard' | 'calendar' | 'stats' | 'profile'>('dashboard');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <AuthForm
          mode={authMode}
          onSubmit={async (email, password, name) => {
            if (authMode === 'login') {
              return await login(email, password);
            } else {
              return await register(email, password, name || '');
            }
          }}
          onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      </div>
    );
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="container mx-auto px-4 py-8">
        {activeView === 'dashboard' && <Dashboard selectedDate={selectedDate} />}
        {activeView === 'calendar' && (
          <CalendarView
            habits={habits}
            checkIns={checkIns}
            onDateSelect={handleDateSelect}
          />
        )}
        {activeView === 'stats' && (
          <StatsView habits={habits} checkIns={checkIns} />
        )}
        {activeView === 'profile' && <ProfileView />}
      </main>
    </div>
  );
}
