/**
 * Browser storage utilities with SSR safety
 */

const isBrowser = typeof window !== 'undefined';

export const storage = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    if (!isBrowser) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      console.warn(`Error reading localStorage key "${key}"`);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`Error setting localStorage key "${key}"`);
    }
  },

  remove: (key: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      console.warn(`Error removing localStorage key "${key}"`);
    }
  },

  clear: (): void => {
    if (!isBrowser) return;
    try {
      localStorage.clear();
    } catch {
      console.warn('Error clearing localStorage');
    }
  },
};

export const sessionStorage = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    if (!isBrowser) return defaultValue;
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      console.warn(`Error reading sessionStorage key "${key}"`);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (!isBrowser) return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`Error setting sessionStorage key "${key}"`);
    }
  },

  remove: (key: string): void => {
    if (!isBrowser) return;
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      console.warn(`Error removing sessionStorage key "${key}"`);
    }
  },
};

export default storage;
