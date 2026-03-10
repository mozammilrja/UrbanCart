# Product Requirements Document (PRD)

## APOSTLE — Premium Indian Streetwear E-Commerce Platform

| Document Info | |
|---------------|---|
| **Product Name** | APOSTLE |
| **Version** | 1.0 |
| **Last Updated** | March 7, 2026 |
| **Status** | Active Development |
| **Owner** | Product Team |
| **Live URL** | [apostle-swart.vercel.app](https://apostle-swart.vercel.app) |

---

## 1. Executive Summary

APOSTLE is a premium Indian streetwear e-commerce platform designed to deliver a high-end, immersive shopping experience. The platform targets fashion-forward urban youth seeking exclusive, limited-edition apparel with a bold, community-driven brand identity.

### 1.1 Vision Statement

> To become India's leading premium streetwear destination by combining exclusive product drops, community engagement, and a seamless digital shopping experience.

### 1.2 Business Objectives

| Objective | Target | Timeframe |
|-----------|--------|-----------|
| Launch MVP | Production-ready storefront | Q1 2026 |
| Monthly Active Users | 10,000 | Q2 2026 |
| Conversion Rate | 3.5% | Q3 2026 |
| Average Order Value | ₹4,500 | Q3 2026 |
| Customer Retention | 40% repeat purchase | Q4 2026 |

---

## 2. Problem Statement

### 2.1 Market Gap

The Indian streetwear market lacks dedicated premium platforms that offer:
- Curated, high-quality exclusive drops
- Immersive digital shopping experiences (3D, animations)
- Strong brand community and loyalty programs
- Seamless mobile-first experiences

### 2.2 User Pain Points

1. **Discovery** — Difficulty finding authentic premium streetwear in India
2. **Trust** — Concerns about product quality and authenticity
3. **Experience** — Generic e-commerce UX without brand storytelling
4. **Loyalty** — No reward for repeat customers or brand advocates

---

## 3. Target Audience

### 3.1 User Personas

#### Persona 1: Urban Fashionista
| Attribute | Detail |
|-----------|--------|
| **Age** | 18–28 |
| **Occupation** | College students, young professionals |
| **Income** | ₹30,000–₹80,000/month |
| **Budget** | ₹1,500–₹8,000 per piece |
| **Behavior** | Trend-conscious, social media active, values exclusivity |
| **Goals** | Stand out, express identity through fashion |
| **Channels** | Instagram, Discord, YouTube |

#### Persona 2: Streetwear Collector
| Attribute | Detail |
|-----------|--------|
| **Age** | 25–35 |
| **Occupation** | Working professionals, creatives |
| **Income** | ₹1,00,000+/month |
| **Budget** | ₹5,000–₹15,000+ per piece |
| **Behavior** | Quality-focused, collector mindset, brand loyal |
| **Goals** | Own exclusive/limited pieces, build collection |
| **Channels** | Twitter, Discord, sneaker/streetwear communities |

#### Persona 3: Casual Style Seeker
| Attribute | Detail |
|-----------|--------|
| **Age** | 18–40 |
| **Occupation** | Mixed |
| **Budget** | ₹1,500–₹4,000 per piece |
| **Behavior** | Comfort + style focused, occasional buyer |
| **Goals** | Versatile pieces for work/casual wear |
| **Channels** | Instagram, WhatsApp, search |

### 3.2 Target Market

- **Primary**: Tier 1 Indian cities (Delhi NCR, Mumbai, Bangalore, Hyderabad)
- **Secondary**: Tier 2 cities, NRI community
- **Demographic**: 18–35 years, urban, digitally native

---

## 4. Product Scope

### 4.1 Product Catalog

| Category | SKU Count | Price Range |
|----------|-----------|-------------|
| T-Shirts | 24 | ₹2,999–₹8,200 |
| Hoodies & Crewnecks | 6 | ₹4,299–₹5,499 |
| Caps & Hats | 10+ | ₹1,299–₹2,199 |
| Outerwear (Bombers) | 2 | ₹7,499+ |
| Bottoms (Track Pants) | 4 | ₹3,499+ |

### 4.2 Collections

| Collection | Description |
|------------|-------------|
| Drop 001 | Inaugural limited release |
| Summer Essentials | Lightweight seasonal pieces |
| Caps Collection | Headwear curation |
| Hoodies & Fleece | Cold-weather premium fleece |
| New Arrivals | Rolling new product additions |
| Limited Edition | Exclusive, numbered releases |
| T-Shirts | Core apparel collection |

### 4.3 Pricing Strategy

- **Entry Point**: ₹1,299 (Caps)
- **Average Order**: ₹3,500–₹5,500
- **Premium Tier**: ₹8,200 (Limited editions)
- **Free Shipping Threshold**: ₹5,000+
- **Standard Shipping**: ₹199
- **Express Shipping**: ₹399
- **GST**: 18% (included in MRP)

---

## 5. Feature Requirements

### 5.1 Core Features (P0 — Must Have)

#### 5.1.1 Product Discovery

| Feature | Description | Status |
|---------|-------------|--------|
| Homepage | Hero section + 6 lazy-loaded content sections | ✅ Complete |
| Product Catalog | Browse all products with grid/list views | ✅ Complete |
| Collections | Browse by curated collections | ✅ Complete |
| Product Detail | Full product info, images, size/color selection | ✅ Complete |
| Search | Full-text search with filters | ✅ Complete |
| Filtering | Category, size, color, price range, sort | ✅ Complete |

#### 5.1.2 Shopping Cart

| Feature | Description | Status |
|---------|-------------|--------|
| Add to Cart | Add items with size/color selection | ✅ Complete |
| Cart Management | Update quantities, remove items | ✅ Complete |
| Cart Persistence | LocalStorage persistence | ✅ Complete |
| Coupon Codes | Apply discount codes | ✅ Complete |
| Cart Preview | Quick view in navbar | ✅ Complete |

#### 5.1.3 Wishlist

| Feature | Description | Status |
|---------|-------------|--------|
| Add/Remove | Toggle wishlist status | ✅ Complete |
| Persistence | LocalStorage persistence | ✅ Complete |
| Sort Options | By date, name, price | ✅ Complete |
| Move to Cart | Transfer to shopping cart | ✅ Complete |

#### 5.1.4 User Authentication

| Feature | Description | Status |
|---------|-------------|--------|
| Registration | Email/password signup | ✅ Complete |
| Login | Secure authentication | ✅ Complete |
| Password Recovery | Forgot/reset password flow | ✅ Complete |
| Session Management | Persistent sessions | ✅ Complete |

#### 5.1.5 Account Management

| Feature | Description | Status |
|---------|-------------|--------|
| Profile | View/edit user information | ✅ Complete |
| Order History | View past orders with status | ✅ Complete |
| Order Detail | Individual order breakdown | ✅ Complete |
| Addresses | Manage saved addresses | ✅ Complete |
| Payment Methods | Save cards and UPI IDs | ✅ Complete |

### 5.2 Enhanced Features (P1 — Should Have)

#### 5.2.1 Loyalty & Rewards

| Feature | Description | Status |
|---------|-------------|--------|
| Tier System | Bronze → Silver → Gold → Platinum | ✅ Complete |
| Points Accumulation | Earn on purchases | ✅ Complete |
| Referral Program | Earn for referrals | ✅ Complete |
| Point Redemption | Redeem for discounts | ✅ Complete |

#### 5.2.2 Store Locator

| Feature | Description | Status |
|---------|-------------|--------|
| Store List | Physical store locations | ✅ Complete |
| Store Details | Address, hours, contact | ✅ Complete |
| Map Integration | Google Maps embed | ✅ Complete |

**Current Locations**: Delhi, Mumbai, Hyderabad

### 5.3 Future Features (P2 — Nice to Have)

| Feature | Description | Status | Priority |
|---------|-------------|--------|----------|
| 3D Product Viewer | Interactive 3D product views | 🔄 Ready | High |
| Live Inventory | Real-time stock sync | ❌ Planned | High |
| Admin Dashboard | Back-office management | ❌ Planned | High |
| Multi-language | Hindi, regional languages | ❌ Planned | Medium |
| Chat Support | Live customer support | ❌ Planned | Medium |
| Size Recommendation | AI-based sizing | ❌ Planned | Low |
| AR Try-On | Virtual product try-on | ❌ Planned | Low |

---

## 6. User Flows

### 6.1 Guest Browsing & Purchase Flow

```
Homepage → Browse Collections → Select Product → View Details 
    → Select Size/Color → Add to Cart → View Cart 
    → Proceed to Checkout → Register/Login → Enter Shipping 
    → Select Payment → Complete Order → Order Confirmation
```

### 6.2 Returning Customer Flow

```
Homepage → Login → Quick Search/Browse → Add to Cart 
    → Cart (saved items) → Checkout (saved address/payment) 
    → Complete Order → Track Order
```

### 6.3 Wishlist Flow

```
Browse Products → Add to Wishlist → Continue Shopping 
    → View Wishlist → Move to Cart → Checkout
```

### 6.4 Account Management Flow

```
Login → Account Dashboard → Manage Orders/Addresses/Payments/Rewards
```

---

## 7. Technical Requirements

### 7.1 Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14, React 18, TypeScript |
| **Styling** | TailwindCSS, class-variance-authority |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query, Axios |
| **Animations** | GSAP, Framer Motion, Lenis |
| **3D Graphics** | React Three Fiber, Drei, Spline |
| **UI Components** | Radix UI Primitives |
| **Forms** | React Hook Form, Zod |
| **Icons** | Lucide React |
| **Carousel** | Embla Carousel, Swiper |

### 7.2 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Next.js App Router                 │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │    │
│  │  │  Pages   │  │Components│  │ Feature Modules  │   │    │
│  │  └──────────┘  └──────────┘  └──────────────────┘   │    │
│  │                                                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │    │
│  │  │ Zustand  │  │  Hooks   │  │  API Services    │   │    │
│  │  │  Stores  │  │          │  │                  │   │    │
│  │  └──────────┘  └──────────┘  └──────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND API (Planned)                    │
│  ┌────────────┬────────────┬────────────┬────────────┐      │
│  │    Auth    │  Products  │   Orders   │   Users    │      │
│  └────────────┴────────────┴────────────┴────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 API Endpoints (Defined)

| Domain | Endpoints |
|--------|-----------|
| Auth | `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/refresh` |
| Products | `/products`, `/products/:slug`, `/products/search` |
| Collections | `/collections`, `/collections/:slug` |
| Cart | `/cart`, `/cart/items`, `/cart/coupon` |
| Orders | `/orders`, `/orders/:id` |
| Users | `/users/profile`, `/users/addresses`, `/users/payments` |
| Wishlist | `/wishlist`, `/wishlist/:productId` |
| Stores | `/stores` |

### 7.4 State Stores

| Store | Purpose |
|-------|---------|
| `auth.store` | User authentication state |
| `cart.store` | Shopping cart items and totals |
| `wishlist.store` | Saved products |
| `filters.store` | Product filtering state |
| `modal.store` | Modal/dialog management |
| `ui.store` | UI preferences (theme, layout) |

---

## 8. Design Requirements

### 8.1 Design Principles

1. **Bold & Premium** — High-contrast, dark theme options, premium feel
2. **Mobile-First** — Optimized for mobile shopping (60%+ traffic)
3. **Performance** — Fast loading, smooth interactions
4. **Accessibility** — WCAG AA compliant
5. **Immersive** — 3D elements, smooth animations

### 8.2 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile S | 320px | Small phones |
| Mobile L | 425px | Standard phones |
| Tablet | 768px | Tablets, landscape mobile |
| Laptop | 1024px | Small laptops |
| Desktop | 1440px | Standard desktop |
| 4K | 2560px | Large displays |

### 8.3 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#000000` | Text, primary actions |
| Secondary | `#FFFFFF` | Backgrounds, inverse text |
| Accent | Brand specific | CTAs, highlights |
| Success | `#22C55E` | Confirmations |
| Warning | `#F59E0B` | Alerts |
| Error | `#EF4444` | Errors |

---

## 9. Performance Requirements

### 9.1 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Cumulative Layout Shift | < 0.1 |

### 9.2 Optimization Strategies

- **Dynamic Imports** — Lazy load below-fold sections
- **Image Optimization** — Next.js Image with AVIF/WebP
- **Code Splitting** — Per-route bundles
- **3D Lazy Loading** — Load Three.js only when needed
- **CSS Animations** — Prefer CSS over JS where possible
- **Intersection Observer** — Trigger animations on visibility

---

## 10. Security Requirements

### 10.1 Authentication

- JWT-based authentication with refresh tokens
- Secure password hashing (bcrypt)
- Rate limiting on auth endpoints
- Session timeout after inactivity

### 10.2 Data Protection

- HTTPS enforced
- Input validation (Zod schemas)
- XSS protection
- CSRF tokens for mutations
- PCI DSS compliance for payments

### 10.3 Privacy

- GDPR-compliant data handling
- Cookie consent management
- Data retention policies
- Right to deletion support

---

## 11. Success Metrics

### 11.1 Key Performance Indicators (KPIs)

| Metric | Definition | Target |
|--------|------------|--------|
| **Conversion Rate** | Orders / Visitors | 3.5% |
| **Average Order Value** | Total Revenue / Orders | ₹4,500 |
| **Cart Abandonment** | Abandoned / Started Checkouts | <60% |
| **Bounce Rate** | Single-page sessions | <40% |
| **Session Duration** | Average time on site | >3 min |
| **Return Rate** | Repeat customers | 40% |
| **NPS** | Net Promoter Score | >50 |

### 11.2 Tracking & Analytics

- Page views and user journeys
- Product impressions and clicks
- Add to cart and checkout funnel
- Search queries and results
- Error rates and performance

---

## 12. Development Roadmap

### Phase 1: MVP (Q1 2026) ✅ COMPLETE

- [x] Homepage with hero and content sections
- [x] Product catalog and detail pages
- [x] Collections browsing
- [x] Shopping cart functionality
- [x] Wishlist functionality
- [x] User authentication
- [x] Account management UI
- [x] Search and filtering
- [x] Store locator
- [x] Responsive design
- [x] Performance optimization
- [x] Deployment to Vercel

### Phase 2: Backend Integration (Q2 2026)

- [ ] Backend API development
- [ ] Database setup (Products, Users, Orders)
- [ ] Payment gateway integration (Razorpay)
- [ ] Order processing workflow
- [ ] Email notifications
- [ ] Real inventory management

### Phase 3: Enhanced Features (Q3 2026)

- [ ] Admin dashboard
- [ ] 3D product viewer activation
- [ ] Analytics integration
- [ ] Customer reviews system
- [ ] Live chat support
- [ ] Push notifications

### Phase 4: Scale & Optimize (Q4 2026)

- [ ] Multi-language support
- [ ] AR try-on features
- [ ] AI-powered recommendations
- [ ] Loyalty program v2
- [ ] Mobile app (React Native)

---

## 13. Dependencies & Integrations

### 13.1 Third-Party Services

| Service | Purpose | Status |
|---------|---------|--------|
| Vercel | Hosting & deployment | ✅ Active |
| GitHub | Version control | ✅ Active |
| Razorpay | Payment processing | ❌ Planned |
| Google Maps | Store locator | ✅ Ready |
| Cloudinary | Image CDN | ❌ Planned |
| SendGrid | Transactional email | ❌ Planned |
| Segment | Analytics | ❌ Planned |

### 13.2 External Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 14.2.0 | Framework |
| React | 18.2.0 | UI Library |
| TailwindCSS | 3.4.1 | Styling |
| Zustand | 4.4.7 | State Management |
| TanStack Query | 5.17.0 | Data Fetching |
| Framer Motion | 12.34.5 | Animations |

---

## 14. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Backend delays | High | Medium | Mock data fallback, modular API layer |
| Payment integration issues | High | Low | Use established provider (Razorpay) |
| Performance regression | Medium | Medium | Lighthouse CI, performance budgets |
| Mobile UX issues | Medium | Low | Mobile-first development, device testing |
| Security vulnerabilities | High | Low | Security audits, dependency updates |

---

## 15. Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **Drop** | Limited-time product release |
| **SKU** | Stock Keeping Unit |
| **MRP** | Maximum Retail Price (GST inclusive) |
| **AOV** | Average Order Value |
| **CAC** | Customer Acquisition Cost |
| **LTV** | Lifetime Value |

### B. References

- [APOSTLE Live Site](https://apostle-swart.vercel.app)
- [GitHub Repository](https://github.com/mozammilrja/APOSTLE)
- [AUDIT_REPORT.md](./AUDIT_REPORT.md)
- [PERFORMANCE_AUDIT.md](./PERFORMANCE_AUDIT.md)

### C. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 7, 2026 | Product Team | Initial PRD |

---

*This document is a living document and will be updated as the product evolves.*
