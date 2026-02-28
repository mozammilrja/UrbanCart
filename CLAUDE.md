# UrbanCart

A next-generation Indian streetwear e-commerce platform with premium brand identity, drop-based commerce, and community-driven features.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript 5.x, Tailwind CSS, shadcn/ui
- **State**: TanStack Query 5.x (server), Zustand 4.x (client)
- **Forms**: React Hook Form + Zod validation
- **Backend (Planned)**: Express, TypeScript, MongoDB, Redis
- **Admin (Planned)**: React + Vite, TanStack Table, Recharts
- **Payments**: Razorpay (UPI, cards, wallets, netbanking)
- **Testing**: Vitest, Playwright

## Project Structure

```
UrbanCart/
├── frontend/                    # Next.js 14 Storefront
│   ├── src/
│   │   ├── api/                # API layer
│   │   │   ├── auth/           # Auth API, hooks, provider
│   │   │   ├── core/           # Client, endpoints, interceptors
│   │   │   └── services/       # Domain services (products, cart, etc.)
│   │   │
│   │   ├── app/                # Next.js App Router pages
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── shop/           # Shop catalog
│   │   │   ├── product/[id]/   # Product detail
│   │   │   ├── cart/           # Shopping cart
│   │   │   ├── collections/    # Collections page
│   │   │   └── ...
│   │   │
│   │   ├── features/           # Domain-driven modules
│   │   │   └── [feature]/
│   │   │       ├── components/
│   │   │       ├── domain/
│   │   │       ├── hooks/
│   │   │       ├── services/
│   │   │       └── types/
│   │   │
│   │   ├── components/         # Shared components
│   │   │   ├── layout/         # Header, Footer, Sidebar
│   │   │   ├── form/           # Input, Select, Checkbox
│   │   │   ├── feedback/       # Toast, Spinner, Alert
│   │   │   └── ui/             # shadcn/ui primitives
│   │   │
│   │   ├── hooks/              # Global hooks
│   │   ├── stores/             # Zustand stores
│   │   ├── lib/                # Utilities, providers
│   │   ├── config/             # Routes, navigation, theme
│   │   ├── types/              # TypeScript types
│   │   └── utils/              # Helper functions
│   │
│   └── package.json
│
├── html_templates/             # Static HTML reference designs
├── research/                   # BRD, PRD, TRD documentation
├── .claude/
│   └── PRD.md                  # Complete Product Requirements Document
└── README.md
```

## Commands

```bash
# Frontend Development
cd frontend
pnpm install                    # Install dependencies
pnpm dev                        # Start dev server (localhost:3000)
pnpm build                      # Production build
pnpm lint                       # Run ESLint
pnpm typecheck                  # TypeScript check

# Testing (when implemented)
pnpm test                       # Unit tests (Vitest)
pnpm test:e2e                   # E2E tests (Playwright)
```

## Reference Documentation

| Document | When to Read |
|----------|--------------|
| `.claude/PRD.md` | Full requirements, architecture, API specs, data models |
| `research/BRD.md` | Business requirements, brand philosophy |
| `research/TRD.md` | Technical specifications, UX details |
| `research/PRD.md` | Product vision, feature priorities |

## Code Conventions

### TypeScript
- Strict mode enabled
- Use `type` for object shapes, `interface` for extendable contracts
- Export types from feature `types/` folders
- Use Zod for runtime validation at API boundaries

### React Components
- Functional components with TypeScript
- Props interface named `[Component]Props`
- Use `cn()` utility for conditional classNames
- Prefer composition over prop drilling

```tsx
// components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({ variant = 'primary', size = 'md', isLoading, children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} disabled={isLoading} {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
```

### TanStack Query
- Use query key factories for consistency
- Custom hooks for all queries/mutations
- No raw `useEffect` for data fetching
- Optimistic updates for cart/wishlist

```tsx
// features/product/hooks/useProducts.ts
export const productKeys = {
  all: ['products'] as const,
  list: (filters: ProductFilters) => [...productKeys.all, 'list', filters] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productsService.getAll(filters),
    staleTime: 5 * 60 * 1000,
  });
}
```

### Zustand Stores
- One store per domain (auth, cart, ui, modal)
- Use selectors to prevent unnecessary re-renders
- Persist to localStorage where appropriate

```tsx
// stores/cart.store.ts
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);
```

### API Services
- Service functions return typed promises
- Use axios interceptors for auth tokens
- Handle errors at service level

```tsx
// api/services/products.service.ts
export const productsService = {
  getAll: async (filters: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const { data } = await apiClient.get('/products', { params: filters });
    return data;
  },
  
  getById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },
};
```

### Styling
- Tailwind CSS only - no separate CSS files
- Use `cn()` for conditional classes
- Design tokens in `tailwind.config.ts`
- Component variants with `cva` (class-variance-authority)

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `use[Name].ts`
- Services: `[name].service.ts`
- Stores: `[name].store.ts`
- Types: `[name].types.ts`
- Utils: `camelCase.ts`

## Feature Module Structure

Each feature in `src/features/` follows this pattern:

```
features/product/
├── components/           # Feature-specific components
│   ├── ProductCard.tsx
│   ├── ProductGallery.tsx
│   └── ProductInfo.tsx
├── domain/              # Business logic
│   └── pricing.ts
├── hooks/               # TanStack Query hooks
│   ├── useProduct.ts
│   └── useProducts.ts
├── services/            # API calls
│   └── product.service.ts
├── types/               # Feature types
│   └── product.types.ts
└── index.ts             # Public exports
```

## API Layer Structure

```
api/
├── auth/                # Authentication module
│   ├── api.ts          # Auth API calls (login, register, logout)
│   ├── hooks.ts        # useLogin, useRegister, useLogout
│   ├── provider.tsx    # AuthProvider context
│   ├── storage.ts      # Token storage utilities
│   └── token-manager.ts # JWT refresh logic
│
├── core/                # Core API setup
│   ├── client.ts       # Axios instance configuration
│   ├── endpoints.ts    # API endpoint constants
│   └── interceptors.ts # Request/response interceptors
│
└── services/            # Domain services
    ├── products.service.ts
    ├── collections.service.ts
    ├── cart.service.ts
    └── orders.service.ts
```

## Key Patterns

### Error Handling
- Use error boundaries for component errors
- Toast notifications for user-facing errors
- Sentry for production error tracking

### Loading States
- Skeleton components for initial loads
- Spinner for actions
- Optimistic UI for cart operations

### SEO
- Use Next.js Metadata API
- Dynamic `generateMetadata()` for product pages
- Structured data (JSON-LD) for products

## Testing Strategy

### Unit Tests (70%)
- Components with React Testing Library
- Hooks with `renderHook`
- Utils and services

### Integration Tests (20%)
- API service tests with MSW
- Store integration tests

### E2E Tests (10%)
- Critical user flows (browse → cart → checkout)
- Page Object Model pattern
- Playwright with visual regression

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=UrbanCart
NEXT_PUBLIC_SENTRY_DSN=           # Error tracking
NEXT_PUBLIC_POSTHOG_KEY=          # Analytics (optional)
```

## MCP Servers

**Playwright MCP** for browser automation:
```bash
claude mcp add playwright npx @playwright/mcp@latest
```

**GitKraken MCP** for Git operations:
- Available for commits, branches, PRs
