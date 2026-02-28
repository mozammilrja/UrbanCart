# UrbanCart System Design Document

**Document Version:** 1.0  
**Date:** February 28, 2026  
**Classification:** Technical System Architecture  
**Audience:** Engineering, DevOps, Tech Leads  

---

# Table of Contents
1. [Functional Requirements](#1-functional-requirements)
2. [Non-Functional Requirements](#2-non-functional-requirements)
3. [High-Level Design (HLD)](#3-high-level-design-hld)
4. [Low-Level Design (LLD)](#4-low-level-design-lld)
5. [Capacity Estimation](#5-capacity-estimation)
6. [Failure Scenarios & Mitigations](#6-failure-scenarios--mitigations)

---

# 1. FUNCTIONAL REQUIREMENTS

## 1.1 User Management
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-U01 | User registration with email/password | P0 |
| FR-U02 | Email verification flow | P0 |
| FR-U03 | Login with JWT tokens | P0 |
| FR-U04 | Password reset via email | P0 |
| FR-U05 | Profile management (name, phone) | P1 |
| FR-U06 | Multiple shipping addresses | P1 |
| FR-U07 | Order history viewing | P0 |
| FR-U08 | Wishlist management | P1 |
| FR-U09 | Guest checkout (no account) | P0 |
| FR-U10 | Social login (Google OAuth) | P2 |

## 1.2 Product Catalog
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-P01 | Browse products by category | P0 |
| FR-P02 | Product detail page with images | P0 |
| FR-P03 | Size/color variant selection | P0 |
| FR-P04 | Real-time inventory display | P0 |
| FR-P05 | Product search (full-text) | P0 |
| FR-P06 | Filter by size, color, price | P0 |
| FR-P07 | Sort by price, newest, popularity | P1 |
| FR-P08 | Related products suggestions | P1 |
| FR-P09 | Recently viewed products | P2 |
| FR-P10 | Size guide modal | P1 |

## 1.3 Collections & Drops
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-C01 | Collection landing pages | P0 |
| FR-C02 | Drop countdown timer | P1 |
| FR-C03 | Drop notification signup | P1 |
| FR-C04 | Early access for members | P2 |
| FR-C05 | Archive of past collections | P1 |
| FR-C06 | Lookbook galleries | P2 |

## 1.4 Shopping Cart
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SC01 | Add to cart with variant | P0 |
| FR-SC02 | Update quantity | P0 |
| FR-SC03 | Remove items | P0 |
| FR-SC04 | Cart persistence (7 days) | P0 |
| FR-SC05 | Cart merge on login | P1 |
| FR-SC06 | Stock validation on cart view | P0 |
| FR-SC07 | Cart drawer (slide-in) | P0 |
| FR-SC08 | Free shipping progress bar | P1 |

## 1.5 Checkout & Payments
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-CK01 | Multi-step checkout flow | P0 |
| FR-CK02 | Address form with validation | P0 |
| FR-CK03 | Shipping method selection | P0 |
| FR-CK04 | UPI payment (Razorpay) | P0 |
| FR-CK05 | Card payment (Razorpay) | P0 |
| FR-CK06 | Netbanking payment | P1 |
| FR-CK07 | Wallet payments (Paytm, PhonePe) | P1 |
| FR-CK08 | Cash on Delivery (COD) | P1 |
| FR-CK09 | GST tax calculation | P0 |
| FR-CK10 | Order confirmation email | P0 |
| FR-CK11 | Invoice PDF generation | P0 |
| FR-CK12 | 10-min cart reservation (drops) | P2 |

## 1.6 Order Management
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-O01 | Order status tracking | P0 |
| FR-O02 | Shipping tracking integration | P1 |
| FR-O03 | Order cancellation (pre-ship) | P1 |
| FR-O04 | Return request submission | P2 |
| FR-O05 | Order status email updates | P0 |

## 1.7 Admin Panel
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-A01 | Dashboard with KPIs | P0 |
| FR-A02 | Product CRUD operations | P0 |
| FR-A03 | Variant management (size/color) | P0 |
| FR-A04 | Image upload to Cloudinary | P0 |
| FR-A05 | Inventory management | P0 |
| FR-A06 | Order status updates | P0 |
| FR-A07 | Customer search/view | P1 |
| FR-A08 | Collection management | P0 |
| FR-A09 | Bulk product import (CSV) | P2 |
| FR-A10 | Sales reports/analytics | P1 |

---

# 2. NON-FUNCTIONAL REQUIREMENTS

## 2.1 Performance
| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NFR-P01 | Page load time (LCP) | <2.5s | Lighthouse |
| NFR-P02 | Time to Interactive | <3.5s | Lighthouse |
| NFR-P03 | API response time (P95) | <200ms | APM |
| NFR-P04 | API response time (P99) | <500ms | APM |
| NFR-P05 | Database query time | <50ms | Query logs |
| NFR-P06 | Search response time | <100ms | Custom metric |
| NFR-P07 | Image load time | <1.5s | RUM |
| NFR-P08 | First Input Delay | <100ms | Lighthouse |
| NFR-P09 | Cumulative Layout Shift | <0.1 | Lighthouse |

## 2.2 Scalability
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-S01 | Concurrent users (normal) | 1,000 |
| NFR-S02 | Concurrent users (peak/drop) | 10,000 |
| NFR-S03 | Requests per second | 5,000 |
| NFR-S04 | Database connections | 500 pooled |
| NFR-S05 | Horizontal scaling | Auto-scale on CPU >70% |
| NFR-S06 | CDN hit ratio | >90% |

## 2.3 Availability & Reliability
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-A01 | System uptime | 99.9% (8.76h/year downtime) |
| NFR-A02 | Planned maintenance window | <2h/month |
| NFR-A03 | Recovery Time Objective (RTO) | <1 hour |
| NFR-A04 | Recovery Point Objective (RPO) | <15 minutes |
| NFR-A05 | Error rate | <0.1% |
| NFR-A06 | Zero data loss | Critical (payments, orders) |

## 2.4 Security
| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR-SEC01 | Data encryption at rest | AES-256 |
| NFR-SEC02 | Data encryption in transit | TLS 1.3 |
| NFR-SEC03 | Password hashing | Argon2id |
| NFR-SEC04 | JWT token security | RS256, 15min expiry |
| NFR-SEC05 | OWASP Top 10 compliance | Mandatory |
| NFR-SEC06 | PCI DSS compliance | Via Razorpay (no card storage) |
| NFR-SEC07 | Rate limiting | 100 req/min per IP |
| NFR-SEC08 | CSRF protection | Double-submit cookie |
| NFR-SEC09 | XSS prevention | CSP headers, sanitization |
| NFR-SEC10 | SQL/NoSQL injection | Parameterized queries |

## 2.5 Compatibility
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-C01 | Browser support | Chrome, Safari, Firefox, Edge (last 2 versions) |
| NFR-C02 | Mobile browsers | iOS Safari, Chrome Android |
| NFR-C03 | Minimum viewport | 320px width |
| NFR-C04 | Touch target size | ≥44x44px |
| NFR-C05 | Accessibility | WCAG 2.1 AA |

## 2.6 Maintainability
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-M01 | Code coverage | >80% |
| NFR-M02 | Deployment frequency | Daily |
| NFR-M03 | Lead time for changes | <1 day |
| NFR-M04 | Mean time to recovery | <1 hour |
| NFR-M05 | Documentation coverage | 100% API docs |

---

# 3. HIGH-LEVEL DESIGN (HLD)

## 3.1 System Context

```
URBANCART PLATFORM ARCHITECTURE:

Frontend                Admin Panel            Integrations
(Next.js 15)           (React + Vite)
    └─────────────────────┬─────────────────────┘
                          │
                    API Gateway
                   (Express.js)
                          │
    ┌─────────────────────┼─────────────────────┐
    │                     │                     │
    ▼                     ▼                     ▼
MongoDB Atlas         Upstash Redis        Cloudinary
(Primary DB)          (Cache/Queue)        (Media CDN)
    
    External Services:
    • Razorpay (Payments)
    • Resend (Email)
    • WATI (SMS)
    • Shiprocket (Shipping)
    • PostHog (Analytics)
    • Sentry (Monitoring)
```

## 3.2 Frontend Architecture

```
PRESENTATION LAYER
├── Pages (App Router)
├── Layouts (Header, Footer)
├── Components (ProductCard, CartItem)
└── Modals (SizeGuide, Cart)
        │
STATE LAYER
├── Server State (TanStack Query)
│   ├── Products, Collections
│   ├── Orders, User Profile
│   └── Search Results
└── Client State (Zustand)
    ├── Cart (localStorage)
    ├── UI State (modals)
    └── Auth State
        │
API LAYER
├── Services (API calls)
├── Hooks (useProduct, useCart)
├── Interceptors (Auth, Error)
└── Types (Shared)
```

## 3.3 Backend Architecture

```
API LAYER
├── Routes (/api/v1/*)
├── Controllers (AuthCtrl, ProductCtrl)
├── Middleware (Auth, RateLimit, Logging, Error)
└── Validators (Zod Schemas)
        │
SERVICE LAYER
├── AuthService (Register, Login, Refresh)
├── ProductService (CRUD, Search, Filter)
├── CartService (Add, Remove, Sync)
├── OrderService (Create, Status, Invoice)
├── PaymentService (Razorpay, Webhooks)
├── EmailService (Templates, Send)
├── InventoryService (Reserve, Decrement)
└── SearchService (Full-text, Faceted)
        │
DATA ACCESS LAYER
├── Mongoose Models (User, Product, Order)
├── Redis Client (Sessions, Cache)
├── Cloudinary SDK (Images)
└── External APIs (Razorpay, Shiprocket)
```

## 3.4 Data Flow: User Registration

```
User → Frontend → API Server → MongoDB → Resend → User
                  ↓
            Argon2 hash
            Email validation
            Token generation
```

## 3.5 Data Flow: Checkout & Payment

```
User Cart → Address Validation → Inventory Reserve (10min)
                                  ↓
                          Razorpay Order Created
                                  ↓
                    User Completes Payment on Razorpay
                                  ↓
                      Verify Signature in Backend
                                  ↓
                    Create Order + Decrement Inventory
                                  ↓
                    Release Reservation + Send Email
```

---

# 4. LOW-LEVEL DESIGN (LLD)

## 4.1 Database Schemas

### User Collection
```javascript
{
  _id: ObjectId,
  email: string,                    // unique, indexed
  passwordHash: string,             // Argon2id
  firstName: string,
  lastName: string,
  phone: string | null,
  avatar: string | null,
  role: "customer" | "admin",
  emailVerified: boolean,
  addresses: [
    {
      _id: ObjectId,
      label: string,
      firstName: string,
      lastName: string,
      addressLine1: string,
      addressLine2: string | null,
      city: string,
      state: string,
      pincode: string,
      phone: string,
      isDefault: boolean
    }
  ],
  wishlist: [ObjectId],
  refreshTokens: [{token, deviceInfo, expiresAt}],
  createdAt: Date,
  updatedAt: Date
}

Indexes:
{ email: 1 }
{ "addresses.pincode": 1 }
{ createdAt: -1 }
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: string,                     // indexed (text)
  slug: string,                     // unique, indexed
  description: string,
  price: number,                    // in paise
  compareAtPrice: number | null,
  category: ObjectId,
  collections: [ObjectId],
  images: [{url, publicId, alt, position}],
  variants: [
    {
      _id: ObjectId,
      sku: string,                  // unique
      size: string,
      color: string,
      colorHex: string,
      inventory: number,
      reservedStock: number
    }
  ],
  status: "draft" | "active" | "archived",
  hsnCode: string,
  gstRate: number,
  weight: number,
  seoTitle: string | null,
  createdAt: Date,
  updatedAt: Date
}

Indexes:
{ slug: 1 }
{ status: 1, category: 1 }
{ "variants.sku": 1 }
{ name: "text", description: "text" }
```

### Order Collection
```javascript
{
  _id: ObjectId,
  orderNumber: string,              // unique
  user: ObjectId | null,
  guestEmail: string | null,
  items: [
    {
      product: ObjectId,
      variant: ObjectId,
      name: string,
      sku: string,
      size: string,
      color: string,
      quantity: number,
      unitPrice: number,
      totalPrice: number
    }
  ],
  subtotal: number,
  shipping: number,
  tax: number,
  taxBreakdown: {cgst, sgst, igst, cessAmount},
  total: number,
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled",
  shippingAddress: {firstName, lastName, addressLine1, city, state, pincode, phone},
  payment: {
    method: "upi" | "card" | "netbanking" | "wallet" | "cod",
    status: "pending" | "paid" | "failed" | "refunded",
    razorpayOrderId: string | null,
    razorpayPaymentId: string | null,
    paidAt: Date | null,
    amount: number
  },
  invoice: {
    number: string,
    generatedAt: Date,
    pdfUrl: string | null
  },
  shipping: {
    provider: string | null,
    trackingNumber: string | null,
    estimatedDelivery: Date | null,
    shippedAt: Date | null,
    deliveredAt: Date | null
  },
  timeline: [{status, message, timestamp, actor}],
  createdAt: Date,
  updatedAt: Date
}

Indexes:
{ orderNumber: 1 }
{ user: 1, createdAt: -1 }
{ status: 1 }
```

## 4.2 API Contracts

### Registration
```
POST /api/v1/auth/register
Request: {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}
Response 201: {
  user: {id, email, firstName, lastName},
  message: "Verification email sent"
}
```

### Login
```
POST /api/v1/auth/login
Request: {email, password}
Response 200: {
  user: {id, email, firstName, lastName, role},
  accessToken: string,
  refreshToken: string (httpOnly cookie)
}
```

### Get Products
```
GET /api/v1/products?page=1&limit=16&category=tees&size=M,L&sort=newest
Response 200: {
  products: [],
  pagination: {page, limit, totalPages, totalProducts, hasMore},
  filters: {sizes, colors, priceRange}
}
```

### Add to Cart
```
POST /api/v1/cart/items
Request: {productId, variantId, quantity}
Response 201: {cart}
```

### Checkout Validate
```
POST /api/v1/checkout/validate
Request: {shippingAddress}
Response 200: {
  valid: true,
  summary: {subtotal, shipping, tax, total},
  reservationId: string,
  expiresAt: Date
}
```

### Create Razorpay Order
```
POST /api/v1/checkout/razorpay-order
Request: {reservationId, shippingOptionId}
Response 200: {
  razorpayOrderId: string,
  amount: number,
  key: string,
  prefill: {email, contact, name}
}
```

### Verify Payment
```
POST /api/v1/checkout/verify
Request: {razorpay_order_id, razorpay_payment_id, razorpay_signature, reservationId}
Response 201: {
  order: {id, orderNumber, status, total, estimatedDelivery},
  redirectUrl: string
}
```

## 4.3 Service Layer Classes

```typescript
class AuthService {
  - userModel: Model<User>
  - redis: Redis
  - emailService: EmailService
  
  + register(data): User
  + login(email, pass): Tokens
  + refresh(token): Tokens
  + logout(userId): void
  + verifyEmail(token): void
  + forgotPassword(email): void
  + resetPassword(token, pass): void
}

class ProductService {
  - productModel: Model<Product>
  - redis: Redis
  - searchService: SearchService
  
  + getAll(filters): Products[]
  + getBySlug(slug): Product
  + search(query): Products[]
  + create(data): Product
  + update(id, data): Product
  + delete(id): void
}

class CartService {
  - cartModel: Model<Cart>
  - redis: Redis
  - productService: ProductService
  
  + getCart(userId|sessionId): Cart
  + addItem(cartId, item): Cart
  + updateItem(itemId, qty): Cart
  + removeItem(itemId): Cart
  + mergeCarts(guest, user): Cart
  + clearCart(cartId): void
  + validateInventory(): boolean
}

class OrderService {
  - orderModel: Model<Order>
  - inventoryService: InventoryService
  - paymentService: PaymentService
  - emailService: EmailService
  
  + create(cartId, address): Order
  + getById(id): Order
  + getByUser(userId): Orders[]
  + updateStatus(id, status): Order
  + generateInvoice(id): PDF
  + cancel(id): Order
}

class PaymentService {
  - razorpay: Razorpay
  - orderModel: Model<Order>
  
  + createOrder(amount): RazorpayOrder
  + verifyPayment(signature): boolean
  + handleWebhook(payload): void
  + refund(paymentId, amount): void
}

class InventoryService {
  - productModel: Model<Product>
  - redis: Redis
  
  + reserve(variantId, qty): Reservation
  + release(reservationId): void
  + decrement(variantId, qty): void
  + increment(variantId, qty): void
  + getStock(variantId): number
  + checkLowStock(): Variant[]
}

class EmailService {
  - resend: Resend
  - templates: EmailTemplates
  
  + sendVerification(email): void
  + sendPasswordReset(email): void
  + sendOrderConfirmation(order): void
  + sendShippingUpdate(order): void
  + sendAbandonedCart(cart): void
}
```

---

# 5. CAPACITY ESTIMATION

## 5.1 Traffic Estimation

| Metric | Normal Day | Drop Day (10x) |
|--------|------------|----------------|
| Daily Active Users | 5,000 | 50,000 |
| Page Views | 50,000 | 500,000 |
| API Requests | 200,000 | 2,000,000 |
| Peak RPS | 50 | 500 |
| Orders | 100-200 | 1,000-2,000 |

## 5.2 Storage Estimation

| Data Type | Size/Unit | Volume | Total |
|-----------|-----------|--------|-------|
| Users | 5KB | 100K | 500MB |
| Products | 10KB | 1K | 10MB |
| Product Images | 2MB | 5K | 10GB |
| Orders | 15KB | 50K/year | 750MB |
| Carts | 2KB | 10K active | 20MB |
| **Total Year 1** | | | **~15GB** |

## 5.3 Bandwidth Estimation

| Activity | Size | Daily Requests | Bandwidth |
|----------|------|----------------|-----------|
| Product Page | 500KB | 30,000 | 15GB |
| Image Loads | 200KB | 100,000 | 20GB |
| API Responses | 5KB | 200,000 | 1GB |
| **Daily Total** | | | **~36GB** |

## 5.4 Resource Allocation

| Component | MVP | Year 2 (Scaled) |
|-----------|-----|-----------------|
| **API Server** | 1 vCPU, 1GB RAM | 4 vCPU, 8GB RAM (x3) |
| **MongoDB** | M10 (2GB) | M30 (8GB) + read replicas |
| **Redis** | 256MB | 2GB |
| **Frontend Hosting** | Vercel Pro | Vercel Enterprise |
| **CDN** | Vercel Edge | Cloudflare Pro |

---

# 6. FAILURE SCENARIOS & MITIGATIONS

## 6.1 Failure Matrix

| Scenario | Impact | Detection | Mitigation | Recovery |
|----------|--------|-----------|------------|----------|
| **Database Down** | Critical | Health check | Failover to replica | Auto-failover (Atlas) |
| **Redis Down** | High | Connection error | Fallback to DB | Auto-restart, rebuild cache |
| **API Server Crash** | High | Health check | Load balancer routes | Auto-restart, auto-scale |
| **Payment Down** | High | Webhook timeout | Show error, retry later | Circuit breaker pattern |
| **CDN Failure** | Medium | Latency spike | Origin fallback | DNS failover |
| **High Traffic** | Medium | CPU >80% | Rate limiting | Auto-scale up |
| **Inventory Oversell** | High | Stock negative | Atomic transaction | Cancel/refund orders |

## 6.2 Circuit Breaker Configuration

```javascript
{
  razorpay: {
    failureThreshold: 5,
    resetTimeout: 30000,
    requestTimeout: 10000
  },
  resend: {
    failureThreshold: 3,
    resetTimeout: 60000,
    requestTimeout: 5000
  },
  shiprocket: {
    failureThreshold: 5,
    resetTimeout: 60000,
    requestTimeout: 15000
  }
}
```

## 6.3 Backup & Recovery

| Data | Frequency | Retention | Recovery Time |
|------|-----------|-----------|---------------|
| MongoDB | Continuous (Atlas) | 7 days point-in-time | <15 min |
| Redis (Sessions) | Every 4 hours | 24 hours | <5 min |
| Media (Cloudinary) | Continuous | Indefinite | N/A |
| Logs | Real-time stream | 30 days | N/A |

## 6.4 Monitoring & Alerting

### Key Metrics to Monitor
- API Response Time (P95, P99)
- Error Rate (4xx, 5xx)
- Database Query Time
- Redis Cache Hit Ratio
- Checkout Completion Rate
- Payment Success Rate
- Inventory Sync Latency

### Alert Thresholds
- API response time > 500ms → Warning
- Error rate > 1% → Critical
- Cache hit ratio < 70% → Warning
- Payment failure < 2% → Normal, > 5% → Critical
- Inventory mismatch > 0 items → Critical

---

## Decisions Made

1. **Monorepo Tool**: Turborepo (faster caching)
2. **Database**: MongoDB (flexible schema for variants)
3. **Cache**: Redis only (not MongoDB for persistence)
4. **Search**: MongoDB Atlas Search (integrated solution)
5. **Payment**: Razorpay (UPI priority for India)
6. **Email**: Resend (developer-friendly)
7. **State**: TanStack Query + Zustand (lightweight)
8. **Hosting**: Railway for API (simpler than AWS)
9. **Session Storage**: Redis with TTL indices
10. **Rate Limiting**: Redis sliding window (smooth)

---

## Verification Checklist

- [ ] Architecture review with tech lead
- [ ] Load testing with k6 (10x traffic)
- [ ] Security audit (OWASP Top 10)
- [ ] API contract validation (OpenAPI spec)
- [ ] Data model ER diagram review
- [ ] Disaster recovery drill
- [ ] Performance baseline established
- [ ] Monitoring alerts configured

---

*Last Updated: February 28, 2026*
*Next Review: August 28, 2026*
