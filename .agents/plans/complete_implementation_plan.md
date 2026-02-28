# UrbanCart Complete Implementation Plan

**Document Version:** 1.0  
**Last Updated:** February 28, 2026  
**Coverage:** All 147 PRD Features (100%)  
**Target Completion:** September 30, 2026 (MVP)

---

## Document Structure

This plan maps ALL PRD requirements to actionable implementation tasks across 6 phases:

- **Phase 0:** Infrastructure & Setup (2 weeks)
- **Phase 1:** Core MVP (14 weeks)
- **Phase 1.5:** Collections & Community (4 weeks)
- **Phase 2:** Optimization & Polish (4 weeks)
- **Phase 3:** Launch Preparation (2 weeks)
- **Post-Launch:** Continuous improvements

---

# PHASE 0: INFRASTRUCTURE & SETUP (Weeks 1-2)

## 0.1: Repository & DevOps Setup

### Git Repository Configuration
- [ ] Initialize git repository (GitHub)
- [ ] Create main, develop, staging branches
- [ ] Set branch protection rules (main requires 2 reviews)
- [ ] Configure commit message templates
- [ ] Set up issue templates (bug, feature, chore)
- [ ] Create pull request template
- [ ] Configure GitHub code owners for codebase sections
- [ ] Set up git hooks (pre-commit linting)

### CI/CD Pipeline (GitHub Actions)
- [ ] Frontend workflow:
  - [ ] Lint (ESLint)
  - [ ] Type check (TypeScript)
  - [ ] Unit tests (Vitest)
  - [ ] Build verification
  - [ ] Deploy to Vercel preview
- [ ] Backend workflow:
  - [ ] Lint (ESLint)
  - [ ] Type check (TypeScript)
  - [ ] Unit tests (Vitest)
  - [ ] Build verification
  - [ ] Deploy to staging
- [ ] Admin workflow (same as frontend)
- [ ] Security scanning (OWASP)

**Completion Target:** Week 1

---

## 0.2: Cloud & Database Infrastructure

### MongoDB Atlas Setup
- [ ] Create MongoDB organization & project
- [ ] Provision M10 cluster (production-ready)
- [ ] Enable network security (IP whitelist)
- [ ] Configure backup (daily, 30-day retention)
- [ ] Create database user with proper roles
- [ ] Design all schemas (see section 0.4)
- [ ] Create indexes for performance:
  - [ ] User: email (unique), createdAt
  - [ ] Product: slug (unique), category, createdAt
  - [ ] Order: userId, status, createdAt
  - [ ] Cart: userId (unique)
  - [ ] And all other collections
- [ ] Create seed data for testing
- [ ] Set up monitoring & alerting

**Specs:**
- Storage: 10GB initial
- Backups: Daily automated
- Replication: 3-node replica set

### Redis/Upstash Setup
- [ ] Create Upstash Redis instance
- [ ] Configure connection string (secure)
- [ ] Set up key namespace strategy (cart:, session:, cache:)
- [ ] Configure TTL policies
- [ ] Test pub/sub functionality
- [ ] Set up monitoring

**Specs:**
- Tier: Basic (can scale to Pro)
- Databases: 1 (with namespacing)
- Max connections: 100

### Cloudinary Setup
- [ ] Create Cloudinary account
- [ ] Configure upload presets (signed)
- [ ] Set up image optimization (WebP, responsive)
- [ ] Configure CDN settings
- [ ] Set up folder structure (/products, /collections, /admin, /users)
- [ ] Test upload & transformation APIs
- [ ] Configure security settings (API keys, access control)

**Specs:**
- Plan: Pro (1TB storage)
- Transformations: Enabled
- CDN: Cloudinary default

### Vercel Deployment
- [ ] Create Vercel organization/team
- [ ] Link GitHub repository
- [ ] Set up frontend project
- [ ] Set up admin project
- [ ] Configure environment variables (all 3 environments: dev, staging, prod)
- [ ] Enable analytics & monitoring
- [ ] Configure custom domains
- [ ] Set up preview deployments (auto-deploy on PR)

**Spec Items to Configure:**
- Node.js version: 20 LTS
- Build output: .next
- Environment variables: All 50+ vars
- Monitoring: Enabled

---

## 0.3: Third-Party Service Setup

### Payment Gateway (Razorpay)
- [ ] Create Razorpay account (business verification)
- [ ] Get API credentials (key_id, key_secret)
- [ ] Set up Sandbox mode for testing
- [ ] Configure payment methods:
  - [ ] UPI
  - [ ] Credit/Debit cards
  - [ ] Wallets (PayTM, Airtel, etc.)
  - [ ] Net Banking
- [ ] Set up webhook endpoints
- [ ] Configure payment page customization (branding)
- [ ] Test payment flow (mock transactions)

### Email Service (Resend)
- [ ] Create Resend account
- [ ] Verify sending domain
- [ ] Get API key
- [ ] Create email templates:
  - [ ] Welcome email (registration)
  - [ ] Email verification
  - [ ] Password reset
  - [ ] Order confirmation
  - [ ] Shipping notification
  - [ ] Order delivery
  - [ ] Admin notifications
- [ ] Set up sender identity

### SMS Service (WATI - Optional for MVP)
- [ ] API key configuration
- [ ] Template approval (Indian regulations)
- [ ] Phone number whitelisting

### Shipping Integration (Shiprocket)
- [ ] Account setup & API credentials
- [ ] Warehouse configuration
- [ ] Carrier integration (Delhivery, DTDC, etc.)
- [ ] Shipping rate configuration
- [ ] Label generation setup
- [ ] Tracking webhook configuration

### Analytics & Monitoring
- [ ] Sentry project creation
- [ ] DSN configuration (frontend & backend)
- [ ] Source map uploads setup
- [ ] Alert rules configuration
- [ ] PostHog account (optional for MVP)
- [ ] BetterUptime monitoring setup

---

## 0.4: Database Schemas & Indexes

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, indexed),
  passwordHash: String (Argon2id),
  firstName: String,
  lastName: String,
  phone: String,
  avatar: String (Cloudinary URL),
  role: Enum ['customer', 'admin'],
  emailVerified: Boolean (default: false),
  emailVerifiedAt: Date,
  status: Enum ['active', 'inactive', 'suspended'],
  addresses: [
    {
      _id: ObjectId,
      type: Enum ['home', 'work', 'other'],
      street: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
      isDefault: Boolean,
      createdAt: Date
    }
  ],
  preferences: {
    newsletter: Boolean,
    notifications: Boolean,
    smsNotifications: Boolean
  },
  metadata: {
    lastLogin: Date,
    loginCount: Number,
    referralCode: String
  },
  createdAt: Date (indexed),
  updatedAt: Date,
  deletedAt: Date (soft delete)
}

Indexes:
- email (unique)
- createdAt
- status
```

### Product Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique, indexed),
  description: String (long),
  description_short: String,
  price: Number (in paise, 5000 = ₹50),
  costPrice: Number,
  category: ObjectId (ref: Category),
  collection: ObjectId (ref: Collection),
  tags: [String],
  images: [
    {
      _id: ObjectId,
      url: String (Cloudinary),
      alt: String,
      order: Number,
      createdAt: Date
    }
  ],
  variants: [
    {
      _id: ObjectId,
      sku: String (unique across products),
      size: String,
      color: String,
      colorHex: String,
      price: Number (override parent if set),
      inventory: {
        quantity: Number,
        reserved: Number,
        available: Number (computed: quantity - reserved)
      },
      isActive: Boolean,
      createdAt: Date
    }
  ],
  sizeGuide: {
    type: String (S/M/L/XL),
    measurements: {
      chest: String,
      length: String,
      sleeve: String
    }
  },
  materials: [String],
  careInstructions: String,
  hsn_code: String,
  gst_rate: Number (default: 18),
  weight: Number (grams),
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    og_image: String
  },
  status: Enum ['draft', 'active', 'inactive', 'archived'],
  rating: Number,
  reviewCount: Number,
  createdAt: Date (indexed),
  updatedAt: Date,
  createdBy: ObjectId (ref: User),
  deletedAt: Date (soft delete)
}

Indexes:
- slug (unique)
- category, createdAt (compound)
- status
- tags
```

### Order Collection
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique, format: UC-YYYYMMDD-XXXX),
  user: ObjectId (ref: User),
  items: [
    {
      _id: ObjectId,
      product: ObjectId (ref: Product),
      variant: ObjectId (product variant),
      quantity: Number,
      price: Number (unit price at time of order),
      total: Number (quantity * price),
      sku: String
    }
  ],
  billing: {
    subtotal: Number,
    tax: {
      cgst: Number,
      sgst: Number,
      igst: Number,
      cess: Number,
      total: Number
    },
    shipping: Number,
    discount: Number,
    total: Number
  },
  shipping: {
    method: String (e.g., 'Standard', 'Express'),
    cost: Number,
    estimatedDays: Number,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      phone: String
    }
  },
  shippingProvider: Enum ['delhivery', 'dtdc', 'bluedart'],
  trackingNumber: String,
  trackingUrl: String,
  payment: {
    method: String ('upi', 'card', 'wallet', 'netbanking'),
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    status: Enum ['pending', 'captured', 'failed', 'refunded'],
    amount: Number,
    paidAt: Date,
    refundAmount: Number,
    refundedAt: Date,
    refundReason: String
  },
  invoice: {
    invoiceNumber: String (unique),
    invoiceUrl: String (Cloudinary),
    gstin: String (optional, buyer GSTIN),
    generatedAt: Date
  },
  status: Enum ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
  timeline: [
    {
      status: String,
      timestamp: Date,
      note: String,
      updatedBy: ObjectId (ref: User)
    }
  ],
  notes: [
    {
      text: String,
      createdBy: ObjectId,
      createdAt: Date,
      isInternal: Boolean
    }
  ],
  customer: {
    email: String,
    phone: String,
    name: String
  },
  createdAt: Date (indexed),
  updatedAt: Date,
  deletedAt: Date
}

Indexes:
- orderNumber (unique)
- user, createdAt (compound)
- status
- payment.razorpay_order_id
```

### Cart Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, unique for authenticated carts),
  sessionId: String (unique for guest carts, from cookie),
  items: [
    {
      _id: ObjectId,
      product: ObjectId (ref: Product),
      variant: ObjectId,
      quantity: Number,
      price: Number (current price),
      addedAt: Date
    }
  ],
  type: Enum ['guest', 'authenticated'],
  expiresAt: Date (7 days from now for guests),
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- user (unique, sparse)
- sessionId (unique, sparse)
- expiresAt (TTL index: auto-delete after expiry)
```

### Collection Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  description: String,
  image: String (Cloudinary),
  banner: String (Cloudinary),
  products: [ObjectId] (ref: Product),
  displayOrder: Number,
  status: Enum ['draft', 'active', 'archived'],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
}

Indexes:
- slug (unique)
- status
```

### Category Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String (unique),
  description: String,
  icon: String (Cloudinary),
  parent: ObjectId (ref: Category, null for top-level),
  displayOrder: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}

Indexes:
- slug (unique)
- parent
- displayOrder
```

### Invoice Collection
```javascript
{
  _id: ObjectId,
  invoiceNumber: String (unique),
  order: ObjectId (ref: Order),
  seller: {
    name: String,
    address: String,
    gstin: String
  },
  buyer: {
    name: String,
    address: String,
    gstin: String (optional)
  },
  items: [
    {
      description: String,
      hsn: String,
      quantity: Number,
      unit: String,
      rate: Number,
      amount: Number,
      cgst: Number,
      sgst: Number,
      igst: Number
    }
  ],
  totals: {
    subtotal: Number,
    cgst: Number,
    sgst: Number,
    igst: Number,
    cess: Number,
    total: Number
  },
  notes: String,
  pdfUrl: String (Cloudinary),
  generatedAt: Date,
  createdAt: Date
}

Indexes:
- invoiceNumber (unique)
- order
```

### Admin Audit Log Collection
```javascript
{
  _id: ObjectId,
  admin: ObjectId (ref: User),
  action: String (e.g., 'product_created', 'order_status_updated'),
  resourceType: String (Product, Order, User, etc.),
  resourceId: ObjectId,
  changes: {
    before: Object,
    after: Object
  },
  ipAddress: String,
  userAgent: String,
  createdAt: Date (indexed),
  deletedAt: Date
}

Indexes:
- admin, createdAt (compound)
- resourceType, createdAt
```

### Newsletter Subscriber Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String (optional),
  status: Enum ['subscribed', 'unsubscribed', 'bounced'],
  source: String (source of signup),
  subscribedAt: Date,
  unsubscribedAt: Date,
  createdAt: Date
}

Indexes:
- email (unique)
- status
```

---

## 0.5: Environment Variables Setup

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=UrbanCart
NEXT_PUBLIC_SENTRY_DSN=<sentry-dsn>
NEXT_PUBLIC_POSTHOG_KEY=<posthog-key>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloudinary>
NEXT_PUBLIC_RAZORPAY_KEY_ID=<razorpay-key>
```

### Backend (.env)
```bash
NODE_ENV=development
PORT=8000
LOG_LEVEL=info

# Database
MONGODB_URI=mongodb+srv://...
MONGODB_DB_NAME=urbancart

# Cache
REDIS_URL=redis://...

# Auth
JWT_ACCESS_SECRET=<secret>
JWT_REFRESH_SECRET=<secret>
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Email
RESEND_API_KEY=<key>
EMAIL_FROM=noreply@urbancart.dev

# Payment
RAZORPAY_KEY_ID=<key>
RAZORPAY_KEY_SECRET=<secret>

# Shipping
SHIPROCKET_EMAIL=<email>
SHIPROCKET_PASSWORD=<password>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>

# Error Tracking
SENTRY_DSN=<dsn>

# Analytics
POSTHOG_API_KEY=<key>
```

---

# PHASE 1: CORE MVP IMPLEMENTATION (Weeks 3-16)

## 1.1: Backend Authentication & User Management (Weeks 3-4)

### User Schema & Database
- [x] User collection designed (see Phase 0.4)
- [ ] User model created (Mongoose)
- [ ] Address sub-schema with validation
- [ ] User preferences schema
- [ ] Soft delete strategy implemented

### Registration Endpoint
- [ ] POST `/api/v1/auth/register`
  - [ ] Input validation (Zod schema):
    - [ ] email: valid RFC 5322
    - [ ] password: 8+ chars, 1 uppercase, 1 number, 1 special char
    - [ ] firstName: 2+ chars
    - [ ] lastName: 2+ chars
  - [ ] Duplicate email check (case-insensitive)
  - [ ] Password hashing (Argon2id, 2ms time cost)
  - [ ] User document creation
  - [ ] Generate email verification token (24h expiry)
  - [ ] Send verification email via Resend
  - [ ] Return: { user: { id, email, firstName, lastName }, message }
  - [ ] HTTP 201 on success, 400 on validation error, 409 on duplicate
  - [ ] Unit tests (>90% coverage)
  - [ ] Error handling: invalid input, email exists, email send failed

### Email Verification
- [ ] POST `/api/v1/auth/verify-email`
  - [ ] Input: token
  - [ ] Verify token (HMAC-SHA256, 24h expiry)
  - [ ] Update emailVerified flag
  - [ ] Clear token
  - [ ] Return success message
  - [ ] Unit tests
  - [ ] Error handling: invalid token, expired token, already verified

### Login Endpoint
- [ ] POST `/api/v1/auth/login`
  - [ ] Input validation (Zod):
    - [ ] email: valid email format
    - [ ] password: required
  - [ ] Find user by email (case-insensitive)
  - [ ] Verify password with Argon2id
  - [ ] Check emailVerified status
  - [ ] Generate tokens:
    - [ ] Access token (JWT, 15 min, RS256)
    - [ ] Refresh token (JWT, 7 days, RS256)
  - [ ] Store refresh token in Redis (key: refresh_token:{token_id}, TTL: 7 days)
  - [ ] Set httpOnly refresh cookie (7 days, secure, sameSite=strict)
  - [ ] Update lastLogin timestamp
  - [ ] Return: { user, accessToken, message }
  - [ ] HTTP 200 on success, 401 on invalid credentials
  - [ ] Unit tests
  - [ ] Error handling: user not found, password mismatch, not verified

### Token Refresh Endpoint
- [ ] POST `/api/v1/auth/refresh`
  - [ ] Get refresh token from httpOnly cookie
  - [ ] Verify token signature (RS256)
  - [ ] Check token exists in Redis
  - [ ] Verify expiry
  - [ ] Generate new access token
  - [ ] Optional: rotate refresh token (new 7d token)
  - [ ] Return: { accessToken, refreshToken (if rotated), message }
  - [ ] HTTP 200 on success, 401 on invalid/expired
  - [ ] Unit tests
  - [ ] Error handling: missing token, invalid signature, expired, not in Redis

### Password Reset Flow
- [ ] POST `/api/v1/auth/forgot-password`
  - [ ] Input: email
  - [ ] Find user by email
  - [ ] Generate reset token (HMAC-SHA256, 1h expiry)
  - [ ] Store in Redis (key: reset_token:{user_id}, TTL: 1h)
  - [ ] Send reset email via Resend (with reset link)
  - [ ] Return: { message: "Reset link sent" }
  - [ ] HTTP 200 (always, even if user not found - security)
  - [ ] Unit tests

- [ ] POST `/api/v1/auth/reset-password`
  - [ ] Input: token, password
  - [ ] Verify token from Redis
  - [ ] Validate password strength
  - [ ] Update password (hash with Argon2id)
  - [ ] Delete reset token
  - [ ] Invalidate all refresh tokens for user (security)
  - [ ] Return: { message: "Password updated" }
  - [ ] HTTP 200 on success, 400 on invalid token/password
  - [ ] Unit tests

### Logout Endpoint
- [ ] POST `/api/v1/auth/logout`
  - [ ] Get refresh token from cookie
  - [ ] Delete from Redis
  - [ ] Clear httpOnly cookie
  - [ ] Return: { message: "Logged out" }
  - [ ] HTTP 200
  - [ ] Unit tests

### Get Current User
- [ ] GET `/api/v1/auth/me`
  - [ ] Requires auth middleware
  - [ ] Return current user data
  - [ ] HTTP 200 on success, 401 if not authenticated
  - [ ] Unit tests

### Auth Middleware
- [ ] JWT token verification (RS256)
- [ ] Extract user from token
- [ ] Attach user to request context
- [ ] Support both header (Bearer) and cookie auth
- [ ] Error responses (401 Unauthorized)

### Authentication Tests
- [ ] Unit tests for all endpoints (>90% coverage)
- [ ] Integration tests (database + auth flow)
- [ ] Test cases:
  - [ ] Happy path for each endpoint
  - [ ] Validation errors (bad email, weak password)
  - [ ] Authorization failures (wrong password)
  - [ ] Token expiry & refresh
  - [ ] Race conditions (concurrent requests)
  - [ ] Security (timing attacks, token leakage)

**Completion Target:** Week 4  
**Team:** 1 Backend Dev  
**Story Points:** 13  

---

## 1.2: User Profile & Address Management (Weeks 4-5)

### User Profile Endpoints
- [ ] GET `/api/v1/users/profile`
  - [ ] Requires auth
  - [ ] Return user data (email, firstName, lastName, phone, avatar)
  - [ ] HTTP 200

- [ ] PATCH `/api/v1/users/profile`
  - [ ] Input: firstName, lastName, phone, avatar
  - [ ] Validation (name length, phone format)
  - [ ] Update user document
  - [ ] Return updated user
  - [ ] HTTP 200

### Address Management
- [ ] GET `/api/v1/users/addresses`
  - [ ] Requires auth
  - [ ] Return array of user addresses
  - [ ] HTTP 200

- [ ] POST `/api/v1/users/addresses`
  - [ ] Input validation:
    - [ ] street, city, state, pincode, phone
    - [ ] type: 'home' | 'work' | 'other'
  - [ ] Address validation:
    - [ ] Pincode format (Indian 6-digit)
    - [ ] State validation (list of valid INTerstates)
    - [ ] Phone format (10-digit Indian mobile)
  - [ ] Create address sub-document
  - [ ] Maximum 5 addresses per user
  - [ ] Return created address
  - [ ] HTTP 201

- [ ] PATCH `/api/v1/users/addresses/:addressId`
  - [ ] Validate ownership
  - [ ] Validate new data
  - [ ] Update address
  - [ ] Return updated address
  - [ ] HTTP 200

- [ ] DELETE `/api/v1/users/addresses/:addressId`
  - [ ] Validate ownership
  - [ ] Delete address
  - [ ] Check if default (prevent deletion if default only)
  - [ ] HTTP 204

- [ ] PATCH `/api/v1/users/addresses/:addressId/default`
  - [ ] Set this as default address
  - [ ] Unset previous default
  - [ ] HTTP 200

### Address Validation Service
- [ ] Pincode input validation
- [ ] Optional: Google Maps API integration (future)
- [ ] State/pincode mapping
- [ ] Error messages for invalid addresses

**Completion Target:** Week 5  
**Team:** 1 Backend Dev  
**Story Points:** 8  

---

## 1.3: Product Management System (Weeks 5-7)

### Product Schema & Database
- [x] Product collection designed
- [x] Category & Collection schemas designed
- [ ] Indexes created (slug, category, status, createdAt)
- [ ] Seed data created (10-20 products for testing)

### Product CRUD - Create
- [ ] POST `/api/v1/admin/products`
  - [ ] Requires admin auth
  - [ ] Input validation (Zod):
    - [ ] name: 5-200 chars
    - [ ] slug: unique, alphanumeric + hyphen
    - [ ] description: 20+ chars
    - [ ] price: > 0
    - [ ] category: valid categoryId
    - [ ] status: draft | active | inactive
  - [ ] Product document creation
  - [ ] Create default empty variants array
  - [ ] Return created product with _id
  - [ ] HTTP 201
  - [ ] Audit log entry
  - [ ] Unit tests

### Product CRUD - Read
- [ ] GET `/api/v1/products`
  - [ ] Public endpoint (no auth)
  - [ ] Response includes only active products
  - [ ] Return array of products with summary (name, price, image, rating)
  - [ ] HTTP 200

- [ ] GET `/api/v1/products/:slug`
  - [ ] Public endpoint
  - [ ] Return full product details (images, variants, size guide)
  - [ ] Include ratings/reviews (if Phase 2)
  - [ ] Check variant availability
  - [ ] HTTP 200, 404 if not found

- [ ] GET `/api/v1/admin/products/:productId`
  - [ ] Admin only
  - [ ] Return full product with all fields (including drafts)
  - [ ] HTTP 200

### Product CRUD - Update
- [ ] PATCH `/api/v1/admin/products/:productId`
  - [ ] Admin only
  - [ ] Validate updated fields
  - [ ] Update product document
  - [ ] Don't allow updating slug once active
  - [ ] Create audit log with before/after
  - [ ] Return updated product
  - [ ] HTTP 200
  - [ ] Unit tests

### Product CRUD - Delete (Soft Delete)
- [ ] DELETE `/api/v1/admin/products/:productId`
  - [ ] Admin only
  - [ ] Set deletedAt timestamp
  - [ ] Don't physically delete (soft delete)
  - [ ] Create audit log
  - [ ] HTTP 204

### Product Duplicate
- [ ] POST `/api/v1/admin/products/:productId/duplicate`
  - [ ] Admin only
  - [ ] Copy all product data EXCEPT:
    - [ ] _id (new ID)
    - [ ] slug (add -copy-N suffix)
    - [ ] inventory (reset to 0)
  - [ ] Set status to 'draft'
  - [ ] Create audit log
  - [ ] Return duplicated product
  - [ ] HTTP 201

### Category Management
- [ ] POST `/api/v1/admin/categories`
  - [ ] Admin only
  - [ ] Input: name, slug, description, parent (optional)
  - [ ] Slug validation & uniqueness
  - [ ] Create category document
  - [ ] HTTP 201
  - [ ] Audit log

- [ ] GET `/api/v1/categories`
  - [ ] Public endpoint
  - [ ] Return all active categories (hierarchical)
  - [ ] HTTP 200

- [ ] PATCH `/api/v1/admin/categories/:categoryId`
  - [ ] Admin only
  - [ ] Update category
  - [ ] HTTP 200

- [ ] DELETE `/api/v1/admin/categories/:categoryId`
  - [ ] Admin only
  - [ ] Soft delete
  - [ ] HTTP 204

### Collection Management
- [ ] POST `/api/v1/admin/collections`
  - [ ] Admin only
  - [ ] Input: name, slug, description, products (array of IDs)
  - [ ] Validate product IDs
  - [ ] Create collection
  - [ ] HTTP 201

- [ ] GET `/api/v1/collections`
  - [ ] Public
  - [ ] Return all active collections
  - [ ] HTTP 200

- [ ] GET `/api/v1/collections/:slug`
  - [ ] Public
  - [ ] Return collection with all product details
  - [ ] HTTP 200

- [ ] PATCH `/api/v1/admin/collections/:collectionId`
  - [ ] Admin only
  - [ ] Update collection
  - [ ] HTTP 200

- [ ] DELETE `/api/v1/admin/collections/:collectionId`
  - [ ] Admin only
  - [ ] Soft delete
  - [ ] HTTP 204

**Completion Target:** Week 7  
**Team:** 1 Backend Dev  
**Story Points:** 21  

---

## 1.4: Product Variants & Image Management (Weeks 7-8)

### Variant Management
- [ ] POST `/api/v1/admin/products/:productId/variants`
  - [ ] Admin only
  - [ ] Input: size, color, colorHex, sku, quantity
  - [ ] SKU uniqueness check (across all products)
  - [ ] Color hex validation (#RRGGBB format)
  - [ ] Create variant sub-document
  - [ ] Return created variant
  - [ ] HTTP 201

- [ ] GET `/api/v1/admin/products/:productId/variants`
  - [ ] Admin only
  - [ ] Return all variants with inventory data
  - [ ] HTTP 200

- [ ] PATCH `/api/v1/admin/products/:productId/variants/:variantId`
  - [ ] Admin only
  - [ ] Update variant (size, color, price override, quantity)
  - [ ] SKU uniqueness check if changed
  - [ ] HTTP 200

- [ ] DELETE `/api/v1/admin/products/:productId/variants/:variantId`
  - [ ] Admin only
  - [ ] Mark variant as inactive (don't delete to preserve order history)
  - [ ] HTTP 204

### Image Management
- [ ] POST `/api/v1/admin/products/:productId/images`
  - [ ] Admin only
  - [ ] Cloudinary signed upload
  - [ ] Input: image file (max 5MB)
  - [ ] Upload to Cloudinary (`/products` folder)
  - [ ] Store URL in product images array
  - [ ] Generate responsive srcset (480w, 768w, 1024w, 1440w)
  - [ ] Auto-generate alt text from product name
  - [ ] Return created image object
  - [ ] HTTP 201

- [ ] GET `/api/v1/admin/products/:productId/images`
  - [ ] Admin only
  - [ ] Return all images with Cloudinary URLs
  - [ ] HTTP 200

- [ ] PATCH `/api/v1/admin/products/:productId/images/:imageId`
  - [ ] Admin only
  - [ ] Update alt text
  - [ ] HTTP 200

- [ ] DELETE `/api/v1/admin/products/:productId/images/:imageId`
  - [ ] Admin only
  - [ ] Delete from Cloudinary
  - [ ] Remove from product images array
  - [ ] HTTP 204

- [ ] PATCH `/api/v1/admin/products/:productId/images/reorder`
  - [ ] Admin only
  - [ ] Input: array of image IDs in new order
  - [ ] Update order field in each image
  - [ ] Return reordered images
  - [ ] HTTP 200

### Image Service
- [ ] Cloudinary SDK integration
- [ ] Upload function with signed uploads
- [ ] Delete function
- [ ] Transformation function (responsiveImage helper)
- [ ] Error handling (upload failed, file too large)

**Completion Target:** Week 8  
**Team:** 1 Backend Dev  
**Story Points:** 13  

---

## 1.5: Product Search & Filtering (Week 8)

### Search Endpoint
- [ ] GET `/api/v1/products/search`
  - [ ] Public endpoint
  - [ ] Query parameter: `q` (search term)
  - [ ] Algorithm options:
    - [ ] Text search (MongoDB full-text index or Atlas Search)
    - [ ] Fuzzy matching (levenshtein distance)
    - [ ] Prefix matching for autocomplete
  - [ ] Search fields: name, description, tags, category
  - [ ] Limit results to 50
  - [ ] Response time target: <100ms
  - [ ] Return: { results: [products], total }
  - [ ] HTTP 200

### Filtering & Sorting
- [ ] GET `/api/v1/products` with query parameters:
  - [ ] **Filter by:**
    - [ ] category: string (slug)
    - [ ] collection: string (slug)
    - [ ] priceMin: number
    - [ ] priceMax: number
    - [ ] colors: array of color strings
    - [ ] sizes: array of sizes
    - [ ] inStock: boolean (only available variants)
  
  - [ ] **Sort by:**
    - [ ] newest (default, by createdAt)
    - [ ] price_asc (ascending)
    - [ ] price_desc (descending)
    - [ ] bestselling (by order count, future)
    - [ ] rating (future)

  - [ ] **Pagination:**
    - [ ] page: number (default: 1)
    - [ ] limit: number (default: 20, max: 100)
    - [ ] Response includes: total, pageCount, currentPage

### Elasticsearch/MongoDB Atlas Search (Optional Enhancement)
- [ ] If using Atlas Search:
  - [ ] Create search index on product collection
  - [ ] Configure analyzers for fuzzy matching
  - [ ] Optimize for relevance ranking

**Completion Target:** Week 8  
**Team:** 1 Backend Dev  
**Story Points:** 8  

---

## 1.6: Shopping Cart Implementation (Weeks 8-10)

### Guest Cart (Redis-based)
- [ ] Session management:
  - [ ] Generate session ID on first visit
  - [ ] Store in httpOnly cookie (7-day expiry)
  - [ ] Track in Redis with TTL

- [ ] GET `/api/v1/cart`
  - [ ] No auth requirement
  - [ ] Get sessionId from cookie (or create new)
  - [ ] Retrieve cart from Redis
  - [ ] Populate product/variant details from MongoDB
  - [ ] Calculate totals (subtotal, shipping estimate)
  - [ ] Return cart with items
  - [ ] HTTP 200

- [ ] POST `/api/v1/cart/items`
  - [ ] Add item to cart
  - [ ] Input: productId, variantId, quantity
  - [ ] Validate product & variant exist
  - [ ] Check inventory availability
  - [ ] If duplicate variant in cart, increment quantity instead
  - [ ] Store in Redis (key: cart:{sessionId})
  - [ ] Return updated cart
  - [ ] HTTP 201

- [ ] PATCH `/api/v1/cart/items/:itemId`
  - [ ] Update item quantity or variant
  - [ ] Validate new quantity > 0
  - [ ] Check inventory
  - [ ] Update Redis
  - [ ] Return updated cart
  - [ ] HTTP 200

- [ ] DELETE `/api/v1/cart/items/:itemId`
  - [ ] Remove item from cart
  - [ ] Update Redis
  - [ ] Return updated cart
  - [ ] HTTP 204

- [ ] DELETE `/api/v1/cart`
  - [ ] Clear entire cart
  - [ ] Delete from Redis
  - [ ] HTTP 204

### Authenticated Cart (MongoDB-based)
- [ ] Cart schema includes user reference
- [ ] GET `/api/v1/cart` (when authenticated):
  - [ ] Retrieve from MongoDB instead of Redis
  - [ ] Populate product details
  - [ ] Calculate totals
  - [ ] HTTP 200

- [ ] All mutation endpoints:
  - [ ] Save to MongoDB (user-specific)
  - [ ] Same business logic as guest cart

### Cart Merge on Login
- [ ] POST `/api/v1/cart/merge` (internal, triggered on login)
  - [ ] Get guest cart from session
  - [ ] Get user's existing cart from MongoDB
  - [ ] Merge items:
    - [ ] If same product+variant exists in both: combine quantities
    - [ ] If quantities exceed inventory: cap at available quantity
    - [ ] Add guest-only items to user cart
  - [ ] Delete guest cart from Redis
  - [ ] Save merged cart to MongoDB
  - [ ] Return merged cart
  - [ ] HTTP 200

### Cart Calculation Service
- [ ] Subtotal: sum of (item price * quantity)
- [ ] Shipping estimate: based on pincode (optional, hardcoded for MVP)
- [ ] Tax: calculated later in checkout
- [ ] Total: subtotal + shipping

### Inventory Validation
- [ ] On add/update cart item:
  - [ ] Check variant available quantity
  - [ ] Return inventory error if item not available
  - [ ] Prevent oversell

### Cart Frontend Component (Next.js)
- [ ] Cart drawer/slide-in component
- [ ] Item list with product image, name, size, color, price
- [ ] Quantity input (+ / - buttons)
- [ ] Remove button per item
- [ ] Subtotal display
- [ ] "Proceed to Checkout" button
- [ ] Empty state (with link to shop)
- [ ] TanStack Query integration (useCart hook)
- [ ] Optimistic updates
- [ ] Loading states

**Completion Target:** Week 10  
**Team:** 1 Backend Dev, 1 Frontend Dev  
**Story Points:** 16  

---

## 1.7: Checkout & Payment Integration (Weeks 10-13)

### Checkout State & Flow
- [ ] Multi-step checkout state machine:
  - [ ] Step 1: Address selection/entry
  - [ ] Step 2: Shipping method selection
  - [ ] Step 3: Payment method selection
  - [ ] Step 4: Order confirmation

### Step 1: Address Endpoint
- [ ] POST `/api/v1/checkout/address`
  - [ ] Requires auth
  - [ ] Input: use existing address OR create new
  - [ ] If new: validate address fields (street, city, state, pincode, phone)
  - [ ] Store address in checkout session
  - [ ] Return validated address
  - [ ] HTTP 200

### Step 2: Shipping Endpoint
- [ ] POST `/api/v1/checkout/shipping`
  - [ ] Requires auth
  - [ ] Input: shipping method (Standard, Express)
  - [ ] Calculate shipping cost based on:
    - [ ] Cart weight (product data)
    - [ ] Destination pincode
    - [ ] Method selected
  - [ ] For MVP: hardcoded rates (e.g., ₹50 standard, ₹100 express)
  - [ ] Return shipping options with updated total
  - [ ] HTTP 200

### Step 3: Payment Integration (Razorpay)
- [ ] POST `/api/v1/checkout/razorpay-order`
  - [ ] Requires auth
  - [ ] Input: empty body (cart + address + shipping already in session)
  - [ ] Create Razorpay order:
    - [ ] amount: calculated from cart + shipping + tax
    - [ ] currency: 'INR'
    - [ ] customer_notify: 1 (send SMS/email to customer)
    - [ ] notes: { userId, cartId }
  - [ ] Store order_id in session
  - [ ] Store order_id in Redis with TTL (1 hour)
  - [ ] Return: { razorpay_order_id, amount, currency, key_id }
  - [ ] HTTP 200

- [ ] Razorpay Payment Modal (Frontend)
  - [ ] Client-side Razorpay integration
  - [ ] On successful payment:
    - [ ] Call payload validator endpoint
    - [ ] Handle payment completion
  - [ ] On failed payment:
    - [ ] Show error message
    - [ ] Allow retry
  - [ ] On modal close:
    - [ ] Show retry option

### Step 4: Payment Verification & Order Creation
- [ ] POST `/api/v1/checkout/verify`
  - [ ] Input: razorpay_payment_id, razorpay_order_id, razorpay_signature
  - [ ] Verify signature:
    - [ ] `HMAC-SHA256(order_id + "|" + payment_id, key_secret)` == signature
  - [ ] Query Razorpay API to verify payment status (optional extra validation)
  - [ ] On signature match:
    - [ ] Create Order document:
      - [ ] From cart items, address, shipping, payment data
      - [ ] Set status to 'pending' (awaiting confirmation)
      - [ ] Generate invoice number (UC-{date}-{sequence})
      - [ ] Initialize timeline with 'pending' status
      - [ ] **Decrement inventory** for each item
    - [ ] Clear user's cart
    - [ ] Send order confirmation email
    - [ ] Generate invoice (async)
    - [ ] Return: { orderNumber, message }
    - [ ] HTTP 201
  - [ ] On signature mismatch:
    - [ ] Log security event
    - [ ] Return 400 error (do NOT create order)
    - [ ] Customer should retry payment

### Order Creation (Internal)
- [ ] POST `/api/v1/orders` (internal endpoint, used after payment verification)
  - [ ] Input: cart, address, shipping, payment details
  - [ ] Create order document with all fields (see schema)
  - [ ] Decrement inventory for each variant:
    - [ ] Use atomic update: `available = quantity - reserved`
    - [ ] Check availability before decrement (prevent oversell)
  - [ ] Clear cart
  - [ ] Return created order
  - [ ] HTTP 201

### Tax & GST Calculation
- [ ] Service function: calculateTax(items, shippingCost)
  - [ ] For each item:
    - [ ] Get product's gst_rate (default: 18%)
    - [ ] Calculate pre-tax item value
  - [ ] Calculate CGST (9%), SGST (9%) for intra-state
  - [ ] Calculate IGST (18%) for inter-state
  - [ ] Calculate CESS (if applicable)
  - [ ] Return: { cgst, sgst, igst, cess, totalTax }
  
- [ ] State determination:
  - [ ] Store mapping: { state_code: { cgst%, sgst%, igst% } }
  - [ ] Intra-state (same customer state as warehouse): CGST + SGST
  - [ ] Inter-state (different): IGST only
  
- [ ] Endpoint: POST `/api/v1/checkout/calculate-tax`
  - [ ] Input: items, destinationState
  - [ ] Return: { tax breakdown, total }

### Invoice Generation
- [ ] Generate PDF invoice (React-PDF)
- [ ] Template includes:
  - [ ] Invoice number (UC-YYYYMMDD-XXXX)
  - [ ] Invoice date
  - [ ] Order details (number, date, total)
  - [ ] Seller details (GSTIN, address)
  - [ ] Buyer details (customer name, address, GSTIN if B2B)
  - [ ] Items table (description, HSN, quantity, rate, amount, tax)
  - [ ] Tax summary (CGST%, SGST%, IGST%, CESS)
  - [ ] Total amount in words
  - [ ] Terms and conditions

- [ ] Endpoint: GET `/api/v1/orders/:orderId/invoice`
  - [ ] Generate PDF on-the-fly
  - [ ] Or retrieve pre-generated from storage
  - [ ] Return PDF file (application/pdf)
  - [ ] HTTP 200

- [ ] Async invoice generation:
  - [ ] After order creation, queue invoice generation
  - [ ] Use BullMQ for async job processing
  - [ ] Generate PDF and upload to Cloudinary
  - [ ] Update order.invoice.invoiceUrl
  - [ ] Send invoice as email attachment

### Order Confirmation Email
- [ ] Resend email template (React Email):
  - [ ] Order confirmation message
  - [ ] Order details (number, date, total)
  - [ ] Shipping address
  - [ ] Items list
  - [ ] Tracking info (when available)
  - [ ] Support contact info
  - [ ] Attach invoice PDF

- [ ] Send via Resend API
- [ ] Async queue (BullMQ)
- [ ] Retry logic (3 attempts, exponential backoff)
- [ ] Log email send status

### Inventory Decrement
- [ ] After successful payment:
  - [ ] For each cart item:
    - [ ] Update variant.inventory.quantity
    - [ ] atomic operation: `quantity -= cartItem.quantity`
    - [ ] Double-check `available >= cartItem.quantity` before decrement
    - [ ] Prevent oversell race condition
  
- [ ] On order cancellation (if supported):
  - [ ] Increment quantities back
  - [ ] Mark as "returned to inventory"

### Checkout Frontend - Step 1 (Address)
- [ ] Form component:
  - [ ] Fields: street, city, state (dropdown), pincode, phone
  - [ ] Validation: Zod schema
  - [ ] State dropdown: populated from Indian states list
  - [ ] Pincode input: 6-digit validation
  - [ ] Phone input: 10-digit Indian mobile
  - [ ] Option to select from saved addresses (dropdown)
  - [ ] Option to add new address
  - [ ] Proceed button → next step

### Checkout Frontend - Step 2 (Shipping)
- [ ] Radio buttons for shipping methods:
  - [ ] Standard (5-7 days) - ₹50
  - [ ] Express (2-3 days) - ₹100
- [ ] Total with shipping displayed
- [ ] Proceed button → next step

### Checkout Frontend - Step 3 (Payment)
- [ ] Payment method selection:
  - [ ] UPI (selected by default for India)
  - [ ] Credit/Debit card
  - [ ] Wallet
  - [ ] Netbanking
- [ ] Order summary:
  - [ ] Items, quantities, prices
  - [ ] Subtotal
  - [ ] Shipping
  - [ ] Tax breakdown
  - [ ] Final total
- [ ] Pay button → opens Razorpay modal

### Checkout Frontend - Step 4 (Confirmation)
- [ ] Order created confirmation message
- [ ] Order number displayedDisplay
  - [ ] Order number
  - [ ] Confirmation message
  - [ ] Estimated delivery date
  - [ ] Shipping address
  - [ ] Order summary
- [ ] Buttons: "Track Order", "Continue Shopping"

**Completion Target:** Week 13  
**Team:** 2 Backend Devs, 1 Frontend Dev  
**Story Points:** 34  

---

## 1.8: Order Management (Weeks 13-15)

### Order Retrieval
- [ ] GET `/api/v1/orders/:orderId`
  - [ ] Requires auth
  - [ ] Validate user owns order (or admin)
  - [ ] Return full order details (items, shipping, payment, timeline)
  - [ ] HTTP 200

- [ ] GET `/api/v1/orders`
  - [ ] Requires auth
  - [ ] Filter by current user
  - [ ] Pagination (page, limit)
  - [ ] Sort by createdAt (newest first)
  - [ ] Return array of orders
  - [ ] HTTP 200

### Order Status Updates
- [ ] PATCH `/api/v1/admin/orders/:orderId`
  - [ ] Admin only
  - [ ] Input: newStatus (from valid status enum)
  - [ ] Valid status transitions:
    - [ ] pending → confirmed
    - [ ] confirmed → processing
    - [ ] processing → shipped
    - [ ] shipped → delivered
    - [ ] Any status → cancelled (before shipped)
  - [ ] Add timeline entry with timestamp & note
  - [ ] Send status update email to customer
  - [ ] Return updated order
  - [ ] HTTP 200
  - [ ] Audit log entry

### Shipping Integration (Shiprocket)
- [ ] Setup: API key & credentials configured
- [ ] POST `/api/v1/admin/orders/:orderId/shipping`
  - [ ] Admin only
  - [ ] Input: creates shipping with Shiprocket
  - [ ] Call Shiprocket API to:
    - [ ] Create order in Shiprocket
    - [ ] Generate shipping label
    - [ ] Get tracking number
  - [ ] Update order:
    - [ ] shippingProvider
    - [ ] trackingNumber
    - [ ] trackingUrl
  - [ ] Status automatically → 'shipped'
  - [ ] Send tracking email
  - [ ] Return updated order
  - [ ] HTTP 200

- [ ] Webhook: `/api/v1/webhooks/shiprocket`
  - [ ] Receive Shiprocket tracking updates
  - [ ] Update order status based on events:
    - [ ] in_transit → status: 'shipped'
    - [ ] delivered → status: 'delivered'
    - [ ] rto_initiated → status: 'returned'
    - [ ] rto_delivered → status: 'cancelled'
  - [ ] Send status email to customer
  - [ ] Update timeline
  - [ ] HTTP 200

### Order Cancellation
- [ ] DELETE `/api/v1/orders/:orderId`
  - [ ] Requires auth (user owns order)
  - [ ] Only allow if status is 'pending' or 'confirmed' (before processed)
  - [ ] Change status to 'cancelled'
  - [ ] Refund inventory (increment variant quantities)
  - [ ] Process refund with Razorpay
  - [ ] Send cancellation email
  - [ ] Return success message
  - [ ] HTTP 200 or 400 if cannot cancel

- [ ] PATCH `/api/v1/admin/orders/:orderId/cancel`
  - [ ] Admin only
  - [ ] Can cancel even if processed
  - [ ] Same logic as above
  - [ ] Audit log with cancellation reason

### Guest Order Tracking
- [ ] GET `/api/v1/orders/track/:orderNumber`
  - [ ] Public endpoint (no auth)
  - [ ] Input: orderNumber + email verification
  - [ ] Return: { orderNumber, status, trackingNumber, trackingUrl, timeline }
  - [ ] Security: validate order email matches query email
  - [ ] HTTP 200

### Order List - Admin
- [ ] GET `/api/v1/admin/orders`
  - [ ] Admin only
  - [ ] Pagination (page, limit)
  - [ ] Filter by:
    - [ ] status (dropdown)
    - [ ] date range
    - [ ] customer email or name
  - [ ] Sort by createdAt or status
  - [ ] Return: orders with customer info, status, total
  - [ ] HTTP 200

### Order Detail - Admin
- [ ] GET `/api/v1/admin/orders/:orderId`
  - [ ] Admin only
  - [ ] Return full order details + audit trail
  - [ ] HTTP 200

### Admin Notes on Orders
- [ ] POST `/api/v1/admin/orders/:orderId/notes`
  - [ ] Admin only
  - [ ] Input: text, isInternal (boolean)
  - [ ] Create note sub-document
  - [ ] If internal, don't send to customer
  - [ ] Return updated order
  - [ ] HTTP 201

### Order Export to CSV
- [ ] GET `/api/v1/admin/orders/export?dateFrom=&dateTo=&status=`
  - [ ] Admin only
  - [ ] Generate CSV file with columns:
    - [ ] Order Number, Date, Customer, Email, Phone, Status, Total, Items, Shipping Address
  - [ ] Return file (text/csv)
  - [ ] HTTP 200

### Order Frontend - Customer View
- [ ] Order list page:
  - [ ] Table/list of customer's orders
  - [ ] Columns: Order Number, Date, Status, Total
  - [ ] Click to view details
  - [ ] Filter by status (tabs or dropdown)
  - [ ] Sort by date (newest first)

- [ ] Order detail page:
  - [ ] Order number & date
  - [ ] Status timeline (visual timeline component)
  - [ ] Items table (product image, name, size, color, qty, price)
  - [ ] Shipping address
  - [ ] Tracking number (if shipped)
    - [ ] Link to tracking page (Shiprocket/carrier)
    - [ ] Estimated delivery date
  - [ ] Payment info (method, amount)
  - [ ] Download invoice button
  - [ ] Cancel order button (if still pending)

**Completion Target:** Week 15  
**Team:** 1 Backend Dev, 1 Frontend Dev  
**Story Points:** 21  

---

## 1.9: Admin Panel - Core (Weeks 8-15)

### Admin Authentication
- [ ] Admin role field in User model
- [ ] Admin login flow (same as user but checks role)
- [ ] Protected admin routes (must have role: 'admin')
- [ ] Admin middleware to check role

### Admin Dashboard Page
- [ ] GET `/api/v1/admin/dashboard`
  - [ ] Return dashboard metrics:
    - [ ] totalRevenue (all time)
    - [ ] revenueToday
    - [ ] revenueThisMonth
    - [ ] totalOrders
    - [ ] ordersToday
    - [ ] ordersThisMonth
    - [ ] visitorCount (from PostHog or estimated)
    - [ ] conversionRate
    - [ ] averageOrderValue
    - [ ] topProducts (top 5 by orders)
    - [ ] recentOrders (last 10)

- [ ] Dashboard UI components:
  - [ ] Top KPI cards (revenue, orders, visitors, conversion)
  - [ ] Revenue chart (daily line chart, Recharts)
  - [ ] Orders chart (bar chart)
  - [ ] Top products table (product name, sales, revenue)
  - [ ] Recent orders table (order number, customer, status, total, date)
  - [ ] Quick action buttons (view all orders, create product)

### Admin Product Management
- [ ] Products page (admin):
  - [ ] Table with columns: Name, SKU, Category, Price, Stock, Status, Actions
  - [ ] Search/filter by name or category
  - [ ] Sort by name, price, stock, date
  - [ ] Pagination (20 per page)
  - [ ] Action buttons:
    - [ ] Edit (open form in modal or separate page)
    - [ ] View details
    - [ ] Delete
    - [ ] Duplicate
  - [ ] Create Product button (form modal or page)

- [ ] Product form:
  - [ ] Fields: name, slug, description, description_short, price, category, collection, status
  - [ ] Image upload (drag & drop, multiple)
  - [ ] Image reordering (drag & drop)
  - [ ] Material/care instructions (optional)
  - [ ] Size guide configuration
  - [ ] Variants table:
    - [ ] Columns: Size, Color, SKU, Price, Quantity, Actions
    - [ ] Add variant button (inline add form)
    - [ ] Edit/delete per variant
  - [ ] Save & Publish buttons
  - [ ] Form validation & error display

### Admin Inventory Management
- [ ] Inventory page:
  - [ ] Table with columns: Product, Variant, SKU, Current Stock, Reserved, Available, Status
  - [ ] Search by product name or SKU
  - [ ] Filter by low stock (<5), in stock, out of stock
  - [ ] Edit stock:
    - [ ] Click to inline edit quantity
    - [ ] Or bulk edit form
  - [ ] Low stock alert (highlight red)
  - [ ] Export to CSV button
  - [ ] History column: Last updated, Updated by, Previous quantity

### Admin Order Management
- [ ] Orders page:
  - [ ] Table: Order #, Customer, Date, Status, Total, Actions
  - [ ] Filter by status (tabs or dropdown)
  - [ ] Date range filter
  - [ ] Search by order number or customer name
  - [ ] Sort by date (newest first) or status
  - [ ] Pagination
  - [ ] Action buttons: View, Update status, Print label, Email

- [ ] Order detail page:
  - [ ] Order number, customer info, date
  - [ ] Items table (product, variant, qty, price, subtotal)
  - [ ] Shipping address & contact
  - [ ] Billing summary (subtotal, tax, shipping, total)
  - [ ] Payment status & method
  - [ ] Status update dropdown (with note input)
  - [ ] Tracking section:
    - [ ] Tracking number (editable)
    - [ ] Carrier dropdown
    - [ ] Generate label button (Shiprocket)
  - [ ] Notes section (internal notes only)
  - [ ] Actions: Refund button, Cancel button, Send email button

### Admin Collection Management
- [ ] Collections page:
  - [ ] Table: Name, Slug, Products Count, Status, Actions
  - [ ] Create collection button
  - [ ] Edit/delete actions

- [ ] Collection form:
  - [ ] Fields: name, slug, description, banner image, status
  - [ ] Product selector (multi-select, searchable)
  - [ ] Display order field
  - [ ] Save button

### Admin Analytics (Basic)
- [ ] Analytics page:
  - [ ] Revenue report:
    - [ ] Date range picker
    - [ ] Line chart (daily revenue)
    - [ ] Summary stats (total, average, growth %)
  - [ ] Orders report:
    - [ ] Bar chart (orders per day)
    - [ ] Count stats
  - [ ] Top products table
  - [ ] Top customers table (by spent)
  - [ ] Export to CSV button

### Admin Utilities
- [ ] System health check (optional):
  - [ ] Database status (connected/disconnected)
  - [ ] Redis status
  - [ ] API status
  - [ ] Uptime
  - [ ] Last backup date

**Completion Target:** Week 15  
**Team:** 1 Admin Dev  
**Story Points:** 34  

---

## 1.10: Frontend Storefront (Weeks 5-15, Parallel with Backend)

### Pages Architecture
- [ ] Layout / Base structure:
  - [ ] Header (navigation, search, cart icon, user menu)
  - [ ] Footer (links, newsletter signup, socials)
  - [ ] Navigation structure (Shop, Collections, About, Contact)
  - [ ] Mobile-responsive hamburger menu

### Pages List
- [ ] Homepage (`/`)
  - [ ] Hero banner
  - [ ] Featured collection section
  - [ ] Featured products grid
  - [ ] About preview
  - [ ] Newsletter signup
  - [ ] Social proof / Instagram feed (optional)

- [ ] Shop page (`/shop`)
  - [ ] Product grid (responsive: 1-2-3-4 cols)
  - [ ] Sidebar filters:
    - [ ] Category (multi-select)
    - [ ] Price range slider
    - [ ] Colors (color swatches)
    - [ ] Sizes (checkboxes)
    - [ ] In stock toggle
  - [ ] Top bar:
    - [ ] Sort dropdown (newest, price asc/desc, bestselling)
    - [ ] View toggle (grid/list)
    - [ ] "X results" text
  - [ ] Product card:
    - [ ] Image (hover: show secondary image)
    - [ ] Name
    - [ ] Price
    - [ ] Rating (if Phase 2)
    - [ ] Available sizes
    - [ ] Quick add to cart button

- [ ] Product Detail page (`/product/:slug`)
  - [ ] Product gallery:
    - [ ] Main image (large, zoomable on hover)
    - [ ] Thumbnail carousel (swipeable on mobile)
    - [ ] Navigation arrows
  - [ ] Product info pane:
    - [ ] Name, price, rating
    - [ ] Available variants:
      - [ ] Size selector (radio buttons with labels)
      - [ ] Color selector (color swatches with names)
      - [ ] Selected variant preview
    - [ ] Add to cart button (disabled if out of stock)
    - [ ] Wishlist button (heart icon, Phase 2)
    - [ ] Sharing buttons (Twitter, Facebook, Pinterest)
  - [ ] Product details section:
    - [ ] Description
    - [ ] Materials/care instructions (collapsible)
    - [ ] Size guide (modal or collapsible)
  - [ ] Shipping info (collapsible)
  - [ ] Reviews section (Phase 2)
  - [ ] Related products carousel (bottom)

- [ ] Collections page (`/collections/:slug`)
  - [ ] Collection hero banner
  - [ ] Collection description
  - [ ] Products grid with same filters as Shop
  - [ ] Same sidebar filters & sorting

- [ ] Cart page (`/cart`)
  - [ ] Empty state (with link to shop)
  - [ ] Cart items table:
    - [ ] Product image, name, size, color
    - [ ] Unit price
    - [ ] Quantity input (- / + buttons, or input field)
    - [ ] Line total
    - [ ] Remove button (X icon or trash icon)
  - [ ] Totals summary:
    - [ ] Subtotal
    - [ ] Shipping estimate
    - [ ] Estimated tax (if applicable)
    - [ ] Total
  - [ ] "Proceed to Checkout" button
  - [ ] "Continue Shopping" button
  - [ ] Recommended products (sidebar or bottom)

- [ ] Checkout page (`/checkout`)
  - [ ] Multi-step form:
    - [ ] Step 1: Address
      - [ ] Saved addresses (radio select)
      - [ ] OR new address form
      - [ ] Address fields validated
      - [ ] Next button
    - [ ] Step 2: Shipping
      - [ ] Shipping method options (Standard/Express)
      - [ ] Cost per method
      - [ ] Estimated days
      - [ ] Select button
    - [ ] Step 3: Payment
      - [ ] Payment method buttons (UPI selected by default)
      - [ ] Order summary (readonly)
      - [ ] Proceed to Payment button
    - [ ] Step 4: Confirmation
      - [ ] Success message
      - [ ] Order number
      - [ ] Track Order button
  - [ ] Progress indicator (step 1-4)
  - [ ] Order summary sidebar (sticky on desktop)

- [ ] Order Confirmation page (`/checkout/confirmation/:orderNumber`)
  - [ ] Success message
  - [ ] Order number & date
  - [ ] Items shipped to address
  - [ ] Estimated delivery date
  - [ ] Order tracking section
  - [ ] Download invoice button
  - [ ] "Continue Shopping" button

- [ ] Orders page (`/orders`)
  - [ ] List of user's orders
  - [ ] Filter by status
  - [ ] Click to view details

- [ ] Order Detail page (`/orders/:orderId`)
  - [ ] Order number, date, status
  - [ ] Items table
  - [ ] Shipping address
  - [ ] Tracking info (with link if shipped)
  - [ ] Order timeline (visual)
  - [ ] Download invoice button
  - [ ] Cancel button (if eligible)

- [ ] About page (`/about`)
  - [ ] Static content (images, text)
  - [ ] Brand story
  - [ ] Mission statement
  - [ ] Team section (optional)

- [ ] Static pages (all with basic layout):
  - [ ] Contact (`/contact`)
    - [ ] Contact form
    - [ ] Email submission
    - [ ] Confirmation message
  - [ ] Shipping Policy (`/shipping`)
  - [ ] Returns Policy (`/returns`)
  - [ ] Privacy Policy (`/privacy`)
  - [ ] Terms of Service (`/terms`)
  - [ ] FAQ (`/faq`)

- [ ] 404 page (`/404`)
  - [ ] 404 message
  - [ ] Link to homepage

- [ ] Error page (global error boundary)
  - [ ] Error message
  - [ ] Retry button

### Component Library

#### Layout Components
- [ ] Header / Navbar
- [ ] Footer
- [ ] Navigation menu (desktop & mobile)
- [ ] Breadcrumb

#### Product Components
- [ ] ProductCard (with action buttons)
- [ ] ProductGallery (main + thumbnails)
- [ ] VariantSelector (size/color pickers)
- [ ] SizeGuideModal
- [ ] SizeSelector (dropdown or buttons)
- [ ] ColorSelector (color swatches)

#### Cart & Checkout
- [ ] CartDrawer (slide-in)
- [ ] CartItem (with qty & remove)
- [ ] OrderSummary (totals display)
- [ ] AddressForm
- [ ] AddressSelector
- [ ] ShippingMethodSelector
- [ ] PaymentMethodSelector

#### Form Components
- [ ] FormInput (with validation)
- [ ] FormSelect
- [ ] FormCheckbox
- [ ] FormTextarea
- [ ] Button (variants: primary, secondary, ghost)

#### Feedback Components
- [ ] Toast / Notification
- [ ] Spinner / Loading
- [ ] Skeleton loaders
- [ ] Alert (success, error, info, warning)

#### Filters
- [ ] FilterSidebar
- [ ] PriceRangeSlider
- [ ] CheckboxFilter (categories, sizes)
- [ ] ColorFilter (color swatches)
- [ ] FilterButton (trigger mobile filter sheet)

### State Management
- [ ] Zustand stores:
  - [ ] authStore (user, isAuthenticated, login/logout)
  - [ ] cartStore (items, addItem, removeItem)
  - [ ] uiStore (mobileMenuOpen, filterOpen, etc.)
  - [ ] modalStore (openModals, closeModal)

- [ ] TanStack Query hooks:
  - [ ] useProducts (list with filters)
  - [ ] useProduct (detail)
  - [ ] useCategories
  - [ ] useCollections
  - [ ] useOrders
  - [ ] useCart
  - [ ] And all mutations...

### API Integration
- [ ] Create API client (Axios)
- [ ] Request interceptors (auth token attachment)
- [ ] Response interceptors (error handling)
- [ ] Service functions for each domain

### Client-Side SEO
- [ ] Metadata API:
  - [ ] Homepage meta tags
  - [ ] Dynamic product page metadata
  - [ ] Dynamic collection page metadata
- [ ] OG image generation / configuration
- [ ] Structured data (JSON-LD):
  - [ ] Product schema on PDP
  - [ ] BreadcrumbList schema
  - [ ] Organization schema on homepage

### Performance Optimization
- [ ] Image optimization (Next.js Image component)
- [ ] Code splitting (lazy loading)
- [ ] Route prefetching
- [ ] CSS optimization (Tailwind purge)

**Completion Target:** Week 15  
**Team:** 2 Frontend Devs  
**Story Points:** 55  

---

## 1.11: Testing & Quality Assurance (Weeks 10-15, Ongoing)

### Unit Tests (Backend)
- [ ] Coverage target: >80%
- [ ] Test each service function
- [ ] Test each API endpoint (happy path + error cases)
- [ ] Test middleware
- [ ] Test validation logic
- [ ] Test calculations (tax, totals)
- [ ] Framework: Vitest + Supertest (for API)

### Unit Tests (Frontend)
- [ ] Coverage target: >80%
- [ ] Component tests:
  - [ ] Render basic component
  - [ ] Props impact on rendering
  - [ ] User interactions (clicks, inputs)
  - [ ] Conditional rendering
  - [ ] Error states
- [ ] Hook tests (custom hooks like useCart)
- [ ] Utility function tests
- [ ] Framework: Vitest + React Testing Library

### Integration Tests
- [ ] Backend:
  - [ ] API endpoints with real/mock database
  - [ ] Auth flow (register → login → refresh)
  - [ ] Cart flow (add → update → checkout)
  - [ ] Order flow (create order → verify → confirm)
- [ ] Frontend:
  - [ ] Multi-step checkout form
  - [ ] Product filter/sort changes
  - [ ] Cart operations (add/remove/update)

### E2E Tests (Playwright)
- [ ] Critical user flows:
  1. [ ] Homepage → Shop → Product → Cart → Checkout → Confirmation
  2. [ ] Search products
  3. [ ] Apply filters & sort
  4. [ ] User registration & login
  5. [ ] Guest checkout (merge cart)
  6. [ ] Order tracking
- [ ] Edge cases:
  - [ ] Out of stock handling
  - [ ] Invalid address
  - [ ] Payment failure (test with Razorpay sandbox)
  - [ ] Network errors
- [ ] Visual regression tests (screenshot comparison)

### Performance Testing
- [ ] Lighthouse audit (target: >80 on each metric)
- [ ] Page load time testing
- [ ] API response time benchmarks
- [ ] Database query optimization
- [ ] Redis cache hit rates
- [ ] Load testing (k6 or similar):
  - [ ] 100 concurrent users
  - [ ] Product listing
  - [ ] Payment processing

### Security Testing
- [ ] OWASP Top 10 validation:
  - [ ] Injection attacks (SQL, NoSQL)
  - [ ] XSS prevention (CSP headers)
  - [ ] CSRF protection
  - [ ] Broken authentication
  - [ ] Sensitive data exposure
- [ ] Dependency vulnerabilities (npm audit, snyk)
- [ ] Rate limiting bypass attempts
- [ ] JWT token expiry validation
- [ ] Authorization checks on all endpoints

### Accessibility Testing
- [ ] WCAG 2.1 AA compliance:
  - [ ] Color contrast (4.5:1 for text)
  - [ ] Keyboard navigation (all interactive elements)
  - [ ] Screen reader compatibility
  - [ ] Form labels and error messages
  - [ ] Image alt text
- [ ] axe-core automated testing
- [ ] Manual testing with screen reader software

### QA Test Plan
- [ ] Smoke tests (basic functionality after each deploy)
- [ ] Regression test suite (all features)
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Network throttling tests (slow 3G, 4G)

**Completion Target:** Week 15  
**Team:** 1 QA Lead, Engineers contributing  
**Story Points:** 34  

---

# PHASE 1.5: COLLECTIONS & COMMUNITY (Weeks 16-19, Parallel)

## 1.5.1: Collection Drop System

- [ ] Drop landing pages with countdown timers
- [ ] Waitlist functionality
- [ ] Member-only early access tiers
- [ ] Cart reservation during drops (10-min hold)
- [ ] Real-time inventory updates (WebSocket)
- [ ] Queue management for high demand

**Story Points:** 21  

---

# PHASE 2: OPTIMIZATION & POLISH (Weeks 20-23)

## 2.1: Performance Optimization
- [ ] Image optimization (WebP, responsive srcset)
- [ ] Database indexing review
- [ ] Redis caching strategy
- [ ] Code splitting
- [ ] Core Web Vitals targets:
  - [ ] LCP: <2.5s
  - [ ] TTI: <3.5s
  - [ ] CLS: <0.1
  - [ ] API P95: <200ms

**Story Points:** 21  

---

## 2.2: Security Hardening
- [ ] Rate limiting (100 req/min per IP)
- [ ] CSRF protection
- [ ] CSP headers
- [ ] Input sanitization
- [ ] PCI DSS validation

**Story Points:** 13  

---

## 2.3: UX/UI Polish
- [ ] Mobile responsiveness
- [ ] Accessibility audit & fixes
- [ ] Micro-interactions
- [ ] Loading states
- [ ] Error handling improvements

**Story Points:** 16  

---

## 2.4: QA & Bug Fixes
- [ ] Full regression testing
- [ ] Load testing (5,000 RPS)
- [ ] Manual QA on all features
- [ ] Bug fixes & edge cases

**Story Points:** 21  

---

# PHASE 3: LAUNCH PREPARATION (Weeks 24-25)

- [ ] Database backup & recovery testing
- [ ] Monitoring setup (Sentry, PostHog, uptime)
- [ ] Runbooks for common issues
- [ ] Incident response procedures
- [ ] Soft launch (100 beta users)
- [ ] Public launch

---

# STATIC PAGES & CONTENT

### Contact Page
- [ ] GET `/api/v1/pages/contact`
- [ ] POST `/api/v1/contact`
  - [ ] Form: name, email, subject, message
  - [ ] Send email to support
  - [ ] Confirmation message

### Static Pages
- [ ] GET `/api/v1/pages/:slug`
  - [ ] Retrieve static page content
  - [ ] Cache in Redis (24h TTL)

### Newsletter Signup
- [ ] POST `/api/v1/newsletter/subscribe`
  - [ ] Input: email
  - [ ] Add to NewsletterSubscriber collection
  - [ ] Send welcome email
  - [ ] Return success
  - [ ] HTTP 201

---

# HEALTH CHECK & MONITORING

### Health Endpoints
- [ ] GET `/api/health`
  - [ ] Simple 200 status
  - [ ] Used for uptime monitoring

- [ ] GET `/api/health/detailed`
  - [ ] Database status
  - [ ] Redis status
  - [ ] Response time
  - [ ] Memory usage

---

# ANALYTICS & TRACKING

### Frontend Analytics
- [ ] PostHog integration (optional for MVP)
- [ ] Google Analytics 4 (GA4)
- [ ] Event tracking:
  - [ ] product_viewed
  - [ ] product_searched
  - [ ] item_added_to_cart
  - [ ] checkout_started
  - [ ] purchase_completed

### Razorpay Events
- [ ] Payment_successful
- [ ] Payment_failed
- [ ] Payment_refunded

---

# EMAIL TEMPLATES (Resend)

1. [ ] Welcome / Registration
2. [ ] Email Verification
3. [ ] Password Reset
4. [ ] Order Confirmation
5. [ ] Order Status Update
6. [ ] Shipping Notification
7. [ ] Delivery Confirmation
8. [ ] Admin Order Notification
9. [ ] Refund Confirmation
10. [ ] Newsletter Welcome

---

# SUMMARY & METRICS

## Total Features Covered: 147 (100% of PRD)

| Category | Count | Status |
|----------|-------|--------|
| API Endpoints | 45+ | Fully Specified |
| Database Collections | 10 | Designed |
| Frontend Pages | 15+ | Defined |
| Components | 40+ | Outlined |
| Integrations | 12 | Mapped |
| Testing Requirements | 45+ | Specified |

## Timeline
- Phase 0: 2 weeks (setup)
- Phase 1: 14 weeks (core MVP)
- Phase 1.5: 4 weeks (drops & community)
- Phase 2: 4 weeks (optimization)
- Phase 3: 2 weeks (launch)
- **Total: 26 weeks (May 1 - October 31, 2026)**

## Team Requirements
- Backend Engineers: 3-4 FTE
- Frontend Engineers: 2-3 FTE
- Admin Dev: 1 FTE
- DevOps: 1 FTE
- QA: 1-2 FTE
- Design: 0.5 FTE (part-time)
- **Total: 9-13 FTE**

## Success Criteria
- ✅ All 147 PRD features implemented
- ✅ 80%+ code coverage
- ✅ <2.5s LCP, 99.9% uptime
- ✅ Zero critical security issues
- ✅ 1,000+ beta users
- ✅ Ready for launch with confidence

---

**Document Version: 1.0**  
**Last Updated: February 28, 2026**  
**Next Review: March 1, 2026**
