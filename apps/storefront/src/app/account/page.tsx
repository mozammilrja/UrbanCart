'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Gift,
  Shield,
  Clock,
  Edit2,
} from 'lucide-react';
import { products } from '@/data/mock';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  memberSince: 'March 2024',
  loyaltyPoints: 2450,
  tier: 'Gold',
};

const recentOrders = [
  {
    id: 'ORD-2024-001',
    date: '28 Feb 2024',
    status: 'Delivered',
    total: 4999,
    items: 2,
    productIndex: 0,
  },
  {
    id: 'ORD-2024-002',
    date: '15 Feb 2024',
    status: 'Processing',
    total: 2499,
    items: 1,
    productIndex: 1,
  },
];

const menuItems = [
  { icon: Package, label: 'My Orders', href: '/account/orders', description: "Track, return, or buy again" },
  { icon: Heart, label: 'Wishlist', href: '/wishlist', description: "Items you've saved" },
  { icon: MapPin, label: 'Addresses', href: '/account/addresses', description: 'Manage delivery addresses' },
  { icon: CreditCard, label: 'Payment Methods', href: '/account/payments', description: 'Saved cards & UPI' },
  { icon: Bell, label: 'Notifications', href: '/account/notifications', description: 'Manage alerts & updates' },
  { icon: Gift, label: 'Rewards & Offers', href: '/account/rewards', description: 'Your exclusive benefits' },
  { icon: Shield, label: 'Privacy & Security', href: '/account/security', description: 'Password & preferences' },
  { icon: Settings, label: 'Account Settings', href: '/account/settings', description: 'Edit profile & preferences' },
];

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function AccountPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gradient-to-br from-[#111] to-[#333] ring-4 ring-white shadow-lg flex items-center justify-center">
                <User className="w-12 h-12 md:w-14 md:h-14 text-white/80" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-md hover:bg-black/80 transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{user.name}</h1>
                  <p className="text-[#777] mt-1">{user.email}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-[#777]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Member since {user.memberSince}
                    </span>
                    <span className="hidden md:block">•</span>
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4" />
                      {user.tier} Member
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#111] to-[#333] text-white rounded-xl p-4 min-w-[180px] shadow-lg border border-white/10">
                  <p className="text-xs uppercase tracking-wider text-white/70">Loyalty Points</p>
                  <p className="text-3xl font-bold mt-1">{user.loyaltyPoints.toLocaleString()}</p>
                  <p className="text-xs mt-2 text-white/70">{user.tier} Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-[#e5e5e5]">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <Link
                  href="/account/orders"
                  className="text-sm font-medium text-[#777] hover:text-[#111] transition-colors flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="divide-y divide-[#e5e5e5]">
                  {recentOrders.map((order) => {
                    const product = products[order.productIndex];
                    return (
                      <Link
                        key={order.id}
                        href={"/account/orders/" + order.id}
                        className="flex items-center gap-4 p-6 hover:bg-[#fafafa] transition-colors group"
                      >
                        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                          {product?.images?.[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#111] to-[#333]">
                              <Package className="w-8 h-8 text-white/80" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{order.id}</p>
                            <span className={"px-2 py-0.5 text-xs font-medium rounded-full " + getStatusColor(order.status)}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-[#777] mt-1">{order.items} item{order.items > 1 ? 's' : ''} • {order.date}</p>
                          <p className="text-sm font-medium mt-1">₹{order.total.toLocaleString()}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#ccc] group-hover:text-[#111] transition-colors flex-shrink-0" />
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

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
              <h2 className="text-lg font-semibold p-6 border-b border-[#e5e5e5]">Quick Actions</h2>
              <div className="divide-y divide-[#e5e5e5]">
                {menuItems.slice(0, 4).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 hover:bg-[#fafafa] transition-colors group"
                  >
                    <div className="w-10 h-10 bg-[#f5f5f5] rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-[#999] truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#ccc] group-hover:text-[#111] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-6">Account Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-white rounded-xl border border-[#e5e5e5] p-6 hover:shadow-md hover:border-[#111] transition-all group"
              >
                <div className="w-12 h-12 bg-[#f5f5f5] rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium">{item.label}</h3>
                <p className="text-sm text-[#777] mt-1">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setIsLoggingOut(true)}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  );
}
