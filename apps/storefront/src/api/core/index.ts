/**
 * API Core Module
 * Exports API client, endpoints, and interceptors
 */

export { apiClient, createClient, API_BASE_URL, API_TIMEOUT } from './client';
export type { ApiResponse, PaginatedResponse, ApiError } from './client';
export { ENDPOINTS } from './endpoints';
export type { EndpointKey } from './endpoints';
export { setupInterceptors } from './interceptors';
