'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';
import { User } from '@/types/auth.types';
import { trpc } from '@/trpc/trpc';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = typeof window !== 'undefined' ? getCookie('token') : null;

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = trpc.auth.getMe.useQuery(
    {},
    {
      enabled: !!token,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const errorMessage = userError?.message?.toLowerCase() || '';
    const isUnauthorizedError =
      errorMessage.includes('not authenticated') || errorMessage.includes('unauthorized');

    if (isUnauthorizedError) {
      deleteCookie('token', { path: '/' });
      deleteCookie('refreshToken', { path: '/' });
      setUser(null);
      setIsLoading(false);
      return;
    }

    if (userData) {
      setUser({
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
        role: userData.role,
      });
    } else if (!isUserLoading && !token) {
      setUser(null);
    }
    setIsLoading(isUserLoading);
  }, [userData, isUserLoading, token, userError]);

  const logout = useCallback(() => {
    deleteCookie('token', { path: '/' });
    deleteCookie('refreshToken', { path: '/' });
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
