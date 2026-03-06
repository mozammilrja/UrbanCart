/**
 * TanStack Query Key Factories
 * Centralized query key management
 */

// Products
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  bySlug: (slug: string) => [...productKeys.all, 'slug', slug] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
  featured: () => [...productKeys.all, 'featured'] as const,
  newArrivals: () => [...productKeys.all, 'new-arrivals'] as const,
  related: (productId: string) => [...productKeys.all, 'related', productId] as const,
};

// Collections
export const collectionKeys = {
  all: ['collections'] as const,
  lists: () => [...collectionKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...collectionKeys.lists(), filters] as const,
  details: () => [...collectionKeys.all, 'detail'] as const,
  detail: (id: string) => [...collectionKeys.details(), id] as const,
  bySlug: (slug: string) => [...collectionKeys.all, 'slug', slug] as const,
  products: (slug: string, filters?: Record<string, unknown>) => 
    [...collectionKeys.all, 'products', slug, filters] as const,
};

// Categories
export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
  detail: (slug: string) => [...categoryKeys.all, 'detail', slug] as const,
  products: (slug: string, filters?: Record<string, unknown>) => 
    [...categoryKeys.all, 'products', slug, filters] as const,
};

// Cart
export const cartKeys = {
  all: ['cart'] as const,
  detail: () => [...cartKeys.all, 'detail'] as const,
};

// Orders
export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  tracking: (id: string) => [...orderKeys.all, 'tracking', id] as const,
};

// User
export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  addresses: () => [...userKeys.all, 'addresses'] as const,
  wishlist: () => [...userKeys.all, 'wishlist'] as const,
};

// Auth
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Stores
export const storeKeys = {
  all: ['stores'] as const,
  list: () => [...storeKeys.all, 'list'] as const,
  detail: (id: string) => [...storeKeys.all, 'detail', id] as const,
  nearby: (lat: number, lng: number) => [...storeKeys.all, 'nearby', lat, lng] as const,
};

// Search
export const searchKeys = {
  all: ['search'] as const,
  products: (query: string, filters?: Record<string, unknown>) => 
    [...searchKeys.all, 'products', query, filters] as const,
  suggestions: (query: string) => [...searchKeys.all, 'suggestions', query] as const,
};
