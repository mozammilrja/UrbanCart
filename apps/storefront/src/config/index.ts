/**
 * Config Module Index
 */

// Routes
export { ROUTES, PROTECTED_ROUTES, AUTH_ROUTES, isProtectedRoute, isAuthRoute } from './routes';
export type { RouteKey } from './routes';

// Navigation
export { mainNavigation, footerNavigation, accountNavigation } from './navigation';
export type { NavItem } from './navigation';

// Theme
export * from './theme';

// Constants
export * from './constants';

// SEO
export { defaultSEO, generatePageSEO, generateProductSEO } from './seo';
