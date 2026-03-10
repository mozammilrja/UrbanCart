'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CheckCircle, Package, Truck, MapPin, ChevronRight, Mail, Phone } from 'lucide-react';
import type { CartItem } from '@/stores/cart.store';

interface OrderData {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

// Default data for direct page access (fallback)
const defaultOrderData: OrderData = {
  orderId: 'APO-DEMO001',
  orderDate: new Date().toISOString(),
  items: [],
  subtotal: 0,
  shipping: 0,
  total: 0,
};

export default function CheckoutConfirmationPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Try to get order data from sessionStorage
    const storedOrder = sessionStorage.getItem('lastOrder');
    if (storedOrder) {
      try {
        const parsed = JSON.parse(storedOrder);
        setOrderData(parsed);
        // Clear after reading
        sessionStorage.removeItem('lastOrder');
      } catch {
        setOrderData(defaultOrderData);
      }
    } else {
      // No order data - user might have accessed directly
      setOrderData(defaultOrderData);
    }
  }, []);

  if (!isMounted || !orderData) {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-[#111] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getEstimatedDelivery = () => {
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 5);
    const deliveryEnd = new Date();
    deliveryEnd.setDate(deliveryEnd.getDate() + 7);
    return `${formatDate(delivery.toISOString())} - ${formatDate(deliveryEnd.toISOString())}`;
  };

  // If no items, show a different message
  if (orderData.items.length === 0) {
    return (
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-light tracking-tight mb-2">Order Confirmed!</h1>
          <p className="text-[#666] mb-8">Thank you for shopping with APOSTLE</p>
          <p className="text-sm text-[#666] mb-8">
            Your order has been placed. Check your email for order details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account/orders"
              className="px-8 py-4 bg-[#111] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors"
            >
              View Orders
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/collections"
              className="px-8 py-4 border border-[#e5e5e5] rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#f9f9f9] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-light tracking-tight mb-2">Order Confirmed!</h1>
          <p className="text-[#666]">Thank you for shopping with APOSTLE</p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden mb-6">
          <div className="p-6 sm:p-8 border-b border-[#e5e5e5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[#666]">Order number</p>
                <p className="text-xl font-medium">{orderData.orderId}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-[#666]">Order date</p>
                <p className="font-medium">{formatDate(orderData.orderDate)}</p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="p-6 sm:p-8 bg-[#fafafa]">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-8 bg-[#e5e5e5]" />
              </div>
              <div>
                <p className="font-medium">Order Placed</p>
                <p className="text-sm text-[#666]">{formatDate(orderData.orderDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#e5e5e5] rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#999]" />
                </div>
                <div className="w-0.5 h-8 bg-[#e5e5e5]" />
              </div>
              <div>
                <p className="font-medium text-[#666]">Processing</p>
                <p className="text-sm text-[#999]">Preparing your order</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-[#e5e5e5] rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#999]" />
                </div>
                <div className="w-0.5 h-8 bg-[#e5e5e5]" />
              </div>
              <div>
                <p className="font-medium text-[#666]">Shipped</p>
                <p className="text-sm text-[#999]">On the way to you</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#e5e5e5] rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#999]" />
              </div>
              <div>
                <p className="font-medium text-[#666]">Delivered</p>
                <p className="text-sm text-[#999]">Est. {getEstimatedDelivery()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-medium mb-6">Order Items</h2>
          <div className="space-y-4">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-24 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-[#666]">{item.color.name} / {item.size}</p>
                  <p className="text-sm text-[#666]">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e5e5e5] mt-6 pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Subtotal</span>
              <span>₹{orderData.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Shipping</span>
              <span>{orderData.shipping === 0 ? 'Free' : `₹${orderData.shipping}`}</span>
            </div>
            <div className="flex justify-between text-base font-medium pt-3 border-t border-[#e5e5e5]">
              <span>Total</span>
              <span>₹{orderData.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Confirmation Email */}
        <div className="bg-[#f5f5f5] rounded-2xl p-6 text-center mb-10">
          <Mail className="w-8 h-8 text-[#666] mx-auto mb-3" />
          <p className="text-sm text-[#666]">
            A confirmation email will be sent to your registered email address.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/account/orders"
            className="px-8 py-4 bg-[#111] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors"
          >
            Track Order
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/collections"
            className="px-8 py-4 border border-[#e5e5e5] rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#f9f9f9] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Support */}
        <div className="text-center mt-10 pt-10 border-t border-[#e5e5e5]">
          <p className="text-sm text-[#666] mb-4">Need help with your order?</p>
          <div className="flex items-center justify-center gap-6">
            <a href="mailto:support@apostle.in" className="flex items-center gap-2 text-sm text-[#111] hover:underline">
              <Mail className="w-4 h-4" />
              support@apostle.in
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-[#111] hover:underline">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
