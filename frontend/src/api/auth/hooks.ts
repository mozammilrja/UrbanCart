import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from './api';
import { setTokens, clearTokens, getAccessToken } from './token-manager';
import type { LoginCredentials, RegisterData } from '../../types/auth.types';

export const AUTH_QUERY_KEYS = {
  me: ['auth', 'me'],
} as const;

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      queryClient.setQueryData(AUTH_QUERY_KEYS.me, data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
    },
  });
};

export const useCurrentUser = () => {
  const token = getAccessToken();

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.me,
    queryFn: () => authApi.getMe(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
