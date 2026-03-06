/**
 * API Client Configuration
 * Axios instance with interceptors
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { setupInterceptors } from './interceptors';

// Environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_TIMEOUT = 30000; // 30 seconds

/**
 * Default Axios configuration
 */
const defaultConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // For cookie-based auth
};

/**
 * Create and configure Axios instance
 */
function createApiClient(): AxiosInstance {
  const instance = axios.create(defaultConfig);
  setupInterceptors(instance);
  return instance;
}

/**
 * Main API client instance
 */
export const apiClient = createApiClient();

/**
 * Create a new API client with custom config
 */
export function createClient(config?: AxiosRequestConfig): AxiosInstance {
  const instance = axios.create({
    ...defaultConfig,
    ...config,
  });
  setupInterceptors(instance);
  return instance;
}

/**
 * API Response wrapper type
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * API Error type
 */
export interface ApiError {
  message: string;
  code?: string;
  status: number;
  errors?: Record<string, string[]>;
}

export { API_BASE_URL, API_TIMEOUT };
