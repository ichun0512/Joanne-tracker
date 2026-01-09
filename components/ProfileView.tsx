'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from './Input';
import { Button } from './Button';
import { User } from 'lucide-react';

export const ProfileView = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({
        ...user,
        name,
        email,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              個人資料
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              管理你的帳號資訊
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="姓名"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="電子郵件"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="pt-4">
            <Button type="submit" className="w-full">
              儲存變更
            </Button>
          </div>

          {success && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">
                個人資料已成功更新！
              </p>
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            帳號資訊
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>帳號建立時間：{new Date(user.createdAt).toLocaleDateString('zh-TW')}</p>
            <p>使用者 ID：{user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
