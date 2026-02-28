# UrbanCart Implementation Checklist

**Document Version:** 1.0  
**Last Updated:** February 28, 2026  
**Target Completion:** September 30, 2026 (MVP)

---

## Pre-Implementation Phase (Ready Now)

### Project Setup
- [x] Repository created (GitHub)
- [x] Documentation complete (PRD, TRD, System Design)
- [x] Architecture finalized
- [x] Database schemas designed
- [x] API contracts defined
- [ ] Team onboarded
- [ ] Development environments set up
- [ ] Communication channels established (Slack, Jira)

### Infrastructure Foundation
- [ ] Git repository with branch protection
- [ ] GitHub Actions CI/CD setup
- [ ] Vercel projects created (frontend, admin)
- [ ] MongoDB Atlas M10 cluster provisioned
- [ ] Upstash Redis instance created
- [ ] Cloudinary account configured
- [ ] Sentry project initialized
- [ ] PostHog analytics setup
- [ ] BetterUptime monitoring configured

### Third-Party Integrations
- [ ] Razorpay Account (Sandbox & Live modes)
- [ ] Resend email account
- [ ] WATI SMS account (India support)
- [ ] Shiprocket integration setup
- [ ] GitHub OAuth (integration preparation)

**Checklist Completion:** 25%

---

## Phase 1: MVP Implementation

### 1.1 Backend Foundation (Week 1-2)

#### Express.js Setup
- [ ] Project initialization (`npm init`)
- [ ] TypeScript configuration
- [ ] ESLint & Prettier setup
- [ ] Nodemon for development
- [ ] Express app skeleton
- [ ] Middleware architecture (auth, logging, error)
- [ ] Request validation (Zod)
- [ ] Error handling centralized
- [ ] Morgan logging setup

#### Database Setup
- [ ] MongoDB Mongoose models created
  - [ ] User schema with indexes
  - [ ] Product schema with indexes
  - [ ] Order schema with indexes
  - [ ] Cart schema
  - [ ] Collection schema
  - [ ] Category schema
- [ ] Database connection pooling
- [ ] Seed script for test data
- [ ] Database backup verification
- [ ] Migration strategy defined

#### Redis Setup
- [ ] Redis client connection
- [ ] Session storage implementation
- [ ] Cache layer abstraction
- [ ] TTL configuration
- [ ] Pub/sub setup for real-time

**Completion Target:** Week 2  
**Team:** 2 Backend Devs  
**Checklist Completion:** 30%

---

### 1.2 Authentication Module (Week 2-3)

#### User Registration
- [ ] POST /api/v1/auth/register endpoint
- [ ] Email validation (RFC 5322)
- [ ] Password requirements enforcement
- [ ] Unique email check
- [ ] Argon2id password hashing
- [ ] Send verification email (Resend)
- [ ] Error handling (duplicate email, validation)
- [ ] Unit tests (>90% coverage)
- [ ] Integration tests
- [ ] API documentation

#### Email Verification
- [ ] Email token generation (secure, expires 24h)
- [ ] GET /api/v1/auth/verify endpoint
- [ ] Resend verification option
- [ ] Mark user as verified
- [ ] Error handling (expired token, invalid token)
- [ ] Unit & integration tests

#### Login & JWT
- [ ] POST /api/v1/auth/login endpoint
- [ ] Credential validation
- [ ] JWT token generation (RS256)
- [ ] Access token (15min expiry)
- [ ] Refresh token (7-day expiry)
- [ ] httpOnly cookie setup
- [ ] Token validation middleware
- [ ] Unit tests

#### Password Reset
- [ ] POST /api/v1/auth/forgot-password endpoint
- [ ] Reset token email
- [ ] POST /api/v1/auth/reset-password endpoint
- [ ] Token validation & expiry
- [ ] Error handling
- [ ] Unit tests

#### Token Refresh
- [ ] POST /api/v1/auth/refresh endpoint
- [ ] Refresh token validation
- [ ] New access token generation
- [ ] Token rotation (security)
- [ ] Unit tests

**Sub-Checklist Completion:** 0%  
**Completion Target:** Week 3  
**Team:** 1 Backend Dev  

---

### 1.3 Product Management (Week 3-5)

#### Product CRUD
- [ ] POST /api/v1/admin/products endpoint (create)
- [ ] GET /api/v1/products/:slug endpoint (read)
- [ ] PATCH /api/v1/admin/products/:id endpoint (update)
- [ ] DELETE /api/v1/admin/products/:id endpoint (delete)
- [ ] Fieldvalidation with Zod
- [ ] Admin authorization checks
- [ ] Soft delete implementation
- [ ] Audit logging (who, what, when)
- [ ] Unit & integration tests

#### Image Management
- [ ] Cloudinary SDK integration
- [ ] Upload endpoint with signed uploads
- [ ] Image transformation (WebP, srcset)
- [ ] Delete & cleanup
- [ ] Image metadata storage
- [ ] Unit tests

#### Product Search
- [ ] Full-text search (MongoDB Atlas Search)
- [ ] Autocomplete endpoint
- [ ] Fuzzy matching
- [ ] Performance optimization (<100ms)
- [ ] Unit tests

#### Variants Management
- [ ] Variant CRUD (size, color, inventory)
- [ ] SKU uniqueness validation
- [ ] Color hex validation
- [ ] Inventory tracking per variant
- [ ] Unit tests

#### Categories & Collections
- [ ] Category CRUD
- [ ] Hierarchical category support
- [ ] Collection CRUD
- [ ] Product-collection assignment
- [ ] Unit tests

**Completion Target:** Week 5  
**Team:** 1 Backend Dev, 1 Frontend Dev  

---

### 1.4 Shopping Cart Module (Week 5-7)

#### Guest Cart (Redis-based)
- [ ] Session ID generation
- [ ] GET /api/v1/cart endpoint
- [ ] POST /api/v1/cart/items endpoint (add)
- [ ] PATCH /api/v1/cart/items/:id endpoint (update)
- [ ] DELETE /api/v1/cart/items/:id endpoint (remove)
- [ ] Cart expiration (7 days TTL)
- [ ] Redis operations
- [ ] Error handling
- [ ] Unit tests

#### Authenticated Cart (MongoDB-based)
- [ ] Cart-user association
- [ ] Cart persistence
- [ ] Cart recovery on login
- [ ] Multiple device support
- [ ] Unit tests

#### Cart Merge Logic
- [ ] Guest to authenticated cart merge
- [ ] Quantity combination logic
- [ ] Conflict resolution (same product, different variant)
- [ ] POST /api/v1/cart/merge endpoint
- [ ] Unit tests

#### Stock Validation
- [ ] Inventory availability check
- [ ] Prevent oversell
- [ ] Real-time stock sync
- [ ] Out-of-stock handling
- [ ] Unit tests

#### Frontend Cart Component
- [ ] Cart drawer slide-in component
- [ ] Add to cart button
- [ ] Quantity selector
- [ ] Remove item functionality
- [ ] Cart counter badge
- [ ] Free shipping progress bar
- [ ] Empty cart state
- [ ] TanStack Query integration
- [ ] Component tests

**Completion Target:** Week 7  
**Team:** 1 Backend Dev, 1 Frontend Dev  

---

### 1.5 Checkout & Payment Module (Week 7-11)

#### Checkout Flow
- [ ] Multi-step checkout state machine
- [ ] Step 1: Address form
  - [ ] Address validation (Google Maps API)
  - [ ] State/pincode validation
  - [ ] Multiple address support
  - [ ] Default address selection
- [ ] Step 2: Shipping method
  - [ ] Shipping rate calculation
  - [ ] Estimated delivery display
  - [ ] Express vs standard options
- [ ] Step 3: Payment method
  - [ ] Payment method selection UI
  - [ ] Order summary display
- [ ] Step 4: Confirmation
  - [ ] Order number display
  - [ ] Tracking info (when available)

#### Payment Integration (Razorpay)
- [ ] Razorpay API sandbox setup
- [ ] POST /api/v1/checkout/razorpay-order endpoint
  - [ ] Create Razorpay order
  - [ ] Amount calculation (paise)
  - [ ] Customer prefill data
- [ ] Razorpay payment modal integration (frontend)
- [ ] POST /api/v1/checkout/verify endpoint
  - [ ] Signature verification
  - [ ] Payment status update
- [ ] Webhook handling
  - [ ] POST /api/v1/webhooks/razorpay endpoint
  - [ ] Payment confirmation
  - [ ] Order creation
  - [ ] Inventory decrement
- [ ] Error handling (payment failed, timeout)
- [ ] Retry logic (circuit breaker)
- [ ] Unit & integration tests

#### Order Creation
- [ ] POST /api/v1/orders endpoint (internal)
- [ ] Order number generation (UC-YYYYMMDD-XXXX)
- [ ] Cart → Order item transformation
- [ ] Address snapshot in order
- [ ] Payment status initialization
- [ ] Order timeline initialization
- [ ] Unit tests

#### GST Calculation
- [ ] CGST/SGST/IGST determination
- [ ] Intra-state vs inter-state logic
- [ ] State mapping configuration
- [ ] CESS calculation
- [ ] HSN code support
- [ ] B2B GSTIN validation
- [ ] Unit tests

#### Invoice Generation
- [ ] React-PDF invoice template
- [ ] PDF generation endpoint
- [ ] Invoice number assignment
- [ ] GST compliance fields
- [ ] Download & email delivery
- [ ] Storage in Cloudinary
- [ ] Unit tests

#### Order Confirmation Email
- [ ] Resend email template (React Email)
- [ ] Order details in email
- [ ] Invoice PDF attachment
- [ ] Tracking info (when available)
- [ ] Customer support links
- [ ] Email sending via queue (BullMQ)
- [ ] Unit tests

#### Inventory Decrement
- [ ] Atomic inventory update
- [ ] Transaction-like behavior
- [ ] Prevent oversell (double-check)
- [ ] Stock confirmation email
- [ ] Unit tests

**Completion Target:** Week 11  
**Team:** 2 Backend Devs, 1 Frontend Dev  

---

### 1.6 Order Management (Week 11-13)

#### Order Retrieval
- [ ] GET /api/v1/orders/:id endpoint
- [ ] GET /api/v1/orders endpoint (user orders)
- [ ] Order details with full history
- [ ] Authorization (user owns order)
- [ ] Unit tests

#### Order Status Updates
- [ ] PATCH /api/v1/orders/:id endpoint (admin)
- [ ] Status transitions (pending → confirmed → processing → shipped → delivered)
- [ ] Timeline logging
- [ ] Email notifications on status change
- [ ] Unit tests

#### Shipping Integration
- [ ] Shiprocket API integration
- [ ] Shipping label generation
- [ ] Tracking number retrieval
- [ ] Real-time tracking status
- [ ] RTO (Return To Origin) handling
- [ ] Unit tests

#### Order Cancellation
- [ ] DELETE /api/v1/orders/:id endpoint (pre-ship)
- [ ] Inventory reversal
- [ ] Refund processing
- [ ] Cancellation email
- [ ] Unit tests

#### Frontend Order Dashboard
- [ ] Order listing page
- [ ] Order detail page
- [ ] Status tracking display
- [ ] Tracking link button
- [ ] Cancellation button (conditional)
- [ ] Invoice download button
- [ ] TanStack Query integration
- [ ] Component tests

**Completion Target:** Week 13  
**Team:** 1 Backend Dev, 1 Frontend Dev  

---

### 1.7 Admin Panel (Week 8-13)

#### Admin Authentication
- [ ] Admin role in User model
- [ ] Admin protected routes
- [ ] Admin login separate flow (optional)
- [ ] Admin access logs
- [ ] Unit tests

#### Dashboard
- [ ] Revenue KPI widget
- [ ] Order count widget
- [ ] Visitor count (PostHog)
- [ ] Conversion rate widget
- [ ] Top products card
- [ ] Recent orders table
- [ ] PostHog analytics integration
- [ ] Component tests

#### Product Management
- [ ] Product list with sorting/filtering
- [ ] Product create form
- [ ] Product edit form
- [ ] Product delete with confirmation
- [ ] Bulk upload (CSV) - future
- [ ] Image upload interface
- [ ] TanStack Table integration
- [ ] Component tests

#### Inventory Management
- [ ] Variant-level inventory view
- [ ] Inventory edit form
- [ ] Low stock alerts (<5 units)
- [ ] Stock history (audit log)
- [ ] Component tests

#### Order Management
- [ ] Order list with status filters
- [ ] Order detail view
- [ ] Status update dropdown
- [ ] Refund button (conditional)
- [ ] Notes/comments section
- [ ] Email customer button
- [ ] Component tests

#### Analytics
- [ ] Revenue report (daily, weekly, monthly)
- [ ] Order report (count, average)
- [ ] Top products
- [ ] Customer metrics
- [ ] Funnel visualization (Recharts)
- [ ] Export to CSV
- [ ] Component tests

#### Collection Management
- [ ] Collection CRUD
- [ ] Product assignment
- [ ] Banner image upload
- [ ] Scheduling (future: drop dates)
- [ ] Component tests

**Completion Target:** Week 13  
**Team:** 1 Admin Dev  

---

### 1.8 Frontend Storefront (Week 3-13)

#### Pages & Layouts
- [ ] Layout component (header, footer, sidebar)
- [ ] Homepage
- [ ] Shop/Collection page
- [ ] Product detail page
- [ ] Cart page
- [ ] Checkout page
- [ ] Order confirmation page
- [ ] Order tracking page
- [ ] User account page
- [ ] 404 & error pages

#### Components
- [ ] Product card
- [ ] Product gallery (swipeable on mobile)
- [ ] Size selector
- [ ] Color selector
- [ ] Add to cart button
- [ ] Cart drawer
- [ ] Address form
- [ ] Shipping selector
- [ ] Payment method selector
- [ ] Order timeline

#### State Management
- [ ] TanStack Query setup
- [ ] Product queries
- [ ] Cart mutations
- [ ] Order queries
- [ ] User profile queries
- [ ] Zustand stores setup
- [ ] Auth store
- [ ] Cart store
- [ ] UI store
- [ ] LocalStorage persistence

#### Styling & Responsive Design
- [ ] Tailwind CSS setup
- [ ] Mobile responsiveness (320px+)
- [ ] Touch target sizing (44x44px+)
- [ ] Dark mode support (optional)
- [ ] Component tests

#### Performance Optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization (next/image)
- [ ] Bundle analysis
- [ ] Lighthouse score >90
- [ ] Core Web Vitals targets met

**Completion Target:** Week 13  
**Team:** 2 Frontend Devs  

---

### 1.9 Testing & QA (Week 10-14)

#### Unit Tests
- [ ] Auth service tests (>90% coverage)
- [ ] Product service tests
- [ ] Cart service tests
- [ ] Order service tests
- [ ] Payment service tests
- [ ] Utility function tests
- [ ] Hook tests (frontend)

#### Integration Tests
- [ ] Auth flow (register → verify → login)
- [ ] Product workflow (add → list → detail)
- [ ] Cart workflow (add item → merge → checkout)
- [ ] Order workflow (create → confirm → ship)
- [ ] Payment workflow (create → verify → confirm)

#### E2E Tests (Playwright)
- [ ] User registration flow
- [ ] Login flow
- [ ] Browse products
- [ ] Add to cart
- [ ] Checkout flow
- [ ] Payment (sandbox)
- [ ] Order confirmation
- [ ] Mobile flow

#### Manual QA & Testing
- [ ] Browser compatibility (Chrome, Safari, Firefox, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)
- [ ] Accessibility testing (screen readers, keyboard nav)
- [ ] Performance testing (load testing with k6)
- [ ] Security testing (OWASP checklist)

**Completion Target:** Week 14  
**Team:** 2 QA Engineers, all developers  

---

### 1.10 Documentation & Deployment (Week 13-14)

#### Documentation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Component documentation (Storybook)
- [ ] Database documentation (schema diagram)
- [ ] Deployment guide (runbook)
- [ ] Troubleshooting guide
- [ ] Architecture decision records (ADRs)

#### Deployment Setup
- [ ] Staging environment configuration
- [ ] Production environment setup
- [ ] Database backup strategy
- [ ] CI/CD pipeline refinement
- [ ] Monitoring & alerting setup
- [ ] Error tracking (Sentry)
- [ ] Analytics setup (PostHog)

#### Security Hardening
- [ ] Security audit (OWASP Top 10)
- [ ] Dependency scanning
- [ ] Secrets management (.env, GitHub secrets)
- [ ] Rate limiting tests
- [ ] CSRF protection validation
- [ ] XSS prevention tests

**Completion Target:** Week 14  
**Team:** DevOps, Tech Lead  

---

## Phase 1 Summary

**Duration:** 10 weeks (May 1 - July 17, 2026)  
**Total Checklist Completion:** 0% → 100%  
**Target Delivery:** July 31, 2026

**Major Deliverables:**
- ✅ 45+ API endpoints
- ✅ 60+ database collections/schemas
- ✅ 30+ frontend components
- ✅ Admin panel with 5+ pages
- ✅ Full checkout & payment flow
- ✅ Email automation
- ✅ Testing (>80% coverage)
- ✅ Documentation & deployment

---

## Phase 2: Optimization & Launch Prep

### Performance Optimization (Aug 1-22)
- [ ] Database query optimization
- [ ] Image optimization (WebP, responsive)
- [ ] Caching strategy (Redis)
- [ ] API response time <200ms P95
- [ ] Lighthouse score 90+
- [ ] Load testing (5,000 RPS)

### Security Hardening (Aug 23-29)
- [ ] Security audit
- [ ] Vulnerability scanning
- [ ] Penetration testing (optional)
- [ ] Compliance checks (GDPR, local laws)

### Launch Preparation (Aug 30 - Sep 30)
- [ ] Soft launch (100 beta users)
- [ ] Monitoring verification
- [ ] Incident response drills
- [ ] Marketing campaign setup
- [ ] Public launch

---

## Success Criteria (MVP Launch)

### Functionality ✅
- [ ] All P0 features implemented
- [ ] Zero critical bugs
- [ ] All P1 features complete
- [ ] API 100% documented

### Quality ✅
- [ ] Code coverage >80%
- [ ] All E2E tests passing
- [ ] Zero security issues
- [ ] OWASP Top 10 compliant

### Performance ✅
- [ ] LCP <2.5s
- [ ] API P95 <200ms
- [ ] 99.9% uptime
- [ ] Error rate <0.1%

### Business ✅
- [ ] 1,000+ beta users
- [ ] 50+ orders from beta
- [ ] 2.5%+ conversion rate
- [ ] Ready for public launch

---

## Known Risks & Mitigation

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Scope creep | High | Strict MVP definition |
| Payment integration delays | Low | Start early in Sprint 1 |
| Team capacity issues | Medium | Over-hire early |
| Database scaling | Low | Schema design early |
| Security issues | Low | Early security audit |

---

## Next Action Items

1. [ ] Assign team members to sprints
2. [ ] Schedule team kickoff
3. [ ] Provision infrastructure
4. [ ] Set up development environments
5. [ ] Begin Sprint 1 (May 1)

---

*Document Version: 1.0*  
*Created: February 28, 2026*  
*Sprint Kickoff: May 1, 2026*
