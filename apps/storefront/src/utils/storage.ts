/**
 * Storage Utilities
 * LocalStorage helpers with SSR safety
 */

const isBrowser = typeof window !== 'undefined';

/**
 * Get item from localStorage
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isBrowser) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Set item in localStorage
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (!isBrowser) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key: string): void {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}

/**
 * Clear all localStorage
 */
export function clearStorage(): void {
  if (!isBrowser) return;

  try {
    localStorage.clear();
  } catch (error) {
    console.warn('Error clearing localStorage:', error);
  }
}

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'apostle_access_token',
  REFRESH_TOKEN: 'apostle_refresh_token',
  CART: 'cart-storage',
  WISHLIST: 'wishlist-storage',
  UI_PREFERENCES: 'ui-preferences',
  RECENT_SEARCHES: 'recent-searches',
  VIEWED_PRODUCTS: 'viewed-products',
} as const;
