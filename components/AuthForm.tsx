'use client';

import { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (email: string, password: string, name?: string) => Promise<boolean>;
  onToggleMode: () => void;
}

export const AuthForm = ({ mode, onSubmit, onToggleMode }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await onSubmit(email, password, name);
      if (!success) {
        setError(mode === 'login' ? '電子郵件或密碼錯誤' : '此電子郵件已被註冊');
      }
    } catch (err) {
      setError('發生錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          {mode === 'login' ? '歡迎回來' : '建立帳號'}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          {mode === 'login' ? '登入你的習慣追蹤器' : '開始追蹤你的習慣'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input
              label="姓名"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="輸入你的姓名"
              required
            />
          )}

          <Input
            label="電子郵件"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />

          <Input
            label="密碼"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '處理中...' : mode === 'login' ? '登入' : '註冊'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onToggleMode}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            {mode === 'login' ? '還沒有帳號？立即註冊' : '已有帳號？立即登入'}
          </button>
        </div>
      </div>
    </div>
  );
};
