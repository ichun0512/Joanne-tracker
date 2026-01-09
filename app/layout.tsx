import type { ReactNode } from 'react';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { HabitProvider } from '@/contexts/HabitContext';

export const metadata = {
  title: '習慣追蹤器 - Habit Tracker',
  description: '追蹤你的每日習慣，建立更好的自己',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <HabitProvider>
              {children}
            </HabitProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
