# T-CLIENT-002: Shop/Catalog Page

## Page Overview
Product listing page with filtering, sorting, and browsing capabilities. Primary discovery interface for customers.

## Wireframe

### Desktop (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              HEADER (sticky)                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Home / Shop / T-Shirts                                    156 products         │
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                          ALL T-SHIRTS                                    │   │
│  │                  Premium streetwear tees for every style                 │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
├────────────────────┬────────────────────────────────────────────────────────────┤
│                    │                                                            │
│  FILTERS           │  Active: [Black ×] [Size: M ×] [₹500-₹2000 ×]  [Clear All] │
│  ──────────────    │                                                            │
│                    │  ┌──────────────────────────────────────────────────────┐  │
│  Category          │  │ Sort by: [Featured ▼]              Grid: [▦] [≡]     │  │
│  ☐ Oversized (45)  │  └──────────────────────────────────────────────────────┘  │
│  ☑ Graphic (32)    │                                                            │
│  ☐ Plain (28)      │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  ☐ Vintage (18)    │  │          │ │          │ │          │ │          │      │
│                    │  │ [NEW]    │ │ [SALE]   │ │          │ │          │      │
│  ────────────      │  │          │ │          │ │          │ │          │      │
│                    │  │          │ │          │ │          │ │          │      │
│  Size              │  │      ♡   │ │      ♡   │ │      ♡   │ │      ♡   │      │
│  [S] [M] [L] [XL]  │  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤      │
│                    │  │ Brand    │ │ Brand    │ │ Brand    │ │ Brand    │      │
│  ────────────      │  │ Product  │ │ Product  │ │ Product  │ │ Product  │      │
│                    │  │ ★★★★☆    │ │ ★★★★★    │ │ ★★★★☆    │ │ ★★★★★    │      │
│  Color             │  │ ₹2,499   │ │ ₹1,999   │ │ ₹3,499   │ │ ₹2,999   │      │
│  ● ● ○ ● ○ ○       │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                    │                                                            │
│  ────────────      │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│                    │  │          │ │          │ │          │ │          │      │
│  Price Range       │  │          │ │          │ │          │ │          │      │
│  ₹Min ──●── ₹Max   │  │          │ │          │ │          │ │          │      │
│  ₹500      ₹5000   │  │      ♡   │ │      ♡   │ │      ♡   │ │      ♡   │      │
│                    │  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤      │
│  ────────────      │  │ Brand    │ │ Brand    │ │ Brand    │ │ Brand    │      │
│                    │  │ Product  │ │ Product  │ │ Product  │ │ Product  │      │
│  Brand             │  │ ₹2,499   │ │ ₹3,499   │ │ ₹1,999   │ │ ₹4,499   │      │
│  ☐ APOSTLE (89)  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│  ☐ StreetX (45)    │                                                            │
│  ☐ NeonWave (32)   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│                    │  │          │ │          │ │          │ │          │      │
│  ────────────      │  │          │ │          │ │          │ │          │      │
│                    │  │          │ │          │ │          │ │          │      │
│  [Clear Filters]   │  │      ♡   │ │      ♡   │ │      ♡   │ │      ♡   │      │
│                    │  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤      │
│                    │  │ ...      │ │ ...      │ │ ...      │ │ ...      │      │
│                    │  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                    │                                                            │
│                    │  ┌────────────────────────────────────────────────────────┐│
│                    │  │ [←] [1] [2] [3] [4] ... [13] [→]   Showing 1-12 of 156 ││
│                    │  └────────────────────────────────────────────────────────┘│
│                    │                                                            │
├────────────────────┴────────────────────────────────────────────────────────────┤
│                              FOOTER                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────────┐
│ ← T-Shirts         🔍  🛒   │
├─────────────────────────────┤
│ 156 products                │
├─────────────────────────────┤
│ [🔧 Filter]   [Sort: Featured ▼] │
├─────────────────────────────┤
│ Active: [Black ×] [M ×]     │
├─────────────────────────────┤
│ ┌───────────┐ ┌───────────┐ │
│ │           │ │           │ │
│ │ [NEW] ♡   │ │       ♡   │ │
│ │           │ │           │ │
│ ├───────────┤ ├───────────┤ │
│ │ Brand     │ │ Brand     │ │
│ │ Product   │ │ Product   │ │
│ │ ₹2,499    │ │ ₹3,499    │ │
│ └───────────┘ └───────────┘ │
│ ┌───────────┐ ┌───────────┐ │
│ │           │ │           │ │
│ │       ♡   │ │ [SALE] ♡  │ │
│ │           │ │           │ │
│ ├───────────┤ ├───────────┤ │
│ │ Brand     │ │ Brand     │ │
│ │ Product   │ │ Product   │ │
│ │ ₹1,999    │ │ ₹2,499    │ │
│ └───────────┘ └───────────┘ │
│                             │
│ ... more products ...       │
│                             │
│ [Load More]                 │
│                             │
│ Page 1 of 13                │
└─────────────────────────────┘

┌─ Filter Sheet (slides up) ──┐
│ ✕  Filters        [Clear]   │
├─────────────────────────────┤
│ Category           [−]      │
│ ☐ Oversized (45)           │
│ ☑ Graphic (32)             │
│ ☐ Plain (28)               │
├─────────────────────────────┤
│ Size               [−]      │
│ [S] [M] [L] [XL]           │
├─────────────────────────────┤
│ Color              [+]      │
├─────────────────────────────┤
│ Price Range        [+]      │
├─────────────────────────────┤
│ Brand              [+]      │
├─────────────────────────────┤
│ [Apply Filters (23)]        │
└─────────────────────────────┘
```

## Filter Types

### Category Filter
- Type: Checkbox list
- Show count in parentheses
- Collapsible accordion
- Multi-select enabled

### Size Filter
- Type: Button group
- Common sizes: XS, S, M, L, XL, XXL
- Show availability (gray out unavailable)
- Multi-select enabled

### Color Filter
- Type: Color swatches
- Circular buttons with color fill
- Selection ring on selected
- Tooltip with color name

### Price Filter
- Type: Dual-handle range slider
- Input fields for min/max
- Presets: Under ₹1000, ₹1000-₹2000, etc.

### Brand Filter
- Type: Checkbox list with search
- Show product count
- Sort by count or alphabetical

## Sort Options
1. Featured (default)
2. Newest
3. Price: Low to High
4. Price: High to Low
5. Best Selling
6. Avg. Customer Rating

## Product Card States

### Default
```
┌─────────────────────┐
│                     │
│    [Image]      ♡   │
│                     │
├─────────────────────┤
│ Brand Name          │
│ Product Title       │
│ ★★★★☆ (24)          │
│ ₹2,499              │
└─────────────────────┘
```

### Hover (Desktop)
```
┌─────────────────────┐
│                     │
│    [Image]      ♥   │
│  [QUICK VIEW]       │
│                     │
├─────────────────────┤
│ Brand Name          │
│ Product Title       │
│ ★★★★☆ (24)          │
│ ₹2,499              │
└─────────────────────┘
```

### Sale Item
```
┌─────────────────────┐
│ [SALE]              │
│    [Image]      ♡   │
│                     │
├─────────────────────┤
│ Brand Name          │
│ Product Title       │
│ ₹1,999  ₹2,999  33% │
│         ↑ strikethrough
└─────────────────────┘
```

## URL Structure
```
/shop                        # All products
/shop?category=t-shirts      # Category filter
/shop?size=M&size=L          # Multiple sizes
/shop?color=black&brand=xyz  # Multiple filters
/shop?sort=price-asc         # Sort
/shop?page=2                 # Pagination
```

## Data Requirements
```typescript
interface ShopPageData {
  products: Product[];
  filters: {
    categories: FilterOption[];
    sizes: FilterOption[];
    colors: ColorOption[];
    brands: FilterOption[];
    priceRange: { min: number; max: number };
  };
  activeFilters: ActiveFilter[];
  sort: SortOption;
  pagination: {
    page: number;
    totalPages: number;
    totalProducts: number;
    perPage: number;
  };
  categoryInfo?: {
    name: string;
    description: string;
    image?: string;
  };
}
```

## Infinite Scroll Alternative
- Mobile: "Load More" button
- Desktop: Optional infinite scroll
- Show loading skeleton while fetching
- Preserve scroll position on back navigation

## Quick View Modal
- Trigger: Hover + click on desktop
- Content: Image, name, price, size selector, add to cart
- Link: "View Full Details" to PDP

## Empty State
```
┌─────────────────────────────────────────────┐
│                                             │
│              🔍                             │
│                                             │
│     No products match your filters          │
│                                             │
│     Try adjusting or clearing filters       │
│                                             │
│           [Clear All Filters]               │
│                                             │
└─────────────────────────────────────────────┘
```

## Component Dependencies
- FilterSidebar
- ProductCard
- ProductGrid
- Pagination
- SortDropdown
- ActiveFilterTags
- QuickViewModal
- Breadcrumbs

## SEO Requirements
- H1: Category name or "All Products"
- Meta title: "Shop T-Shirts | APOSTLE"
- Canonical: Base URL without filters
- Pagination: rel="next/prev"
- noindex filter combinations

## Performance
- Server-side render first page
- Client-side filter updates
- Optimistic UI for filter changes
- Debounce filter inputs
- Skeleton loading states
