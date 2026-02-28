import apiClient from '../core/client';
import { ENDPOINTS } from '../core/endpoints';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../../types/auth.types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, data);
  },

  logout: async (): Promise<void> => {
    return apiClient.post<void>(ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REFRESH, { refreshToken });
  },

  getMe: async (): Promise<User> => {
    return apiClient.get<User>(ENDPOINTS.AUTH.ME);
  },
};

export default authApi;
