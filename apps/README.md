# APOSTLE Monorepo

A premium Indian streetwear e-commerce platform built with Next.js 14, featuring a customer storefront and admin dashboard.

## 🏗️ Architecture

```
APOSTLE/
├── apps/
│   ├── admin/          # Admin Dashboard (Next.js 14)
│   └── storefront/     # Customer Storefront (Next.js 14)
│
├── packages/
│   ├── config/         # Shared Tailwind & PostCSS config
│   ├── hooks/          # Shared React hooks (Zustand stores)
│   ├── mocks/          # MSW mock handlers & data
│   ├── types/          # Shared TypeScript types
│   └── ui/             # Shared UI components (shadcn/ui style)
│
├── docs/               # Documentation
├── research/           # BRD, PRD, TRD
└── UI_Design/          # Design wireframes & specs
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Generate MSW service worker (first time setup)
cd apps/storefront && pnpm exec msw init public/
cd ../admin && pnpm exec msw init public/

# Start development servers
pnpm dev
```

### Development URLs

- **Storefront**: http://localhost:3000
- **Admin**: http://localhost:3001

### Demo Credentials

**Admin Login:**
- Email: `admin@apostle.com`
- Password: `admin123`

**Customer Login:**
- Email: `demo@apostle.com`
- Password: `demo123`

## 📦 Packages

### @apostle/ui
Shared UI components built with Radix UI primitives and Tailwind CSS:
- Button, Input, Textarea, Select
- Card, Badge, Avatar
- Dialog, Dropdown, Tabs
- Toast notifications
- And more...

### @apostle/types
Comprehensive TypeScript types for:
- Products, Orders, Customers
- Cart, Wishlist
- API responses
- Dashboard metrics

### @apostle/hooks
Zustand-powered state management:
- `useCart` - Shopping cart state
- `useWishlist` - Wishlist management
- `useAuth` - Authentication state
- Common utility hooks

### @apostle/mocks
MSW (Mock Service Worker) handlers for:
- Products API
- Orders API
- Customers API
- Collections API
- Authentication
- Dashboard stats

### @apostle/config
Shared configuration:
- Tailwind CSS design tokens
- PostCSS configuration

## 🛠️ Scripts

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:storefront   # Start storefront only
pnpm dev:admin        # Start admin only

# Build
pnpm build            # Build all apps

# Quality
pnpm lint             # Run ESLint
pnpm typecheck        # TypeScript check
pnpm format           # Format with Prettier

# Clean
pnpm clean            # Clean all build artifacts
```

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Accent**: Orange (#FF6B35)

### Typography
- **Headings**: Outfit (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Code**: JetBrains Mono

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 📱 Features

### Storefront
- Product catalog with filters & search
- Product detail pages with variants
- Shopping cart with coupon support
- Multi-step checkout (UPI, Card, Netbanking)
- User authentication & account
- Wishlist management
- Order tracking
- Collections & categories

### Admin Dashboard
- Revenue & order analytics
- Product management (CRUD)
- Order processing & tracking
- Customer management
- Collection management
- Settings & configuration

## 🧪 Testing

```bash
# Unit tests (when implemented)
pnpm test

# E2E tests (when implemented)
pnpm test:e2e
```

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [CLAUDE.md](./CLAUDE.md) | Development guidelines |
| [BRD.md](./research/BRD.md) | Business requirements |
| [PRD.md](./research/PRD.md) | Product requirements |
| [TRD.md](./research/TRD.md) | Technical requirements |

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run `pnpm lint && pnpm typecheck`
4. Submit a pull request

## 📝 License

Private - APOSTLE © 2024
