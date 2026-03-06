/**
 * Authentication API
 * API calls for auth operations
 */

import { apiClient } from '../core/client';
import { ENDPOINTS } from '../core/endpoints';
import type { ApiResponse } from '../core/client';
import { saveTokens, removeTokens } from './storage';

// Auth Types
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Login user
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    ENDPOINTS.AUTH.LOGIN,
    credentials
  );

  const { user, accessToken, refreshToken } = response.data.data;
  saveTokens(accessToken, refreshToken);

  return user;
}

/**
 * Register new user
 */
export async function register(data: RegisterData): Promise<User> {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    ENDPOINTS.AUTH.REGISTER,
    data
  );

  const { user, accessToken, refreshToken } = response.data.data;
  saveTokens(accessToken, refreshToken);

  return user;
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  try {
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  } catch (error) {
    console.error('[Auth] Logout error:', error);
  } finally {
    removeTokens();
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>(ENDPOINTS.AUTH.ME);
  return response.data.data;
}

/**
 * Request password reset
 */
export async function forgotPassword(data: ForgotPasswordData): Promise<void> {
  await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
}

/**
 * Reset password with token
 */
export async function resetPassword(data: ResetPasswordData): Promise<void> {
  await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, data);
}

/**
 * Verify email with token
 */
export async function verifyEmail(token: string): Promise<void> {
  await apiClient.post(ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
}
