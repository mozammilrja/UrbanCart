import apiClient from '../core/client';
import { ENDPOINTS } from '../core/endpoints';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

export const ordersService = {
  getAll: async (): Promise<Order[]> => {
    return apiClient.get<Order[]>(ENDPOINTS.ORDERS.LIST);
  },

  getById: async (id: string): Promise<Order> => {
    return apiClient.get<Order>(ENDPOINTS.ORDERS.DETAIL(id));
  },

  create: async (data: CreateOrderData): Promise<Order> => {
    return apiClient.post<Order>(ENDPOINTS.ORDERS.CREATE, data);
  },
};

export default ordersService;
