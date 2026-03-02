'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@urbancart/ui';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  Edit,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';

const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 7497,
    items: [
      { name: 'Urban Oversized Tee', quantity: 2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=100&fit=crop' },
      { name: 'Street Drop Hoodie', quantity: 1, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=80&h=100&fit=crop' },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-10',
    status: 'Shipped',
    total: 2999,
    items: [
      { name: 'Classic Cargo Pants', quantity: 1, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=80&h=100&fit=crop' },
    ],
  },
];

const wishlistItems = [
  {
    id: '1',
    name: 'Limited Edition Cap',
    price: 999,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=250&fit=crop',
  },
  {
    id: '2',
    name: 'Premium Sneakers',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=250&fit=crop',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const statusColors: Record<string, 'success' | 'warning' | 'secondary'> = {
  Delivered: 'success',
  Shipped: 'warning',
  Processing: 'secondary',
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">My Account</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" />
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-lg font-semibold">Rahul Sharma</h2>
                <p className="text-sm text-muted-foreground">rahul@email.com</p>
                <Badge className="mt-2" variant="secondary">VIP Member</Badge>
              </div>
              <Separator className="my-6" />
              <nav className="space-y-1">
                {[
                  { icon: User, label: 'Overview', value: 'overview' },
                  { icon: Package, label: 'Orders', value: 'orders' },
                  { icon: Heart, label: 'Wishlist', value: 'wishlist' },
                  { icon: MapPin, label: 'Addresses', value: 'addresses' },
                  { icon: CreditCard, label: 'Payment Methods', value: 'payment' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setActiveTab(item.value)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      activeTab === item.value
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                ))}
                <Separator className="my-2" />
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Account Information</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">Rahul Sharma</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">rahul@email.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">June 2023</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {orders.slice(0, 2).map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b py-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="relative h-12 w-10 overflow-hidden rounded border bg-muted">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} items · {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                      <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'orders' && (
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                      </div>
                      <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="relative h-16 w-12 overflow-hidden rounded bg-muted">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">Total: {formatPrice(order.total)}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Track Order</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'wishlist' && (
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                      <div className="relative h-24 w-20 overflow-hidden rounded bg-muted">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link href={`/product/${item.id}`} className="font-medium hover:text-accent">
                            {item.name}
                          </Link>
                          <p className="mt-1 font-semibold">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Add to Cart</Button>
                          <Button size="sm" variant="outline">Remove</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'addresses' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Saved Addresses</CardTitle>
                <Button size="sm">Add New Address</Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge>Default</Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-medium">Home</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Rahul Sharma<br />
                      123 Fashion Street<br />
                      Mumbai, Maharashtra 400001<br />
                      +91 98765 43210
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span></span>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-medium">Office</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Rahul Sharma<br />
                      456 Business Park<br />
                      Mumbai, Maharashtra 400051<br />
                      +91 98765 43210
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'payment' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Payment Methods</CardTitle>
                <Button size="sm">Add New Card</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 1234</p>
                        <p className="text-sm text-muted-foreground">Expires 06/24</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Remove</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
