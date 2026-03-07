'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Package, ChevronRight, ArrowLeft, Filter, Search } from 'lucide-react';
import { products } from '@/data/mock';

const orders = [
  { id: 'ORD-2024-001', date: '28 Feb 2024', status: 'Delivered', total: 4999, items: 2, productIndex: 0 },
  { id: 'ORD-2024-002', date: '15 Feb 2024', status: 'Processing', total: 2499, items: 1, productIndex: 1 },
  { id: 'ORD-2024-003', date: '02 Feb 2024', status: 'Shipped', total: 8200, items: 3, productIndex: 2 },
  { id: 'ORD-2024-004', date: '18 Jan 2024', status: 'Delivered', total: 5800, items: 1, productIndex: 3 },
];

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
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/account" className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">My Orders</h1>
            <p className="text-[#777] mt-1">{orders.length} orders</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
          <div className="divide-y divide-[#e5e5e5]">
            {orders.map((order) => {
              const product = products[order.productIndex];
              return (
                <Link key={order.id} href={"/account/orders/" + order.id} className="flex items-center gap-4 p-6 hover:bg-[#fafafa] transition-colors group">
                  <div className="w-20 h-20 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                    {product?.images?.[0] ? (
                      <Image src={product.images[0]} alt={product.name} width={80} height={80} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Package className="w-8 h-8 text-[#ccc]" /></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{order.id}</p>
                      <span className={"px-2 py-0.5 text-xs font-medium rounded-full " + getStatusColor(order.status)}>{order.status}</span>
                    </div>
                    <p className="text-sm text-[#777] mt-1">{order.items} item{order.items > 1 ? 's' : ''} • {order.date}</p>
                    <p className="text-sm font-medium mt-1">₹{order.total.toLocaleString()}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#ccc] group-hover:text-[#111] transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
