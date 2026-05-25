'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { AuthSession } from '@/lib/auth-demo';
import {
  getSession,
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  setSession,
} from '@/lib/auth-demo';

type AuthContextValue = {
  user: AuthSession | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<'invalid' | 'ok'>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<'emailTaken' | 'ok'>;
  logout: () => void;
  sendPasswordReset: (email: string) => Promise<void>;
  updatePassword: (
    email: string,
    password: string
  ) => Promise<'notFound' | 'ok'>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(getSession());
    setIsReady(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = loginUser({ email, password });
    if (!result.ok) return 'invalid';
    setUser(result.user);
    return 'ok';
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const result = registerUser({ name, email, password });
      if (!result.ok) return 'emailTaken';
      setUser(getSession());
      return 'ok';
    },
    []
  );

  const logout = useCallback(() => {
    setSession(null);
    setUser(null);
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    requestPasswordReset(email);
  }, []);

  const updatePassword = useCallback(async (email: string, password: string) => {
    const result = resetPassword({ email, password });
    return result.ok ? 'ok' : 'notFound';
  }, []);

  const value = useMemo(
    () => ({
      user,
      isReady,
      login,
      register,
      logout,
      sendPasswordReset,
      updatePassword,
    }),
    [user, isReady, login, register, logout, sendPasswordReset, updatePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
