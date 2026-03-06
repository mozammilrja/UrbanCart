/**
 * JWT Token Manager
 * Handles token refresh and validation
 */

import { apiClient } from '../core/client';
import { ENDPOINTS } from '../core/endpoints';
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  removeTokens,
  isTokenExpired,
} from './storage';

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Token refresh response type
 */
interface TokenRefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

/**
 * Refresh the access token using refresh token
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    removeTokens();
    return null;
  }

  try {
    const response = await apiClient.post<TokenRefreshResponse>(
      ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    saveTokens(accessToken, newRefreshToken);
    
    return accessToken;
  } catch (error) {
    console.error('[TokenManager] Failed to refresh token:', error);
    removeTokens();
    return null;
  }
}

/**
 * Get valid access token, refreshing if necessary
 * Implements token refresh with request coalescing
 */
export async function getValidToken(): Promise<string | null> {
  const accessToken = getAccessToken();

  // No token available
  if (!accessToken) {
    return null;
  }

  // Token is still valid
  if (!isTokenExpired(accessToken)) {
    return accessToken;
  }

  // Token is expired, need to refresh
  // If already refreshing, wait for that request
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  // Start refresh process
  isRefreshing = true;
  refreshPromise = refreshAccessToken().finally(() => {
    isRefreshing = false;
    refreshPromise = null;
  });

  return refreshPromise;
}

/**
 * Invalidate current session
 */
export function invalidateSession(): void {
  removeTokens();
  isRefreshing = false;
  refreshPromise = null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getAccessToken();
  return !!token && !isTokenExpired(token);
}

/**
 * Get token expiration time
 */
export function getTokenExpirationTime(): number | null {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}
