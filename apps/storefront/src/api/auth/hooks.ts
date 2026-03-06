/**
 * Authentication Hooks
 * TanStack Query hooks for auth operations
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  login,
  register,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  type LoginCredentials,
  type RegisterData,
  type ForgotPasswordData,
  type ResetPasswordData,
  type User,
} from './api';
import { hasToken } from './storage';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    enabled: hasToken(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

/**
 * Hook for login mutation
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (user: User) => {
      queryClient.setQueryData(authKeys.user(), user);
    },
    onError: (error) => {
      console.error('[Auth] Login failed:', error);
    },
  });
}

/**
 * Hook for registration mutation
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: (user: User) => {
      queryClient.setQueryData(authKeys.user(), user);
    },
    onError: (error) => {
      console.error('[Auth] Registration failed:', error);
    },
  });
}

/**
 * Hook for logout mutation
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.invalidateQueries();
    },
  });
}

/**
 * Hook for forgot password mutation
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordData) => forgotPassword(data),
  });
}

/**
 * Hook for reset password mutation
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => resetPassword(data),
  });
}

/**
 * Hook for email verification mutation
 */
export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => verifyEmail(token),
  });
}

/**
 * Utility hook to check auth status
 */
export function useIsAuthenticated(): boolean {
  const { data: user, isLoading } = useCurrentUser();
  return !isLoading && !!user;
}
