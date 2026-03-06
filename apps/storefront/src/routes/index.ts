/**
 * Route Definitions
 * Centralized route management for the application
 */

// Re-export from config for convenience
export { ROUTES, PROTECTED_ROUTES, AUTH_ROUTES, isProtectedRoute, isAuthRoute } from '@/config/routes';
export type { RouteKey } from '@/config/routes';

/**
 * Build URL with query parameters
 */
export function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
  if (!params) return path;

  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

/**
 * Get current pathname
 */
export function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname;
}

/**
 * Check if current path matches
 */
export function isActivePath(path: string, pathname: string, exact: boolean = false): boolean {
  if (exact) return pathname === path;
  return pathname.startsWith(path);
}

/**
 * Get breadcrumb segments from path
 */
export function getBreadcrumbSegments(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split('/').filter(Boolean);
  
  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    
    return { label, href };
  });
}
