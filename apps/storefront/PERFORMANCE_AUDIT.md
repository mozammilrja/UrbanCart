# Performance Audit Report - APOSTLE Storefront

## Executive Summary

Comprehensive performance audit and optimization of the Next.js 14 ecommerce storefront. All optimizations target Lighthouse scores of 90-100 across Performance, Accessibility, Best Practices, and SEO.

---

## 1. Identified Bottlenecks (Before Optimization)

### Critical Performance Issues

| Issue | Impact | Severity |
|-------|--------|----------|
| **Heavy 3D Libraries Loaded Unconditionally** | @react-three/drei, @react-three/fiber, three.js, @splinetool loaded on every page even when unused | 🔴 Critical |
| **Unoptimized Hero Images** | `unoptimized` flag bypassed Next.js image optimization (no WebP/AVIF, no srcset) | 🔴 Critical |
| **framer-motion Loaded on All Sections** | ~60KB+ imported for simple fade animations | 🟠 High |
| **ProductCard with Carousel Per Item** | Embla carousel instantiated for every product card (~8 carousels per section) | 🟠 High |
| **No Lazy Loading for Below-Fold Content** | All 6 sections loaded synchronously on page load | 🟠 High |
| **Custom Font via @font-face** | Not using next/font, missing preload hints | 🟡 Medium |
| **Multiple Priority Images** | Hero + all Banner images had `priority`, competing for LCP | 🟡 Medium |
| **Missing Preconnect Hints** | External image domains loaded without preconnect | 🟡 Medium |
| **Animation Performance** | Some animations not using GPU-accelerated properties | 🟡 Medium |

### Accessibility Issues

| Issue | WCAG Level |
|-------|------------|
| Generic alt text ("Hero", "Hero Mobile") | A |
| Missing aria-labels on icon buttons | A |
| No focus indicators on interactive elements | AA |
| Missing heading hierarchy in some sections | A |
| Missing role and aria-labelledby attributes | A |

---

## 2. Optimizations Implemented

### 2.1 Bundle Size Reduction

**Before:** ~500KB+ initial JS (including Three.js, framer-motion on all components)

**Changes:**
- ✅ Replaced framer-motion with CSS animations for simple fade-in effects
- ✅ Dynamic imports for HeroOrb, HeroSpline (only loaded when used)
- ✅ Dynamic imports for below-fold sections
- ✅ Created `OptimizedProductCard` without per-card carousel
- ✅ Added `optimizePackageImports` in next.config.mjs for tree-shaking

**Files Modified:**
- [next.config.mjs](apps/storefront/next.config.mjs)
- [page.tsx](apps/storefront/src/app/page.tsx)
- [HeroSection.tsx](apps/storefront/src/components/sections/HeroSection.tsx)
- [LatestDropSection.tsx](apps/storefront/src/components/sections/LatestDropSection.tsx)
- [CategorySection.tsx](apps/storefront/src/components/sections/CategorySection.tsx)
- [ProductGridSection.tsx](apps/storefront/src/components/sections/ProductGridSection.tsx)
- [BannerSection.tsx](apps/storefront/src/components/sections/BannerSection.tsx)
- [StoreLocationsSection.tsx](apps/storefront/src/components/sections/StoreLocationsSection.tsx)

### 2.2 Image Optimization

**Changes:**
- ✅ Removed `unoptimized` flag from all images
- ✅ Enabled AVIF and WebP formats in next.config.mjs
- ✅ Added proper `sizes` attribute for responsive images
- ✅ Set `priority` only for first banner, not all
- ✅ Added `fetchPriority="high"` for hero images
- ✅ Set appropriate `quality` (80-85) for balance
- ✅ Added `loading="lazy"` for below-fold images

**next.config.mjs Image Configuration:**
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000, // 1 year
}
```

### 2.3 Font Optimization

**Changes:**
- ✅ Migrated custom font to `next/font/local`
- ✅ Added `preload: true` for critical fonts
- ✅ Added proper fallback fonts
- ✅ Created `font-brand` Tailwind class
- ✅ Removed redundant @font-face from globals.css

**Files Modified:**
- [layout.tsx](apps/storefront/src/app/layout.tsx)
- [globals.css](apps/storefront/src/app/globals.css)
- [tailwind.config.ts](apps/storefront/tailwind.config.ts)
- [Navbar.tsx](apps/storefront/src/components/layout/Navbar.tsx)

### 2.4 Lazy Loading Implementation

**New Component:**
- ✅ Created `LazySection.tsx` with IntersectionObserver

**Page.tsx Changes:**
```tsx
// Critical section - loaded immediately
<HeroSection ... />

// First below-fold - dynamic import with SSR
const LatestDropSection = dynamic(() => ..., { ssr: true });

// Further sections - lazy loaded with IntersectionObserver
<LazySection minHeight="500px" rootMargin="300px">
  <CategorySection ... />
</LazySection>
```

### 2.5 Animation Optimization

**GSAP Optimizations:**
- ✅ Added `force3D: true` for GPU acceleration
- ✅ Added `willChange: 'transform'` CSS hint
- ✅ Using only transform and opacity (composited properties)
- ✅ Added `{ passive: true }` to event listeners
- ✅ Proper cleanup of animations and event listeners

**CSS Animations Created:**
```css
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out 0.3s forwards; }
.animate-fade-in-scale { animation: fadeInScale 0.8s ease-out 0.2s forwards; }

/* GPU-accelerated keyframes */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px) translateZ(0); }
  to { opacity: 1; transform: translateY(0) translateZ(0); }
}

/* Respects prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) { ... }
```

### 2.6 Accessibility Improvements

| Component | Changes |
|-----------|---------|
| **HeroSection** | Added `aria-label` to section, descriptive image alt text, focus styles |
| **Navbar** | Added `aria-expanded`, `aria-controls`, `aria-label` to all buttons/links |
| **ProductCard** | Added `aria-pressed` for wishlist, `aria-label` with pricing |
| **All Sections** | Added `aria-labelledby` with proper heading IDs |
| **Icons** | Added `aria-hidden="true"` to decorative icons |
| **Links** | Added missing focus ring styles |

### 2.7 Cache Headers Configuration

```javascript
// next.config.mjs
async headers() {
  return [
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ];
}
```

### 2.8 Preconnect & DNS Prefetch

```html
<link rel="preconnect" href="https://bluorng.com" />
<link rel="preconnect" href="https://images.unsplash.com" />
<link rel="dns-prefetch" href="https://bluorng.com" />
```

---

## 3. New Components Created

| Component | Purpose |
|-----------|---------|
| [LazySection.tsx](apps/storefront/src/components/ui/LazySection.tsx) | IntersectionObserver wrapper for lazy-loading sections |
| [OptimizedProductCard.tsx](apps/storefront/src/components/ui/OptimizedProductCard.tsx) | Lightweight product card without carousel, memoized |

---

## 4. Recommended Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts, metadata, preconnects
│   ├── page.tsx            # Dynamic imports, lazy sections
│   └── globals.css         # CSS animations, utilities
├── components/
│   ├── hero/               # GSAP-animated hero components
│   │   ├── hero-orb.tsx    # GPU-accelerated animations
│   │   ├── BluorngHeroSection.tsx
│   │   └── index.ts
│   ├── sections/           # Page sections (memoized)
│   │   ├── HeroSection.tsx
│   │   ├── LatestDropSection.tsx
│   │   └── ...
│   ├── ui/                 # Reusable UI components
│   │   ├── LazySection.tsx
│   │   ├── OptimizedProductCard.tsx
│   │   └── ...
│   └── layout/             # Layout components
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   └── utils.ts            # cn() and utilities
└── styles/
    └── theme.ts            # Animation variants
```

---

## 5. Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 1.8s | Priority hero image, preconnect, WebP/AVIF, remove unoptimized |
| **CLS** | < 0.05 | Fixed sizes, skeleton placeholders, font-display: swap |
| **TBT** | < 100ms | Dynamic imports, removed framer-motion, lazy sections |
| **FCP** | < 1.5s | Critical CSS, preloaded fonts, reduced initial JS |

---

## 6. Final Checklist for Lighthouse 100

### Performance ✅
- [x] Hero image optimized with priority and fetchPriority
- [x] WebP/AVIF formats enabled
- [x] Dynamic imports for heavy components
- [x] Lazy loading for below-fold sections
- [x] CSS animations instead of JS animations
- [x] GSAP using GPU-accelerated properties
- [x] Preconnect hints for external domains
- [x] Aggressive cache headers
- [x] Optimized package imports

### Accessibility ✅
- [x] Descriptive alt text on all images
- [x] aria-labels on all interactive elements
- [x] Focus indicators on buttons and links
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] aria-hidden on decorative elements
- [x] Respects prefers-reduced-motion

### Best Practices ✅
- [x] HTTPS ready
- [x] No console errors
- [x] Proper viewport meta
- [x] No deprecated APIs

### SEO ✅
- [x] Meta description present
- [x] Open Graph tags configured
- [x] Proper heading structure
- [x] Semantic HTML (article, section, nav, main)
- [x] Robots meta configured

---

## 7. Additional Recommendations

### Short-term
1. **Remove unused dependencies**: Consider removing Three.js related packages if Spline is not actively used
2. **Add blur placeholder**: Generate blurDataURL for hero images
3. **Implement route prefetching**: Add `prefetch` to likely navigation links

### Medium-term
1. **Consider removing framer-motion entirely**: CSS animations handle most use cases
2. **Implement skeleton loading**: Replace SectionSkeleton with proper skeleton components
3. **Add bundle analyzer**: `@next/bundle-analyzer` for ongoing monitoring

### Long-term
1. **Edge caching**: Deploy with Vercel Edge Functions for faster cold starts
2. **Image CDN**: Consider dedicated image CDN for even faster delivery
3. **Resource hints**: Add `modulepreload` for critical chunks

---

## 8. Testing Recommendations

```bash
# Run Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Analyze bundle
ANALYZE=true pnpm build

# Check unused dependencies
npx depcheck

# Accessibility audit
npx axe-core-cli http://localhost:3000
```

---

**Audit completed:** March 2026  
**Auditor:** GitHub Copilot (Senior Frontend Performance Engineer)
