/**
 * Order Store
 * Order history state management with Zustand
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product, ProductColor } from '@/types';

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: ProductColor;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  orders: Order[];
}

interface OrderActions {
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrder: (orderId: string) => Order | undefined;
  clearOrders: () => void;
}

type OrderStore = OrderState & OrderActions;

const initialState: OrderState = {
  orders: [],
};

// Generate order ID
function generateOrderId(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: generateOrderId(),
          status: 'Processing',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({
          orders: [newOrder, ...get().orders],
        });

        return newOrder;
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          ),
        });
      },

      getOrder: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      clearOrders: () => {
        set({ orders: [] });
      },
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

// Selectors
export const selectOrders = (state: OrderStore) => state.orders;
export const selectRecentOrders = (state: OrderStore) => state.orders.slice(0, 5);
export const selectOrderCount = (state: OrderStore) => state.orders.length;
