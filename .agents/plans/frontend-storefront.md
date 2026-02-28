# Feature: Frontend Storefront

The following plan should be complete, but it's important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils, types, and models. Import from the right files, etc.

## Feature Description

Build the complete React/Next.js storefront for UrbanCart. This includes setting up a Vite + React 19 + TypeScript project with TanStack Query for server state, Zustand for client state, Tailwind CSS for styling, implementing all core pages (homepage, shop, product detail, cart, checkout), components (product cards, filters, cart drawer), and E2E validation with Playwright.

## User Story

As an online shopper,
I want to browse products, filter/search, add items to cart, and checkout
So that I can purchase streetwear from UrbanCart seamlessly

## Problem Statement

The backend API exists with all endpoints implemented, but users cannot interact with it. Without a frontend, UrbanCart cannot accept orders or generate revenue. A professional, responsive storefront is critical for MVP launch.

## Solution Statement

Build a modern Next.js 15 + React 19 storefront using TypeScript, TanStack Query for server state management, Zustand for cart/UI state, tailwind CSS for responsive design, and implement all critical pages and components. Use Playwright for E2E testing of user flows (browse → cart → checkout).

## Feature Metadata

**Feature Type**: New Capability  
**Estimated Complexity**: High  
**Primary Systems Affected**: Frontend (new), Backend (API consumer)  
**Dependencies**: Next.js 15, React 19, TypeScript 5.x, TanStack Query 5.x, Zustand 4.x, Tailwind CSS 3.x, shadcn/ui, date-fns, lucide-react, Playwright

---

## CONTEXT REFERENCES

### Relevant Backend Documentation - READ BEFORE IMPLEMENTING!

| Document | Lines | Why Read |
|----------|-------|----------|
| `.claude/PRD.md` | 150-300 | Feature list, user flows, MVP scope |
| `.claude/PRD.md` | 600-900 | API specifications, all endpoints |
| `.claude/SYSTEM_DESIGN.md` | 1-300 | Architecture, data flows, component diagrams |
| `backend-foundation.md` | (All) | Backend patterns, how to read schemas |
| `CLAUDE.md` | 1-150 | Frontend conventions, TypeScript, code style |

### Backend API Reference

**Habit Tracker does this:** Check `backend/app/routers/` for exact response formats

**UrbanCart must do:** Check `.claude/PRD.md` Section 6.2 API Specifications for:
- `GET /api/v1/products` - Product list with filters
- `GET /api/v1/products/:slug` - Product detail
- `GET /api/v1/categories` - Categories
- `GET /api/v1/collections/:slug` - Collections
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/cart` - Cart retrieval
- `POST /api/v1/cart/items` - Add to cart
- `POST /api/v1/checkout/razorpay-order` - Payment order
- `GET /api/v1/orders` - User orders

### New Files to Create

```
frontend/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.example
├── public/
│   ├── assets/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   └── README.md
│   └── images/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (header, footer)
│   │   ├── page.tsx                # Homepage
│   │   ├── globals.css             # Tailwind imports
│   │   └── [slug]/
│   │       └── page.tsx            # Dynamic product pages
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Navigation, search, cart icon
│   │   │   ├── Footer.tsx          # Links, newsletter
│   │   │   └── Navigation.tsx      # Menu (desktop + mobile)
│   │   ├── product/
│   │   │   ├── ProductCard.tsx     # Grid item
│   │   │   ├── ProductGallery.tsx  # Main image + thumbnails
│   │   │   ├── VariantSelector.tsx # Size/color picker
│   │   │   └── SizeGuide.tsx       # Size guide modal
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx      # Slide-in cart
│   │   │   ├── CartItem.tsx        # Item with qty controls
│   │   │   └── OrderSummary.tsx    # Totals display
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx    # Multi-step form
│   │   │   ├── AddressForm.tsx     # Address input
│   │   │   ├── ShippingSelector.tsx # Shipping options
│   │   │   └── PaymentForm.tsx     # Payment method selection
│   │   ├── filters/
│   │   │   ├── FilterSidebar.tsx   # Desktop filters
│   │   │   ├── PriceRangeSlider.tsx # Price filter
│   │   │   └── FilterButton.tsx    # Mobile filter toggle
│   │   ├── feedback/
│   │   │   ├── Spinner.tsx         # Loading indicator
│   │   │   ├── Toast.tsx           # Notifications
│   │   │   ├── Skeleton.tsx        # Placeholder
│   │   │   └── Alert.tsx           # Error/success messages
│   │   └── ui/
│   │       ├── Button.tsx          # Base button (variants)
│   │       ├── Input.tsx           # Text input
│   │       ├── Select.tsx          # Dropdown
│   │       ├── Card.tsx            # Card wrapper
│   │       └── Modal.tsx           # Modal dialog
│   ├── features/
│   │   ├── product/
│   │   │   ├── hooks/
│   │   │   │   ├── useProducts.ts  # List products query
│   │   │   │   └── useProduct.ts   # Single product query
│   │   │   ├── api/
│   │   │   │   └── products.ts     # Product API functions
│   │   │   ├── types/
│   │   │   │   └── index.ts        # Product types
│   │   │   └── index.ts            # Barrel exports
│   │   ├── cart/
│   │   │   ├── hooks/
│   │   │   │   └── useCart.ts      # Cart queries/mutations
│   │   │   ├── store/
│   │   │   │   └── cart.ts         # Zustand cart store
│   │   │   ├── types/
│   │   │   │   └── index.ts        # Cart item types
│   │   │   └── index.ts            # Barrel exports
│   │   ├── checkout/
│   │   │   ├── hooks/
│   │   │   │   └── useCheckout.ts  # Checkout mutations
│   │   │   ├── api/
│   │   │   │   └── checkout.ts     # Checkout API
│   │   │   └── index.ts            # Barrel exports
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts      # Auth queries/mutations
│   │   │   │   └── useUser.ts      # Current user query
│   │   │   ├── store/
│   │   │   │   └── auth.ts         # Zustand auth store
│   │   │   ├── api/
│   │   │   │   └── auth.ts         # Auth API
│   │   │   └── index.ts            # Barrel exports
│   │   └── orders/
│   │       ├── hooks/
│   │       │   └── useOrders.ts    # Orders queries
│   │       ├── api/
│   │       │   └── orders.ts       # Orders API
│   │       └── index.ts            # Barrel exports
│   ├── lib/
│   │   ├── api-client.ts           # Base fetch/axios setup
│   │   ├── query-client.ts         # TanStack Query setup
│   │   └── utils.ts                # Helper functions
│   ├── stores/
│   │   ├── auth.ts                 # Zustand auth store
│   │   ├── cart.ts                 # Zustand cart store
│   │   ├── ui.ts                   # UI state (modals, etc)
│   │   └── index.ts                # Barrel exports
│   ├── types/
│   │   ├── api.ts                  # API response types
│   │   ├── product.ts              # Product types
│   │   └── index.ts                # Barrel exports
│   ├── utils/
│   │   ├── cn.ts                   # Class merging utility
│   │   ├── format.ts               # Formatting functions
│   │   └── validation.ts           # Form validation
│   └── pages/
│       ├── shop.tsx                # Shop/catalog page
│       ├── product-detail.tsx      # Product detail page (reusable)
│       ├── cart.tsx                # Cart page
│       ├── checkout.tsx            # Checkout page
│       ├── confirmation.tsx        # Order confirmation
│       ├── orders.tsx              # Order history
│       ├── about.tsx               # About page
│       └── contact.tsx             # Contact page
└── tests/
    └── e2e/
        └── storefront.spec.js      # Playwright E2E tests
```

### Patterns to Follow

**API Response Types (from backend PRD):**
```typescript
// Product response
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in paise
  category: Category;
  collection?: Collection;
  images: Image[];
  variants: Variant[];
  rating?: number;
  createdAt: string;
}

// Cart item
interface CartItem {
  id: string;
  product: Product;
  variant: Variant;
  quantity: number;
  price: number;
}
```

**TanStack Query Hook Pattern (from Habit Tracker):**
```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';

export function useProducts(filters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}
```

**Zustand Store Pattern:**
```typescript
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
  removeItem: (id) => set((state) => ({ 
    items: state.items.filter(i => i.id !== id) 
  })),
  updateQuantity: (id, qty) => set((state) => ({
    items: state.items.map(i => i.id === id ? { ...i, quantity: qty } : i)
  })),
  clear: () => set({ items: [] }),
}));
```

**Component Props Pattern (from Habit Tracker):**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button 
      disabled={isLoading}
      className={cn(buttonVariants({ variant, size }))}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
```

**API Client Pattern:**
```typescript
// src/lib/api-client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function request(endpoint: string, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'An error occurred');
  }

  if (response.status === 204) return null;
  return response.json();
}

export const apiClient = { request };
```

---

## IMPLEMENTATION PLAN

### Phase 1: Project Setup & Config
Initialize Next.js project, Tailwind CSS, TanStack Query, Zustand.

### Phase 2: Core Layout & Navigation
Header, footer, navigation menu, responsive mobile layout.

### Phase 3: Product Pages
Homepage, shop page with filters, product detail page.

### Phase 4: Cart & Checkout
Cart drawer, cart page, multi-step checkout form.

### Phase 5: Auth & Orders
Login/register flows, order history page.

### Phase 6: Components & Utils
All UI components, API client, form validation, utilities.

### Phase 7: E2E Testing
Playwright tests for critical user flows.

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

---

### Task 1: CREATE Next.js project and install dependencies

Initialize Next.js 15 project with all required dependencies.

**COMMAND:**
```bash
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
```

**ADDITIONAL DEPENDENCIES:**
```bash
npm install @tanstack/react-query zustand axios date-fns lucide-react zod
npm install -D @testing-library/react @playwright/test typescript-eslint @typescript-eslint/parser
```

**STRUCTURE:**
- Use App Router (default in Next.js 15)
- TypeScript strict mode
- Tailwind CSS configured

**GOTCHA:** Create-next-app might prompt for configuration - choose Tailwind, App Router, TypeScript  
**VALIDATE:** Run `npm run dev`, should start on localhost:3000 with Next.js default page

---

### Task 2: CONFIGURE environment variables

Set up environment variables for API connection and third-party services.

**CREATE `.env.local`:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_here
NEXT_PUBLIC_APP_NAME=UrbanCart
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

**CREATE `.env.example`:**
```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

**GOTCHA:** `NEXT_PUBLIC_` prefix means it's exposed to browser - never put secrets here  
**VALIDATE:** Import `process.env.NEXT_PUBLIC_API_URL` in code, should not be undefined

---

### Task 3: CONFIGURE TanStack Query

Set up QueryClient and QueryClientProvider.

**CREATE `src/lib/query-client.ts`:**
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 10, // 10 min (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

**CREATE `src/app/providers.tsx`:**
```typescript
'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

**UPDATE `src/app/layout.tsx`:**
Wrap children with `<Providers>` component.

**VALIDATE:** No TypeScript errors, QueryClient creates successfully

---

### Task 4: CREATE API client

Set up Axios or fetch-based API client with base configuration.

**CREATE `src/lib/api-client.ts`:**
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  if (response.status === 204) return null as T;
  return response.json();
}
```

**GOTCHA:** Don't forget to set Content-Type header  
**VALIDATE:** Import and call `apiRequest()`, type inference should work

---

### Task 5: CREATE API service functions

Create functions for each API endpoint (products, cart, auth, orders).

**CREATE `src/features/product/api/products.ts`:**
```typescript
import { apiRequest } from '@/lib/api-client';
import type { Product } from '../types';

export async function getProducts(filters = {}) {
  return apiRequest<{ products: Product[] }>('/api/v1/products', {
    method: 'GET',
  });
}

export async function getProductBySlug(slug: string) {
  return apiRequest<Product>(`/api/v1/products/${slug}`, {
    method: 'GET',
  });
}
```

**ALSO CREATE:**
- `src/features/cart/api/cart.ts`
- `src/features/auth/api/auth.ts`
- `src/features/orders/api/orders.ts`
- `src/features/checkout/api/checkout.ts`

**PATTERN:** Each endpoint gets one async function responsible for the API call

**VALIDATE:** Import functions, no TypeScript errors

---

### Task 6: CREATE TanStack Query hooks

Create custom hooks for data fetching using Query (read) and Mutation (write).

**CREATE `src/features/product/hooks/useProducts.ts`:**
```typescript
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/products';
import type { Product } from '../types';

export function useProducts(filters = {}) {
  return useQuery<{ products: Product[] }>({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
}
```

**ALSO CREATE:**
- `src/features/product/hooks/useProduct.ts` (single product)
- `src/features/cart/hooks/useCart.ts` (cart queries + mutations)
- Similar for auth, orders, checkout

**GOTCHA:** Query key must include filters for cache invalidation  
**VALIDATE:** Hooks call successfully, data types match backend responses

---

### Task 7: CREATE Zustand stores

Set up client state stores for auth and cart (persist to localStorage).

**CREATE `src/stores/auth.ts`:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-store' }
  )
);
```

**ALSO CREATE:**
- `src/stores/cart.ts` (cart items)
- `src/stores/ui.ts` (modal states, filters open, etc)

**VALIDATE:** Stores create successfully, localStorage writes work

---

### Task 8: CREATE utility functions

Create helper functions for common tasks (class merging, formatting, validation).

**CREATE `src/lib/utils.ts`:**
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(paise: number) {
  return '₹' + (paise / 100).toFixed(2);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN');
}
```

**VALIDATE:** Functions work with various inputs

---

### Task 9: CREATE base Button component

Build a reusable button with variants (primary, secondary, ghost, danger).

**CREATE `src/components/ui/Button.tsx`:**
```typescript
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium transition-colors rounded';
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    ghost: 'bg-transparent text-black hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

**ALSO CREATE:**
- `src/components/ui/Card.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Select.tsx`
- `src/components/ui/Modal.tsx`

**VALIDATE:** Components render without errors, styles apply correctly

---

### Task 10: CREATE Header component

Build the navigation header with logo, menu, search, cart icon.

**CREATE `src/components/layout/Header.tsx`:**
```typescript
'use client';
import Link from 'next/link';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          UrbanCart
        </Link>

        {/* Navigation (desktop) */}
        <nav className="hidden md:flex gap-8">
          <Link href="/shop" className="hover:text-gray-600">Shop</Link>
          <Link href="/collections" className="hover:text-gray-600">Collections</Link>
          <Link href="/about" className="hover:text-gray-600">About</Link>
        </nav>

        {/* Right side (search, cart, menu) */}
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hover:text-gray-600">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/cart" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <button className="md:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
```

**ALSO CREATE:**
- `src/components/layout/Footer.tsx`
- `src/components/layout/Navigation.tsx`

**VALIDATE:** Header renders, navigation links work

---

### Task 11: CREATE Product Card component

Build the product grid item display.

**CREATE `src/components/product/ProductCard.tsx`:**
```typescript
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/features/product/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="bg-gray-100 overflow-hidden rounded-lg aspect-square relative">
          {product.images[0] && (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          )}
        </div>
      </Link>
      <h3 className="mt-4 font-medium text-lg">{product.name}</h3>
      <p className="text-gray-600">{formatPrice(product.price)}</p>
      <Button 
        className="w-full mt-2" 
        size="sm"
        onClick={() => onAddToCart?.(product)}
      >
        Add to Cart
      </Button>
    </div>
  );
}
```

**ALSO CREATE:**
- `src/components/product/ProductGallery.tsx` (image carousel)
- `src/components/product/VariantSelector.tsx` (size/color picker)

**VALIDATE:** Component renders product, image loads

---

### Task 12: CREATE Cart Drawer component

Build the slide-in shopping cart.

**CREATE `src/components/cart/CartDrawer.tsx`:**
```typescript
'use client';
import { X } from 'lucide-react';
import { useCartStore } from '@/stores/cart';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, clear } = useCartStore();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg z-50 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">Cart</h2>
          <button onClick={onClose} aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="py-4 border-b">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button className="w-full" size="lg">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
```

**VALIDATE:** Drawer opens/closes, displays cart items

---

### Task 13: CREATE multi-step Checkout Form

Build the checkout form with address, shipping, payment steps.

**CREATE `src/components/checkout/CheckoutForm.tsx`:**
```typescript
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AddressForm } from './AddressForm';
import { ShippingSelector } from './ShippingSelector';
import { PaymentForm } from './PaymentForm';

type Step = 'address' | 'shipping' | 'payment' | 'confirmation';

export function CheckoutForm() {
  const [step, setStep] = useState<Step>('address');

  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Progress indicator */}
      <div className="col-span-2">
        {/* Step content */}
        {step === 'address' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
            <AddressForm onNext={() => setStep('shipping')} />
          </div>
        )}
        
        {step === 'shipping' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Shipping Method</h2>
            <ShippingSelector onNext={() => setStep('payment')} />
          </div>
        )}

        {step === 'payment' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Payment</h2>
            <PaymentForm />
          </div>
        )}
      </div>

      {/* Order summary sidebar */}
      <div className="sticky top-4">
        <OrderSummary />
      </div>
    </div>
  );
}
```

**ALSO CREATE:**
- `src/components/checkout/AddressForm.tsx`
- `src/components/checkout/ShippingSelector.tsx`
- `src/components/checkout/PaymentForm.tsx`

**VALIDATE:** Form steps work, navigation between steps works

---

### Task 14: CREATE product detail page

Build the product detail page with gallery, variant selector, add to cart.

**CREATE `src/app/products/[slug]/page.tsx`:**
```typescript
'use client';
import { useProduct } from '@/features/product/hooks/useProduct';
import { ProductGallery } from '@/components/product/ProductGallery';
import { VariantSelector } from '@/components/product/VariantSelector';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/feedback/Spinner';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { data: product, isLoading, error } = useProduct(params.slug);

  if (isLoading) return <Spinner />;
  if (error || !product) return <div>Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-8">
        <ProductGallery images={product.images} />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-6">₹{(product.price / 100).toFixed(2)}</p>
          <VariantSelector variants={product.variants} />
          <Button className="w-full mt-8" size="lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**ALSO CREATE:**
- `src/app/page.tsx` (homepage with featured products)
- `src/app/shop/page.tsx` (shop with filters)
- `src/app/cart/page.tsx` (cart page)
- `src/app/checkout/page.tsx` (checkout page)
- `src/app/orders/page.tsx` (order history)

**VALIDATE:** Page loads product data, renders correctly

---

### Task 15: CREATE feedback components

Build loading, error, and success feedback components.

**CREATE `src/components/feedback/Spinner.tsx`:**
```typescript
export function Spinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  );
}
```

**ALSO CREATE:**
- `src/components/feedback/Toast.tsx` (notifications)
- `src/components/feedback/Skeleton.tsx` (placeholder)
- `src/components/feedback/Alert.tsx` (error/success messages)

**VALIDATE:** Components render without errors

---

### Task 16: CREATE filter components

Build sidebar filters for shop page (category, price, color, size).

**CREATE `src/components/filters/FilterSidebar.tsx`:**
```typescript
'use client';
import { useState } from 'react';
import { useProducts } from '@/features/product/hooks/useProducts';

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
}

export function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFiltersChange({ category });
  };

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div>
        <h3 className="font-bold mb-4">Category</h3>
        {/* Category checkboxes */}
      </div>

      {/* Price filter */}
      <div>
        <h3 className="font-bold mb-4">Price Range</h3>
        {/* Price range slider */}
      </div>

      {/* Color filter */}
      <div>
        <h3 className="font-bold mb-4">Colors</h3>
        {/* Color swatches */}
      </div>
    </div>
  );
}
```

**VALIDATE:** Filters and handler props work

---

### Task 17: CONFIGURE Razorpay

Set up Razorpay payment integration for checkout.

**INSTALL:** 
```bash
npm install razorpay
```

**CREATE `src/lib/razorpay.ts`:**
```typescript
declare global {
  interface Window {
    Razorpay: any;
  }
}

export async function initiatePayment(orderId: string, amount: number) {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    name: 'UrbanCart',
    order_id: orderId,
    handler: (response: any) => {
      // Handle successful payment
    },
    prefill: {
      email: 'customer@example.com',
      contact: '9999999999',
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
```

**VALIDATE:** Razorpay script loads, payment modal opens on checkout

---

### Task 18: CREATE form validation

Set up Zod schemas for form validation.

**CREATE `src/lib/validation.ts`:**
```typescript
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name too short'),
  lastName: z.string().min(2, 'Last name too short'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
});

export const addressSchema = z.object({
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string(),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone'),
});
```

**VALIDATE:** Schemas validate correctly

---

### Task 19: SETUP Playwright E2E tests

Configure Playwright for end-to-end testing.

**CREATE `playwright.config.ts`:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run dev',
    port: 3000,
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

**CREATE `tests/e2e/storefront.spec.js`:**
```javascript
import { test, expect } from '@playwright/test';

test('browsing flow: homepage → shop → product → cart', async ({ page }) => {
  // Navigate to homepage
  await page.goto('/');
  await expect(page).toHaveTitle(/UrbanCart/);

  // Go to shop
  await page.click('a[href="/shop"]');
  await expect(page).toHaveURL('/shop');
  
  // Click first product
  const firstProduct = page.locator('[data-testid="product-card"]').first();
  await firstProduct.click();
  
  // Add to cart
  await page.click('button:has-text("Add to Cart")');
  
  // Verify cart updated
  const cartCount = page.locator('[data-testid="cart-count"]');
  await expect(cartCount).toHaveText('1');
});
```

**VALIDATE:** Tests run with `npm run test:e2e`

---

### Task 20: TEST - Verify frontend integration

**TESTS:**

1. **Build Successfully**
   ```bash
   npm run build
   # Should complete with no errors
   ```

2. **Dev Server Starts**
   ```bash
   npm run dev
   # Should start on localhost:3000
   ```

3. **Homepage Loads**
   - Visit http://localhost:3000
   - Should show UrbanCart header and featured products

4. **API Integration**
   - Check Network tab in DevTools
   - API calls to backend should succeed (if backend is running)

5. **Navigation Works**
   - Click shop, about, cart links
   - Routes should change

6. **E2E Tests Pass**
   ```bash
   npm run test:e2e
   # Should pass browsing flow test
   ```

**GOTCHA:** Backend must be running on port 8000 for API calls to work  
**VALIDATE:** All tests pass, no console errors

---

## COMPLETION CHECKLIST

- [ ] Next.js project created and dependencies installed
- [ ] Environment variables configured
- [ ] TanStack Query set up with QueryClient
- [ ] Zustand stores created (auth, cart, ui)
- [ ] API client and service functions created
- [ ] Custom hooks for queries/mutations created
- [ ] All utility functions created (cn, formatPrice, etc)
- [ ] All UI components created (Button, Input, etc)
- [ ] Layout components created (Header, Footer)
- [ ] Product components created (Card, Gallery, VariantSelector)
- [ ] Cart components created (CartDrawer, CartItem)
- [ ] Checkout form components created (multi-step)
- [ ] All pages created (home, shop, product detail, cart, checkout, orders)
- [ ] Filter sidebar created and functional
- [ ] Razorpay integration configured
- [ ] Form validation with Zod implemented
- [ ] Playwright E2E tests configured
- [ ] Frontend builds without errors
- [ ] Dev server starts successfully
- [ ] Homepage loads and displays products
- [ ] Navigation between pages works
- [ ] E2E tests pass

---

**Next Feature:** After completing this, proceed to `admin-dashboard.md` for admin panel implementation.

**Estimated Time:** 12-16 hours for experienced frontend engineer  
**Team:** 2 Frontend Engineers (can work in parallel on pages/components)
