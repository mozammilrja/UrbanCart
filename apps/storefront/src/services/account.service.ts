/**
 * UrbanCart Account Service
 */

import {
  User,
  Order,
  WishlistItem,
  mockUser,
  mockOrders,
  mockWishlist,
  getOrderById as getMockOrderById,
  getRecentOrders as getMockRecentOrders,
  simulateDelay,
} from '@/mock';

const DATA_MODE = process.env.NEXT_PUBLIC_DATA_MODE || 'MOCK';

// In-memory state for mock mode
let currentUser: User | null = mockUser;
let userWishlist: WishlistItem[] = [...mockWishlist];

export const accountService = {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<User | null> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return currentUser;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(500);
      
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      currentUser = { ...currentUser, ...updates };
      return currentUser;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get user orders
   */
  async getOrders(page = 1, limit = 10): Promise<{ orders: Order[]; total: number }> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      
      const startIndex = (page - 1) * limit;
      const orders = mockOrders.slice(startIndex, startIndex + limit);
      
      return {
        orders,
        total: mockOrders.length,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get single order by ID or order number
   */
  async getOrder(orderId: string): Promise<Order | null> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return getMockOrderById(orderId) || null;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get recent orders for dashboard
   */
  async getRecentOrders(limit = 5): Promise<Order[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return getMockRecentOrders(limit);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get wishlist items
   */
  async getWishlist(): Promise<WishlistItem[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return userWishlist;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Add item to wishlist
   */
  async addToWishlist(item: Omit<WishlistItem, 'id' | 'addedAt'>): Promise<WishlistItem[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      
      const exists = userWishlist.some(i => i.productId === item.productId);
      if (!exists) {
        userWishlist.push({
          ...item,
          id: `wish_${Date.now()}`,
          addedAt: new Date().toISOString(),
        });
      }
      
      return userWishlist;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Remove item from wishlist
   */
  async removeFromWishlist(productId: string): Promise<WishlistItem[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      userWishlist = userWishlist.filter(i => i.productId !== productId);
      return userWishlist;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Clear entire wishlist
   */
  async clearWishlist(): Promise<WishlistItem[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(200);
      userWishlist = [];
      return userWishlist;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Check if product is in wishlist
   */
  async isInWishlist(productId: string): Promise<boolean> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(100);
      return userWishlist.some(i => i.productId === productId);
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Track order shipment
   */
  async trackOrder(orderNumber: string): Promise<{
    status: string;
    timeline: Array<{ status: string; date: string; location?: string }>;
  }> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(500);
      
      const order = getMockOrderById(orderNumber);
      if (!order) {
        throw new Error('Order not found');
      }

      const timeline = [
        { status: 'Order Placed', date: order.date, location: 'Online' },
        { status: 'Payment Confirmed', date: order.date, location: 'Online' },
      ];

      if (order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered') {
        timeline.push({ status: 'Order Processing', date: order.date, location: 'Mumbai Warehouse' });
      }

      if (order.status === 'shipped' || order.status === 'delivered') {
        timeline.push({ status: 'Shipped', date: order.date, location: 'In Transit' });
      }

      if (order.status === 'delivered') {
        timeline.push({ status: 'Delivered', date: order.estimatedDelivery || order.date, location: 'Your Address' });
      }

      return {
        status: order.status,
        timeline,
      };
    }

    throw new Error('API mode not implemented');
  },
};
