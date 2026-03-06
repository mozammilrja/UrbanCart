/**
 * Route Constants
 * Centralized route definitions
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  SHOP: '/shop',
  COLLECTIONS: '/collections',
  COLLECTION: (slug: string) => `/collections/${slug}`,
  PRODUCT: (slug: string) => `/product/${slug}`,
  CATEGORY: (slug: string) => `/category/${slug}`,
  SEARCH: '/search',
  ABOUT: '/about',
  STORES: '/stores',
  JOURNAL: '/journal',
  CONTACT: '/contact',
  FAQ: '/faq',

  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Account routes
  ACCOUNT: '/account',
  PROFILE: '/account/profile',
  ORDERS: '/account/orders',
  ORDER_DETAIL: (id: string) => `/account/orders/${id}`,
  ADDRESSES: '/account/addresses',
  WISHLIST: '/wishlist',

  // Cart & Checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SHIPPING: '/checkout/shipping',
  CHECKOUT_PAYMENT: '/checkout/payment',
  CHECKOUT_CONFIRMATION: '/checkout/confirmation',
  ORDER_SUCCESS: (id: string) => `/order-success/${id}`,

  // Legal
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
  RETURN_POLICY: '/return-policy',
  SHIPPING_INFO: '/shipping-info',
} as const;

// Route type for type-safe navigation
export type RouteKey = keyof typeof ROUTES;

// Protected routes that require authentication
export const PROTECTED_ROUTES = [
  '/account',
  '/checkout',
  '/wishlist',
] as const;

// Auth routes that should redirect to home if already logged in
export const AUTH_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
] as const;

/**
 * Check if a route is protected
 */
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if a route is an auth route
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}
