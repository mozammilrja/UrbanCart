/**
 * Orders Service
 * API calls for order management
 */

import { apiClient } from '../core/client';
import { ENDPOINTS } from '../core/endpoints';
import type { ApiResponse, PaginatedResponse } from '../core/client';
import type { Product } from '@/types';

// Order status enum
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// Payment status enum
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// Order item
export interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

// Address type
export interface Address {
  _id?: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

// Order type
export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

// Order tracking event
export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

// Order tracking info
export interface OrderTracking {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: OrderStatus;
  estimatedDelivery: string;
  events: TrackingEvent[];
}

// Create order request
export interface CreateOrderRequest {
  shippingAddressId: string;
  billingAddressId?: string;
  paymentMethod: string;
  notes?: string;
}

// Order filters
export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
}

/**
 * Get user orders
 */
export async function getOrders(
  filters: OrderFilters = {}
): Promise<PaginatedResponse<Order>> {
  const response = await apiClient.get<PaginatedResponse<Order>>(
    ENDPOINTS.ORDERS.LIST,
    { params: filters }
  );
  return response.data;
}

/**
 * Get order by ID
 */
export async function getOrderById(id: string): Promise<Order> {
  const response = await apiClient.get<ApiResponse<Order>>(
    ENDPOINTS.ORDERS.DETAIL(id)
  );
  return response.data.data;
}

/**
 * Create new order
 */
export async function createOrder(data: CreateOrderRequest): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>(
    ENDPOINTS.ORDERS.CREATE,
    data
  );
  return response.data.data;
}

/**
 * Cancel order
 */
export async function cancelOrder(id: string, reason?: string): Promise<Order> {
  const response = await apiClient.post<ApiResponse<Order>>(
    ENDPOINTS.ORDERS.CANCEL(id),
    { reason }
  );
  return response.data.data;
}

/**
 * Track order
 */
export async function trackOrder(id: string): Promise<OrderTracking> {
  const response = await apiClient.get<ApiResponse<OrderTracking>>(
    ENDPOINTS.ORDERS.TRACK(id)
  );
  return response.data.data;
}

// Export service object
export const ordersService = {
  getAll: getOrders,
  getById: getOrderById,
  create: createOrder,
  cancel: cancelOrder,
  track: trackOrder,
};
