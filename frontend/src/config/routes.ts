export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  JOURNAL: '/journal',
  
  // Shop
  SHOP: '/shop',
  COLLECTIONS: '/collections',
  COLLECTION: (id: string) => `/collections/${id}`,
  PRODUCT: (id: string) => `/product/${id}`,
  
  // Cart & Checkout
  CART: '/cart',
  CHECKOUT: '/checkout',
  
  // Store
  STORE: '/store',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Account
  ACCOUNT: '/account',
  ORDERS: '/account/orders',
  SETTINGS: '/account/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
