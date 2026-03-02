// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;
  currency?: string;
  sku?: string;
  barcode?: string;
  status?: 'active' | 'draft' | 'archived';
  category: Category;
  subcategory?: Category;
  categoryId?: string;
  tags: string[];
  images: ProductImage[];
  featuredImage?: string;
  variants: ProductVariant[];
  options?: VariantOption[];
  inventory: {
    trackQuantity?: boolean;
    trackInventory?: boolean;
    quantity: number;
    continueSellingWhenOut?: boolean;
    lowStockThreshold?: number;
  };
  seo?: SEOData;
  collections: (string | { id: string; name: string; slug: string })[];
  rating?: number;
  reviewCount?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position?: number;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  productId?: string;
  name?: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  quantity?: number;
  inventory?: number;
  size?: string;
  color?: string;
  colorCode?: string;
  options?: Record<string, string>;
  image?: string;
  isAvailable?: boolean;
}

export interface VariantOption {
  name: string;
  values: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  productCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  type: 'manual' | 'automated';
  conditions?: CollectionCondition[];
  conditionMatch?: 'all' | 'any';
  products?: string[];
  productCount: number;
  status: 'active' | 'draft';
  publishDate?: string;
  endDate?: string;
  seo: SEOData;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionCondition {
  field: string;
  operator: string;
  value: string;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  fulfillmentStatus?: FulfillmentStatus;
  customer: OrderCustomer;
  customerId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  tax: number;
  total: number;
  currency?: string;
  coupon?: Coupon;
  notes?: OrderNote[] | string;
  tracking?: TrackingInfo;
  trackingNumber?: string;
  carrier?: string;
  refunds?: Refund[];
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

export interface OrderCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'ready' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded' 
  | 'partially_refunded';

export type FulfillmentStatus = 
  | 'unfulfilled' 
  | 'partially_fulfilled' 
  | 'fulfilled';

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  sku?: string;
  price: number;
  quantity: number;
  total?: number;
  size?: string;
  color?: string;
  options?: Record<string, string>;
}

export interface OrderNote {
  id: string;
  content: string;
  author: string;
  isInternal: boolean;
  createdAt: string;
}

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  trackingUrl: string;
  estimatedDelivery?: string;
}

export interface Refund {
  id: string;
  amount: number;
  reason: string;
  items: string[];
  status: 'pending' | 'processed' | 'failed';
  createdAt: string;
}

export interface TimelineEvent {
  id?: string;
  event?: string;
  status?: string;
  description?: string;
  note?: string;
  actor?: string;
  timestamp: string;
}

// Customer Types
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  defaultAddressId?: string;
  tags: string[];
  notes?: CustomerNote[];
  acceptsMarketing?: boolean;
  marketingOptIn?: boolean;
  isVerified?: boolean;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  segment: CustomerSegment;
  createdAt: string;
  updatedAt?: string;
  lastOrderAt?: string;
}

export type CustomerSegment = 'new' | 'returning' | 'vip' | 'at_risk' | 'inactive';

export interface CustomerNote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'other' | 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode?: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
}

// Cart Types
export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number | null;
  tax: number | null;
  total: number;
  coupon?: Coupon;
  itemCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  price: number;
  lineTotal: number;
  isAvailable: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  expiresAt?: string;
  isActive: boolean;
}

// User/Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
}

export type UserRole = 'customer' | 'admin' | 'super_admin';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  urlHandle?: string;
  keywords?: string[];
}

// API Types
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: Record<string, string[]>;
}

// Filter Types
export interface ProductFilters {
  search?: string;
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  tags?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'name_asc' | 'name_desc';
  page?: number;
  limit?: number;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  fulfillmentStatus?: FulfillmentStatus;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CustomerFilters {
  segment?: CustomerSegment;
  search?: string;
  minOrders?: number;
  maxOrders?: number;
  minSpent?: number;
  maxSpent?: number;
  page?: number;
  limit?: number;
}

// UI Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface Modal {
  id: string;
  isOpen: boolean;
  data?: unknown;
}

// Dashboard Types
export interface DashboardMetrics {
  revenue: MetricData;
  orders: MetricData;
  conversion: MetricData;
  visitors: MetricData;
  avgOrderValue: MetricData;
  returns: MetricData;
}

export interface MetricData {
  value: number;
  label: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}
