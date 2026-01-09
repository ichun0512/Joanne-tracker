'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { getCurrentUser, setCurrentUser as saveCurrentUser, getUsers, saveUser } from '@/lib/storage';
import { generateId } from '@/lib/utils';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email);

    if (foundUser) {
      setUser(foundUser);
      saveCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const users = getUsers();
    const exists = users.find(u => u.email === email);

    if (exists) {
      return false;
    }

    const newUser: User = {
      id: generateId(),
      email,
      name,
      createdAt: new Date(),
    };

    saveUser(newUser);
    setUser(newUser);
    saveCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    saveCurrentUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    saveCurrentUser(updatedUser);
    saveUser(updatedUser);
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
