/**
 * Authentication Module
 * Exports all auth-related functionality
 */

// API functions
export {
  login,
  register,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from './api';

// Types
export type {
  User,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ForgotPasswordData,
  ResetPasswordData,
} from './api';

// Hooks
export {
  authKeys,
  useCurrentUser,
  useLogin,
  useRegister,
  useLogout,
  useForgotPassword,
  useResetPassword,
  useVerifyEmail,
  useIsAuthenticated,
} from './hooks';

// Provider
export { AuthProvider, useAuth, withAuth } from './provider';

// Storage
export {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  removeTokens,
  hasToken,
  parseToken,
  isTokenExpired,
} from './storage';

// Token Manager
export {
  getValidToken,
  invalidateSession,
  isAuthenticated,
  getTokenExpirationTime,
} from './token-manager';
