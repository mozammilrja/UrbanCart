import authStorage from './storage';
import { authApi } from './api';

interface TokenPayload {
  exp: number;
  iat: number;
  sub: string;
  [key: string]: unknown;
}

export const parseJwt = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string, bufferSeconds = 60): boolean => {
  const payload = parseJwt(token);
  if (!payload) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime + bufferSeconds;
};

export const getAccessToken = (): string | null => {
  return authStorage.getAccessToken();
};

export const getRefreshToken = (): string | null => {
  return authStorage.getRefreshToken();
};

export const setTokens = (accessToken: string, refreshToken?: string): void => {
  authStorage.setAccessToken(accessToken);
  if (refreshToken) {
    authStorage.setRefreshToken(refreshToken);
  }
};

export const clearTokens = (): void => {
  authStorage.clearAll();
};

let refreshPromise: Promise<void> | null = null;

export const refreshAccessToken = async (): Promise<void> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  refreshPromise = (async () => {
    try {
      const response = await authApi.refreshToken(refreshToken);
      setTokens(response.accessToken, response.refreshToken);
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
