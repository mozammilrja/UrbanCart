'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@urbancart/ui';
import { useAuthStore, useWishlistStore, type User } from '@urbancart/hooks';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Truck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import {
  Section,
  Container,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn, StaggerReveal } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { MagneticButton } from '@/components/motion/magnetic-button';

// Mock user data
const mockUser: User = {
  id: 'user-1',
  firstName: 'Rahul',
  lastName: 'Sharma',
  email: 'rahul@example.com',
  phone: '+91 98765 43210',
  role: 'customer',
};

// Mock orders
const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 7497,
    items: [
      {
        id: 'item-1',
        name: 'Urban Oversized Tee',
        quantity: 2,
        size: 'M',
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop',
      },
      {
        id: 'item-2',
        name: 'Street Drop Hoodie',
        quantity: 1,
        size: 'L',
        color: 'Navy',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=250&fit=crop',
      },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-10',
    status: 'In Transit',
    total: 2999,
    items: [
      {
        id: 'item-3',
        name: 'Classic Cargo Pants',
        quantity: 1,
        size: '32',
        color: 'Olive',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=250&fit=crop',
      },
    ],
  },
];

// Mock wishlist preview
const mockWishlistPreview = [
  {
    id: 'wish-1',
    productId: 'prod-1',
    name: 'Limited Edition Cap',
    price: 999,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=400&fit=crop',
  },
  {
    id: 'wish-2',
    productId: 'prod-2',
    name: 'Premium Sneakers',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop',
  },
  {
    id: 'wish-3',
    productId: 'prod-3',
    name: 'Graphic Print Tee',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const statusConfig: Record<string, { color: string; icon: typeof Package }> = {
  'Delivered': { color: 'text-emerald-400', icon: Package },
  'In Transit': { color: 'text-amber-400', icon: Truck },
  'Processing': { color: 'text-blue-400', icon: Clock },
};

interface NavItem {
  icon: typeof UserIcon;
  label: string;
  href: string;
  badge?: number;
}

export default function AccountPage() {
  const { user: authUser, logout, isAuthenticated } = useAuthStore();
  const wishlistItems = useWishlistStore((state) => state.items);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Use auth user if available, otherwise mock user
  const user = authUser || mockUser;
  const wishlistCount = isHydrated ? wishlistItems.length : 0;
  const displayWishlist = wishlistCount > 0 ? wishlistItems.slice(0, 3).map(item => ({
    id: item.id,
    productId: item.productId,
    name: item.name,
    price: item.price,
    image: item.image,
  })) : mockWishlistPreview;

  const navItems: NavItem[] = [
    { icon: Package, label: 'Orders', href: '/orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist', badge: wishlistCount || 5 },
    { icon: MapPin, label: 'Addresses', href: '/addresses' },
    { icon: UserIcon, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  // Calculate stats
  const totalOrders = mockOrders.length;
  const inTransit = mockOrders.filter(o => o.status === 'In Transit').length;

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        {/* Page Header */}
        <Section className="pt-32 pb-8">
          <Container>
            <FadeIn>
              {/* Breadcrumb */}
              <nav className="mb-8 text-sm">
                <Link href="/" className="text-white/40 transition-colors hover:text-white">
                  Home
                </Link>
                <span className="mx-3 text-white/20">/</span>
                <span className="text-white">My Account</span>
              </nav>
              
              {/* Welcome Header */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Welcome back
                  </p>
                  <h1 className="mt-2 text-3xl font-extralight tracking-tight text-white md:text-4xl lg:text-5xl">
                    Hi, <span className="font-medium">{user.firstName}</span>
                  </h1>
                  <p className="mt-2 text-white/50">
                    {user.email}
                  </p>
                </div>
                
                <MagneticButton>
                  <button
                    onClick={handleLogout}
                    className="group flex items-center gap-3 border border-white/20 px-6 py-3 text-sm uppercase tracking-widest text-white/60 transition-all hover:border-white/40 hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </MagneticButton>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Quick Stats */}
        <Section className="py-8">
          <Container>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <Link
                  href="/orders"
                  className="group border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <p className="text-3xl font-light text-white md:text-4xl">{totalOrders}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/40 group-hover:text-white/60">
                    Orders
                  </p>
                </Link>
                <Link
                  href="/orders?status=transit"
                  className="group border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <p className="text-3xl font-light text-amber-400 md:text-4xl">{inTransit}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/40 group-hover:text-white/60">
                    In Transit
                  </p>
                </Link>
                <Link
                  href="/wishlist"
                  className="group border border-white/10 bg-white/5 p-6 text-center transition-all hover:border-white/20 hover:bg-white/10"
                >
                  <p className="text-3xl font-light text-white md:text-4xl">{wishlistCount || 5}</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-white/40 group-hover:text-white/60">
                    Wishlist
                  </p>
                </Link>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Main Content */}
        <Section className="py-8">
          <Container>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <FadeIn delay={0.2}>
                  <div className="border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
                      Quick Links
                    </h3>
                    <nav className="space-y-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex items-center justify-between py-3 text-white/70 transition-colors hover:text-white"
                        >
                          <div className="flex items-center gap-4">
                            <item.icon className="h-4 w-4" />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                                {item.badge}
                              </span>
                            )}
                            <ChevronRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/60" />
                          </div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </FadeIn>
              </div>

              {/* Main Content Area */}
              <div className="space-y-8 lg:col-span-2">
                {/* Recent Orders */}
                <FadeIn delay={0.3}>
                  <div className="border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between border-b border-white/10 p-6">
                      <h3 className="text-lg font-light text-white">Recent Orders</h3>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
                      >
                        View All
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    
                    <div className="divide-y divide-white/10">
                      {mockOrders.map((order) => {
                        const status = statusConfig[order.status] || statusConfig['Processing'];
                        return (
                          <div key={order.id} className="p-6">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium text-white">{order.id}</p>
                                <p className="mt-1 text-xs text-white/40">{formatDate(order.date)}</p>
                              </div>
                              <div className={cn('flex items-center gap-2', status.color)}>
                                <status.icon className="h-3 w-3" />
                                <span className="text-xs uppercase tracking-widest">{order.status}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-4">
                              {order.items.slice(0, 2).map((item) => (
                                <div key={item.id} className="relative h-16 w-12 overflow-hidden bg-neutral-900">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <span className="text-xs text-white/40">
                                  +{order.items.length - 2} more
                                </span>
                              )}
                              <div className="ml-auto">
                                <p className="text-right text-sm text-white">
                                  {formatPrice(order.total)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex gap-4">
                              <Link
                                href={`/orders/${order.id}`}
                                className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white"
                              >
                                View Details
                              </Link>
                              {order.status === 'In Transit' && (
                                <Link
                                  href={`/orders/${order.id}/track`}
                                  className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white"
                                >
                                  Track Order
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </FadeIn>

                {/* Wishlist Preview */}
                <FadeIn delay={0.4}>
                  <div className="border border-white/10 bg-white/5">
                    <div className="flex items-center justify-between border-b border-white/10 p-6">
                      <h3 className="text-lg font-light text-white">Wishlist</h3>
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
                      >
                        View All
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 p-6">
                      <StaggerReveal stagger={0.05}>
                        {displayWishlist.map((item) => (
                          <Link
                            key={item.id}
                            href={`/product/${item.productId}`}
                            className="group"
                          >
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 33vw, 200px"
                              />
                              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                            </div>
                            <p className="mt-2 truncate text-sm text-white/70 group-hover:text-white">
                              {item.name}
                            </p>
                            <p className="text-sm text-white/50">
                              {formatPrice(item.price)}
                            </p>
                          </Link>
                        ))}
                      </StaggerReveal>
                    </div>
                  </div>
                </FadeIn>

                {/* Need Help Section */}
                <FadeIn delay={0.5}>
                  <div className="grid gap-4 border border-white/10 bg-white/5 p-6 md:grid-cols-2">
                    <div className="text-center md:text-left">
                      <ShoppingBag className="mx-auto mb-4 h-8 w-8 text-white/30 md:mx-0" />
                      <h4 className="text-sm font-medium text-white">Need Help?</h4>
                      <p className="mt-1 text-xs text-white/50">
                        Our support team is here to help you
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 md:justify-end">
                      <Link
                        href="/contact"
                        className="border border-white/20 px-6 py-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:border-white/40 hover:text-white"
                      >
                        Contact Us
                      </Link>
                      <Link
                        href="/faq"
                        className="border border-white/20 px-6 py-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:border-white/40 hover:text-white"
                      >
                        FAQs
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
}
