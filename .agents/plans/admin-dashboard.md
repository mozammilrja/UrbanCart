# Feature: Admin Dashboard

The following plan should be complete, but it's important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils, types, and models. Import from the right files, etc.

## Feature Description

Build the complete React + Vite admin panel for UrbanCart. This includes admin authentication (protecting routes), a metrics dashboard with KPIs (revenue, orders, conversion), product management (CRUD with image upload), inventory management (stock levels, low-stock alerts), order management (status tracking, shipping), collection management, and basic analytics with charts. The admin panel will be a separate Vite SPA that uses the same backend API as the storefront.

## User Story

As an admin operator,
I want to manage products, inventory, orders, and view analytics
So that I can run UrbanCart's operations efficiently and make data-driven decisions

## Problem Statement

UrbanCart backend has all APIs implemented for admin operations, but operators cannot access them. Without an admin panel, business operations cannot be managed - no product uploads, no order tracking, no inventory management. Operations will be blocked.

## Solution Statement

Build a professional admin panel using React 19 + Vite with TypeScript. Implement role-based route protection, a metrics-rich dashboard, full CRUD for products/collections with image uploads, inventory tracking with alerts, order management with status updates, and analytics/reporting. Use TanStack Query for data fetching, Zustand for state, Tailwind CSS for styling, and Recharts for analytics visualization.

## Feature Metadata

**Feature Type**: New Capability  
**Estimated Complexity**: High  
**Primary Systems Affected**: Admin Frontend (new), Backend (API consumer)  
**Dependencies**: React 19, Vite 6, TypeScript 5.x, TanStack Query 5.x, Zustand 4.x, Tailwind CSS 3.x, Recharts, React Table, Cloudinary, Playwright

---

## CONTEXT REFERENCES

### Relevant Backend Documentation - READ BEFORE IMPLEMENTING!

| Document | Lines | Why Read |
|----------|-------|----------|
| `.claude/PRD.md` | 300-450 | Admin features, MVP scope |
| `.claude/PRD.md` | 600-900 | API specifications for admin endpoints |
| `.claude/SYSTEM_DESIGN.md` | 1-300 | Architecture, data flows |
| `backend-foundation.md` | (All) | Backend patterns, schemas |
| `CLAUDE.md` | 1-150 | Frontend conventions |

### Backend Admin API Reference

**Admin Authentication Endpoints:**
- `POST /api/v1/auth/register` (admin user)
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

**Admin Dashboard Endpoints:**
- `GET /api/v1/admin/dashboard` - KPI metrics
- `GET /api/v1/admin/dashboard/recent-orders` - Latest orders
- `GET /api/v1/admin/dashboard/low-stock` - Low inventory alerts

**Product Management:**
- `GET /api/v1/admin/products` - List all products (including drafts)
- `POST /api/v1/admin/products` - Create product
- `PATCH /api/v1/admin/products/:id` - Update product
- `DELETE /api/v1/admin/products/:id` - Delete product
- `POST /api/v1/admin/products/:id/duplicate` - Duplicate product
- `POST /api/v1/admin/products/:id/images` - Upload image
- `PATCH /api/v1/admin/products/:id/images/reorder` - Reorder images
- `POST /api/v1/admin/products/:id/variants` - Create variant
- `PATCH /api/v1/admin/products/:id/variants/:variantId` - Update variant
- `DELETE /api/v1/admin/products/:id/variants/:variantId` - Delete variant

**Order Management:**
- `GET /api/v1/admin/orders` - List all orders
- `GET /api/v1/admin/orders/:id` - Order details
- `PATCH /api/v1/admin/orders/:id` - Update order status
- `POST /api/v1/admin/orders/:id/shipping` - Create shipping label
- `POST /api/v1/admin/orders/:id/notes` - Add internal notes
- `GET /api/v1/admin/orders/export` - Export to CSV

**Collection Management:**
- `GET /api/v1/admin/collections` - List collections
- `POST /api/v1/admin/collections` - Create collection
- `PATCH /api/v1/admin/collections/:id` - Update collection
- `DELETE /api/v1/admin/collections/:id` - Delete collection

### New Files to Create

```
admin/
├── package.json
├── vite.config.js
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── .env.example
├── src/
│   ├── main.tsx                    # Entry point + QueryClient + providers
│   ├── App.tsx                     # Router setup with protected routes
│   ├── index.css                   # Tailwind imports
│   ├── lib/
│   │   ├── api-client.ts           # Base fetch with auth header
│   │   ├── query-client.ts         # TanStack Query setup
│   │   └── utils.ts                # formatPrice, formatDate, cn()
│   ├── stores/
│   │   ├── auth.ts                 # Zustand auth store (persist token)
│   │   └── ui.ts                   # UI state (modals, filters)
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/ → login.ts
│   │   │   ├── hooks/ → useLogin.ts
│   │   │   ├── pages/ → LoginPage.tsx
│   │   │   └── index.ts
│   │   ├── dashboard/
│   │   │   ├── api/ → dashboard.ts
│   │   │   ├── hooks/ → useDashboard.ts
│   │   │   ├── components/ → DashboardCards.tsx, RevenueChart.tsx
│   │   │   ├── pages/ → DashboardPage.tsx
│   │   │   └── index.ts
│   │   ├── products/
│   │   │   ├── api/ → products.ts
│   │   │   ├── hooks/ → useProducts.ts, useProduct.ts
│   │   │   ├── components/ → ProductTable.tsx, ProductForm.tsx, ImageUpload.tsx
│   │   │   ├── pages/ → ProductsPage.tsx, ProductDetailPage.tsx
│   │   │   ├── types/ → index.ts
│   │   │   └── index.ts
│   │   ├── orders/
│   │   │   ├── api/ → orders.ts
│   │   │   ├── hooks/ → useOrders.ts
│   │   │   ├── components/ → OrderTable.tsx, OrderDetail.tsx, StatusUpdate.tsx
│   │   │   ├── pages/ → OrdersPage.tsx
│   │   │   └── index.ts
│   │   ├── inventory/
│   │   │   ├── api/ → inventory.ts
│   │   │   ├── hooks/ → useInventory.ts
│   │   │   ├── components/ → InventoryTable.tsx, StockEditor.tsx
│   │   │   ├── pages/ → InventoryPage.tsx
│   │   │   └── index.ts
│   │   ├── collections/
│   │   │   ├── api/ → collections.ts
│   │   │   ├── hooks/ → useCollections.ts
│   │   │   ├── components/ → CollectionForm.tsx
│   │   │   ├── pages/ → CollectionsPage.tsx
│   │   │   └── index.ts
│   │   ├── analytics/
│   │   │   ├── api/ → analytics.ts
│   │   │   ├── hooks/ → useAnalytics.ts
│   │   │   ├── components/ → RevenueChart.tsx, OrdersChart.tsx, TopProducts.tsx
│   │   │   ├── pages/ → AnalyticsPage.tsx
│   │   │   └── index.ts
│   │   └── settings/
│   │       ├── pages/ → SettingsPage.tsx
│   │       └── index.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx         # Left navigation
│   │   │   ├── Header.tsx          # Top header + user menu
│   │   │   └── Layout.tsx          # Sidebar + main content
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx           # Reusable table component
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx           # Status badges
│   │   │   └── Spinner.tsx
│   │   ├── tables/
│   │   │   ├── DataTable.tsx       # TanStack Table wrapper
│   │   │   └── columns.ts          # Column definitions
│   │   ├── charts/
│   │   │   ├── LineChart.tsx       # Recharts wrapper
│   │   │   ├── BarChart.tsx        # Recharts wrapper
│   │   │   └── PieChart.tsx        # Recharts wrapper
│   │   └── feedback/
│   │       ├── Toast.tsx
│   │       ├── Spinner.tsx
│   │       └── Alert.tsx
│   ├── types/
│   │   ├── admin.ts                # Admin-specific types
│   │   └── index.ts
│   ├── routes/
│   │   └── ProtectedRoute.tsx      # Role-based route guard
│   └── utils/
│       ├── cn.ts
│       ├── format.ts
│       └── validation.ts
└── tests/
    └── e2e/
        └── admin.spec.js           # Playwright E2E tests
```

### Patterns to Follow

**Protected Route Pattern:**
```typescript
// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
}

export function ProtectedRoute({ element, requiredRole = 'admin' }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{element}</>;
}
```

**TanStack Table (React Table) Pattern:**
```typescript
// For admin data tables with sorting, pagination, filtering
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';

export function ProductTable({ data }) {
  const table = useReactTable({
    data,
    columns: productColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

**Recharts Pattern:**
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#000" />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

**Image Upload with Cloudinary:**
```typescript
export function ImageUpload({ onUpload }) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'urbancart_products');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();
    onUpload(data.secure_url);
  };

  return <input type="file" onChange={handleChange} />;
}
```

---

## IMPLEMENTATION PLAN

### Phase 1: Project Setup & Configuration
Initialize Vite project, set up TypeScript, TanStack Query, Zustand, Tailwind CSS.

### Phase 2: Authentication
Login page, auth store, protected routes.

### Phase 3: Layout & Navigation
Sidebar navigation, header, layout wrapper.

### Phase 4: Dashboard
KPI cards, revenue chart, recent orders, low-stock alerts.

### Phase 5: Product Management
Product list, create/edit forms, image upload, variants.

### Phase 6: Order Management
Order list, order detail, status updates, shipping integration.

### Phase 7: Inventory Management
Stock tracking, low-stock alerts, bulk updates.

### Phase 8: Collections Management
Create/edit collections, product assignment.

### Phase 9: Analytics
Revenue reports, order reports, top products, charts.

### Phase 10: E2E Testing
Playwright tests for critical admin flows.

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

---

### Task 1: CREATE Vite + React project

Initialize a new Vite project with React 19, TypeScript, and Tailwind CSS.

**COMMAND:**
```bash
npm create vite@latest admin -- --template react-ts
cd admin
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**INSTALL DEPENDENCIES:**
```bash
npm install @tanstack/react-query @tanstack/react-table zustand axios date-fns lucide-react recharts zod react-router-dom
npm install -D @testing-library/react @playwright/test typescript-eslint @typescript-eslint/parser
```

**CONFIGURE TAILWIND:**
Update `tailwind.config.js` with template paths and configure `postcss.config.js`.

**STRUCTURE:**
- Vite default structure
- TypeScript strict mode
- Tailwind CSS ready

**GOTCHA:** Vite might require environment variable prefix `VITE_` instead of `NEXT_PUBLIC_`  
**VALIDATE:** Run `npm run dev`, should start on localhost:5173

---

### Task 2: CONFIGURE environment variables

**CREATE `.env.local`:**
```
VITE_API_URL=http://localhost:8000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud
VITE_UPLOAD_PRESET=urbancart_products
```

**CREATE `.env.example`:**
```
VITE_API_URL=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_UPLOAD_PRESET=
```

**VALIDATE:** Can access `import.meta.env.VITE_API_URL` in code

---

### Task 3: CONFIGURE TanStack Query and Router

Set up QueryClient and React Router.

**CREATE `src/lib/query-client.ts`:**
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
    },
  },
});
```

**CREATE `src/main.tsx`:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { queryClient } from './lib/query-client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
```

**VALIDATE:** App starts without errors

---

### Task 4: CREATE API client with auth header

**CREATE `src/lib/api-client.ts`:**
```typescript
import { useAuthStore } from '@/stores/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token;

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  if (response.status === 204) return null as T;
  return response.json();
}
```

**GOTCHA:** Must use `getState()` to access Zustand store outside React component  
**VALIDATE:** Import and call successfully

---

### Task 5: CREATE Zustand auth store

Persistent authentication store with token management.

**CREATE `src/stores/auth.ts`:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
  firstName: string;
  lastName: string;
}

interface AuthStore {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: AdminUser) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: 'admin-auth-store' }
  )
);
```

**VALIDATE:** Store persists to localStorage

---

### Task 6: CREATE protected route component

Role-based route protection.

**CREATE `src/routes/ProtectedRoute.tsx`:**
```typescript
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
}
```

**VALIDATE:** Routes guard properly

---

### Task 7: CREATE login page and auth API

Login endpoint and form.

**CREATE `src/features/auth/api/auth.ts`:**
```typescript
import { apiRequest } from '@/lib/api-client';

export async function login(email: string, password: string) {
  return apiRequest('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
```

**CREATE `src/features/auth/pages/LoginPage.tsx`:**
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { user, accessToken } = await login(email, password);
      setUser(user);
      setToken(accessToken);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-96 space-y-4 p-8 border rounded-lg">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        {error && <div className="text-red-600">{error}</div>}
        
        <Input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
}
```

**VALIDATE:** Login form submits, stores token

---

### Task 8: CREATE router configuration

Set up React Router with all admin routes.

**CREATE `src/App.tsx`:**
```typescript
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { ProductsPage } from '@/features/products/pages/ProductsPage';
import { OrdersPage } from '@/features/orders/pages/OrdersPage';
import { InventoryPage } from '@/features/inventory/pages/InventoryPage';
import { AnalyticsPage } from '@/features/analytics/pages/AnalyticsPage';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<ProtectedRoute element={<Layout />} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
```

**VALIDATE:** Routes work, protected routes redirect to login if not authenticated

---

### Task 9: CREATE Layout component with Sidebar

Main admin layout with sidebar navigation.

**CREATE `src/components/layout/Sidebar.tsx`:**
```typescript
import { Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Inbox, TrendingUp, BarChart3 } from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Products', icon: Package, href: '/products' },
    { label: 'Orders', icon: ShoppingCart, href: '/orders' },
    { label: 'Inventory', icon: Inbox, href: '/inventory' },
    { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">UrbanCart Admin</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            to={item.href} 
            className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

**CREATE `src/components/layout/Header.tsx`:**
```typescript
import { useAuthStore } from '@/stores/auth';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <div className="flex items-center gap-4">
        <span>{user?.firstName} {user?.lastName}</span>
        <Button size="sm" variant="ghost" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
```

**CREATE `src/components/layout/Layout.tsx`:**
```typescript
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

**VALIDATE:** Sidebar and header render, navigation works

---

### Task 10: CREATE Dashboard page

KPI cards, charts, recent orders, low-stock alerts.

**CREATE `src/features/dashboard/api/dashboard.ts`:**
```typescript
import { apiRequest } from '@/lib/api-client';

export async function getDashboardMetrics() {
  return apiRequest('/api/v1/admin/dashboard');
}

export async function getRecentOrders() {
  return apiRequest('/api/v1/admin/dashboard/recent-orders');
}

export async function getLowStockProducts() {
  return apiRequest('/api/v1/admin/dashboard/low-stock');
}
```

**CREATE `src/features/dashboard/hooks/useDashboard.ts`:**
```typescript
import { useQuery } from '@tanstack/react-query';
import { getDashboardMetrics, getRecentOrders, getLowStockProducts } from '../api/dashboard';

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: getDashboardMetrics,
  });
}

export function useRecentOrders() {
  return useQuery({
    queryKey: ['dashboard', 'recent-orders'],
    queryFn: getRecentOrders,
  });
}

export function useLowStockProducts() {
  return useQuery({
    queryKey: ['dashboard', 'low-stock'],
    queryFn: getLowStockProducts,
  });
}
```

**CREATE `src/features/dashboard/components/KPICard.tsx`:**
```typescript
export function KPICard({ label, value, change }: any) {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {change && <p className="text-green-600 text-sm mt-1">+{change}%</p>}
    </div>
  );
}
```

**CREATE `src/features/dashboard/pages/DashboardPage.tsx`:**
```typescript
import { useDashboardMetrics, useRecentOrders } from '../hooks/useDashboard';
import { KPICard } from '../components/KPICard';
import { Spinner } from '@/components/feedback/Spinner';

export function DashboardPage() {
  const { data: metrics, isLoading } = useDashboardMetrics();
  const { data: recentOrders } = useRecentOrders();

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Total Revenue" value={metrics?.totalRevenue} />
        <KPICard label="Total Orders" value={metrics?.totalOrders} />
        <KPICard label="Conversion Rate" value={metrics?.conversionRate} />
        <KPICard label="Avg Order Value" value={metrics?.averageOrderValue} />
      </div>

      {/* Charts and tables to follow in subsequent tasks */}
    </div>
  );
}
```

**VALIDATE:** Dashboard loads, KPI cards display

---

### Task 11: CREATE Products page with list and CRUD

Product listing, create/edit forms, image upload.

**CREATE `src/features/products/api/products.ts`:**
```typescript
import { apiRequest } from '@/lib/api-client';

export async function getProducts(filters = {}) {
  const params = new URLSearchParams(filters as any);
  return apiRequest(`/api/v1/admin/products?${params}`);
}

export async function createProduct(data: any) {
  return apiRequest('/api/v1/admin/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: string, data: any) {
  return apiRequest(`/api/v1/admin/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string) {
  return apiRequest(`/api/v1/admin/products/${id}`, {
    method: 'DELETE',
  });
}

export async function uploadProductImage(productId: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest(`/api/v1/admin/products/${productId}/images`, {
    method: 'POST',
    body: formData,
    headers: {}, // Let browser set Content-Type for FormData
  });
}
```

**CREATE `src/features/products/hooks/useProducts.ts`:**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadProductImage } from '../api/products';

export function useProducts(filters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: any) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUploadProductImage() {
  return useMutation({
    mutationFn: ({ productId, file }: any) => uploadProductImage(productId, file),
  });
}
```

**CREATE `src/features/products/pages/ProductsPage.tsx`:**
```typescript
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/Button';
import { ProductTable } from '../components/ProductTable';
import { ProductForm } from '../components/ProductForm';

export function ProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const { data: products } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setShowForm(true)}>Create Product</Button>
      </div>

      {showForm && <ProductForm onClose={() => setShowForm(false)} />}

      {products && <ProductTable products={products.products} />}
    </div>
  );
}
```

**ALSO CREATE:**
- `src/features/products/components/ProductTable.tsx` (TanStack Table)
- `src/features/products/components/ProductForm.tsx` (Multi-field form)
- `src/features/products/components/ImageUpload.tsx` (Cloudinary upload)

**VALIDATE:** Products page loads, can create/edit products

---

### Task 12: CREATE Orders page with management

Order listing, order detail, status updates, shipping integration.

**CREATE `src/features/orders/api/orders.ts`:**
```typescript
import { apiRequest } from '@/lib/api-client';

export async function getOrders(filters = {}) {
  const params = new URLSearchParams(filters as any);
  return apiRequest(`/api/v1/admin/orders?${params}`);
}

export async function getOrderDetail(orderId: string) {
  return apiRequest(`/api/v1/admin/orders/${orderId}`);
}

export async function updateOrderStatus(orderId: string, status: string, note?: string) {
  return apiRequest(`/api/v1/admin/orders/${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, note }),
  });
}

export async function addOrderNote(orderId: string, text: string) {
  return apiRequest(`/api/v1/admin/orders/${orderId}/notes`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}
```

**CREATE `src/features/orders/hooks/useOrders.ts`:**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, getOrderDetail, updateOrderStatus, addOrderNote } from '../api/orders';

export function useOrders(filters = {}) {
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => getOrders(filters),
  });
}

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => getOrderDetail(orderId),
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status, note }: any) => updateOrderStatus(orderId, status, note),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['orders', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useAddOrderNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, text }: any) => addOrderNote(orderId, text),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['orders', orderId] });
    },
  });
}
```

**CREATE `src/features/orders/pages/OrdersPage.tsx`:**
```typescript
import { useOrders } from '../hooks/useOrders';
import { OrderTable } from '../components/OrderTable';

export function OrdersPage() {
  const { data: orders } = useOrders();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      {orders && <OrderTable orders={orders.orders} />}
    </div>
  );
}
```

**ALSO CREATE:**
- `src/features/orders/components/OrderTable.tsx`
- `src/features/orders/components/OrderDetail.tsx`
- `src/features/orders/components/StatusUpdateForm.tsx`

**VALIDATE:** Orders page loads, can update order status

---

### Task 13: CREATE Inventory management page

Stock tracking, low-stock alerts, bulk updates.

**CREATE `src/features/inventory/api/inventory.ts`:**
```typescript
import { apiRequest } from '@/lib/api-client';

export async function getInventory(filters = {}) {
  const params = new URLSearchParams(filters as any);
  return apiRequest(`/api/v1/admin/inventory?${params}`);
}

export async function updateInventory(variantId: string, quantity: number) {
  return apiRequest(`/api/v1/admin/inventory/${variantId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });
}
```

**CREATE `src/features/inventory/pages/InventoryPage.tsx`:**
```typescript
import { useQuery } from '@tanstack/react-query';
import { getInventory } from '../api/inventory';
import { InventoryTable } from '../components/InventoryTable';
import { Spinner } from '@/components/feedback/Spinner';

export function InventoryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventory(),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      {data && <InventoryTable inventory={data.inventory} />}
    </div>
  );
}
```

**ALSO CREATE:**
- `src/features/inventory/components/InventoryTable.tsx`
- `src/features/inventory/hooks/useInventory.ts`

**VALIDATE:** Inventory page loads, displays stock levels

---

### Task 14: CREATE Analytics page with charts

Revenue charts, order reports, top products, conversion funnel.

**CREATE `src/features/analytics/pages/AnalyticsPage.tsx`:**
```typescript
import { useDashboardMetrics } from '@/features/dashboard/hooks/useDashboard';
import { RevenueChart } from '../components/RevenueChart';
import { OrdersChart } from '../components/OrdersChart';
import { TopProducts } from '../components/TopProducts';
import { Spinner } from '@/components/feedback/Spinner';

export function AnalyticsPage() {
  const { data: metrics, isLoading } = useDashboardMetrics();

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <RevenueChart data={metrics?.revenueData} />
        <OrdersChart data={metrics?.ordersData} />
      </div>

      <TopProducts products={metrics?.topProducts} />
    </div>
  );
}
```

**CREATE `src/features/analytics/components/RevenueChart.tsx`:**
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function RevenueChart({ data }: any) {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-bold mb-4">Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

**ALSO CREATE:**
- `src/features/analytics/components/OrdersChart.tsx`
- `src/features/analytics/components/TopProducts.tsx`

**VALIDATE:** Analytics page loads, charts render

---

### Task 15: CREATE UI components

Reusable UI components for forms, tables, etc.

**CREATE `src/components/ui/Button.tsx`:**
```typescript
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  className,
  children,
  ...props
}: ButtonProps & { children: React.ReactNode }) {
  const baseStyles = 'font-medium transition-colors rounded';
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      disabled={isLoading}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

**ALSO CREATE:**
- `src/components/ui/Input.tsx`
- `src/components/ui/Select.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Badge.tsx` (for status)
- `src/components/ui/Modal.tsx`

**VALIDATE:** Components render properly

---

### Task 16: CREATE utility functions

Helper functions for formatting, validation, class merging.

**CREATE `src/lib/utils.ts`:**
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(paise: number) {
  return '₹' + (paise / 100).toFixed(2);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-IN');
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}
```

**VALIDATE:** Functions work correctly

---

### Task 17: CONFIGURE Playwright E2E tests

Set up E2E testing for critical admin flows.

**CREATE `playwright.config.ts`:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run dev',
    port: 5173,
  },
  use: {
    baseURL: 'http://localhost:5173',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

**CREATE `tests/e2e/admin.spec.js`:**
```javascript
import { test, expect } from '@playwright/test';

test('admin login flow', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('input[type="email"]', 'admin@urbancart.dev');
  await page.fill('input[type="password"]', 'AdminPassword123!');
  await page.click('button:has-text("Login")');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('text=Dashboard')).toBeVisible();
});

test('create product flow', async ({ page }) => {
  // Login first
  await page.goto('/login');
  await page.fill('input[type="email"]', 'admin@urbancart.dev');
  await page.fill('input[type="password"]', 'AdminPassword123!');
  await page.click('button:has-text("Login")');
  
  // Navigate to products
  await page.click('a[href="/products"]');
  await expect(page).toHaveURL('/products');
  
  // Create product
  await page.click('button:has-text("Create Product")');
  await page.fill('input[name="name"]', 'Test Product');
  await page.fill('input[name="price"]', '5000');
  // ... more form fills
  await page.click('button:has-text("Create")');
  
  // Verify product created
  await expect(page.locator('text=Test Product')).toBeVisible();
});
```

**VALIDATE:** Tests run with `npm run test:e2e`

---

### Task 18: TEST - Verify admin panel

**TESTS:**

1. **Build Successfully**
   ```bash
   npm run build
   # Should complete with no errors
   ```

2. **Dev Server Starts**
   ```bash
   npm run dev
   # Should start on localhost:5173
   ```

3. **Login Page Loads**
   - Visit http://localhost:5173/login
   - Should show admin login form

4. **Login Works**
   - Enter admin credentials (from backend user creation)
   - Should redirect to dashboard

5. **Dashboard Loads**
   - Should show KPI cards
   - Should show charts and recent orders

6. **Navigation Works**
   - Click sidebar links
   - Should navigate between pages

7. **Product Management**
   - Can create, edit, delete products
   - Image upload works

8. **E2E Tests Pass**
   ```bash
   npm run test:e2e
   # Should pass login and product creation tests
   ```

**GOTCHA:** Backend must be running for API calls to succeed  
**VALIDATE:** All tests pass, admin panel is fully functional

---

## COMPLETION CHECKLIST

- [ ] Vite + React project created
- [ ] Environment variables configured
- [ ] TanStack Query set up
- [ ] Zustand auth store created
- [ ] API client with auth header created
- [ ] Protected routes configured
- [ ] Login page and auth flow implemented
- [ ] Router configured with all admin routes
- [ ] Sidebar and header layout created
- [ ] Dashboard page with KPI cards implemented
- [ ] Products CRUD implemented (create, list, edit, delete)
- [ ] Image upload integration (Cloudinary) working
- [ ] Orders management page implemented
- [ ] Order status update functionality working
- [ ] Inventory management page implemented
- [ ] Analytics page with charts implemented
- [ ] All UI components created (Button, Input, Table, etc)
- [ ] Form validation implemented
- [ ] Utility functions created
- [ ] Playwright E2E tests configured
- [ ] Admin panel builds without errors
- [ ] Dev server starts successfully
- [ ] Login works and stores token
- [ ] Dashboard loads and displays metrics
- [ ] Navigation between pages works
- [ ] E2E tests pass

---

**Estimated Time:** 16-20 hours for experienced full-stack engineer  
**Team:** 1 Admin/Full-Stack Developer (can be done by 1 person in 20 hours, or 2 devs in 10 hours each)

**Note:** Coordinate with backend team to ensure:
- All admin API endpoints are implemented
- Token format matches auth store expectations
- Response formats match TypeScript interfaces
- Cloudinary integration is working
