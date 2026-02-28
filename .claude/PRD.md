# Product Requirements Document
## UrbanCart - Next-Generation Indian Streetwear Platform

**Document Version:** 3.0  
**Date:** February 28, 2026  
**Classification:** Product Requirements Specification

---

# 1. Executive Summary

UrbanCart is a digitally-native, culturally-grounded Indian streetwear platform positioned at the intersection of designer-led narrative identity, multi-brand cultural retail, and high-performance e-commerce architecture. The platform operates as a hybrid model: 70% primary brand revenue, 20% curated collaborations, and 10% community-driven commerce (memberships, events, exclusives).

The platform targets creative professionals aged 22-35 in Indian metro cities who seek fashion as identity expression rather than passive consumption. UrbanCart differentiates through philosophical brand depth (inspired by Almost Gods), community-driven energy (inspired by BLUORNG), and a sophisticated drop-based commerce engine with access tiers, scarcity mechanics, and physical-digital integration via flagship stores ("Chapters").

**MVP Goal:** Launch a fully functional e-commerce platform with product catalog, user authentication, cart/checkout with Indian payment methods (Razorpay/UPI), order management, and an admin panel for content and order management. Built as a Turborepo monorepo for shared code and consistent development experience.

**5-Year Vision:** Become India's definitive streetwear platform with ₹200+ Cr ARR, 1M+ customers, 5 flagship stores, international presence, and a curated marketplace ecosystem.

---

# 2. Mission

**Product Mission:** Establish UrbanCart as the definitive platform for premium Indian streetwear—where fashion meets identity, community meets commerce, and cultural relevance meets commercial success.

**Core Principles:**

1. **Narrative-Commerce Fusion** - Every product exists within campaign storytelling; no orphan SKUs
2. **Community Over Crowd** - Build a curated community of aligned individuals, not mass customers
3. **Engineered Scarcity** - Systematic drop mechanics that create genuine urgency without manipulation
4. **Physical-Digital Loop** - Stores ("Chapters") as content studios and community hubs that feed digital channels
5. **Craftsmanship Transparency** - Visible production process and material sourcing justifies premium pricing

---

# 3. Target Users

## 3.1 Primary Personas

### Persona 1: The Creative Professional
- **Age:** 27-35
- **Profession:** Design, advertising, media, tech
- **Income:** ₹8L+ annually
- **Behavior:** Research-heavy purchases, quality over quantity, follows independent brands
- **Need:** Wardrobe that signals creative identity and taste

### Persona 2: The Young Entrepreneur
- **Age:** 24-32
- **Profession:** Startup founder, senior professional
- **Income:** ₹6L-15L annually
- **Behavior:** Views clothing as personal branding, attends events
- **Need:** Elevated casual wear with craftsmanship and story

### Persona 3: The Cultural Observer
- **Age:** 22-30
- **Profession:** Students, early-career creatives
- **Income:** ₹4L-8L annually
- **Behavior:** Deep into music, art, subcultures; collects limited pieces
- **Need:** Affordable entry points to premium streetwear

### Persona 4: Admin User (Internal)
- **Role:** Operations Manager, Content Manager, Customer Support
- **Need:** Manage products, orders, inventory, and customer inquiries efficiently

## 3.2 Fashion Sophistication Tiers

| Tier | % of Audience | Behavior | Target Products |
|------|---------------|----------|-----------------|
| **Culturally Fluent** | 20% | Early adopters, opinion leaders, price-insensitive | Hero tier, membership, events |
| **Trend-Aware** | 50% | Follows Instagram brands, influenced by Tier 1 | Core tier, drop participation |
| **Style-Conscious** | 30% | General fashion awareness, discovery-driven | Entry tier, community onboarding |

## 3.3 Geographic Focus

- **Primary:** Delhi NCR, Mumbai, Bangalore
- **Secondary:** Hyderabad, Chennai, Pune, Kolkata
- **Year 3+:** Tier-2 cities, International (UAE, Singapore, US, UK)

---

# 4. MVP Scope

## 4.1 In Scope (MVP)

### Core E-Commerce (Web App)
- ✅ Product catalog with categories, collections, and variants (size, color)
- ✅ Product detail pages with image gallery, sizing, add-to-cart
- ✅ Collection pages with filtering and sorting
- ✅ Shopping cart with add/remove/update functionality
- ✅ Full checkout flow with shipping and payment
- ✅ Indian payment methods (Razorpay: UPI, cards, wallets, netbanking)
- ✅ Order confirmation and status tracking
- ✅ Product search functionality

### User Management
- ✅ User registration and login (email/password)
- ✅ JWT-based authentication with refresh tokens
- ✅ User profile management
- ✅ Address book management
- ✅ Order history

### Admin Panel
- ✅ Protected admin authentication
- ✅ Dashboard with key metrics (orders, revenue, inventory)
- ✅ Product management (CRUD, variants, images)
- ✅ Collection management
- ✅ Category management
- ✅ Order management (view, update status, add tracking)
- ✅ Customer list view
- ✅ Basic inventory tracking
- ✅ Product duplicate functionality
- ✅ Image reordering (drag & drop)
- ✅ Export orders to CSV

### SEO & Analytics
- ✅ Dynamic meta tags (title, description, OG images)
- ✅ Structured data (JSON-LD for products)
- ✅ Sitemap generation
- ✅ Google Analytics 4 integration
- ✅ Facebook Pixel / Meta Conversions API
- ✅ UTM tracking support

### Billing & Compliance (India)
- ✅ GST calculation (18% on apparel)
- ✅ Invoice generation (PDF)
- ✅ GSTIN field for B2B customers
- ✅ HSN codes for products

### Transactional Emails
- ✅ Order confirmation
- ✅ Shipping notification with tracking
- ✅ Order delivered
- ✅ Password reset
- ✅ Account verification

### Static Pages
- ✅ About page
- ✅ Store/Chapters page
- ✅ Journal/Blog page
- ✅ Size guide page
- ✅ Shipping policy
- ✅ Returns & exchanges policy
- ✅ Privacy policy
- ✅ Terms of service
- ✅ Contact page with form
- ✅ FAQ page

### Backend API
- ✅ RESTful API with Node.js + TypeScript + Express
- ✅ MongoDB database with Mongoose ODM
- ✅ Redis for sessions and caching
- ✅ Image handling via Cloudinary
- ✅ Admin-specific endpoints with role-based access

### Infrastructure & Reliability
- ✅ Image optimization (Cloudinary transformations)
- ✅ API response caching (Redis)
- ✅ Database indexing
- ✅ Error tracking (Sentry)
- ✅ Uptime monitoring
- ✅ Automated backups (MongoDB Atlas)
- ✅ Health check endpoints

### Shared Packages (Monorepo)
- ✅ Shared TypeScript types across all apps
- ✅ Shared UI components (shadcn-based)
- ✅ API client with type safety
- ✅ Authentication utilities
- ✅ Common utilities and helpers
- ✅ Shared configuration

## 4.2 Out of Scope (Future Phases)

### Drop Engine (Phase 2)
- ❌ Countdown timers and drop announcements
- ❌ Waitlist and pre-registration
- ❌ Access tier gating (Founding/Members/Subscribers/Public)
- ❌ Cart reservation with time limits
- ❌ Real-time scarcity indicators

### Discount System (Phase 2)
- ❌ Discount codes (percentage, fixed amount, free shipping)
- ❌ Automatic discounts (cart value thresholds)
- ❌ Limited-use codes with expiry
- ❌ Admin discount management
- ❌ First-purchase discount

### Marketing Emails (Phase 2)
- ❌ Abandoned cart recovery (1hr, 24hr, 72hr)
- ❌ Back-in-stock notifications
- ❌ Drop announcements
- ❌ Newsletter integration (Klaviyo)

### Returns Management (Phase 2)
- ❌ Return request submission (customer)
- ❌ Return approval workflow (admin)
- ❌ Refund processing via Razorpay
- ❌ Return status tracking

### Membership & Community (Phase 2)
- ❌ Membership tier system
- ❌ Points and rewards
- ❌ Early access benefits
- ❌ Member-only products

### Advanced Admin (Phase 2)
- ❌ Analytics dashboard with charts
- ❌ Bulk product import/export
- ❌ Banner/homepage content management
- ❌ Discount code management
- ❌ Staff accounts with roles
- ❌ Audit log viewer

### Mobile Apps (Year 2)
- ❌ iOS native app
- ❌ Android native app
- ❌ Push notifications
- ❌ Mobile-exclusive access

### Store Integration (Year 2)
- ❌ Store locator with real-time inventory
- ❌ Event registration and ticketing
- ❌ BOPIS (Buy Online, Pick Up In Store)
- ❌ Store-exclusive products

---

# 5. User Stories

## 5.1 Browsing & Discovery (Web)

**US-1:** As a shopper, I want to browse products by category and collection, so that I can discover items that match my style.
- *Example:* User navigates to /shop, filters by "T-Shirts" and "Size M", views 24 products in grid.

**US-2:** As a shopper, I want to view detailed product information with multiple images, so that I can make informed purchase decisions.
- *Example:* User clicks product, sees 5 images, reads description, checks size guide, selects "L" in "Black".

**US-3:** As a shopper, I want to search for products by name or description, so that I can quickly find what I'm looking for.
- *Example:* User types "Alpha Cross" in search, sees matching tees, shirts, and caps.

**US-4:** As a shopper, I want to see size guides, so that I can choose the right fit.
- *Example:* User clicks "Size Guide" on PDP, sees measurement table and fit recommendations.

## 5.2 Cart & Checkout (Web)

**US-5:** As a shopper, I want to add items to my cart and modify quantities, so that I can build my order before checkout.
- *Example:* User adds size M tee, realizes they want L, changes size, adds second item.

**US-6:** As a shopper, I want to checkout with multiple payment options, so that I can pay using my preferred method.
- *Example:* User proceeds to checkout, enters shipping info, selects UPI (Razorpay), completes payment.

**US-7:** As a guest, I want to checkout without creating an account, so that I can purchase quickly.
- *Example:* User checks out as guest, enters email for order updates, completes purchase.

**US-8:** As a shopper, I want to receive email updates about my order, so that I know when it ships.
- *Example:* User receives order confirmation, then shipping email with tracking link.

## 5.3 Account Management (Web)

**US-9:** As a user, I want to create an account with email and password, so that I can track orders and save preferences.
- *Example:* User registers with email, receives verification, logs in, sees empty order history.

**US-10:** As a registered user, I want to view my order history and track order status, so that I know when my items will arrive.
- *Example:* User logs in, navigates to account, sees past orders with status "Shipped", clicks for tracking.

**US-11:** As a registered user, I want to save multiple shipping addresses, so that I can checkout faster for different delivery locations.
- *Example:* User adds work and home addresses, selects "Home" as default for next checkout.

**US-12:** As a shopper, I want to contact support, so that I can resolve issues with my order.
- *Example:* User fills contact form, receives confirmation email, support responds within 24 hours.

## 5.4 Admin Panel

**US-13:** As an admin, I want to view a dashboard with key metrics, so that I can understand business performance at a glance.
- *Example:* Admin sees today's orders (15), revenue (₹85,000), pending orders (8), low stock alerts (3).

**US-14:** As an admin, I want to create and manage products with variants, so that customers can see our full catalog.
- *Example:* Admin creates "Alpha Cross Tee" with 3 sizes, 2 colors, uploads 5 images, sets price ₹5,000.

**US-15:** As an admin, I want to manage orders and update their status, so that customers receive accurate tracking information.
- *Example:* Admin views order #UC-001, marks as "Shipped", adds tracking number, customer gets email.

**US-16:** As an admin, I want to organize products into collections, so that I can feature seasonal drops and campaigns.
- *Example:* Admin creates "AW26 Drop" collection, adds 15 products, sets as featured on homepage.

**US-17:** As an admin, I want to duplicate a product, so that I can quickly create variations.
- *Example:* Admin duplicates "Alpha Tee Black", changes color to "Navy", updates images, saves.

**US-18:** As an admin, I want to export orders to CSV, so that I can analyze sales data.
- *Example:* Admin filters orders by date range, clicks "Export", downloads CSV with all order details.

## 5.5 Technical Stories

**US-19:** As a developer, I want shared TypeScript types across all apps, so that API contracts are type-safe.
- *Example:* `@urbancart/types` exports `Product`, `Order` types used by web, admin, and backend.

**US-20:** As a developer, I want a shared UI library, so that design is consistent across web and admin.
- *Example:* `@urbancart/ui` exports Button, Card, Dialog components used by both frontends.

---

# 6. Core Architecture & Patterns

## 6.1 High-Level Architecture

### Architecture Overview

UrbanCart follows a **modular frontend-first architecture** with a planned backend expansion. The system is designed for scalability, maintainability, and optimal developer experience.

**Current State:** Frontend storefront (Next.js 14) with static HTML templates for reference
**Planned:** Full-stack with Express API backend and React admin panel

### Technology Decisions

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Web Storefront** | Next.js 14 (App Router) | SSR/SSG for SEO, React Server Components, Image optimization |
| **Admin Panel** | React + Vite | Faster dev builds, SPA sufficient for admin (no SEO needed) |
| **Backend API** | Express + TypeScript | Flexibility, extensive ecosystem, team familiarity |
| **Database** | MongoDB | Schema flexibility for evolving product catalogs |
| **Cache Layer** | Redis | Session storage, cart caching, rate limiting |
| **Image CDN** | Cloudinary | On-the-fly transformations, responsive images |
| **Payments** | Razorpay | Best-in-class Indian payment gateway, UPI support |
| **Email** | Resend | Developer-friendly API, React Email templates |
| **Monitoring** | Sentry | Real-time error tracking, performance monitoring |

### System Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CDN (Vercel Edge)                       │
└─────────────────────────────────────────────────────────────────┘
                    │                           │
┌───────────────────┴───────────────┐ ┌────────┴──────────────────┐
│        Web Storefront             │ │       Admin Panel         │
│        (Next.js 14)               │ │       (React + Vite)      │
│        apps/web                   │ │       apps/admin          │
│  ┌─────────┬─────────┬─────────┐  │ │  ┌─────────┬───────────┐  │
│  │ Pages   │Features │ Stores  │  │ │  │ Pages   │ Components│  │
│  └─────────┴─────────┴─────────┘  │ │  └─────────┴───────────┘  │
└───────────────────────────────────┘ └───────────────────────────┘
                    │                           │
                    └───────────┬───────────────┘
                                │ @urbancart/api-client
┌───────────────────────────────┴─────────────────────────────────┐
│                    Backend API (Express)                        │
│                    apps/backend                                 │
│  ┌──────────┬──────────┬──────────┬──────────┐                 │
│  │  Routes  │ Services │  Models  │Middleware│                 │
│  └──────────┴──────────┴──────────┘──────────┘                 │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────┴───────┐      ┌───────┴───────┐      ┌────────┴───────┐
│    MongoDB    │      │     Redis     │      │   Cloudinary   │
│   (Primary)   │      │   (Cache/     │      │    (Images)    │
│               │      │    Sessions)  │      │                │
└───────────────┘      └───────────────┘      └────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
         ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐
         │  Razorpay   │ │   Resend    │ │   Sentry    │
         │ (Payments)  │ │  (Email)    │ │  (Errors)   │
         └─────────────┘ └─────────────┘ └─────────────┘
```

### Data Flow

1. **User Request** → Vercel Edge CDN (static assets cached)
2. **Dynamic Pages** → Next.js Server Components fetch from API
3. **Client Interactions** → TanStack Query manages server state
4. **Mutations** → API validates → MongoDB persists → Redis cache invalidated
5. **Background Jobs** → Order events trigger emails, inventory updates

### Key Architectural Principles

| Principle | Implementation |
|-----------|----------------|
| **Separation of Concerns** | Features are self-contained modules with own components, hooks, services |
| **Single Source of Truth** | Zustand for client state, TanStack Query for server state |
| **Type Safety** | End-to-end TypeScript, Zod validation at API boundaries |
| **Optimistic Updates** | Cart/wishlist updates reflect immediately, sync in background |
| **Error Boundaries** | Graceful degradation with user-friendly error states |
| **Lazy Loading** | Route-based code splitting, dynamic imports for heavy components |

## 6.2 Project Structure

### Directory Overview

| Directory | Purpose |
|-----------|---------|
| `frontend/src/api/` | API layer with auth, core client, and domain services |
| `frontend/src/app/` | Next.js App Router pages and layouts |
| `frontend/src/features/` | Domain-driven feature modules (self-contained) |
| `frontend/src/components/` | Shared/reusable UI components |
| `frontend/src/hooks/` | Global custom React hooks |
| `frontend/src/stores/` | Zustand state management stores |
| `frontend/src/lib/` | Utilities, providers, and configurations |
| `frontend/src/config/` | App configuration (routes, navigation, theme) |
| `frontend/src/lazy/` | Lazy loading utilities for code splitting |
| `frontend/src/types/` | Shared TypeScript type definitions |
| `frontend/src/utils/` | Helper functions and validators |
| `html_templates/` | Static HTML reference designs |
| `research/` | Business/Product/Technical requirement docs |

### Full Project Structure

```
urbancart/
├── frontend/                                 # Next.js 14 Storefront
│   ├── src/
│   │   ├── api/                             # API Layer
│   │   │   ├── auth/                        # Authentication
│   │   │   │   ├── api.ts                   # Auth API calls
│   │   │   │   ├── hooks.ts                 # Auth hooks (useLogin, useRegister)
│   │   │   │   ├── provider.tsx             # Auth context provider
│   │   │   │   ├── storage.ts               # Token storage utilities
│   │   │   │   ├── token-manager.ts         # JWT token management
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── core/                        # API Core
│   │   │   │   ├── client.ts                # Axios/fetch client setup
│   │   │   │   ├── endpoints.ts             # API endpoint constants
│   │   │   │   ├── interceptors.ts          # Request/response interceptors
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── services/                    # Domain Services
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── collections.service.ts
│   │   │   │   ├── orders.service.ts
│   │   │   │   ├── products.service.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── app/                             # Next.js App Router
│   │   │   ├── layout.tsx                   # Root layout
│   │   │   ├── globals.css                  # Global styles
│   │   │   ├── loading.tsx                  # Global loading state
│   │   │   ├── not-found.tsx                # 404 page
│   │   │   ├── error.tsx                    # Error boundary
│   │   │   ├── page.tsx                     # Landing page (/)
│   │   │   │
│   │   │   ├── about/
│   │   │   │   └── page.tsx                 # About page
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   └── page.tsx                 # Shopping cart
│   │   │   │
│   │   │   ├── collections/
│   │   │   │   └── page.tsx                 # Collections listing
│   │   │   │
│   │   │   ├── journal/
│   │   │   │   └── page.tsx                 # Brand journal/blog
│   │   │   │
│   │   │   ├── product/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx             # Product detail (dynamic)
│   │   │   │
│   │   │   ├── shop/
│   │   │   │   └── page.tsx                 # Shop/catalog page
│   │   │   │
│   │   │   ├── store/
│   │   │   │   └── page.tsx                 # Store locator
│   │   │   │
│   │   │   ├── fonts/                       # Custom fonts
│   │   │   │
│   │   │   │   # ─── PLANNED ROUTES ─────────────────────────
│   │   │   │
│   │   │   ├── (auth)/                      # Auth group (planned)
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   ├── forgot-password/page.tsx
│   │   │   │   └── reset-password/page.tsx
│   │   │   │
│   │   │   ├── (account)/                   # Account group (planned)
│   │   │   │   ├── layout.tsx               # Account sidebar layout
│   │   │   │   ├── profile/page.tsx
│   │   │   │   ├── orders/page.tsx
│   │   │   │   ├── orders/[id]/page.tsx
│   │   │   │   ├── addresses/page.tsx
│   │   │   │   └── wishlist/page.tsx
│   │   │   │
│   │   │   ├── (checkout)/                  # Checkout flow (planned)
│   │   │   │   ├── layout.tsx               # Minimal checkout layout
│   │   │   │   ├── shipping/page.tsx
│   │   │   │   ├── payment/page.tsx
│   │   │   │   └── confirmation/page.tsx
│   │   │   │
│   │   │   ├── collection/
│   │   │   │   └── [slug]/page.tsx          # Single collection (planned)
│   │   │   │
│   │   │   ├── category/
│   │   │   │   └── [slug]/page.tsx          # Category page (planned)
│   │   │   │
│   │   │   ├── search/page.tsx              # Search results (planned)
│   │   │   ├── contact/page.tsx             # Contact page (planned)
│   │   │   ├── faq/page.tsx                 # FAQ page (planned)
│   │   │   ├── sitemap.ts                   # Dynamic sitemap (planned)
│   │   │   └── robots.ts                    # Robots.txt (planned)
│   │   │
│   │   ├── features/                        # Feature Modules (Domain-Driven)
│   │   │   ├── landing/
│   │   │   │   ├── components/              # Feature-specific components
│   │   │   │   ├── domain/                  # Business logic & types
│   │   │   │   ├── hooks/                   # Feature hooks
│   │   │   │   ├── pages/                   # Page components
│   │   │   │   ├── services/                # Feature API calls
│   │   │   │   ├── types/                   # Feature types
│   │   │   │   └── index.ts                 # Public exports
│   │   │   │
│   │   │   ├── product/                     # Same structure as landing
│   │   │   │   ├── components/
│   │   │   │   ├── domain/
│   │   │   │   ├── hooks/
│   │   │   │   ├── pages/
│   │   │   │   ├── services/
│   │   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── collection/
│   │   │   ├── cart/
│   │   │   ├── shop/
│   │   │   ├── store/
│   │   │   ├── journal/
│   │   │   ├── about/
│   │   │   │
│   │   │   │   # ─── PLANNED FEATURES ───────────────────────
│   │   │   │
│   │   │   ├── auth/                        # Authentication (planned)
│   │   │   ├── account/                     # User account (planned)
│   │   │   ├── checkout/                    # Checkout flow (planned)
│   │   │   ├── wishlist/                    # Wishlist (planned)
│   │   │   ├── reviews/                     # Product reviews (planned)
│   │   │   ├── search/                      # Search & filters (planned)
│   │   │   └── shared/                      # Shared feature utilities
│   │   │
│   │   ├── components/                      # Shared Components
│   │   │   ├── layout/                      # Layout components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Sidebar/
│   │   │   │   ├── CommandPalette/
│   │   │   │   ├── ModalHost/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── form/                        # Form components
│   │   │   │   ├── Checkbox.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Textarea.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── feedback/                    # Feedback components
│   │   │   │   ├── Alert.tsx
│   │   │   │   ├── Skeleton.tsx
│   │   │   │   ├── Spinner.tsx
│   │   │   │   ├── Toast.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── ui/                          # UI primitives (shadcn/ui)
│   │   │
│   │   ├── hooks/                           # Global Hooks
│   │   │   ├── useAuth.ts                   # Authentication hook
│   │   │   ├── useDebounce.ts               # Input debouncing
│   │   │   ├── useToast.ts                  # Toast notifications
│   │   │   ├── useWorkspace.ts              # Workspace context
│   │   │   ├── index.ts
│   │   │   │
│   │   │   │   # ─── PLANNED HOOKS ──────────────────────────
│   │   │   │
│   │   │   ├── useMediaQuery.ts             # Responsive breakpoints (planned)
│   │   │   ├── useLocalStorage.ts           # Persisted state (planned)
│   │   │   ├── useIntersectionObserver.ts   # Lazy loading (planned)
│   │   │   └── useScrollLock.ts             # Modal scroll lock (planned)
│   │   │
│   │   ├── stores/                          # Zustand State Stores
│   │   │   ├── auth.store.ts                # Authentication state
│   │   │   ├── cart.store.ts                # Shopping cart state
│   │   │   ├── modal.store.ts               # Modal/dialog state
│   │   │   ├── ui.store.ts                  # UI preferences (theme, sidebar)
│   │   │   ├── workspace.store.ts           # Workspace context
│   │   │   ├── index.ts
│   │   │   │
│   │   │   │   # ─── PLANNED STORES ─────────────────────────
│   │   │   │
│   │   │   ├── wishlist.store.ts            # Wishlist items (planned)
│   │   │   ├── filters.store.ts             # Shop filters state (planned)
│   │   │   └── checkout.store.ts            # Checkout flow state (planned)
│   │   │
│   │   ├── lib/                             # Utilities & Providers
│   │   │   ├── dayjs.ts                     # Date formatting (dayjs config)
│   │   │   ├── performance.ts               # Performance monitoring utils
│   │   │   ├── query-provider.tsx           # TanStack Query provider
│   │   │   ├── query-keys.ts                # Query key factories
│   │   │   ├── index.ts
│   │   │   │
│   │   │   │   # ─── PLANNED LIB ────────────────────────────
│   │   │   │
│   │   │   ├── auth-provider.tsx            # Auth context (planned)
│   │   │   ├── theme-provider.tsx           # Theme context (planned)
│   │   │   └── analytics.ts                 # Analytics helpers (planned)
│   │   │
│   │   ├── config/                          # Configuration
│   │   │   ├── navigation.ts                # Navigation links
│   │   │   ├── routes.ts                    # Route constants
│   │   │   ├── theme/                       # Theme configuration
│   │   │   │   ├── colors.ts                # Color palette
│   │   │   │   ├── typography.ts            # Font scales
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   │
│   │   │   │   # ─── PLANNED CONFIG ─────────────────────────
│   │   │   │
│   │   │   ├── constants.ts                 # App constants (planned)
│   │   │   ├── seo.ts                       # Default SEO config (planned)
│   │   │   └── features.ts                  # Feature flags (planned)
│   │   │
│   │   ├── lazy/                            # Lazy Loading
│   │   │   ├── cart.lazy.ts                 # Cart page lazy loader
│   │   │   ├── collection.lazy.ts           # Collection lazy loader
│   │   │   ├── landing.lazy.ts              # Landing lazy loader
│   │   │   ├── product.lazy.ts              # Product lazy loader
│   │   │   ├── shop.lazy.ts                 # Shop lazy loader
│   │   │   └── index.ts
│   │   │
│   │   ├── types/                           # TypeScript Types
│   │   │   ├── api.types.ts                 # API response types
│   │   │   ├── auth.types.ts                # Auth types
│   │   │   ├── product.ts                   # Product types
│   │   │   ├── index.ts
│   │   │   │
│   │   │   │   # ─── PLANNED TYPES ──────────────────────────
│   │   │   │
│   │   │   ├── cart.types.ts                # Cart types (planned)
│   │   │   ├── order.types.ts               # Order types (planned)
│   │   │   ├── collection.types.ts          # Collection types (planned)
│   │   │   └── common.types.ts              # Shared types (planned)
│   │   │
│   │   ├── utils/                           # Utility Functions
│   │   │   ├── cn.ts                        # Class name merger (clsx + twMerge)
│   │   │   ├── storage.ts                   # localStorage helpers
│   │   │   ├── validation.ts                # Zod schemas & validators
│   │   │   ├── index.ts
│   │   │   │
│   │   │   │   # ─── PLANNED UTILS ──────────────────────────
│   │   │   │
│   │   │   ├── formatters.ts                # Price/date formatters (planned)
│   │   │   ├── seo.ts                       # SEO helpers (planned)
│   │   │   └── analytics.ts                 # Analytics tracking (planned)
│   │   │
│   │   └── routes/                          # Route Definitions
│   │
│   ├── public/                              # Static Assets
│   │   ├── assets/
│   │   │   ├── icons/                       # SVG icons
│   │   │   └── illustrations/               # Illustrations
│   │   └── images/                          # Product & brand images
│   │
│   ├── next.config.mjs                      # Next.js config
│   ├── tailwind.config.ts                   # Tailwind config
│   ├── postcss.config.mjs                   # PostCSS config
│   ├── tsconfig.json                        # TypeScript config
│   └── package.json
│
├── html_templates/                          # Static HTML References
│   ├── homepage.html                        # Landing page template
│   ├── shop.html                            # Shop page template
│   ├── collection.html                      # Collection template
│   ├── product.html                         # Product detail template
│   ├── cart.html                            # Cart template
│   ├── journal.html                         # Journal template
│   ├── about.html                           # About page template
│   └── store.html                           # Store locator template
│
├── research/                                # Documentation & Research
│   ├── BRD.md                               # Business Requirements
│   ├── PRD.md                               # Product Requirements
│   ├── TRD.md                               # Technical Requirements
│   ├── COMPETITIVE_DIFFERENTIATION_ANALYSIS.md
│   ├── FASHION_BRAND_RESEARCH_REPORT.md
│   └── PRODUCT_BUILD_QUICK_REFERENCE.md
│
├── .claude/                                 # AI Assistant Context
│   └── PRD.md                               # This document
│
├── CLAUDE.md                                # Claude instructions
└── README.md
```

### Future Expansion (Admin & Backend)

The following structure is planned for Phase 2 development. Admin panel and backend API will follow the same architectural patterns as the frontend.

**Admin Panel Purpose:**
- Product catalog management (CRUD, bulk operations, image uploads)
- Order management (status updates, refunds, fulfillment)
- Customer management (profiles, order history)
- Analytics dashboard (revenue, traffic, conversion metrics)
- Marketing tools (coupons, promotions, email campaigns)
- Content management (journal posts, banners, SEO)

**Backend API Purpose:**
- RESTful API serving both web storefront and admin panel
- Authentication & authorization (JWT + refresh tokens, RBAC)
- Business logic layer (pricing, inventory, order processing)
- Third-party integrations (payments, shipping, email)
- Background jobs (email queues, inventory sync, report generation)

```
urbancart/
├── ...existing structure...
│
├── admin/                                   # React + Vite Admin (Planned)
│   ├── src/
│   │   ├── main.tsx                         # App entry point
│   │   ├── router.tsx                       # React Router config
│   │   ├── layouts/
│   │   │   ├── dashboard-layout.tsx
│   │   │   └── auth-layout.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   ├── collections/
│   │   │   ├── categories/
│   │   │   ├── orders/
│   │   │   ├── customers/
│   │   │   ├── reviews/
│   │   │   ├── coupons/
│   │   │   ├── analytics/
│   │   │   ├── marketing/
│   │   │   └── settings/
│   │   │
│   │   ├── features/                        # Feature-based modules
│   │   │   └── [feature]/
│   │   │       ├── components/
│   │   │       ├── hooks/                   # TanStack Query hooks
│   │   │       ├── services/                # API service functions
│   │   │       └── types/
│   │   │
│   │   ├── api/                             # API Layer
│   │   │   ├── auth/                        # Authentication
│   │   │   │   ├── api.ts                   # Auth API calls
│   │   │   │   ├── hooks.ts                 # Auth hooks (useAdminLogin)
│   │   │   │   ├── provider.tsx             # Auth context provider
│   │   │   │   ├── storage.ts               # Token storage utilities
│   │   │   │   ├── token-manager.ts         # JWT token management
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── core/                        # API Core
│   │   │   │   ├── client.ts                # Axios/fetch client setup
│   │   │   │   ├── endpoints.ts             # API endpoint constants
│   │   │   │   ├── interceptors.ts          # Request/response interceptors
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── services/                    # Domain Services
│   │   │   │   ├── analytics.service.ts
│   │   │   │   ├── categories.service.ts
│   │   │   │   ├── collections.service.ts
│   │   │   │   ├── coupons.service.ts
│   │   │   │   ├── customers.service.ts
│   │   │   │   ├── orders.service.ts
│   │   │   │   ├── products.service.ts
│   │   │   │   ├── reviews.service.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── components/
│   │   ├── hooks/                           # Shared TanStack Query hooks
│   │   ├── stores/                          # Zustand stores
│   │   ├── lib/
│   │   │   ├── query-provider.tsx           # TanStack Query provider
│   │   │   └── query-keys.ts                # Query key factories
│   │   └── types/
│   │
│   ├── vite.config.ts
│   └── package.json
│
└── backend/                                 # Express API (Planned)
    ├── src/
    │   ├── index.ts
    │   ├── app.ts
    │   │
    │   ├── config/
    │   ├── modules/
    │   │   ├── auth/
    │   │   ├── users/
    │   │   ├── products/
    │   │   ├── collections/
    │   │   ├── categories/
    │   │   ├── cart/                        # Shopping cart logic
    │   │   ├── wishlist/                    # Wishlist management
    │   │   ├── orders/                      # Order processing
    │   │   ├── payments/                    # Razorpay integration
    │   │   ├── reviews/                     # Product reviews
    │   │   ├── coupons/                     # Discount codes
    │   │   ├── content/                     # CMS content
    │   │   ├── analytics/                   # Analytics events
    │   │   └── notifications/               # Email/push notifications
    │   │
    │   ├── repositories/                    # Database access layer
    │   ├── middleware/                      # Express middleware
    │   │   ├── auth.ts                      # JWT authentication
    │   │   ├── validate.ts                  # Request validation
    │   │   ├── rate-limit.ts                # Rate limiting
    │   │   ├── error-handler.ts             # Global error handler
    │   │   └── logging.ts                   # Request logging
    │   │
    │   ├── validators/                      # Zod validation schemas
    │   ├── jobs/                            # Background job definitions
    │   │   ├── email.job.ts                 # Email queue processor
    │   │   ├── inventory.job.ts             # Inventory sync
    │   │   └── report.job.ts                # Report generation
    │   │
    │   ├── events/                          # Event emitters & handlers
    │   ├── templates/                       # Email templates (React Email)
    │   ├── utils/                           # Utility functions
    │   ├── types/                           # TypeScript types
    │   └── constants/                       # App constants
    │
    ├── tests/
    │   ├── unit/                            # Unit tests
    │   ├── integration/                     # API integration tests
    │   └── fixtures/                        # Test data
    │
    └── package.json
```

## 6.3 Key Design Patterns

### Backend Patterns
- **Repository Pattern:** Services interact with Mongoose through model abstractions
- **Service Layer:** Business logic separated from route handlers
- **Middleware Chain:** Auth → Validation → Rate Limiting → Handler
- **DTO Pattern:** Request/response validation with Zod schemas
- **Error Handling:** Centralized error handler with typed errors
- **Event Emitters:** Order events trigger emails, analytics

### Frontend Patterns (Web + Admin)
- **Feature-Based Structure:** Each feature is self-contained
- **Server State:** TanStack Query for API data
- **Client State:** Zustand for UI state
- **Shared Components:** Import from `@urbancart/ui`
- **Type Safety:** Import types from `@urbancart/types`

### TanStack Query Patterns (Frontend & Admin)

All API calls use TanStack Query v5 for server state management. No raw `useEffect` for data fetching.

**Query Key Convention:**
```typescript
// Key factory pattern for consistency
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};
```

**Custom Hooks Pattern:**
```typescript
// features/product/hooks/useProducts.ts
export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productsService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  });
}
```

**Mutations with Optimistic Updates:**
```typescript
// features/cart/hooks/useAddToCart.ts
export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cartService.addItem,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData(['cart']);
      
      // Optimistically update cart
      queryClient.setQueryData(['cart'], (old: Cart) => ({
        ...old,
        items: [...old.items, { ...newItem, id: 'temp' }],
      }));
      
      return { previousCart };
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
```

**Infinite Queries for Pagination:**
```typescript
// features/shop/hooks/useInfiniteProducts.ts
export function useInfiniteProducts(filters: ProductFilters) {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', filters],
    queryFn: ({ pageParam = 1 }) => 
      productsService.getAll({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => 
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
}
```

**Prefetching for Navigation:**
```typescript
// Prefetch product on hover
const queryClient = useQueryClient();

const handleProductHover = (productId: string) => {
  queryClient.prefetchQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productsService.getById(productId),
    staleTime: 5 * 60 * 1000,
  });
};
```

**Query Configuration (Frontend):**
```typescript
// lib/query-provider.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,           // 1 minute
      gcTime: 10 * 60 * 1000,         // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

**Query Configuration (Admin):**
```typescript
// admin/lib/query-provider.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,           // 30 seconds (admin needs fresher data)
      gcTime: 5 * 60 * 1000,          // 5 minutes
      retry: 2,
      refetchOnWindowFocus: true,     // Refresh on tab focus for admin
    },
  },
});
```

**Service Layer Integration:**
```typescript
// api/services/products.service.ts
import { apiClient } from '../core/client';
import type { Product, ProductFilters, PaginatedResponse } from '@/types';

export const productsService = {
  getAll: async (filters: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const { data } = await apiClient.get('/products', { params: filters });
    return data;
  },
  
  getById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },
  
  create: async (product: CreateProductDTO): Promise<Product> => {
    const { data } = await apiClient.post('/products', product);
    return data;
  },
};
```

### Monorepo Patterns
- **Internal Packages:** Use `workspace:*` protocol
- **Shared Config:** ESLint, TypeScript, Tailwind presets
- **Turborepo Caching:** Build cache for faster CI
- **Task Dependencies:** `turbo.json` defines build order

---

# 7. Features & API Specification

## 7.1 Authentication

### Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Create new user account | Public |
| POST | `/api/auth/login` | Login and receive tokens | Public |
| POST | `/api/auth/logout` | Invalidate refresh token | Auth |
| POST | `/api/auth/refresh` | Get new access token | Public |
| GET | `/api/auth/me` | Get current user profile | Auth |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| POST | `/api/auth/reset-password` | Reset password with token | Public |
| POST | `/api/auth/verify-email` | Verify email address | Public |
| POST | `/api/auth/admin/login` | Admin login | Public |

### Request/Response Examples

**POST /api/auth/register**
```json
// Request
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "Arjun",
  "lastName": "Sharma"
}

// Response (201)
{
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "email": "user@example.com",
    "firstName": "Arjun",
    "lastName": "Sharma",
    "role": "customer",
    "createdAt": "2026-02-28T10:00:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

## 7.2 Products

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products with filters |
| GET | `/api/products/:slug` | Get product details by slug |
| GET | `/api/products/search` | Search products |
| GET | `/api/categories` | List all categories |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/products` | List all products (with drafts) |
| POST | `/api/admin/products` | Create new product |
| GET | `/api/admin/products/:id` | Get product by ID |
| PATCH | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |
| POST | `/api/admin/products/:id/duplicate` | Duplicate product |
| POST | `/api/admin/products/:id/variants` | Add variant |
| PATCH | `/api/admin/products/:id/variants/:variantId` | Update variant |
| DELETE | `/api/admin/products/:id/variants/:variantId` | Delete variant |
| POST | `/api/admin/products/:id/images` | Upload images |
| PATCH | `/api/admin/products/:id/images/reorder` | Reorder images |

### Query Parameters (GET /api/products)

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category slug |
| `collection` | string | Filter by collection slug |
| `size` | string[] | Filter by available sizes |
| `color` | string[] | Filter by colors |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `sort` | string | Sort by: `newest`, `price_asc`, `price_desc`, `bestselling` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 12, max: 48) |
| `q` | string | Search query |

### Response Example

**GET /api/products?category=tshirts&size=M&page=1**
```json
{
  "data": [
    {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Alpha Cross Embroidered Boxy Tee",
      "slug": "alpha-cross-embroidered-boxy-tee",
      "price": 500000,
      "compareAtPrice": null,
      "category": {
        "id": "65f1a2b3c4d5e6f7g8h9i0k1",
        "name": "T-Shirts",
        "slug": "tshirts"
      },
      "images": [
        {
          "url": "https://res.cloudinary.com/urbancart/products/abc123-front.webp",
          "alt": "Alpha Cross Tee Front",
          "position": 1
        }
      ],
      "variants": [
        {
          "id": "65f1a2b3c4d5e6f7g8h9i0l1",
          "size": "M",
          "color": "Black",
          "colorHex": "#0A0A0A",
          "sku": "ACT-BLK-M",
          "inventory": 15,
          "available": true
        }
      ],
      "tags": ["new-arrival", "embroidered"],
      "hsnCode": "6109",
      "gstRate": 18
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 48,
    "totalPages": 4,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 7.3 Collections

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/collections` | List active collections |
| GET | `/api/collections/:slug` | Get collection with products |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/collections` | List all collections |
| POST | `/api/admin/collections` | Create collection |
| PATCH | `/api/admin/collections/:id` | Update collection |
| DELETE | `/api/admin/collections/:id` | Delete collection |
| POST | `/api/admin/collections/:id/products` | Add products to collection |
| DELETE | `/api/admin/collections/:id/products/:productId` | Remove product |
| PATCH | `/api/admin/collections/:id/products/reorder` | Reorder products |

## 7.4 Cart

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get current cart |
| POST | `/api/cart/items` | Add item to cart |
| PATCH | `/api/cart/items/:itemId` | Update item quantity |
| DELETE | `/api/cart/items/:itemId` | Remove item from cart |
| DELETE | `/api/cart` | Clear entire cart |
| POST | `/api/cart/merge` | Merge guest cart with user cart |

### Cart Storage Strategy

- **Guests:** Cart ID stored in cookie, cart data in Redis (7-day TTL)
- **Logged-in Users:** Cart stored in MongoDB, linked to user ID
- **Cart Merge:** On login, guest cart items merge into user cart

## 7.5 Checkout & Orders

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout` | Create checkout session |
| POST | `/api/checkout/shipping` | Set shipping address |
| POST | `/api/checkout/payment` | Create Razorpay order |
| GET | `/api/orders` | List user's orders |
| GET | `/api/orders/:id` | Get order details |
| GET | `/api/orders/:id/invoice` | Download invoice PDF |
| GET | `/api/orders/:orderNumber/track` | Track order by number (guest) |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/orders` | List all orders with filters |
| GET | `/api/admin/orders/:id` | Get order details |
| PATCH | `/api/admin/orders/:id/status` | Update order status |
| POST | `/api/admin/orders/:id/tracking` | Add tracking info |
| POST | `/api/admin/orders/:id/note` | Add internal note |
| POST | `/api/admin/orders/:id/refund` | Process refund |
| GET | `/api/admin/orders/export` | Export orders to CSV |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhooks/razorpay` | Razorpay payment webhook |

## 7.6 Admin Dashboard

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard/stats` | Key metrics |
| GET | `/api/admin/dashboard/recent-orders` | Latest 10 orders |
| GET | `/api/admin/dashboard/low-stock` | Products with low inventory |
| GET | `/api/admin/dashboard/revenue` | Revenue by period |
| GET | `/api/admin/dashboard/top-products` | Best selling products |

### Response Example

**GET /api/admin/dashboard/stats**
```json
{
  "today": {
    "orders": 15,
    "revenue": 8500000,
    "customers": 12,
    "averageOrderValue": 566667
  },
  "thisWeek": {
    "orders": 87,
    "revenue": 52300000,
    "customers": 71
  },
  "thisMonth": {
    "orders": 342,
    "revenue": 215600000,
    "customers": 289
  },
  "pendingOrders": 23,
  "processingOrders": 15,
  "lowStockProducts": 8,
  "outOfStockVariants": 3,
  "totalProducts": 156,
  "totalCustomers": 1842,
  "conversionRate": 2.3
}
```

## 7.7 User Management

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PATCH | `/api/users/profile` | Update profile |
| GET | `/api/users/addresses` | List saved addresses |
| POST | `/api/users/addresses` | Add new address |
| PATCH | `/api/users/addresses/:id` | Update address |
| DELETE | `/api/users/addresses/:id` | Delete address |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/customers` | List all customers |
| GET | `/api/admin/customers/:id` | Get customer details with orders |
| GET | `/api/admin/customers/:id/orders` | Get customer's order history |

## 7.8 Static Pages & Content

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pages/:slug` | Get static page content |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter/subscribe` | Newsletter signup |
| GET | `/api/sitemap` | Generate sitemap XML |

## 7.9 Health & Monitoring

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Basic health check |
| GET | `/api/health/detailed` | Detailed health (DB, Redis) |

---

# 8. Technology Stack

## 8.1 Web Storefront (apps/web)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework with App Router |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| TanStack Query | 5.x | Server state management |
| Zustand | 4.x | Client state management |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | latest | UI component system |
| React Hook Form | 7.x | Form handling |
| Zod | 3.x | Validation |
| Lucide React | latest | Icons |
| next-seo | latest | SEO management |

## 8.2 Admin Panel (apps/admin)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI library |
| Vite | 5.x | Build tool |
| TypeScript | 5.x | Type safety |
| React Router | 6.x | Routing |
| TanStack Query | 5.x | Server state |
| TanStack Table | 8.x | Data tables |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | latest | UI component system |
| React Hook Form | 7.x | Form handling |
| Recharts | 2.x | Charts/analytics |
| date-fns | 3.x | Date handling |
| react-dropzone | latest | File uploads |
| dnd-kit | latest | Drag and drop |

## 8.3 Backend API (apps/backend)

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x LTS | Runtime |
| TypeScript | 5.x | Type safety |
| Express | 4.x | HTTP framework |
| Mongoose | 8.x | MongoDB ODM |
| MongoDB | 7.x | Primary database |
| Redis | 7.x | Caching, sessions |
| Zod | 3.x | Request validation |
| jsonwebtoken | 9.x | JWT handling |
| bcrypt | 5.x | Password hashing |
| winston | 3.x | Structured logging |
| helmet | 7.x | Security headers |
| cors | 2.x | CORS handling |
| multer | 1.x | File uploads |
| cloudinary | 2.x | Image storage |
| razorpay | 2.x | Payment SDK |
| @react-pdf/renderer | 3.x | Invoice PDF generation |
| nodemailer | 6.x | Email sending |
| bull | 4.x | Job queues |

## 8.4 Shared Packages

| Package | Purpose |
|---------|---------|
| `@urbancart/ui` | Shared shadcn-based components |
| `@urbancart/types` | TypeScript type definitions |
| `@urbancart/api-client` | Type-safe HTTP client |
| `@urbancart/auth` | Authentication utilities |
| `@urbancart/utils` | Common helpers (formatting, validation) |
| `@urbancart/config` | ESLint, TypeScript, Tailwind presets |

## 8.5 Infrastructure & Services

| Service | Purpose |
|---------|---------|
| **Vercel** | Web storefront hosting |
| **Vercel / Netlify** | Admin panel hosting |
| **Railway / Render** | Backend hosting |
| **MongoDB Atlas** | Managed MongoDB |
| **Upstash** | Managed Redis |
| **Cloudinary** | Image optimization and CDN |
| **Razorpay** | Payment processing |
| **Resend** | Transactional email |
| **Sentry** | Error tracking |
| **BetterUptime** | Uptime monitoring |

## 8.6 Development Tools

| Tool | Purpose |
|------|---------|
| Turborepo | Monorepo build system |
| pnpm | Package manager (workspaces) |
| ESLint | Linting |
| Prettier | Code formatting |
| Jest | Unit testing |
| Supertest | API integration testing |
| Playwright | E2E testing |
| Docker Compose | Local development |
| GitHub Actions | CI/CD |

---

# 9. Security & Configuration

## 9.1 Authentication & Authorization

### JWT Strategy
- **Access Token:** 15-minute expiry, stored in memory (frontend)
- **Refresh Token:** 7-day expiry, HTTP-only cookie
- **Token Rotation:** New refresh token issued on each refresh

### Password Requirements
- Minimum 8 characters
- At least one uppercase, one lowercase, one number
- Bcrypt hashing with cost factor 12

### Role-Based Access
| Role | Permissions |
|------|-------------|
| `customer` | View products, manage own cart/orders/profile |
| `admin` | All customer permissions + full admin access |

### Admin Route Protection
- All `/api/admin/*` routes require `admin` role
- Admin panel requires separate login
- Admin actions logged for audit

## 9.2 Environment Variables

### Backend (.env)
```bash
# Server
NODE_ENV=development
PORT=8000
API_URL=http://localhost:8000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/urbancart

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_ACCESS_SECRET=<generate-32-char-random>
JWT_REFRESH_SECRET=<generate-32-char-random>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

# Email
RESEND_API_KEY=xxx
FROM_EMAIL=orders@urbancart.com
SUPPORT_EMAIL=support@urbancart.com

# GST
GST_RATE=18
COMPANY_GSTIN=27XXXXX1234X1ZX
COMPANY_NAME=UrbanCart Private Limited
COMPANY_ADDRESS=123 MG Road, Mumbai, Maharashtra 400001

# Sentry
SENTRY_DSN=xxx

# Frontend URLs
WEB_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

### Web (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_RAZORPAY_KEY=rzp_test_xxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=xxx
NEXT_PUBLIC_SITE_URL=https://urbancart.com
```

### Admin (.env)
```bash
VITE_API_URL=http://localhost:8000/api
VITE_SENTRY_DSN=xxx
```

## 9.3 Security Measures

### In Scope (MVP)
- ✅ HTTPS everywhere
- ✅ CORS restricted to frontend domains
- ✅ Helmet security headers
- ✅ Rate limiting (100 req/min per IP)
- ✅ Input validation with Zod
- ✅ NoSQL injection prevention (Mongoose sanitization)
- ✅ XSS prevention (React's built-in escaping)
- ✅ CSRF protection (SameSite cookies)
- ✅ Admin action audit logging
- ✅ Secure password reset flow
- ✅ Email verification

### Out of Scope (Phase 2+)
- ❌ Two-factor authentication
- ❌ OAuth social login
- ❌ PCI compliance (handled by Razorpay)
- ❌ Advanced fraud detection

---

# 10. Infrastructure & Scaling

## 10.1 Infrastructure Overview

### Current State (MVP)

```
┌─────────────────────────────────────────────────────────────────┐
│                    Vercel (Frontend Hosting)                    │
│                    - Next.js SSR/SSG                           │
│                    - Edge Functions                             │
│                    - CDN for static assets                      │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                    Railway / Render (Backend)                   │
│                    - Express API                                │
│                    - Auto-scaling containers                    │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────┴───────┐      ┌───────┴───────┐      ┌────────┴───────┐
│  MongoDB Atlas │      │  Upstash Redis│      │   Cloudinary   │
│   (M10 Cluster)│      │   (Serverless)│      │    (Media)     │
└───────────────┘      └───────────────┘      └────────────────┘
```

### Scaled Architecture (Year 2+)

```
┌─────────────────────────────────────────────────────────────────┐
│                      Cloudflare (CDN + WAF)                     │
│                    - DDoS protection                            │
│                    - Edge caching                               │
│                    - Rate limiting at edge                      │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                       AWS / GCP (Cloud)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Kubernetes │  │     ECS/    │  │    Lambda / Cloud       │  │
│  │   (EKS/GKE) │  │   Fargate   │  │    Functions            │  │
│  │  - API Pods │  │  - Workers  │  │  - Image processing     │  │
│  │  - Auto HPA │  │  - Jobs     │  │  - Email sending        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
┌───────────────────────────────┴─────────────────────────────────┐
│                       Data Layer                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────┐  │
│  │   MongoDB   │  │    Redis    │  │   Search    │  │ S3/GCS │  │
│  │   Atlas     │  │   Cluster   │  │(Elasticsearch│ │(Assets)│  │
│  │   M30+      │  │  (Replicas) │  │/Algolia)    │  │        │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 10.2 CI/CD Pipeline

### GitHub Actions Workflows

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:7
        ports:
          - 27017:27017
      redis:
        image: redis:7
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
      - run: pnpm test:e2e

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: |
            apps/web/.next
            apps/admin/dist
            apps/backend/dist
```

### Deployment Workflows

```yaml
# .github/workflows/deploy-production.yml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

## 10.3 Docker Configuration

### Development Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./apps/backend
      dockerfile: Dockerfile.dev
    ports:
      - "8000:8000"
    volumes:
      - ./apps/backend/src:/app/src
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mongodb://root:password@mongodb:27017/urbancart?authSource=admin
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongodb
      - redis

  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./apps/web/src:/app/src
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000

  admin:
    build:
      context: ./apps/admin
      dockerfile: Dockerfile.dev
    ports:
      - "3001:3001"
    volumes:
      - ./apps/admin/src:/app/src

volumes:
  mongodb_data:
  redis_data:
```

### Production Dockerfile (Backend)

```dockerfile
# apps/backend/Dockerfile
FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM base AS builder
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

USER expressjs
EXPOSE 8000
CMD ["node", "dist/index.js"]
```

### Production Dockerfile (Frontend)

```dockerfile
# apps/web/Dockerfile
FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

## 10.4 Monitoring & Observability

### Logging Strategy

```typescript
// apps/backend/src/lib/logger.ts
import pino from 'pino';
import pinoHttp from 'pino-http';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development' 
    ? { target: 'pino-pretty' }
    : undefined,
  base: {
    env: process.env.NODE_ENV,
    version: process.env.APP_VERSION,
  },
  redact: ['req.headers.authorization', 'password', 'token'],
});

// Request logging middleware
export const requestLogger = pinoHttp({
  logger,
  customProps: (req) => ({
    requestId: req.id,
    userId: req.user?.id,
  }),
});
```

### Sentry Integration

```typescript
// apps/web/src/lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  profilesSampleRate: 0.1,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/api\.urbancart\.in/],
    }),
  ],
});
```

### Health Checks

```typescript
// apps/backend/src/routes/health.ts
import { Router } from 'express';
import mongoose from 'mongoose';
import { redis } from '../lib/redis';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.get('/health/detailed', async (req, res) => {
  const checks = await Promise.allSettled([
    mongoose.connection.db.admin().ping(),
    redis.ping(),
  ]);
  
  res.json({
    status: checks.every(c => c.status === 'fulfilled') ? 'healthy' : 'degraded',
    services: {
      mongodb: checks[0].status === 'fulfilled' ? 'up' : 'down',
      redis: checks[1].status === 'fulfilled' ? 'up' : 'down',
    },
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

export default router;
```

### Metrics Dashboard

| Metric | Tool | Purpose |
|--------|------|---------|  
| API Response Time | Sentry Performance | P50, P95, P99 latencies |
| Error Rate | Sentry | Track error spikes |
| Request Volume | Cloudflare Analytics | Traffic patterns |
| Database Queries | MongoDB Atlas | Slow query analysis |
| Cache Hit Rate | Upstash Dashboard | Redis performance |
| Core Web Vitals | Vercel Analytics | Frontend performance |
| Conversion Rate | PostHog / Mixpanel | Business metrics |
| Cart Abandonment | Custom Events | Revenue optimization |

## 10.5 Caching Strategy

### Multi-Layer Caching

```
┌─────────────────────────────────────────────────────────────────┐
│                    Layer 1: CDN Cache                           │
│                    - Static assets (1 year)                    │
│                    - Product images (1 week)                   │
│                    - HTML pages (5 min stale-while-revalidate) │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                    Layer 2: Application Cache                   │
│                    - TanStack Query (client)                   │
│                    - Redis (server)                            │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                    Layer 3: Database                            │
│                    - MongoDB indexes                           │
│                    - Read replicas (Year 2+)                   │
└─────────────────────────────────────────────────────────────────┘
```

### Redis Caching Patterns

```typescript
// apps/backend/src/lib/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache-aside pattern
export async function getCached<T>(
  key: string,
  ttlSeconds: number,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFn();
  await redis.setex(key, ttlSeconds, JSON.stringify(data));
  return data;
}

// Cache invalidation
export async function invalidateCache(pattern: string) {
  const keys = await redis.keys(pattern);
  if (keys.length) await redis.del(...keys);
}

// Write-through for critical data
export async function setWithWriteThrough<T>(
  key: string,
  data: T,
  ttlSeconds: number,
  persistFn: (data: T) => Promise<void>
): Promise<void> {
  await persistFn(data);
  await redis.setex(key, ttlSeconds, JSON.stringify(data));
}
```

### Cache TTL Guidelines

| Data Type | TTL | Invalidation Trigger |
|-----------|-----|----------------------|
| Product listing | 5 min | On product update |
| Product detail | 10 min | On product update |
| Categories | 1 hour | On category CRUD |
| Collections | 30 min | On collection update |
| Cart | Session (7 days) | On cart mutation |
| User session | 7 days | On logout/password change |
| Home page data | 5 min | On feature flag change |
| Search results | 2 min | On product changes |
| Inventory counts | 30 sec | On order placement |

## 10.6 Testing Strategy

### Testing Pyramid

```
                    ┌────────────────┐
                    │   E2E Tests    │  10%
                    │  (Playwright)  │  - Critical user journeys
                    └────────────────┘
               ┌─────────────────────────┐
               │   Integration Tests     │  20%
               │   (Vitest + Supertest)  │  - API endpoints
               └─────────────────────────┘
          ┌───────────────────────────────────┐
          │         Unit Tests                │  70%
          │      (Vitest + React Testing Lib) │  - Components, hooks, utils
          └───────────────────────────────────┘
```

### Test Configuration

```typescript
// vitest.config.ts (Frontend)
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules', 'src/test', '**/*.d.ts'],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### E2E Test Structure

```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';
import { ProductPage } from './pages/product.page';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';

test.describe('Checkout Flow', () => {
  test('complete purchase flow', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Add product to cart
    await productPage.goto('horizon-tee');
    await productPage.selectSize('M');
    await productPage.addToCart();
    
    // Verify cart
    await cartPage.goto();
    await expect(cartPage.itemCount).toBe(1);
    await cartPage.proceedToCheckout();
    
    // Fill shipping
    await checkoutPage.fillShipping({
      firstName: 'Test',
      lastName: 'User',
      address: '123 Test St',
      city: 'Mumbai',
      pincode: '400001',
      phone: '9876543210',
    });
    
    // Complete payment
    await checkoutPage.selectPaymentMethod('UPI');
    await checkoutPage.placeOrder();
    
    // Verify confirmation
    await expect(page).toHaveURL(/\/confirmation/);
    await expect(page.getByText('Order Confirmed')).toBeVisible();
  });
});
```

### Page Object Model

```typescript
// tests/e2e/pages/product.page.ts
import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly sizeSelector: Locator;
  readonly quantityInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.sizeSelector = page.getByRole('radiogroup', { name: 'Size' });
    this.quantityInput = page.getByLabel('Quantity');
  }

  async goto(slug: string) {
    await this.page.goto(`/product/${slug}`);
  }

  async selectSize(size: string) {
    await this.sizeSelector.getByLabel(size).check();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForResponse('**/api/cart/**');
  }
}
```

## 10.7 Database Scaling

### MongoDB Indexing Strategy

```typescript
// apps/backend/src/models/product.model.ts

// Compound indexes for common queries
ProductSchema.index({ category: 1, isActive: 1, createdAt: -1 });
ProductSchema.index({ collection: 1, isActive: 1 });
ProductSchema.index({ 'variants.sku': 1 }, { unique: true });
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ price: 1, isActive: 1 }); // For price filtering

// Text index for search
ProductSchema.index(
  { name: 'text', description: 'text', 'tags': 'text' },
  { weights: { name: 10, tags: 5, description: 1 } }
);

// TTL index for cart expiry
CartSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 604800 }); // 7 days

// Order indexes
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ orderNumber: 1 }, { unique: true });
```

### Scaling Path

| Phase | Users | Database Strategy |
|-------|-------|-------------------|
| MVP | 0-10K | Single MongoDB Atlas M10, Upstash Redis |
| Year 1 | 10-50K | MongoDB M30, Redis cluster, read replicas |
| Year 2 | 50-200K | MongoDB sharding by category, Elasticsearch for search |
| Year 3+ | 200K+ | Microservices with separate DBs, event sourcing for orders |

### Read Replica Strategy (Year 2+)

```typescript
// Connection with read preference
const readConn = mongoose.createConnection(process.env.MONGODB_URI, {
  readPreference: 'secondaryPreferred',
  readConcern: { level: 'majority' },
});

// Use for read-heavy operations
export const ProductReadModel = readConn.model('Product', ProductSchema);

// Primary for writes
export const ProductModel = mongoose.model('Product', ProductSchema);
```

## 10.8 Environment Configuration

### Environment Variables

```bash
# .env.example

# ─── Application ──────────────────────────────────────────────────
NODE_ENV=development
PORT=8000
APP_VERSION=1.0.0
LOG_LEVEL=debug

# ─── URLs ─────────────────────────────────────────────────────────
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
API_URL=http://localhost:8000

# ─── Database ─────────────────────────────────────────────────────
MONGODB_URI=mongodb://localhost:27017/urbancart
REDIS_URL=redis://localhost:6379

# ─── Authentication ───────────────────────────────────────────────
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# ─── Razorpay ─────────────────────────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# ─── Cloudinary ───────────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=urbancart
CLOUDINARY_API_KEY=xxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# ─── Email (Resend) ───────────────────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=UrbanCart <hello@urbancart.in>

# ─── Monitoring ───────────────────────────────────────────────────
SENTRY_DSN=https://xxxxxx@sentry.io/xxxxxx
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxx@sentry.io/xxxxxx

# ─── Analytics (Optional) ─────────────────────────────────────────
POSTHOG_API_KEY=phc_xxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxx
```

### Environment Validation

```typescript
// apps/backend/src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().transform(Number).default('8000'),
  MONGODB_URI: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_KEY_SECRET: z.string(),
  FRONTEND_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

---

# 11. Data Models

## 11.1 MongoDB Schemas

### User Schema
```typescript
// apps/backend/src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'admin';
  emailVerified: boolean;
  addresses: IAddress[];
  gstin?: string;  // For B2B customers
  createdAt: Date;
  updatedAt: Date;
}

interface IAddress {
  _id: mongoose.Types.ObjectId;
  label?: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}
```

### Product Schema
```typescript
// apps/backend/src/models/product.model.ts
export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;           // in paise
  compareAtPrice?: number;
  category: mongoose.Types.ObjectId;
  collections: mongoose.Types.ObjectId[];
  images: IProductImage[];
  variants: IProductVariant[];
  tags: string[];
  status: 'draft' | 'active' | 'archived';
  hsnCode: string;         // HSN code for GST
  gstRate: number;         // GST percentage
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IProductVariant {
  _id: mongoose.Types.ObjectId;
  sku: string;
  size: string;
  color: string;
  colorHex: string;
  inventory: number;
  lowStockThreshold: number;
}
```

### Order Schema
```typescript
// apps/backend/src/models/order.model.ts
export interface IOrder extends Document {
  orderNumber: string;
  user?: mongoose.Types.ObjectId;
  guestEmail?: string;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  taxBreakdown: ITaxBreakdown;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: IShippingAddress;
  billingAddress?: IShippingAddress;
  payment: IPayment;
  invoice: IInvoice;
  timeline: IOrderEvent[];
  trackingNumber?: string;
  trackingUrl?: string;
  notes: IOrderNote[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

# 12. Success Criteria

## 12.1 MVP Success Definition

The MVP is successful when:
1. Customers can browse, cart, and purchase products with Razorpay
2. Admins can manage products, collections, and orders
3. All apps share types and components from monorepo packages
4. GST invoices are generated correctly
5. Transactional emails are delivered

## 12.2 Quality Indicators

| Metric | Target |
|--------|--------|
| API Response Time (p95) | <200ms |
| Web LCP | <2.5s |
| Admin LCP | <2.0s |
| Checkout Completion Rate | >65% |
| Error Rate | <1% |
| Test Coverage (Backend) | >80% |
| Uptime | >99.5% |

## 12.3 Conversion Targets (Post-Launch)

| Metric | Month 1-3 | Month 4-6 | Mature |
|--------|-----------|-----------|--------|
| Site Conversion | >1.0% | >1.5% | >2.5% |
| Cart to Checkout | >60% | >65% | >75% |
| AOV | ₹5,000 | ₹6,000 | ₹7,500 |

---

# 13. Implementation Phases

## Phase 1: Monorepo & Backend Core (Weeks 1-3)

**Goal:** Establish monorepo structure and backend with products/collections API

**Deliverables:**
- ✅ Turborepo monorepo setup with pnpm workspaces
- ✅ Shared packages: types, ui, config, utils
- ✅ Backend project setup (Express + TypeScript + Mongoose)
- ✅ MongoDB connection and schemas
- ✅ Products API (list, detail, search, filter)
- ✅ Collections API (list, detail)
- ✅ Categories API
- ✅ Health check endpoints
- ✅ Seed script with sample products
- ✅ Error tracking (Sentry)

---

## Phase 2: Auth & Admin Foundation (Weeks 4-5)

**Goal:** User authentication and admin panel foundation

**Deliverables:**
- ✅ Auth package with provider and hooks
- ✅ User registration and login (backend)
- ✅ JWT access/refresh token flow
- ✅ Email verification flow
- ✅ Password reset flow
- ✅ Admin panel project setup (React + Vite)
- ✅ Admin authentication (separate login)
- ✅ Admin layout with sidebar navigation
- ✅ Dashboard page with stats API
- ✅ Products list page with table

---

## Phase 3: Admin CRUD & Cart (Weeks 6-8)

**Goal:** Complete admin panel and cart functionality

**Deliverables:**
- ✅ Product create/edit forms with variants
- ✅ Image upload to Cloudinary
- ✅ Image reordering (drag & drop)
- ✅ Product duplicate functionality
- ✅ Collection management pages
- ✅ Category management
- ✅ API client package with all endpoints
- ✅ Cart API (MongoDB + Redis for guests)
- ✅ Cart merge on login
- ✅ Web app cart integration

---

## Phase 4: Checkout & Orders (Weeks 9-11)

**Goal:** Complete checkout and order management

**Deliverables:**
- ✅ Checkout API (shipping, payment)
- ✅ Razorpay integration
- ✅ Razorpay webhook handling
- ✅ Order creation and status tracking
- ✅ Inventory decrement on purchase
- ✅ GST calculation with tax breakdown
- ✅ Invoice PDF generation
- ✅ Transactional emails (Resend)
- ✅ Admin orders page with status updates
- ✅ Admin order detail page
- ✅ Export orders to CSV
- ✅ Web app checkout integration
- ✅ Web app order history

---

## Phase 5: Content & Polish (Weeks 12-14)

**Goal:** Static pages, SEO, and production readiness

**Deliverables:**
- ✅ Static pages (about, shipping, returns, privacy, terms, FAQ)
- ✅ Contact form with email notification
- ✅ Newsletter subscription
- ✅ Size guide page
- ✅ SEO meta tags on all pages
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ GA4 + Facebook Pixel integration
- ✅ Customer list in admin
- ✅ Search functionality (web)
- ✅ User profile and addresses (web)
- ✅ UI component polish
- ✅ Error handling across all apps
- ✅ Performance optimization
- ✅ Security audit
- ✅ Production deployment
- ✅ Uptime monitoring

---

# 14. Future Considerations (Post-MVP)

## Phase 6: Drop Engine & Discounts (Months 4-5)

### Discount System
- ❌ Discount codes (percentage, fixed, free shipping)
- ❌ Automatic discounts (cart thresholds)
- ❌ Limited-use codes with expiry
- ❌ First-purchase discount
- ❌ Admin discount management

### Drop Engine
- ❌ Countdown timers and announcements
- ❌ Waitlist and pre-registration
- ❌ Access tier gating
- ❌ Cart reservation (10-minute hold)
- ❌ Real-time scarcity indicators
- ❌ Sold-out archive display

### Marketing Emails
- ❌ Abandoned cart recovery
- ❌ Back-in-stock notifications
- ❌ Drop announcements
- ❌ Newsletter campaigns (Klaviyo)

## Phase 7: Returns & Advanced Admin (Months 5-6)

### Returns Management
- ❌ Return request submission
- ❌ Return approval workflow
- ❌ Refund processing
- ❌ Return status tracking

### Advanced Admin
- ❌ Analytics dashboard with charts
- ❌ Revenue and conversion tracking
- ❌ Bulk product import/export (CSV)
- ❌ Banner/homepage CMS
- ❌ Staff accounts with roles
- ❌ Audit log viewer

---

# 15. Long-Term Vision: 5-Year Roadmap

## Year 1: Foundation (Months 1-12)

### Q1-Q2: MVP Launch
- ✅ Core e-commerce platform (web + admin + backend)
- ✅ 50-100 SKUs initial catalog
- ✅ Razorpay payments (UPI, cards, wallets)
- ✅ Basic order management
- ✅ Email notifications

### Q3: Stabilization & Optimization
- ✅ Performance optimization (<2s page loads)
- ✅ Conversion rate optimization
- ✅ Customer feedback integration
- ✅ Inventory management refinement
- ✅ First 1,000 orders milestone

### Q4: Drop Engine & Membership
- ✅ Drop mechanics (countdown, waitlist, access tiers)
- ✅ Membership program (Founding Circle, Members)
- ✅ Discount codes & promotions
- ✅ Abandoned cart recovery
- ✅ First 5,000 customers milestone

**Year 1 Revenue Target:** ₹2-3 Cr

---

## Year 2: Growth & Mobile (Months 13-24)

### Q1: Mobile Apps
- 📱 iOS App (Swift/SwiftUI)
- 📱 Android App (Kotlin/Jetpack Compose)
- 📱 Push notifications for drops
- 📱 Mobile-exclusive early access
- 📱 Apple Pay / Google Pay integration
- 📱 Biometric authentication

### Q2: Community Features
- ❌ User profiles with purchase history
- ❌ Style gallery (community photos)
- ❌ User reviews & ratings
- ❌ Refer-a-friend program
- ❌ Loyalty points system
- ❌ Community leaderboard

### Q3: Content & Editorial
- ❌ Integrated blog/journal CMS
- ❌ Video content hosting
- ❌ Artist/designer spotlights
- ❌ Behind-the-scenes content
- ❌ Podcast integration

### Q4: Physical Retail - Chapter 1
- 🏪 Location: Delhi NCR (Dhan Mill/Mehrauli area)
- 🏪 500-800 sq ft experiential space
- 🏪 POS integration with online inventory
- 🏪 BOPIS (Buy Online, Pick Up In Store)
- 🏪 Store-exclusive colorways
- 🏪 Community event space
- 🏪 QR-to-digital integration

**Year 2 Revenue Target:** ₹8-12 Cr

---

## Year 3: Expansion & Marketplace (Months 25-36)

### Q1: Geographic Expansion
- 🌍 Stockist partnerships in 10+ cities
- 🌍 Regional shipping optimization
- 🌍 Localized marketing campaigns
- 🌍 Regional payment methods (PhonePe, Paytm wallets)
- 🌍 Vernacular language support (Hindi, Tamil, Telugu)

### Q2: Marketplace Model
- 🏬 Onboard 5-10 aligned Indian streetwear brands
- 🏬 Commission-based revenue model (15-25%)
- 🏬 Seller dashboard & analytics
- 🏬 Unified checkout experience
- 🏬 Quality control & curation standards
- 🏬 Marketplace vendor app

### Q3: International Markets
- 🌏 International shipping (US, UK, UAE, Singapore)
- 🌏 Multi-currency support
- 🌏 International payment gateways (Stripe)
- 🌏 Customs & duties calculator
- 🌏 DDP (Delivered Duty Paid) option
- 🌏 Localized sizing guides
- 🌏 International returns handling

### Q4: Second Flagship
- 🏪 Location: Mumbai (Bandra West / Lower Parel)
- 🏪 800-1200 sq ft flagship
- 🏪 Café integration
- 🏪 Event programming (monthly)
- 🏪 Artist residency space

**Year 3 Revenue Target:** ₹25-35 Cr

---

## Year 4: Technology & Scale (Months 37-48)

### Q1: AI & Personalization
- 🤖 Personalized product recommendations
- 🤖 AI-powered search (natural language)
- 🤖 Dynamic pricing optimization
- 🤖 Demand forecasting
- 🤖 Customer churn prediction
- 🤖 Automated inventory reordering
- 🤖 AI customer support chatbot

### Q2: AR/VR Experiences
- 🥽 AR try-on for accessories (caps, sunglasses)
- 🥽 Virtual store tour
- 🥽 AR product visualization
- 🥽 Virtual fashion shows for drops
- 🥽 NFT integration for exclusive drops

### Q3: B2B & Wholesale
- 🏭 B2B portal for stockists
- 🏭 Wholesale pricing tiers
- 🏭 Bulk order management
- 🏭 Stockist onboarding workflow
- 🏭 Credit terms & invoicing
- 🏭 Minimum order quantities
- 🏭 Sales rep assignment

### Q4: Financial Services
- 💳 Buy Now Pay Later (Simpl, LazyPay integration)
- 💳 UrbanCart Credit (for members)
- 💳 EMI options for high-value purchases
- 💳 Wallet with cashback rewards
- 💳 Gift cards platform
- 💳 Corporate gifting program

**Year 4 Revenue Target:** ₹60-80 Cr

---

## Year 5: Dominance & Ecosystem (Months 49-60)

### Q1: Media & Content Studio
- 🎬 Original content production
- 🎬 YouTube channel (100K+ subscribers)
- 🎬 Podcast network
- 🎬 Street culture documentaries
- 🎬 Artist collaboration content
- 🎬 Licensing & syndication

### Q2: Private Label Expansion
- 👟 Footwear line (sneakers, slides)
- 👜 Bags & accessories
- 🏠 Home & lifestyle (candles, rugs, art prints)
- 💄 Grooming products
- 📱 Tech accessories
- 🎮 Gaming merchandise collabs

### Q3: Physical Retail Scale
- 🏪 5 flagship stores (Delhi, Mumbai, Bangalore, Hyderabad, Chennai)
- 🏪 Pop-up infrastructure (modular, deployable)
- 🏪 Airport retail presence
- 🏪 Hotel boutique partnerships
- 🏪 Festival/event retail pods

### Q4: Ecosystem & Platform
- 🌐 Open API for third-party integrations
- 🌐 Affiliate marketing platform
- 🌐 Influencer partnership portal
- 🌐 White-label platform licensing
- 🌐 UrbanCart Academy (creator education)
- 🌐 Sustainability certification program

**Year 5 Revenue Target:** ₹150-200 Cr

---

# 16. Market Expansion Strategy

## 15.1 Domestic Market Penetration

| Phase | Cities | Strategy |
|-------|--------|----------|
| **Year 1** | Delhi, Mumbai, Bangalore | D2C focus, digital marketing |
| **Year 2** | + Hyderabad, Chennai, Pune, Kolkata | Stockist partnerships, flagship #1 |
| **Year 3** | + 15 Tier-2 cities | Regional marketing, vernacular |
| **Year 4** | + 30 Tier-2/3 cities | Franchise model for stockists |
| **Year 5** | Pan-India coverage | 100+ delivery cities |

## 15.2 International Market Entry

| Phase | Markets | Strategy |
|-------|---------|----------|
| **Year 3** | UAE, Singapore | Large Indian diaspora, test international ops |
| **Year 4** | USA, UK | Premium positioning, streetwear hubs |
| **Year 5** | Europe, SEA | Localized sites, regional warehouses |

## 15.3 Revenue Mix Evolution

| Year | D2C Web | Mobile App | Marketplace | Physical | B2B | International |
|------|---------|------------|-------------|----------|-----|---------------|
| 1 | 95% | — | — | — | 5% | — |
| 2 | 60% | 25% | — | 10% | 5% | — |
| 3 | 45% | 25% | 10% | 10% | 5% | 5% |
| 4 | 35% | 25% | 15% | 10% | 7% | 8% |
| 5 | 30% | 25% | 15% | 12% | 8% | 10% |

---

# 17. Sustainability & Social Impact

## 16.1 Environmental Initiatives (Year 2+)

- 🌱 Sustainable packaging (recycled materials, no plastic)
- 🌱 Carbon-neutral shipping option
- 🌱 Offset program for manufacturing
- 🌱 Organic cotton collection
- 🌱 Recycled fabric collection
- 🌱 Take-back program (old clothes recycling)
- 🌱 Local manufacturing prioritization
- 🌱 Water-efficient dyeing processes

## 16.2 Social Impact Programs (Year 2+)

- 🤝 Artisan partnership program (traditional craftspeople)
- 🤝 Design internship program
- 🤝 Street art sponsorship
- 🤝 Music artist support fund
- 🤝 Scholarship for design students
- 🤝 Community event sponsorships

---

# 18. Technology Roadmap

## 17.1 Platform Evolution

| Year | Platform State |
|------|----------------|
| **Year 1** | Monorepo: Web + Admin + API (MongoDB) |
| **Year 2** | + Mobile Apps (React Native or Native) |
| **Year 3** | + Marketplace Module + Microservices migration begins |
| **Year 4** | + AI/ML Services + Data Platform |
| **Year 5** | Full microservices + Event-driven architecture |

## 17.2 Infrastructure Scale

| Year | Expected Traffic | Infrastructure |
|------|------------------|----------------|
| **Year 1** | 10K daily visitors, 100K/drop | Single region, managed services |
| **Year 2** | 50K daily, 500K/drop | Multi-AZ, CDN scaling |
| **Year 3** | 200K daily, 1M/drop | Multi-region (India + Singapore) |
| **Year 4** | 500K daily, 2M/drop | Global CDN, edge computing |
| **Year 5** | 1M+ daily, 5M+/drop | Kubernetes, auto-scaling |

## 17.3 Data & Analytics Evolution

| Year | Analytics Stack |
|------|-----------------|
| **Year 1** | GA4 + Basic dashboards (Metabase) |
| **Year 2** | + Customer Data Platform (Segment) |
| **Year 3** | + Data warehouse (BigQuery/Snowflake) |
| **Year 4** | + ML platform (recommendations, forecasting) |
| **Year 5** | + Real-time analytics + Predictive models |

---

# 19. Team Scale Plan

| Year | Engineering | Design | Operations | Marketing | Total |
|------|-------------|--------|------------|-----------|-------|
| **Year 1** | 3-4 | 1-2 | 2-3 | 2-3 | 8-12 |
| **Year 2** | 8-10 | 3-4 | 5-6 | 5-6 | 21-26 |
| **Year 3** | 15-20 | 5-6 | 10-12 | 10-12 | 40-50 |
| **Year 4** | 25-30 | 8-10 | 15-18 | 15-18 | 63-76 |
| **Year 5** | 40-50 | 12-15 | 25-30 | 25-30 | 102-125 |

---

# 20. Key Milestones & Success Metrics

## 19.1 Customer Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| 1,000 customers | Month 6 | ⏳ |
| 10,000 customers | Month 12 | ⏳ |
| 50,000 customers | Month 24 | ⏳ |
| 200,000 customers | Month 36 | ⏳ |
| 500,000 customers | Month 48 | ⏳ |
| 1,000,000 customers | Month 60 | ⏳ |

## 19.2 Revenue Milestones

| Milestone | Target Date |
|-----------|-------------|
| ₹1 Cr ARR | Month 9 |
| ₹5 Cr ARR | Month 15 |
| ₹25 Cr ARR | Month 30 |
| ₹75 Cr ARR | Month 42 |
| ₹150 Cr ARR | Month 54 |
| ₹250 Cr ARR | Month 60 |

## 19.3 Brand Milestones

| Milestone | Year 1 | Year 3 | Year 5 |
|-----------|--------|--------|--------|
| Instagram followers | 100K | 500K | 2M |
| App downloads | — | 500K | 5M |
| Brand search volume | 10K/mo | 100K/mo | 500K/mo |
| Press mentions | 50 | 200 | 500 |
| NPS score | 40+ | 50+ | 60+ |

---

# 21. Funding Roadmap

| Round | Timing | Amount | Use of Funds |
|-------|--------|--------|--------------|
| **Seed** | Pre-launch | ₹1-2 Cr | MVP development, initial inventory |
| **Series A** | Year 1 end | ₹8-15 Cr | Mobile apps, first flagship, team |
| **Series B** | Year 3 | ₹40-60 Cr | Marketplace, international, 3 flagships |
| **Series C** | Year 5 | ₹150-200 Cr | Scale, acquisitions, category expansion |

---

# 22. Competitive Moats (5-Year Defensibility)

| Moat | Year 1 | Year 3 | Year 5 |
|------|--------|--------|--------|
| **Brand Recognition** | Symbol system + early community | 500K followers + cultural authority | Household name in Indian streetwear |
| **Community Lock-in** | Membership program | 50K+ active members | 200K+ members with high retention |
| **Supply Chain** | Local manufacturing | Exclusive artisan partnerships | Vertical integration |
| **Data & Personalization** | Basic analytics | Customer data platform | AI-powered everything |
| **Physical Presence** | — | 2 flagships + 20 stockists | 5 flagships + 50+ stockists |
| **Content Authority** | Blog + social | Video + podcast | Media company |
| **Tech Platform** | Basic e-commerce | Mobile + marketplace | Ecosystem platform |

---

# 23. Risks & Mitigations

## Risk 1: Monorepo Complexity

**Risk:** Team unfamiliar with Turborepo slows development

**Mitigation:**
- Simple package structure
- Clear documentation
- Turborepo caching reduces build times
- One developer leads monorepo setup

## Risk 2: Drop Day Traffic Spikes

**Risk:** 10x traffic during drops crashes server

**Mitigation:**
- Redis caching for products/inventory
- MongoDB read replicas
- CDN caching for static assets
- Load test before major drops

## Risk 3: Payment Failures

**Risk:** Razorpay issues cause lost sales

**Mitigation:**
- Retry logic for webhook processing
- Multiple payment method support
- Clear error messaging
- Payment monitoring

## Risk 4: Inventory Oversell

**Risk:** Concurrent purchases oversell limited items

**Mitigation:**
- Atomic inventory decrement with MongoDB `$inc`
- Redis-based inventory reservation
- Real-time availability refresh

## Risk 5: Admin Panel Performance

**Risk:** Large product catalogs slow admin panel

**Mitigation:**
- Pagination on all list pages
- Virtual scrolling for tables
- Image lazy loading
- Server-side filtering

## Risk 6: International Expansion Complexity

**Risk:** Multi-currency, shipping, and compliance challenges

**Mitigation:**
- Partner with experienced 3PL for international
- Start with diaspora markets (UAE, Singapore)
- Use Stripe for international payments
- Legal counsel for each market

## Risk 7: Competition from Established Players

**Risk:** Larger brands replicate our model

**Mitigation:**
- Focus on community and brand depth
- Build defensible supplier relationships
- Move fast on physical retail
- Create content authority

---

# 24. Appendix

## 23.1 Related Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Brand Requirements | `research/BRD.md` | Brand philosophy, visual identity |
| Product Requirements | `research/PRD.md` | Drop strategy, pricing tiers |
| Technical Requirements | `research/TRD.md` | UX specs, performance targets |
| Competitive Analysis | `research/COMPETITIVE_DIFFERENTIATION_ANALYSIS.md` | Market positioning |
| Quick Reference | `research/PRODUCT_BUILD_QUICK_REFERENCE.md` | Implementation checklist |

## 23.2 API Endpoint Summary

| Module | Public Endpoints | Admin Endpoints |
|--------|-----------------|-----------------|
| Auth | `register`, `login`, `logout`, `refresh`, `me`, `forgot-password`, `reset-password`, `verify-email` | `admin/login` |
| Products | `products`, `products/:slug`, `products/search`, `categories` | `admin/products` (CRUD, duplicate, variants, images) |
| Collections | `collections`, `collections/:slug` | `admin/collections` (CRUD, products) |
| Categories | `categories` | `admin/categories` (CRUD) |
| Cart | `cart`, `cart/items`, `cart/merge` | — |
| Checkout | `checkout`, `checkout/shipping`, `checkout/payment` | — |
| Orders | `orders`, `orders/:id`, `orders/:id/invoice`, `orders/:orderNumber/track` | `admin/orders` (list, update, tracking, notes, export) |
| Users | `users/profile`, `users/addresses` | `admin/customers` |
| Dashboard | — | `admin/dashboard/stats`, `recent-orders`, `low-stock`, `revenue`, `top-products` |
| Content | `pages/:slug`, `contact`, `newsletter/subscribe`, `sitemap` | — |
| System | `health`, `health/detailed` | — |
| Webhooks | `webhooks/razorpay` | — |

## 23.3 Commands

```bash
# Setup
pnpm install
cp .env.example .env

# Development (all apps)
pnpm dev

# Development (specific app)
pnpm dev --filter=web
pnpm dev --filter=admin
pnpm dev --filter=backend

# Build
pnpm build

# Test
pnpm test
pnpm test:e2e

# Lint
pnpm lint

# Type check
pnpm typecheck

# Database seed
pnpm --filter=backend seed

# Generate types from API
pnpm --filter=@urbancart/types generate
```

## 23.4 Package Dependencies

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

## 23.5 Local Development

```bash
# Start all services with Docker
docker-compose up -d

# Services available:
# - MongoDB: localhost:27017
# - Redis: localhost:6379
# - Backend: localhost:8000
# - Web: localhost:3000
# - Admin: localhost:3001
```

---

**Document End**

*PRD Version 3.0 | February 28, 2026*
