# Technical Requirements Document
## Next-Generation Indian Streetwear Platform

**Document Version:** 1.0  
**Date:** February 28, 2026  
**Classification:** Technical Implementation Specification  
**Prepared For:** Engineering Leadership, Design Systems, DevOps

---

# 1. PLATFORM ARCHITECTURE OVERVIEW

## 1.1 Architecture Philosophy

The platform follows a modular, component-based architecture designed for:
- **Scalability**: Handle 10x traffic spikes during drops
- **Performance**: Sub-3-second page loads across all pages
- **Maintainability**: Clear separation of concerns
- **Extensibility**: Easy integration with third-party services

## 1.2 High-Level Architecture

```
PLATFORM ARCHITECTURE:
├── Frontend Layer
│   ├── Headless Commerce (Next.js / React)
│   ├── CDN Edge Delivery
│   └── Progressive Web App (PWA) Capabilities
│
├── Commerce Layer
│   ├── Shopify Plus Backend
│   ├── Inventory Management
│   └── Order Processing
│
├── Data Layer
│   ├── Customer Data Platform
│   ├── Analytics Pipeline
│   └── Search Infrastructure
│
└── Integration Layer
    ├── Payment Gateways
    ├── Email/SMS Services
    └── Third-party APIs
```

---

# 2. CORE PRODUCT MODULES

## 2.1 Homepage Module

### 2.1.1 Functional Requirements
- Establish brand identity immediately
- Communicate current campaign/drop status
- Direct traffic to high-priority destinations
- Capture email subscriptions for list building
- Showcase physical presence/community

### 2.1.2 UX Requirements
- Create immersive brand experience within 3 seconds
- Maintain sub-3-second perceived load time
- Enable discovery without overwhelming choice
- Build anticipation for drops/releases

### 2.1.3 Component Structure

```
HOMEPAGE STRUCTURE:
├── Hero Section (Viewport Height)
│   ├── Full-screen campaign imagery
│   ├── Campaign title typography
│   ├── Primary CTA: "Discover [Season]"
│   ├── Secondary: Scroll indicator
│   └── Subtle countdown if drop imminent (<7 days)
│
├── Drop Alert Bar (Conditional)
│   ├── Appears when drop scheduled
│   ├── Countdown timer
│   └── "Get Notified" CTA
│
├── Category Navigation (3-4 Blocks)
│   ├── Men's / Women's / Accessories
│   ├── Large imagery, minimal text
│   └── "Shop" secondary CTAs
│
├── Featured Collection (Carousel or Grid)
│   ├── Current drop products
│   ├── 4-8 hero items
│   └── Quick-view capability
│
├── Collaboration Feature (Conditional)
│   ├── Active collaboration promotion
│   ├── Partnership narrative
│   └── Dedicated CTA
│
├── Editorial Section
│   ├── Behind-the-scenes content
│   ├── Community features
│   └── Cultural content integration
│
├── Store/Community Section
│   ├── Physical location imagery
│   ├── "Visit our Chapter" language
│   ├── Upcoming events preview
│   └── Get Directions integration
│
├── Newsletter Capture
│   ├── Value proposition for signup
│   ├── Minimal fields (email only)
│   └── Drop/access benefits messaging
│
└── Footer
    ├── Navigation links
    ├── Contact information
    ├── Social links
    ├── Payment logos
    └── Legal/policy links
```

### 2.1.4 Conversion Objectives
- Newsletter signup rate: >4% of homepage visitors
- Click-through to collection pages: >35%
- Bounce rate: <45%
- Average time on page: >45 seconds

### 2.1.5 Technical Implementation
- Hero image optimization: WebP format, lazy-loaded below fold
- Smooth scroll implementation
- Intersection Observer for animation triggers
- Critical CSS inline for perceived performance
- Preload hero image for LCP optimization

---

## 2.2 Collection Pages Module

### 2.2.1 Functional Requirements
- Present full catalog in navigable structure
- Enable filtering and sorting for discovery
- Show product variants and pricing clearly
- Drive traffic to PDPs with high intent

### 2.2.2 Component Structure

```
COLLECTION PAGE STRUCTURE:
├── Collection Header
│   ├── Collection title
│   ├── Campaign imagery (compressed)
│   ├── Product count
│   └── Optional: Collection story (expandable)
│
├── Filter/Sort Bar (Sticky)
│   ├── Filter options:
│   │   ├── Size (S, M, L, XL, XXL)
│   │   ├── Color (visual swatches)
│   │   ├── Price range (slider)
│   │   └── Category (shirts, tees, etc.)
│   └── Sort options:
│       ├── Newest
│       ├── Price: Low to High
│       ├── Price: High to Low
│       └── Best Selling
│
├── Product Grid
│   ├── Desktop: 3-4 columns
│   ├── Tablet: 2-3 columns
│   ├── Mobile: 2 columns
│   └── Consistent aspect ratio (3:4)
│
├── Product Cards
│   ├── Primary image (80%+ of card)
│   ├── Hover: Second image reveal
│   ├── Product name (truncated if needed)
│   ├── Price (no complex formatting)
│   ├── Color variant indicators
│   └── "New" / "Low Stock" badges (conditional)
│
├── Pagination
│   ├── "Load More" button (default)
│   ├── Progressive loading (12-16 items)
│   └── Preserve scroll position
│
└── Empty State
    ├── Clear messaging when filters return zero
    └── Reset filters CTA
```

### 2.2.3 Conversion Objectives
- PDP click-through rate: >25%
- Filter engagement rate: >15%
- Page depth (products viewed): >8 average
- Exit rate: <35%

### 2.2.4 Technical Implementation
- Lazy loading for images below fold
- URL state management for filters (shareable filtered URLs)
- Skeleton loading states during image load
- Image srcset for responsive delivery
- Session storage for filter persistence

---

## 2.3 Product Listing Page (PLP) Specifications

### 2.3.1 Grid Density Logic

| Viewport | Columns | Products per Load | Rationale |
|----------|---------|-------------------|-----------|
| Desktop (>1280px) | 4 | 16 | Maximum discovery, sufficient detail |
| Desktop (1024-1280px) | 3 | 12 | Balanced density |
| Tablet (768-1024px) | 2-3 | 12 | Touch-friendly |
| Mobile (<768px) | 2 | 8 | Thumb-reachable, fast load |

### 2.3.2 Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | <1.5s | Lighthouse |
| Largest Contentful Paint | <2.5s | Lighthouse |
| Time to Interactive | <3.5s | Lighthouse |
| Cumulative Layout Shift | <0.1 | Lighthouse |
| Image Load (above fold) | <1s | Custom metric |

---

## 2.4 Product Detail Page (PDP) Module

### 2.4.1 Functional Requirements
- Provide comprehensive product information
- Enable variant selection (size, color)
- Communicate scarcity/availability
- Drive add-to-cart conversion
- Support size/fit decision-making

### 2.4.2 Component Structure

```
PDP STRUCTURE:
├── Product Gallery (50-60% of viewport on desktop)
│   ├── Primary image (large, zoomable)
│   ├── Thumbnail navigation (4-6 images)
│   ├── Image types:
│   │   ├── Front flat
│   │   ├── Back flat
│   │   ├── On-model
│   │   ├── Detail shot (embroidery, texture)
│   │   ├── Side angle (optional)
│   │   └── Styled/lifestyle (optional)
│   └── Mobile: Swipeable gallery with indicators
│
├── Product Information (Right column on desktop)
│   ├── Product title
│   ├── Price (single price, no strikethroughs)
│   ├── Color selection (visual swatches)
│   │   └── Selected color name displayed
│   ├── Size selection
│   │   ├── Visual size buttons
│   │   ├── Unavailable sizes indicated (grayed, not hidden)
│   │   └── "Size Guide" link
│   ├── Quantity selector (default: 1)
│   ├── Add to Cart CTA (primary, prominent)
│   │   └── State changes: "Adding..." → "Added ✓"
│   ├── Availability indicator
│   │   ├── "In Stock"
│   │   ├── "Low Stock - [X] left"
│   │   └── "Notify When Available" (for OOS sizes)
│   └── Wishlist toggle (heart icon)
│
├── Product Description (Expandable sections)
│   ├── Story/design description
│   ├── Material & care
│   ├── Fit & measurements
│   └── Shipping & returns
│
├── Size Guide Modal
│   ├── Measurement table
│   ├── How to measure guide
│   └── Fit recommendation (relaxed, boxy, etc.)
│
├── Related Products
│   ├── "Complete the Look" (styled pieces)
│   ├── "You May Also Like" (similar products)
│   └── 4-8 product cards
│
└── Trust Section
    ├── Shipping information
    ├── Return policy summary
    └── Customer service contact
```

### 2.4.3 Conversion Objectives
- Add to cart rate: >12%
- Size guide usage rate: >8%
- Image gallery engagement: >2 images viewed per visitor
- Exit rate to related products: >10%

### 2.4.4 Technical Implementation
- Zoom functionality using CSS transform (not additional images)
- Size selection state persists across color changes where possible
- Real-time inventory check before cart addition
- Image preloading for adjacent gallery images
- Structured data (JSON-LD) for rich search results

---

## 2.5 Drop Engine Module

### 2.5.1 Functional Requirements
- Create anticipation for upcoming releases
- Capture pre-launch registrations
- Manage access tiers for exclusive releases
- Communicate scarcity through countdown mechanics
- Drive concentrated traffic at drop time

### 2.5.2 Drop Engine Components

```
DROP ENGINE COMPONENTS:

Pre-Drop Phase (T-14 to T-0):
├── Drop Announcement Landing Page
│   ├── Campaign imagery/video
│   ├── Drop date/time with countdown
│   ├── Collection preview (lookbook teaser)
│   ├── Registration form
│   │   ├── Email capture
│   │   ├── Size preferences (optional)
│   │   └── SMS opt-in (optional)
│   ├── Share functionality
│   └── Member early access messaging (if applicable)
│
├── Homepage Integration
│   ├── Drop alert bar (site-wide)
│   ├── Countdown timer
│   └── "Get Notified" CTA
│
├── Email Sequence Triggers
│   ├── T-7: First announcement
│   ├── T-3: Collection preview
│   ├── T-1: Reminder with timing
│   ├── T-2hr: Final countdown
│   └── T-0: Drop live notification
│
└── Waitlist Management
    ├── Registration confirmation
    ├── Queue position (if applicable)
    └── Access tier assignment (member/public)

Drop Phase (T-0):
├── Collection Goes Live
│   ├── Homepage takeover
│   ├── Dedicated collection page
│   └── Product availability tracking
│
├── Real-Time Scarcity Indicators
│   ├── Stock level warnings ("Only [X] left")
│   ├── Size sellout notifications
│   └── Sold out state management
│
├── Cart Reservation
│   ├── 10-minute cart hold
│   ├── Timer visible in cart
│   └── Extension option (one-time)
│
└── Checkout Optimization
    ├── Express checkout priority
    ├── Guest checkout enabled
    └── Simplified form fields

Post-Drop Phase:
├── Sellout Celebration
│   ├── Social media content
│   ├── Community appreciation
│   └── Next drop teaser
│
├── Restock Notification
│   ├── Size-specific waitlists
│   ├── Automated notifications
│   └── Priority access (potentially)
│
└── Archive Display
    ├── Sold-out products remain visible
    ├── "Sold Out" badge
    └── "Notify if Restocked" option
```

### 2.5.3 Access Control Mechanisms

| Tier | Access Timing | Eligibility |
|------|---------------|-------------|
| **Founding Members** | T-12 hours | Top membership tier |
| **Members** | T-6 hours | Active membership |
| **Newsletter Subscribers** | T-2 hours | Email verified |
| **General Public** | T-0 | Open access |

### 2.5.4 Conversion Objectives
- Pre-registration rate: >15% of drop page visitors
- Email open rate (drop notifications): >45%
- Drop day conversion rate: >8%
- Cart completion rate (drop day): >65%

### 2.5.5 Technical Implementation
- Rate limiting to prevent bot purchases
- Queue management system for high-demand releases
- Real-time inventory sync (WebSocket or polling)
- CDN caching strategy for static assets
- Database optimization for concurrent reads
- Load testing for projected traffic (10x normal)

---

## 2.6 Cart & Checkout Module

### 2.6.1 Functional Requirements
- Enable cart management (add, remove, modify)
- Provide clear cost summary
- Support multiple payment methods
- Capture customer information efficiently
- Reduce abandonment through trust signals

### 2.6.2 Component Structure

```
CART DRAWER:
├── Slide-in from right (overlay, not page)
├── Cart contents
│   ├── Product image (thumbnail)
│   ├── Product name + variant
│   ├── Price
│   ├── Quantity selector (inline)
│   └── Remove option
├── Subtotal display
├── Shipping estimate (based on threshold)
├── Free shipping progress bar (if applicable)
├── "Continue Shopping" (secondary)
├── "Checkout" (primary CTA)
└── Trust badges (payment logos)

CHECKOUT FLOW:
├── Step 1: Information
│   ├── Email (for guest) / Sign in (for members)
│   ├── Shipping address form
│   ├── Phone number (for delivery updates)
│   └── Auto-save progress
│
├── Step 2: Shipping
│   ├── Shipping method selection
│   ├── Estimated delivery dates
│   └── Express options (if available)
│
├── Step 3: Payment
│   ├── Payment method selection
│   │   ├── UPI (high priority for India)
│   │   ├── Credit/Debit cards
│   │   ├── Net banking
│   │   ├── Wallets (Paytm, PhonePe)
│   │   └── COD (conditional, higher threshold)
│   └── Order summary (collapsible)
│
├── Step 4: Confirmation
│   ├── Order number
│   ├── Confirmation details
│   ├── Tracking information (when available)
│   └── Account creation prompt (for guests)
│
└── Trust Elements Throughout
    ├── Secure checkout badge
    ├── Return policy reminder
    ├── Customer service contact
    └── Payment security logos
```

### 2.6.3 Cart Abandonment Prevention

| Trigger | Intervention |
|---------|--------------|
| Cart closed without checkout | Exit-intent overlay (subtle) |
| 1 hour after abandonment | Email reminder with cart contents |
| 24 hours after abandonment | Email with potential stock warning |
| 72 hours after abandonment | Final email with help offer |

### 2.6.4 Conversion Objectives
- Cart to checkout initiation: >70%
- Checkout completion rate: >65%
- Guest checkout usage: >40%
- UPI payment adoption: >35% (India-specific)

### 2.6.5 Technical Implementation
- PCI compliance for payment handling
- Cart persistence (localStorage + server sync)
- Address validation API integration
- Payment gateway failover
- Order confirmation email reliability

---

## 2.7 User Profile & Wishlist Module

### 2.7.1 Component Structure

```
ACCOUNT DASHBOARD:
├── Overview (Landing)
│   ├── Welcome message with name
│   ├── Membership tier status (if applicable)
│   ├── Recent orders summary
│   └── Quick actions (track order, browse new)
│
├── Orders
│   ├── Order list with status
│   ├── Order detail view
│   │   ├── Products purchased
│   │   ├── Tracking information
│   │   ├── Delivery status
│   │   └── Invoice download
│   └── Reorder functionality
│
├── Wishlist
│   ├── Saved products grid
│   ├── Product availability status
│   ├── Price change indicators
│   ├── Add to cart from wishlist
│   └── Remove functionality
│
├── Addresses
│   ├── Saved addresses list
│   ├── Default address selection
│   ├── Add/edit/delete addresses
│   └── Address validation
│
├── Payment Methods (Optional)
│   ├── Saved payment methods
│   └── Manage/remove options
│
├── Membership (Conditional)
│   ├── Current tier status
│   ├── Benefits list
│   ├── Progress to next tier
│   └── Membership management
│
└── Settings
    ├── Email preferences
    ├── SMS preferences
    ├── Password change
    └── Account deletion
```

### 2.7.2 Conversion Objectives
- Wishlist to purchase rate: >15%
- Repeat purchase rate (account holders): >25%
- Email preference optimization: <5% unsubscribe rate
- Account creation from guest checkout: >20%

---

## 2.8 Community / Events Integration Module

### 2.8.1 Component Structure

```
COMMUNITY SECTION:
├── Events
│   ├── Upcoming events calendar
│   │   ├── Event imagery
│   │   ├── Date/time/location
│   │   ├── Event description
│   │   ├── RSVP/registration CTA
│   │   └── Member priority indicator
│   │
│   └── Past events archive
│       ├── Photo galleries
│       ├── Recap content
│       └── Community moments
│
├── Community Features
│   ├── Community member spotlights
│   ├── User-generated content gallery
│   ├── Community stats (optional)
│   └── Submit your story CTA
│
├── Editorial Content
│   ├── Behind-the-scenes features
│   ├── Artist/designer interviews
│   ├── Cultural commentary
│   └── Making-of content
│
└── Store Content
    ├── Store imagery and atmosphere
    ├── Store events
    └── Store-exclusive products
```

### 2.8.2 Technical Implementation
- Event registration integration (Eventbrite or custom)
- User-submitted content moderation workflow
- Gallery lazy loading with infinite scroll
- Social media feed integration (Instagram embed)

---

## 2.9 Store Integration Module

### 2.9.1 Component Structure

```
STORE ("CHAPTERS") SECTION:
├── Store Landing
│   ├── Store philosophy ("Chapters" concept)
│   ├── Store imagery (editorial, atmospheric)
│   └── Store list/map
│
├── Individual Store Pages
│   ├── Hero imagery (store interior/exterior)
│   ├── Store description (unique to location)
│   ├── Practical information
│   │   ├── Address
│   │   ├── Hours
│   │   ├── Phone
│   │   └── Get Directions (Google Maps)
│   ├── Store-exclusive products (if any)
│   ├── Upcoming store events
│   └── Book appointment (optional)
│
└── Stockist Directory
    ├── City-based listing
    ├── Stockist details
    │   ├── Name
    │   ├── Address
    │   ├── Contact
    │   └── Map link
    └── Premium retailer positioning
```

---

# 3. UX DESIGN SYSTEM SPECIFICATION

## 3.1 Navigation Logic

**Navigation Philosophy:** Collection-first navigation prioritizing campaign discovery over categorical browsing.

### 3.1.1 Primary Navigation Structure

```
NAVIGATION HIERARCHY:

Header (Persistent):
├── Left: Menu trigger (hamburger on mobile, hover on desktop)
├── Center: Logo (link to home)
└── Right: Search | Account | Cart (with count)

Desktop Mega Menu:
├── Shop
│   ├── Column 1: Collections
│   │   ├── New Arrivals
│   │   ├── [Current Drop Name]
│   │   ├── Collaborations
│   │   └── Archive
│   │
│   ├── Column 2: Categories
│   │   ├── All
│   │   ├── T-Shirts
│   │   ├── Shirts
│   │   ├── Hoodies & Sweaters
│   │   ├── Outerwear
│   │   ├── Pants
│   │   └── Accessories
│   │
│   ├── Column 3: Featured
│   │   ├── Hero product image
│   │   └── CTA to featured collection
│   │
│   └── Column 4 (if applicable)
│       └── Gender toggles (Men's/Women's)
│
├── Chapters (Stores)
│   └── Links to store pages
│
├── Community
│   ├── Events
│   ├── Journal/Editorial
│   └── About
│
└── Utility (Right-side)
    ├── Search
    ├── Account/Sign In
    └── Cart
```

## 3.2 Mobile Navigation

```
MOBILE MENU (Slide-in):
├── Close button
├── Primary links (large touch targets)
│   ├── Shop → Accordion submenu
│   ├── Chapters
│   ├── Community
│   └── Account
├── Secondary links (smaller)
│   ├── About
│   ├── Contact
│   ├── Shipping
│   └── Returns
└── Social links
```

## 3.3 Scrolling Architecture

### 3.3.1 Scroll Behavior Specifications

| Page Type | Scroll Behavior |
|-----------|-----------------|
| Homepage | Smooth scroll, section-based detection for analytics |
| Collection | Lazy loading with "Load More", scroll position preservation |
| PDP | Standard scroll, sticky add-to-cart on mobile |
| Checkout | Fixed header with progress indicator |

### 3.3.2 Scroll Friction Thresholds
- Content load trigger: 200px from bottom of visible content
- Back-to-top button: Appears after 1000px scroll
- Sticky header: Collapses after 100px scroll, expands on scroll up

## 3.4 Grid Density Logic

### 3.4.1 Product Grid Specifications

| Viewport Width | Grid Columns | Card Size | Gap |
|----------------|--------------|-----------|-----|
| >1440px | 4 | 25% - gap | 24px |
| 1024-1440px | 3 | 33% - gap | 20px |
| 768-1024px | 3 | 33% - gap | 16px |
| 480-768px | 2 | 50% - gap | 12px |
| <480px | 2 | 50% - gap | 8px |

## 3.5 Product Card Design

```
PRODUCT CARD ANATOMY:
├── Container (3:4 aspect ratio)
│   ├── Image area (85% of height)
│   │   ├── Primary image (default)
│   │   ├── Secondary image (hover)
│   │   └── Badge overlay (New, Low Stock, Sold Out)
│   │
│   └── Information area (15% of height)
│       ├── Product name (truncate at 2 lines)
│       ├── Price (single format)
│       └── Color variant indicators (circles, max 4 visible)
│
STATES:
├── Default: Primary image
├── Hover: Secondary image, subtle scale (1.02)
├── Sold Out: Grayscale overlay, "Sold Out" badge
└── Low Stock: "Only [X] Left" badge
```

## 3.6 Micro-Interaction System

| Interaction | Trigger | Animation | Duration |
|-------------|---------|-----------|----------|
| **Button Hover** | Mouse enter | Background color shift + subtle lift | 150ms |
| **Button Click** | Click | Scale down 0.98 + ripple | 100ms |
| **Card Hover** | Mouse enter | Image swap + subtle scale | 200ms |
| **Add to Cart** | Click | Button text change + checkmark | 400ms |
| **Cart Count** | Item added | Number bounce | 300ms |
| **Image Zoom** | Click/pinch | Scale up with pan | 200ms |
| **Navigation Open** | Menu click | Slide in + fade overlay | 250ms |
| **Modal Open** | Trigger | Scale up from center + fade | 200ms |
| **Toast Notification** | Trigger | Slide up from bottom | 300ms |
| **Size Selection** | Click | Border highlight + scale pulse | 150ms |
| **Wishlist Toggle** | Click | Heart fill animation | 300ms |

## 3.7 Add-to-Cart Behavior

```
ADD-TO-CART SEQUENCE:
1. User clicks "Add to Cart" button
2. Button state: "Add to Cart" → "Adding..."
3. Async cart update request
4. Success:
   ├── Button state: "Adding..." → "Added ✓"
   ├── Cart count increments (animate)
   ├── Cart drawer auto-opens (optional setting)
   └── Button returns to default state (2s delay)
5. Failure:
   ├── Button state: "Adding..." → "Try Again"
   ├── Error message display (toast)
   └── Retry enabled
```

## 3.8 Size Selection UX

```
SIZE SELECTOR:
├── Visual presentation: Horizontal button row
├── Button dimensions: 44x44px minimum (touch target)
├── States:
│   ├── Available: Full opacity, clickable
│   ├── Selected: Filled background, border highlight
│   ├── Unavailable: Reduced opacity (0.4), strikethrough, still visible
│   └── Hover: Border highlight
├── Size guide link: Adjacent to selector
└── Error state: Red highlight around selector if submission attempted without selection
```

## 3.9 Cart Drawer Behavior

```
CART DRAWER:
├── Trigger: Cart icon click / "Add to Cart" success
├── Opening: Slide in from right (300ms)
├── Overlay: 50% black backdrop with click-outside-close
├── Width: 400px (desktop), full width (mobile)
├── Contents:
│   ├── Header: "Cart ([X] items)" + close button
│   ├── Product list: Scrollable
│   ├── Subtotal: Fixed above footer
│   └── Footer: Checkout + Continue Shopping CTAs
├── Empty state: "Your cart is empty" + Shop CTA
└── Closing: Click outside, close button, or "Continue Shopping"
```

## 3.10 Mobile-First Adaptation

| Component | Mobile Adaptation |
|-----------|-------------------|
| **Navigation** | Hamburger menu, full-screen overlay |
| **Product Grid** | 2-column default, larger touch targets |
| **Product Gallery** | Swipe carousel with dots, full-width |
| **Add to Cart** | Sticky footer on PDP |
| **Size Selection** | Larger buttons, scrollable row if needed |
| **Cart** | Full-screen drawer |
| **Checkout** | Single-column, larger form fields |
| **Search** | Full-screen overlay |

### 3.10.1 Mobile Performance Requirements

| Metric | Target |
|--------|--------|
| First Input Delay | <100ms |
| Touch Target Size | ≥44x44px |
| Font Size (body) | ≥16px |
| Viewport | Responsive, no horizontal scroll |
| Orientation | Support both portrait and landscape |

---

# 4. VISUAL DESIGN SYSTEM

## 4.1 Color System

```
COLOR HIERARCHY:

Foundation Colors (Always present):
├── Primary Black: #0A0A0A (near-black, not pure #000)
├── Primary White: #FAFAFA (warm white, not pure #FFF)
├── Warm Grey: #E5E0DC (supporting neutral)
└── Cool Grey: #6B6B6B (text, secondary elements)

Signature Accent (Brand identifier):
└── [To be defined] - Single distinctive color
    ├── High saturation
    ├── Memorable and ownable
    ├── Works on both light and dark backgrounds

Seasonal Palette (Per campaign):
├── 2-3 campaign-specific colors
├── Derived from collection materials/themes
└── Rotates with collections

Functional Colors:
├── Success: #2E7D32 (muted green)
├── Error: #C62828 (muted red)
├── Warning: #F57C00 (muted orange)
└── Info: #1565C0 (muted blue)
```

## 4.2 Typography System

```
TYPOGRAPHY HIERARCHY:

Primary Typeface (Headings, CTAs):
├── Style: Geometric sans-serif
├── Weight range: Medium to Bold
├── Examples: GT America, Neue Haas Grotesk, Söhne
└── Application: H1-H3, buttons, navigation

Secondary Typeface (Body, Supporting):
├── Style: Humanist sans-serif or clean serif
├── Weight range: Book to Medium
├── Examples: Inter, Untitled Sans
└── Application: Body text, descriptions, meta
```

### 4.2.1 Type Specifications

| Element | Font Size (Desktop) | Font Size (Mobile) | Weight | Line Height |
|---------|---------------------|-------------------|--------|-------------|
| H1 | 48-64px | 32-40px | Medium/Bold | 1.1 |
| H2 | 36-48px | 28-32px | Medium | 1.15 |
| H3 | 24-32px | 20-24px | Medium | 1.2 |
| Body | 16-18px | 16px | Book | 1.5-1.6 |
| Small | 14px | 14px | Book | 1.4 |
| Caption | 12px | 12px | Book | 1.3 |
| Button | 14-16px | 14px | Medium | 1 |

## 4.3 Image Art Direction

### 4.3.1 Photography Style Guide

```
CAMPAIGN PHOTOGRAPHY:
├── Mood: Atmospheric, emotional, story-driven
├── Lighting: Natural or warm artificial, avoid harsh flash
├── Color grade: Warm, slightly desaturated, consistent across campaign
├── Composition: Editorial, intentional negative space
├── Models: Diverse, authentic to brand community
├── Settings: Urban, architectural, cultural landmarks
└── Post-production: Cohesive grade, not over-processed

PRODUCT PHOTOGRAPHY:
├── Background: Clean, neutral (white or warm grey)
├── Lighting: Soft, even, detail-preserving
├── Angles required (per product):
│   ├── Front (hero image)
│   ├── Back
│   ├── On-model (front angle)
│   ├── Detail shots (embroidery, label, texture)
│   └── Side angle (optional)
├── Consistency: Same setting, lighting across all SKUs
└── Technical: 2000px minimum, WebP format, 3:4 ratio

COMMUNITY/UGC PHOTOGRAPHY:
├── Style: Documentary, candid, real
├── Sources: Customer submissions, event photography
├── Treatment: Light editing for consistency
└── Usage: Social media, community section, marketing
```

---

# 5. PERFORMANCE ENGINEERING

## 5.1 PLP Performance Requirements

| Metric | Requirement | Measurement |
|--------|-------------|-------------|
| **Initial Load (Above Fold)** | <2.0s | First Contentful Paint |
| **Full Page Interactive** | <3.5s | Time to Interactive |
| **Layout Stability** | CLS <0.1 | Cumulative Layout Shift |
| **Image Load (Card)** | <1.5s per image | Custom metric |
| **Filter Response** | <500ms | DOM update after selection |
| **Sort Response** | <300ms | DOM update after selection |
| **Load More Response** | <1.5s | Next batch rendered |
| **Scroll Performance** | 60fps | No jank during scroll |

### 5.1.1 Technical Implementation

```
PLP ARCHITECTURE:

Image Strategy:
├── WebP format (JPEG fallback)
├── Srcset for responsive delivery
├── Lazy loading below fold (loading="lazy")
├── Low-quality placeholder (LQIP) or blurhash
├── CDN delivery (Shopify CDN or equivalent)
└── Preload first row images

Rendering Strategy:
├── Initial: 8-16 products
├── Load More: +8-12 products
├── Maximum DOM: 100-150 products before pagination
├── Virtual scrolling for very large catalogs (optional)
└── Skeleton loading during transitions

State Management:
├── Filter state in URL (shareable)
├── Scroll position preserved on back navigation
├── Filter persistence in session storage
└── Product quick-view state management
```

## 5.2 Filtering Logic

```
FILTER ARCHITECTURE:

Available Filters:
├── Size (S, M, L, XL, XXL, etc.)
│   └── Multi-select enabled
├── Color
│   └── Visual swatches, multi-select
├── Price Range
│   └── Min/max slider or preset ranges
├── Category/Type
│   └── Single select or multi-select
├── Availability
│   └── "In Stock Only" toggle
└── Collection (if combining multiple)

Filter Behavior:
├── Filters apply immediately (no "Apply" button)
├── Product count updates on filter change
├── Empty state when no products match
├── "Clear All Filters" accessible
└── Mobile: Filter drawer with "Apply" and "Clear"

Sort Logic:
├── Default: Newest / Featured
├── Options:
│   ├── Newest
│   ├── Price: Low to High
│   ├── Price: High to Low
│   └── Best Selling
└── Sort persists during session
```

## 5.3 Conversion-Optimized CTA Placements

| Location | Primary CTA | Secondary CTA | Notes |
|----------|-------------|---------------|-------|
| **Homepage Hero** | Discover [Collection] | Scroll indicator | Single clear action |
| **Homepage Category** | Shop [Category] | None | Direct to PLP |
| **PLP Product Card** | (Implicit click) | None | Entire card is clickable |
| **PDP Main** | Add to Cart | Wishlist | Size must be selected first |
| **PDP Sticky (Mobile)** | Add to Cart | None | Appears on scroll below fold |
| **Cart Drawer** | Checkout | Continue Shopping | Primary action is checkout |
| **Empty Cart** | Shop Now | None | Drive to discovery |
| **Checkout Steps** | Continue | Edit/Back | Progressive movement forward |

### 5.3.1 CTA Design Specifications
- Primary CTA: Solid fill, contrasting color, 44px height minimum
- Secondary CTA: Outline or text link, lower visual weight
- Touch targets: 44x44px minimum (mobile)
- States: Default, Hover, Active, Loading, Disabled

## 5.4 Cart Abandonment Prevention System

```
ABANDONMENT PREVENTION:

On-Site Interventions:
├── Exit Intent Detection (Desktop)
│   ├── Trigger: Mouse moves toward browser chrome
│   ├── Response: Soft overlay (not popup)
│   └── Content: "Your cart is waiting" + product thumbnails
│
├── Tab Visibility Change
│   ├── Trigger: User switches tabs
│   ├── Response: Update page title ("(1) Items in your cart")
│   └── Reset on tab return
│
├── Cart Timer (During drops)
│   ├── Display: Time remaining in cart hold
│   └── Warning: "Your items will be released in 5:00"
│
└── Persistent Cart
    ├── Cart saved to localStorage + server
    ├── Survives browser close (for logged-in users)
    └── Cart recovery on return

Email Recovery Sequence:
├── T+1 hour: "You left something behind"
├── T+24 hours: "Still interested?"
├── T+72 hours: "Last chance"
└── Abandoned cart cleanup: 7 days

SMS Recovery (Opt-in only):
├── T+2 hours: Single text with cart link
└── Frequency: Maximum 1 SMS per abandonment
```

## 5.5 Trust Signal Architecture

```
TRUST SIGNALS BY LOCATION:

Homepage:
├── Physical store section ("We have real stores")
├── Press mentions/as seen in (if applicable)
└── Customer community imagery

PDP:
├── Material and care information
├── Craftsmanship details
├── Shipping timeline
├── Return policy summary
└── Size guide availability

Cart:
├── Secure checkout badge
├── Payment method logos
└── Shipping cost transparency

Checkout:
├── SSL badge
├── Payment security messaging
├── Contact information visible
├── Clear return policy link
└── Order summary with images

Footer (Site-wide):
├── Contact information
├── Social media links
├── Payment method logos
├── Return/shipping policy links
└── About/story link
```

## 5.6 Mobile-First KPIs

| Metric | Target | Priority |
|--------|--------|----------|
| **Mobile Conversion Rate** | >1.5% | Critical |
| **Mobile Bounce Rate** | <55% | High |
| **Add to Cart Rate (Mobile)** | >8% | High |
| **Mobile Page Speed** | <3s LCP | Critical |
| **Mobile Cart Completion** | >55% | High |

## 5.7 Page Load Benchmarks

| Page Type | LCP Target | FID Target | CLS Target | Total Size |
|-----------|------------|------------|------------|------------|
| Homepage | <2.5s | <100ms | <0.1 | <2MB |
| PLP | <2.5s | <100ms | <0.1 | <1.5MB initial |
| PDP | <2.5s | <100ms | <0.1 | <1.5MB |
| Cart | <2.0s | <100ms | <0.05 | <500KB |
| Checkout | <2.0s | <100ms | <0.05 | <500KB |

---

# 6. SCALABILITY ARCHITECTURE

```
SCALABILITY REQUIREMENTS:

Traffic Handling:
├── Baseline: 10,000 daily visitors
├── Drop day peak: 100,000+ visitors (10x baseline)
├── Concurrent checkouts: 500+ simultaneous
└── API rate: 10,000 requests/minute during peak

Infrastructure:
├── CDN: Global edge delivery for static assets
├── Database: Read replicas for high-demand queries
├── Cache: Redis or equivalent for product/inventory
├── Queue: Background job processing for emails, inventory updates
└── Search: Dedicated search infrastructure (Algolia or similar)

Inventory Management:
├── Real-time inventory sync
├── Oversell prevention (atomic inventory decrement)
├── Cart reservation system (hold stock during checkout)
└── Graceful degradation (show out-of-stock vs. error)

Monitoring:
├── Real-time error tracking (Sentry or equivalent)
├── Performance monitoring (Core Web Vitals)
├── Uptime monitoring (external)
├── Inventory alert system (low stock notifications)
└── Conversion funnel monitoring
```

---

# 7. TECHNOLOGY STACK

## 7.1 Recommended Stack

| Layer | Recommendation | Rationale |
|-------|----------------|-----------|
| **E-Commerce Platform** | Shopify Plus | Proven fashion infrastructure, Indian payment support, scalability |
| **Headless Alternative** | Shopify + Custom Frontend (Next.js) | Maximum design flexibility, better performance |
| **CDN** | Shopify CDN or Cloudflare | Global edge delivery |
| **Search** | Algolia | Superior search UX, merchandising |
| **Email** | Klaviyo | E-commerce native, segmentation, flows |
| **SMS** | Postscript or WATI | Indian market support |
| **Analytics** | GA4 + Segment | Comprehensive tracking, data warehouse capability |
| **Customer Support** | Gorgias or Zendesk | Multi-channel support management |
| **Inventory** | Shopify native or Cin7 | Inventory management |
| **Loyalty** | Smile.io or LoyaltyLion | Membership/rewards infrastructure |

## 7.2 Integration Requirements

### 7.2.1 Payment Gateways
- Razorpay (primary - UPI, cards, wallets)
- PayU (backup)
- COD integration with delivery partners

### 7.2.2 Shipping & Logistics
- Shiprocket or Delhivery integration
- Real-time tracking API
- Returns management

### 7.2.3 Marketing Integrations
- Facebook Pixel / Meta Conversions API
- Google Analytics 4
- Google Ads conversion tracking
- Instagram Shopping

---

# 8. QR + DIGITAL SYNC STRATEGY

| Location | Function | Destination |
|----------|----------|-------------|
| Product hangtags | Product detail | PDP (mobile-optimized) |
| Window display | Collection browse | Collection page |
| Receipt | Order tracking | Order status page |
| Event signage | RSVP/tickets | Event registration |
| Fitting room | Full catalog | Collection page |

### 8.1 Implementation Specifications
- QR codes with UTM tracking for attribution
- Mobile-first destination pages
- Offline-capable product info (PWA consideration)
- Short URLs as QR alternative

---

# 9. DOCUMENT GOVERNANCE

**Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | February 28, 2026 | TRD Team | Initial technical specification |

**Review Cycle:** Quarterly review and update

**Stakeholders:**
- Engineering Leadership
- Design Systems Team
- DevOps Team
- Product Leadership

---

*End of Technical Requirements Document*
