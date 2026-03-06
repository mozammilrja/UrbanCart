/**
 * Token Storage Utilities
 * Handles secure token storage in browser
 */

const ACCESS_TOKEN_KEY = 'apostle_access_token';
const REFRESH_TOKEN_KEY = 'apostle_refresh_token';

/**
 * Storage adapter for SSR compatibility
 */
const storage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      console.error('Failed to save to localStorage');
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      console.error('Failed to remove from localStorage');
    }
  },
};

/**
 * Get access token from storage
 */
export function getAccessToken(): string | null {
  return storage.getItem(ACCESS_TOKEN_KEY);
}

/**
 * Get refresh token from storage
 */
export function getRefreshToken(): string | null {
  return storage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Save tokens to storage
 */
export function saveTokens(accessToken: string, refreshToken?: string): void {
  storage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

/**
 * Remove all tokens from storage
 */
export function removeTokens(): void {
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Check if user has valid token
 */
export function hasToken(): boolean {
  return !!getAccessToken();
}

/**
 * Parse JWT token payload (without verification)
 */
export function parseToken<T = Record<string, unknown>>(token: string): T | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

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
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = parseToken<{ exp: number }>(token);
  if (!payload?.exp) return true;

  // Add 30 second buffer
  return Date.now() >= (payload.exp * 1000) - 30000;
}
