'use client';

/**
 * Authentication Provider
 * Context provider for auth state
 */

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useCurrentUser, useLogin, useLogout, useRegister } from './hooks';
import type { User, LoginCredentials, RegisterData } from './api';
import { hasToken, removeTokens } from './storage';

interface AuthContextValue {
  user: User | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  error: Error | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: user, isLoading, error: userError } = useCurrentUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  // Check for auth errors and clear invalid tokens
  useEffect(() => {
    if (userError && hasToken()) {
      // Token is invalid, clear it
      removeTokens();
    }
  }, [userError]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: user ?? null,
      isLoading,
      isAuthenticated: !!user,
      login: async (credentials: LoginCredentials) => {
        const result = await loginMutation.mutateAsync(credentials);
        return result;
      },
      register: async (data: RegisterData) => {
        const result = await registerMutation.mutateAsync(data);
        return result;
      },
      logout: async () => {
        await logoutMutation.mutateAsync();
      },
      error: loginMutation.error || registerMutation.error || (userError as Error | null),
    }),
    [user, isLoading, loginMutation, registerMutation, logoutMutation, userError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * HOC to require authentication
 */
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      );
    }

    if (!isAuthenticated) {
      // Redirect to login or show unauthorized
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
