'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ChevronRight, ArrowLeft, Filter, Search } from 'lucide-react';
import { useOrderStore, selectOrders } from '@/stores/order.store';

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'processing': return 'bg-blue-100 text-blue-800';
    case 'shipped': return 'bg-purple-100 text-purple-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default function OrdersPage() {
  const [isMounted, setIsMounted] = useState(false);
  const orders = useOrderStore(selectOrders);
  
  // Handle hydration
  useEffect(() => {
    useOrderStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">My Orders</h1>
            <p className="text-[#777] mt-1">{isMounted ? orders.length : '...'} orders</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
          {!isMounted ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 mx-auto bg-neutral-100 rounded-full animate-pulse mb-4" />
              <div className="h-4 w-32 mx-auto bg-neutral-100 rounded animate-pulse" />
            </div>
          ) : orders.length > 0 ? (
            <div className="divide-y divide-[#e5e5e5]">
              {orders.map((order) => {
                const firstItem = order.items[0];
                const imageUrl = firstItem?.product?.images?.[0];
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                return (
                  <Link key={order.id} href={"/account/orders/" + order.id} className="flex items-center gap-4 p-6 hover:bg-[#fafafa] transition-colors group">
                    <div className="w-20 h-20 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={firstItem?.product?.name || 'Order item'} width={80} height={80} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Package className="w-8 h-8 text-[#ccc]" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{order.id}</p>
                        <span className={"px-2 py-0.5 text-xs font-medium rounded-full " + getStatusColor(order.status)}>{order.status}</span>
                      </div>
                      <p className="text-sm text-[#777] mt-1">{itemCount} item{itemCount > 1 ? 's' : ''} • {formatDate(order.createdAt)}</p>
                      <p className="text-sm font-medium mt-1">₹{order.total.toLocaleString()}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#ccc] group-hover:text-[#111] transition-colors" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 mx-auto text-[#ccc] mb-4" />
              <p className="text-[#777]">No orders yet</p>
              <Link
                href="/collections"
                className="inline-block mt-4 text-sm font-medium text-black hover:underline"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
