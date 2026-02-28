'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useCurrentUser } from './hooks';
import { getAccessToken, clearTokens } from './token-manager';
import type { User } from '../../types/auth.types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { data: user, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    // Check if there's a token on mount
    const token = getAccessToken();
    if (!token) {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      clearTokens();
    }
  }, [isError]);

  const logout = () => {
    clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const value: AuthContextValue = {
    user: user ?? null,
    isLoading: !isInitialized || isLoading,
    isAuthenticated: !!user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
