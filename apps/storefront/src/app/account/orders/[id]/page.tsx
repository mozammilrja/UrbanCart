'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Phone,
  HelpCircle,
  RotateCcw,
  MessageCircle,
  XCircle
} from 'lucide-react';
import { useOrderStore, selectOrders, type Order } from '@/stores/order.store';

type OrderStatus = Order['status'];

interface TimelineStep {
  status: string;
  label: string;
  description: string;
  timestamp?: string;
  isComplete: boolean;
  isCurrent: boolean;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Delivered': return 'bg-green-100 text-green-800';
    case 'Processing': return 'bg-blue-100 text-blue-800';
    case 'Shipped': return 'bg-purple-100 text-purple-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getOrderTimeline(status: OrderStatus, createdAt: string): TimelineStep[] {
  const statusOrder: OrderStatus[] = ['Processing', 'Shipped', 'Delivered'];
  const currentIndex = statusOrder.indexOf(status);
  
  const steps: TimelineStep[] = [
    {
      status: 'Processing',
      label: 'Order Placed',
      description: 'We have received your order',
      timestamp: createdAt,
      isComplete: currentIndex >= 0,
      isCurrent: currentIndex === 0,
    },
    {
      status: 'Shipped',
      label: 'Shipped',
      description: 'Package is on the way',
      timestamp: currentIndex >= 1 ? new Date(new Date(createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString() : undefined,
      isComplete: currentIndex >= 1,
      isCurrent: currentIndex === 1,
    },
    {
      status: 'Delivered',
      label: 'Delivered',
      description: 'Package has been delivered',
      timestamp: currentIndex >= 2 ? new Date(new Date(createdAt).getTime() + 72 * 60 * 60 * 1000).toISOString() : undefined,
      isComplete: currentIndex >= 2,
      isCurrent: currentIndex === 2,
    },
  ];

  return steps;
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);
  const orders = useOrderStore(selectOrders);
  
  useEffect(() => {
    useOrderStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  const order = orders.find(o => o.id === orderId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isMounted) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="animate-pulse">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-10 bg-neutral-200 rounded-lg" />
              <div className="h-8 w-48 bg-neutral-200 rounded" />
            </div>
            <div className="h-64 bg-neutral-200 rounded-2xl mb-6" />
            <div className="h-48 bg-neutral-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-[#ccc] mb-4" />
            <h2 className="text-xl font-semibold mb-2">Order not found</h2>
            <p className="text-[#777] mb-6">We couldn&apos;t find this order in your history.</p>
            <Link
              href="/account/orders"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const timeline = order.status === 'Cancelled' 
    ? [] 
    : getOrderTimeline(order.status, order.createdAt);
  
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/account/orders" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{order.id}</h1>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-[#777] mt-1">Placed on {formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            {order.status !== 'Cancelled' && timeline.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6">
                <h2 className="text-lg font-semibold mb-6">Order Status</h2>
                <div className="relative">
                  {timeline.map((step, index) => (
                    <div key={step.status} className="relative flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          step.isComplete 
                            ? 'bg-green-500 text-white' 
                            : 'bg-[#f5f5f5] text-[#999]'
                        }`}>
                          {step.isComplete ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className={`w-0.5 h-16 ${
                            timeline[index + 1].isComplete 
                              ? 'bg-green-500' 
                              : 'bg-[#e5e5e5]'
                          }`} />
                        )}
                      </div>
                      <div className="pt-1 pb-8">
                        <p className={`font-medium ${step.isComplete ? 'text-black' : 'text-[#999]'}`}>
                          {step.label}
                        </p>
                        <p className="text-sm text-[#777]">{step.description}</p>
                        {step.timestamp && (
                          <p className="text-xs text-[#999] mt-1">{formatDateTime(step.timestamp)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancelled Order Message */}
            {order.status === 'Cancelled' && (
              <div className="bg-red-50 rounded-2xl shadow-sm border border-red-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800">Order Cancelled</h3>
                    <p className="text-sm text-red-700 mt-1">
                      This order was cancelled. If you made a payment, it will be refunded within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
              <div className="p-6 border-b border-[#e5e5e5]">
                <h2 className="text-lg font-semibold">Order Items ({itemCount})</h2>
              </div>
              <div className="divide-y divide-[#e5e5e5]">
                {order.items.map((item) => {
                  const imageUrl = item.product?.images?.[0];
                  return (
                    <div key={item.id} className="flex gap-4 p-6">
                      <div className="w-20 h-20 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.product?.name || 'Product'}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-[#ccc]" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.product?.name || 'Product'}</p>
                        <p className="text-sm text-[#777] mt-0.5">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && ' • '}
                          {item.color && `Color: ${typeof item.color === 'string' ? item.color : item.color?.name || ''}`}
                        </p>
                        <p className="text-sm text-[#777]">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-[#777]">₹{item.price.toLocaleString()} each</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#777]">Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777]">Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping.toLocaleString()}`}</span>
                </div>
                <div className="border-t border-[#e5e5e5] pt-3 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#e5e5e5]">
                <p className="text-sm text-[#777]">Payment Method</p>
                <p className="font-medium">{order.paymentMethod || 'Online Payment'}</p>
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#777]" />
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                </div>
                <div className="text-sm">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p className="text-[#777] mt-1">{order.shippingAddress.address}</p>
                  <p className="text-[#777]">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                  </p>
                  {order.shippingAddress.phone && (
                    <div className="flex items-center gap-2 mt-3 text-[#777]">
                      <Phone className="w-4 h-4" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Help Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6">
              <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
              <div className="space-y-3">
                <button className="flex items-center gap-3 w-full py-3 px-4 text-left rounded-lg hover:bg-[#f5f5f5] transition-colors">
                  <HelpCircle className="w-5 h-5 text-[#777]" />
                  <span className="text-sm">Order Issues</span>
                </button>
                {order.status === 'Delivered' && (
                  <button className="flex items-center gap-3 w-full py-3 px-4 text-left rounded-lg hover:bg-[#f5f5f5] transition-colors">
                    <RotateCcw className="w-5 h-5 text-[#777]" />
                    <span className="text-sm">Return or Exchange</span>
                  </button>
                )}
                <button className="flex items-center gap-3 w-full py-3 px-4 text-left rounded-lg hover:bg-[#f5f5f5] transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#777]" />
                  <span className="text-sm">Contact Support</span>
                </button>
              </div>
            </div>

            {/* Reorder Button */}
            {order.status === 'Delivered' && (
              <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors font-medium">
                Reorder Items
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
