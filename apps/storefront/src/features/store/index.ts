/**
 * Store Feature - Store Locator
 */

// Types
export interface Store {
  _id: string;
  name: string;
  city: string;
  address: string;
  phone?: string;
  email?: string;
  hours?: string;
  images: string[];
  mapUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Hooks (placeholder)
export const storeKeys = {
  all: ['stores'] as const,
  list: () => [...storeKeys.all, 'list'] as const,
  detail: (id: string) => [...storeKeys.all, 'detail', id] as const,
  nearby: (lat: number, lng: number) => [...storeKeys.all, 'nearby', lat, lng] as const,
};

// Domain
export function getStoreDisplayAddress(store: Store): string {
  return `${store.address}, ${store.city}`;
}

export function formatStoreHours(hours?: string): string {
  return hours || 'Mon-Sat: 11am - 9pm, Sun: 12pm - 8pm';
}
