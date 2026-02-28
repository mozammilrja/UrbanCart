import apiClient from '../core/client';
import { ENDPOINTS } from '../core/endpoints';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const cartService = {
  get: async (): Promise<Cart> => {
    return apiClient.get<Cart>(ENDPOINTS.CART.GET);
  },

  addItem: async (productId: string, quantity: number, options?: { size?: string; color?: string }): Promise<Cart> => {
    return apiClient.post<Cart>(ENDPOINTS.CART.ADD, {
      productId,
      quantity,
      ...options,
    });
  },

  updateItem: async (itemId: string, quantity: number): Promise<Cart> => {
    return apiClient.put<Cart>(ENDPOINTS.CART.UPDATE, {
      itemId,
      quantity,
    });
  },

  removeItem: async (itemId: string): Promise<Cart> => {
    return apiClient.delete<Cart>(`${ENDPOINTS.CART.REMOVE}/${itemId}`);
  },

  clear: async (): Promise<void> => {
    return apiClient.post<void>(ENDPOINTS.CART.CLEAR);
  },
};

export default cartService;
