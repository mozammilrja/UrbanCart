/**
 * UrbanCart Account Mock Data
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  memberSince: string;
  tier: 'standard' | 'vip' | 'elite';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  category: string;
  inStock: boolean;
  addedAt: string;
}

export const mockUser: User = {
  id: 'user_001',
  email: 'rahul@email.com',
  firstName: 'Rahul',
  lastName: 'Sharma',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  memberSince: '2023-06-15',
  tier: 'vip',
};

export const mockOrders: Order[] = [
  {
    id: 'order_001',
    orderNumber: 'ORD-2026-001234',
    date: '2026-02-15T10:30:00Z',
    status: 'delivered',
    total: 7497,
    subtotal: 7497,
    shipping: 0,
    discount: 0,
    items: [
      {
        id: 'oi_001',
        productId: 'prod_001',
        name: 'Urban Oversized Tee',
        price: 1999,
        quantity: 2,
        size: 'M',
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=125&fit=crop',
      },
      {
        id: 'oi_002',
        productId: 'prod_002',
        name: 'Street Drop Hoodie',
        price: 3499,
        quantity: 1,
        size: 'L',
        color: 'Navy',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=125&fit=crop',
      },
    ],
    shippingAddress: {
      name: 'Rahul Sharma',
      address: '123 Urban Street, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
    },
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2026-02-18',
  },
  {
    id: 'order_002',
    orderNumber: 'ORD-2026-001189',
    date: '2026-02-10T14:20:00Z',
    status: 'shipped',
    total: 2999,
    subtotal: 2999,
    shipping: 0,
    discount: 0,
    items: [
      {
        id: 'oi_003',
        productId: 'prod_003',
        name: 'Classic Cargo Pants',
        price: 2999,
        quantity: 1,
        size: '32',
        color: 'Olive',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=100&h=125&fit=crop',
      },
    ],
    shippingAddress: {
      name: 'Rahul Sharma',
      address: '123 Urban Street, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
    },
    trackingNumber: 'TRK123456790',
    estimatedDelivery: '2026-02-14',
  },
  {
    id: 'order_003',
    orderNumber: 'ORD-2026-001045',
    date: '2026-01-28T09:15:00Z',
    status: 'delivered',
    total: 6998,
    subtotal: 6998,
    shipping: 0,
    discount: 0,
    items: [
      {
        id: 'oi_004',
        productId: 'prod_005',
        name: 'Premium Sneakers',
        price: 5999,
        quantity: 1,
        size: 'UK 9',
        color: 'White',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=125&fit=crop',
      },
      {
        id: 'oi_005',
        productId: 'prod_004',
        name: 'Limited Edition Cap',
        price: 999,
        quantity: 1,
        size: 'One Size',
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100&h=125&fit=crop',
      },
    ],
    shippingAddress: {
      name: 'Rahul Sharma',
      address: '123 Urban Street, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
    },
    trackingNumber: 'TRK123456788',
  },
  {
    id: 'order_004',
    orderNumber: 'ORD-2025-008765',
    date: '2025-12-20T16:45:00Z',
    status: 'delivered',
    total: 4999,
    subtotal: 4999,
    shipping: 0,
    discount: 0,
    items: [
      {
        id: 'oi_006',
        productId: 'prod_008',
        name: 'Vintage Denim Jacket',
        price: 4999,
        quantity: 1,
        size: 'L',
        color: 'Blue',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=125&fit=crop',
      },
    ],
    shippingAddress: {
      name: 'Rahul Sharma',
      address: '456 Fashion Avenue',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
    },
    trackingNumber: 'TRK123456777',
  },
];

export const mockWishlist: WishlistItem[] = [
  {
    id: 'wish_001',
    productId: 'prod_010',
    name: 'Varsity Jacket',
    price: 7499,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    slug: 'varsity-jacket-10',
    category: 'Jackets',
    inStock: true,
    addedAt: '2026-02-20T10:00:00Z',
  },
  {
    id: 'wish_002',
    productId: 'prod_015',
    name: 'Tech Fleece Hoodie',
    price: 4999,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    slug: 'tech-fleece-hoodie-15',
    category: 'Hoodies',
    inStock: true,
    addedAt: '2026-02-18T14:30:00Z',
  },
  {
    id: 'wish_003',
    productId: 'prod_022',
    name: 'Premium Sneakers',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    slug: 'premium-sneakers-22',
    category: 'Footwear',
    inStock: false,
    addedAt: '2026-02-15T09:00:00Z',
  },
  {
    id: 'wish_004',
    productId: 'prod_030',
    name: 'Crossbody Bag',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=500&fit=crop',
    slug: 'crossbody-bag-30',
    category: 'Accessories',
    inStock: true,
    addedAt: '2026-02-10T11:45:00Z',
  },
];

export function getOrderById(orderId: string): Order | undefined {
  return mockOrders.find(o => o.id === orderId || o.orderNumber === orderId);
}

export function getRecentOrders(limit = 5): Order[] {
  return [...mockOrders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
