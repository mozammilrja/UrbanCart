/**
 * API Endpoint Constants
 * Centralized API route definitions
 */

const API_VERSION = '/api/v1';

export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_VERSION}/auth/login`,
    REGISTER: `${API_VERSION}/auth/register`,
    LOGOUT: `${API_VERSION}/auth/logout`,
    REFRESH: `${API_VERSION}/auth/refresh`,
    FORGOT_PASSWORD: `${API_VERSION}/auth/forgot-password`,
    RESET_PASSWORD: `${API_VERSION}/auth/reset-password`,
    VERIFY_EMAIL: `${API_VERSION}/auth/verify-email`,
    ME: `${API_VERSION}/auth/me`,
  },

  // Products
  PRODUCTS: {
    LIST: `${API_VERSION}/products`,
    DETAIL: (id: string) => `${API_VERSION}/products/${id}`,
    BY_SLUG: (slug: string) => `${API_VERSION}/products/slug/${slug}`,
    SEARCH: `${API_VERSION}/products/search`,
    FEATURED: `${API_VERSION}/products/featured`,
    NEW_ARRIVALS: `${API_VERSION}/products/new-arrivals`,
  },

  // Collections
  COLLECTIONS: {
    LIST: `${API_VERSION}/collections`,
    DETAIL: (id: string) => `${API_VERSION}/collections/${id}`,
    BY_SLUG: (slug: string) => `${API_VERSION}/collections/slug/${slug}`,
    PRODUCTS: (slug: string) => `${API_VERSION}/collections/${slug}/products`,
  },

  // Categories
  CATEGORIES: {
    LIST: `${API_VERSION}/categories`,
    DETAIL: (slug: string) => `${API_VERSION}/categories/${slug}`,
    PRODUCTS: (slug: string) => `${API_VERSION}/categories/${slug}/products`,
  },

  // Cart
  CART: {
    GET: `${API_VERSION}/cart`,
    ADD: `${API_VERSION}/cart/add`,
    UPDATE: `${API_VERSION}/cart/update`,
    REMOVE: (itemId: string) => `${API_VERSION}/cart/remove/${itemId}`,
    CLEAR: `${API_VERSION}/cart/clear`,
    APPLY_COUPON: `${API_VERSION}/cart/apply-coupon`,
    REMOVE_COUPON: `${API_VERSION}/cart/remove-coupon`,
  },

  // Orders
  ORDERS: {
    LIST: `${API_VERSION}/orders`,
    DETAIL: (id: string) => `${API_VERSION}/orders/${id}`,
    CREATE: `${API_VERSION}/orders`,
    CANCEL: (id: string) => `${API_VERSION}/orders/${id}/cancel`,
    TRACK: (id: string) => `${API_VERSION}/orders/${id}/track`,
  },

  // Wishlist
  WISHLIST: {
    GET: `${API_VERSION}/wishlist`,
    ADD: `${API_VERSION}/wishlist/add`,
    REMOVE: (productId: string) => `${API_VERSION}/wishlist/remove/${productId}`,
    CLEAR: `${API_VERSION}/wishlist/clear`,
  },

  // User
  USER: {
    PROFILE: `${API_VERSION}/user/profile`,
    UPDATE_PROFILE: `${API_VERSION}/user/profile`,
    ADDRESSES: `${API_VERSION}/user/addresses`,
    ADD_ADDRESS: `${API_VERSION}/user/addresses`,
    UPDATE_ADDRESS: (id: string) => `${API_VERSION}/user/addresses/${id}`,
    DELETE_ADDRESS: (id: string) => `${API_VERSION}/user/addresses/${id}`,
    DEFAULT_ADDRESS: (id: string) => `${API_VERSION}/user/addresses/${id}/default`,
  },

  // Stores
  STORES: {
    LIST: `${API_VERSION}/stores`,
    DETAIL: (id: string) => `${API_VERSION}/stores/${id}`,
    NEARBY: `${API_VERSION}/stores/nearby`,
  },

  // Reviews
  REVIEWS: {
    LIST: (productId: string) => `${API_VERSION}/products/${productId}/reviews`,
    CREATE: (productId: string) => `${API_VERSION}/products/${productId}/reviews`,
    UPDATE: (productId: string, reviewId: string) => 
      `${API_VERSION}/products/${productId}/reviews/${reviewId}`,
    DELETE: (productId: string, reviewId: string) => 
      `${API_VERSION}/products/${productId}/reviews/${reviewId}`,
  },

  // Newsletter
  NEWSLETTER: {
    SUBSCRIBE: `${API_VERSION}/newsletter/subscribe`,
    UNSUBSCRIBE: `${API_VERSION}/newsletter/unsubscribe`,
  },

  // Search
  SEARCH: {
    PRODUCTS: `${API_VERSION}/search/products`,
    SUGGESTIONS: `${API_VERSION}/search/suggestions`,
  },
} as const;

export type EndpointKey = keyof typeof ENDPOINTS;
