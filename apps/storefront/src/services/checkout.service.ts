/**
 * UrbanCart Checkout Service
 */

import {
  ShippingAddress,
  PaymentMethod,
  savedAddresses,
  paymentMethods,
  simulateDelay,
} from '@/mock';
import { cartService } from './cart.service';

const DATA_MODE = process.env.NEXT_PUBLIC_DATA_MODE || 'MOCK';

export interface CheckoutData {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod['type'];
  saveAddress?: boolean;
}

export interface OrderConfirmation {
  orderId: string;
  orderNumber: string;
  total: number;
  estimatedDelivery: string;
  shippingAddress: ShippingAddress;
}

export const checkoutService = {
  /**
   * Get saved addresses
   */
  async getAddresses(): Promise<ShippingAddress[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      return savedAddresses;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Get available payment methods
   */
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(200);
      return paymentMethods;
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Validate shipping address
   */
  async validateAddress(address: Partial<ShippingAddress>): Promise<{ valid: boolean; errors?: Record<string, string> }> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      
      const errors: Record<string, string> = {};
      
      if (!address.firstName?.trim()) errors.firstName = 'First name is required';
      if (!address.lastName?.trim()) errors.lastName = 'Last name is required';
      if (!address.phone?.trim()) errors.phone = 'Phone number is required';
      if (!address.email?.trim()) errors.email = 'Email is required';
      if (!address.address?.trim()) errors.address = 'Address is required';
      if (!address.city?.trim()) errors.city = 'City is required';
      if (!address.state?.trim()) errors.state = 'State is required';
      if (!address.pincode?.trim()) errors.pincode = 'Pincode is required';
      if (address.pincode && !/^\d{6}$/.test(address.pincode)) errors.pincode = 'Invalid pincode';

      return {
        valid: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : undefined,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Calculate shipping cost
   */
  async calculateShipping(pincode: string): Promise<{ cost: number; estimatedDays: number }> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(300);
      
      // Simulate shipping calculation based on pincode
      const firstDigit = parseInt(pincode[0]);
      const isMetro = ['1', '4', '5', '6'].includes(pincode[0]); // Mumbai, Bangalore, Chennai, Kolkata
      
      return {
        cost: isMetro ? 0 : 149,
        estimatedDays: isMetro ? 2 : 5,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Place order
   */
  async placeOrder(checkoutData: CheckoutData): Promise<OrderConfirmation> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(2000); // Simulate payment processing
      
      const cart = await cartService.getCart();
      
      // Generate order info
      const orderId = `order_${Date.now()}`;
      const orderNumber = `ORD-2026-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
      
      // Calculate estimated delivery
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + (checkoutData.paymentMethod === 'cod' ? 5 : 3));

      // Clear cart after successful order
      await cartService.clearCart();

      return {
        orderId,
        orderNumber,
        total: cart.total,
        estimatedDelivery: deliveryDate.toISOString().split('T')[0],
        shippingAddress: checkoutData.shippingAddress,
      };
    }

    throw new Error('API mode not implemented');
  },

  /**
   * Verify payment (for UPI/Card)
   */
  async verifyPayment(paymentId: string): Promise<{ verified: boolean }> {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(1000);
      return { verified: true };
    }

    throw new Error('API mode not implemented');
  },
};
