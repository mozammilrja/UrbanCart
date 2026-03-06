/**
 * Axios Interceptors
 * Request and response interceptors for API client
 */

import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, removeTokens } from '../auth/storage';

// Paths that don't require authentication
const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/products',
  '/collections',
  '/categories',
  '/stores',
  '/search',
];

/**
 * Check if path requires authentication
 */
function isPublicPath(url: string | undefined): boolean {
  if (!url) return false;
  return PUBLIC_PATHS.some((path) => url.includes(path));
}

/**
 * Request interceptor - Add auth token to requests
 */
function requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // Skip auth header for public paths
  if (isPublicPath(config.url)) {
    return config;
  }

  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Add request timestamp for debugging
  if (process.env.NODE_ENV === 'development') {
    config.headers['X-Request-Time'] = Date.now().toString();
  }

  return config;
}

/**
 * Request error handler
 */
function requestErrorHandler(error: AxiosError): Promise<never> {
  console.error('[API Request Error]', error.message);
  return Promise.reject(error);
}

/**
 * Response interceptor - Handle responses
 */
function responseInterceptor(response: import('axios').AxiosResponse): import('axios').AxiosResponse {
  // Log response time in development
  if (process.env.NODE_ENV === 'development') {
    const requestTime = response.config.headers?.['X-Request-Time'];
    if (requestTime) {
      const duration = Date.now() - parseInt(requestTime as string, 10);
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`);
    }
  }

  return response;
}

/**
 * Response error handler
 */
function responseErrorHandler(error: AxiosError): Promise<never> {
  const { response } = error;

  // Handle specific error codes
  if (response) {
    switch (response.status) {
      case 401:
        // Unauthorized - clear tokens and redirect to login
        removeTokens();
        if (typeof window !== 'undefined') {
          // Optionally redirect to login
          // window.location.href = '/login';
        }
        break;

      case 403:
        // Forbidden - user doesn't have permission
        console.error('[API] Access forbidden');
        break;

      case 404:
        // Not found
        console.error('[API] Resource not found');
        break;

      case 422:
        // Validation error
        console.error('[API] Validation error:', response.data);
        break;

      case 429:
        // Rate limited
        console.error('[API] Rate limited - too many requests');
        break;

      case 500:
      case 502:
      case 503:
        // Server error
        console.error('[API] Server error');
        break;

      default:
        console.error(`[API] Error ${response.status}:`, response.data);
    }
  } else if (error.request) {
    // Request made but no response received (network error)
    console.error('[API] Network error - no response received');
  } else {
    // Error setting up request
    console.error('[API] Request setup error:', error.message);
  }

  return Promise.reject(error);
}

/**
 * Setup interceptors on axios instance
 */
export function setupInterceptors(instance: AxiosInstance): void {
  // Request interceptors
  instance.interceptors.request.use(requestInterceptor, requestErrorHandler);

  // Response interceptors
  instance.interceptors.response.use(responseInterceptor, responseErrorHandler);
}
