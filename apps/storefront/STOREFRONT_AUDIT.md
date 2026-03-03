# UrbanCart Storefront Audit Report

**Date**: March 2, 2026  
**Scope**: apps/storefront  
**Objective**: Transform into cinematic luxury ecommerce flagship experience

---

## 1. CURRENT STATE ANALYSIS

### 1.1 Route Structure
```
/                          ✅ Home (exists)
/shop                      ✅ Shop catalog (exists)
/collections               ✅ Collections listing (exists)
/collections/[slug]        ✅ Collection detail (exists)
/collections/menswear      ⚠️ Empty directory - DELETE
/product/[id]              ✅ Product detail (exists)
/cart                      ✅ Cart page (exists)
/checkout                  ✅ Checkout page (exists)
/account                   ✅ Account page (exists)
/wishlist                  ✅ Wishlist page (exists)
/login                     ✅ Login page (exists)
/about                     ❌ MISSING - CREATE
/contact                   ❌ MISSING - CREATE
/search                    ❌ MISSING - CREATE
/drops                     ❌ MISSING (referenced in nav) - CREATE
```

### 1.2 Component Architecture
```
components/
├── layout/
│   ├── header.tsx       ✅ Keep - needs luxury redesign
│   ├── footer.tsx       ✅ Keep - needs luxury redesign
│   └── index.ts         ✅ Keep
└── providers.tsx        ✅ Keep - enterprise pattern
```

### 1.3 Mock Data Analysis
**PROBLEM**: Inline mock data scattered across pages

| File | Issue |
|------|-------|
| page.tsx (home) | Hardcoded featuredProducts, categories, collections |
| shop/page.tsx | Hardcoded products array |
| collections/page.tsx | Hardcoded collections array |
| collections/[slug]/page.tsx | Hardcoded collectionData, products |
| product/[id]/page.tsx | Hardcoded product, relatedProducts |
| cart/page.tsx | Hardcoded initialCartItems |
| checkout/page.tsx | Hardcoded cartItems |
| account/page.tsx | Hardcoded orders, wishlistItems |
| wishlist/page.tsx | Hardcoded initialWishlist |

### 1.4 Shared Packages Status
```
packages/
├── mocks/        ✅ MSW handlers exist - ENHANCE with 300 products
├── hooks/        ✅ useAuth, useCart, useWishlist - KEEP
├── types/        ✅ Product, Collection types - KEEP
└── ui/           ✅ shadcn components - KEEP
```

---

## 2. CLEANUP REPORT

### 2.1 Directories to Remove
| Path | Reason |
|------|--------|
| `/collections/menswear/` | Empty directory, no page.tsx |

### 2.2 Files to Clean
| File | Action |
|------|--------|
| All page files | Remove inline mock data, use services instead |

### 2.3 Code Patterns to Remove
- Hardcoded mock arrays in page components
- Inline `formatPrice` functions (consolidate to utils)
- Duplicate product card markup (create reusable component)

---

## 3. ARCHITECTURE TO PRESERVE

### 3.1 Layout System ✅
```tsx
// Root layout → Shop layout → Pages
RootLayout (providers)
  └── StorefrontLayout (Header + Footer)
       └── Pages
```

### 3.2 Provider Hierarchy ✅
```tsx
<QueryClientProvider>
  <ToastProvider>
    {children}
  </ToastProvider>
</QueryClientProvider>
```

### 3.3 Enterprise Patterns to Keep
- TanStack Query setup
- Zustand store architecture
- Axios abstraction layer
- TypeScript strict mode
- shadcn/ui component system

---

## 4. NEW ARCHITECTURE PLAN

### 4.1 Directory Structure (Target)
```
apps/storefront/src/
├── app/
│   ├── (shop)/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Cinematic home
│   │   ├── about/page.tsx        # NEW
│   │   ├── contact/page.tsx      # NEW
│   │   ├── search/page.tsx       # NEW
│   │   ├── drops/page.tsx        # NEW
│   │   ├── shop/page.tsx
│   │   ├── collections/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── product/[slug]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── account/page.tsx
│   │   ├── wishlist/page.tsx
│   │   └── login/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── cart-drawer.tsx       # NEW - glass morphism
│   │   └── index.ts
│   ├── home/
│   │   ├── hero-scene.tsx        # NEW - Three.js
│   │   ├── featured-products.tsx
│   │   ├── collections-grid.tsx
│   │   └── newsletter.tsx
│   ├── shop/
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── filters.tsx
│   │   └── sort-dropdown.tsx
│   ├── product/
│   │   ├── gallery.tsx
│   │   ├── info.tsx
│   │   └── related.tsx
│   ├── ui/                       # Luxury UI components
│   │   ├── magnetic-button.tsx
│   │   ├── glass-panel.tsx
│   │   ├── cursor-spotlight.tsx
│   │   └── grain-overlay.tsx
│   ├── motion/                   # GSAP system
│   │   ├── scroll-reveal.tsx
│   │   ├── text-reveal.tsx
│   │   └── page-transition.tsx
│   ├── three/                    # Three.js scenes
│   │   ├── hero-canvas.tsx
│   │   ├── product-showcase.tsx
│   │   └── particles.tsx
│   └── providers.tsx
├── services/                     # API-ready layer
│   ├── index.ts
│   ├── product.service.ts
│   ├── collection.service.ts
│   ├── cart.service.ts
│   ├── checkout.service.ts
│   └── account.service.ts
├── mock/                         # Local mock data
│   ├── index.ts
│   ├── home.mock.ts
│   ├── products.mock.ts
│   ├── collections.mock.ts
│   ├── cart.mock.ts
│   ├── checkout.mock.ts
│   ├── account.mock.ts
│   └── search.mock.ts
├── hooks/
│   ├── useProducts.ts
│   ├── useCollections.ts
│   ├── useCart.ts
│   └── useAnimations.ts
├── stores/
│   ├── cart.store.ts
│   ├── ui.store.ts
│   └── auth.store.ts
├── lib/
│   ├── utils.ts
│   ├── gsap.ts                   # GSAP config
│   └── three.ts                  # Three.js config
├── config/
│   ├── site.ts
│   └── navigation.ts
└── types/
    └── index.ts
```

### 4.2 Service Layer Pattern
```typescript
// services/product.service.ts
const DATA_MODE = process.env.NEXT_PUBLIC_DATA_MODE || 'MOCK';

export const productService = {
  async getAll(filters?: ProductFilters) {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(800);
      return getMockProducts(filters);
    }
    return apiClient.get('/products', { params: filters });
  },
  
  async getById(id: string) {
    if (DATA_MODE === 'MOCK') {
      await simulateDelay(400);
      return getMockProductById(id);
    }
    return apiClient.get(`/products/${id}`);
  }
};
```

---

## 5. MOTION ARCHITECTURE

### 5.1 Three.js Scenes
| Scene | Location | Purpose |
|-------|----------|---------|
| HeroCanvas | Home page | Floating product sculpture with particles |
| ProductShowcase | Product detail | Interactive 3D product view |

### 5.2 GSAP Timeline Strategy
| Animation | Trigger | Configuration |
|-----------|---------|---------------|
| ScrollReveal | Viewport entry | stagger: 0.1, y: 40, opacity |
| TextReveal | Scroll position | splitText, line animation |
| MagneticButton | Mouse proximity | x/y offset, spring ease |
| PageTransition | Route change | clip-path reveal |

---

## 6. PERFORMANCE STRATEGY

### 6.1 Code Splitting
- Dynamic imports for Three.js scenes
- Lazy load off-screen components
- Route-based chunking

### 6.2 Animation Optimization
- GPU-accelerated transforms only
- requestAnimationFrame for Three.js
- IntersectionObserver for scroll triggers
- Mobile fallback (no 3D, reduced motion)

### 6.3 Image Optimization
- Next.js Image with blur placeholder
- srcset for responsive images
- WebP format preference

---

## 7. IMPLEMENTATION PHASES

### Phase 1: Foundation (Current)
- [x] Audit complete
- [ ] Remove dead code
- [ ] Create service layer
- [ ] Create mock data system

### Phase 2: Core Pages
- [ ] Cinematic home
- [ ] Shop with luxury grid
- [ ] Product detail
- [ ] Cart drawer

### Phase 3: Motion System
- [ ] Three.js hero scene
- [ ] GSAP scroll animations
- [ ] Micro-interactions

### Phase 4: Additional Pages
- [ ] About brand story
- [ ] Contact
- [ ] Search
- [ ] Drops

### Phase 5: Polish
- [ ] Performance optimization
- [ ] Mobile experience
- [ ] Final QA

---

## 8. DEPENDENCIES TO ADD

```json
{
  "dependencies": {
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "gsap": "^3.12.4",
    "lenis": "^1.0.0"
  }
}
```

---

**Next Action**: Execute Phase 1 - Remove dead code and create service layer
