const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getFromStorage = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setToStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    console.error('Failed to set storage item');
  }
};

export const removeFromStorage = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    console.error('Failed to remove storage item');
  }
};

export const authStorage = {
  getAccessToken: () => getFromStorage(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string) => setToStorage(ACCESS_TOKEN_KEY, token),
  removeAccessToken: () => removeFromStorage(ACCESS_TOKEN_KEY),

  getRefreshToken: () => getFromStorage(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) => setToStorage(REFRESH_TOKEN_KEY, token),
  removeRefreshToken: () => removeFromStorage(REFRESH_TOKEN_KEY),

  clearAll: () => {
    removeFromStorage(ACCESS_TOKEN_KEY);
    removeFromStorage(REFRESH_TOKEN_KEY);
  },
};

export default authStorage;
