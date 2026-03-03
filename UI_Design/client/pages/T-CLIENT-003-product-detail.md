# T-CLIENT-003: Product Detail Page (PDP)

## Page Overview
Comprehensive product information page with images, variants, details, and conversion-focused elements.

## Wireframe

### Desktop (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              HEADER (sticky)                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Home / Shop / T-Shirts / Supreme Oversized Tee                                 │
│                                                                                 │
├──────────────────────────────────────┬──────────────────────────────────────────┤
│                                      │                                          │
│  ┌────────────────────────────────┐  │  APOSTLE                               │
│  │                                │  │                                          │
│  │                                │  │  SUPREME OVERSIZED TEE                   │
│  │                                │  │                                          │
│  │                                │  │  ★★★★☆ 4.2 (128 reviews) | 500+ sold     │
│  │                                │  │                                          │
│  │    [MAIN PRODUCT IMAGE]        │  │  ₹2,499                                  │
│  │                                │  │  Inclusive of all taxes                  │
│  │                                │  │  ─────────────────────────────────────   │
│  │                                │  │                                          │
│  │                                │  │  COLOR: Black                            │
│  │                                │  │  ┌────┐ ┌────┐ ┌────┐                    │
│  │                                │  │  │ ●  │ │ ○  │ │ ○  │                    │
│  │                                │  │  └────┘ └────┘ └────┘                    │
│  │                                │  │  Black   White  Navy                     │
│  │                                │  │                                          │
│  │           🔍 [←] [→]           │  │  SIZE: M                      [Size Guide] │
│  └────────────────────────────────┘  │  [S]  [M]  [L]  [XL]  [XXL]              │
│                                      │         ↑ selected                       │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│                                          │
│  │thumb │ │thumb │ │thumb │ │thumb ││  ─────────────────────────────────────   │
│  │  1   │ │  2   │ │  3   │ │  4   ││                                          │
│  └──────┘ └──────┘ └──────┘ └──────┘│  QUANTITY                                │
│      ↑ active (border)              │  ┌──────────────────────┐                │
│                                      │  │  [−]      1      [+] │                │
│                                      │  └──────────────────────┘                │
│                                      │  ⚠ Only 5 left in stock                  │
│                                      │                                          │
│                                      │  ┌────────────────────────────────────┐  │
│                                      │  │         ADD TO CART                │  │
│                                      │  └────────────────────────────────────┘  │
│                                      │                                          │
│                                      │  ┌────────────────────────────────────┐  │
│                                      │  │    ♡  ADD TO WISHLIST              │  │
│                                      │  └────────────────────────────────────┘  │
│                                      │                                          │
│                                      │  ─────────────────────────────────────   │
│                                      │                                          │
│                                      │  🚚 Free shipping on orders above ₹999   │
│                                      │  🔄 Easy 30-day returns                  │
│                                      │  ✓ 100% Authentic Product               │
│                                      │  📦 Expected delivery: Mar 15-18         │
│                                      │                                          │
│                                      │  ─────────────────────────────────────   │
│                                      │                                          │
│                                      │  Check Delivery                          │
│                                      │  ┌─────────────────────┐ [CHECK]         │
│                                      │  │ Enter pincode       │                 │
│                                      │  └─────────────────────┘                 │
│                                      │                                          │
├──────────────────────────────────────┴──────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  [Description]   [Size Guide]   [Reviews (128)]   [Shipping]            │   │
│  │  ═══════════                                                            │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│  DESCRIPTION                                                                    │
│  ────────────                                                                   │
│                                                                                 │
│  The Supreme Oversized Tee is a staple piece that combines comfort with        │
│  streetwear aesthetics. Crafted from premium 240 GSM cotton, this tee          │
│  features a relaxed oversized fit perfect for layering or wearing solo.        │
│                                                                                 │
│  KEY FEATURES                                                                   │
│  • Premium 240 GSM cotton fabric                                               │
│  • Oversized relaxed fit                                                       │
│  • Ribbed crew neck                                                            │
│  • Drop shoulder design                                                        │
│  • Screen-printed logo                                                         │
│                                                                                 │
│  PRODUCT DETAILS                                                                │
│  ┌─────────────────┬─────────────────┐                                         │
│  │ Material        │ 100% Cotton     │                                         │
│  │ Weight          │ 240 GSM         │                                         │
│  │ Fit             │ Oversized       │                                         │
│  │ Neck            │ Crew Neck       │                                         │
│  │ Sleeve          │ Short Sleeve    │                                         │
│  │ Care            │ Machine Wash    │                                         │
│  │ SKU             │ UC-TSH-001-BLK  │                                         │
│  └─────────────────┴─────────────────┘                                         │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  CUSTOMER REVIEWS                                           [Write a Review]   │
│  ─────────────────                                                              │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ Overall Rating                                                             │ │
│  │                                                                            │ │
│  │  ★★★★☆  4.2 out of 5                                                      │ │
│  │                                                                            │ │
│  │  ★★★★★ ████████████████████████ 78%                                       │ │
│  │  ★★★★  ██████████ 15%                                                      │ │
│  │  ★★★   ███ 4%                                                              │ │
│  │  ★★    █ 2%                                                                │ │
│  │  ★     █ 1%                                                                │ │
│  │                                                                            │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │ ★★★★★  Perfect fit and quality!                                           │ │
│  │                                                                            │ │
│  │ The fabric is super soft and the oversized fit is exactly what I wanted.  │ │
│  │ Already ordered in two more colors!                                        │ │
│  │                                                                            │ │
│  │ Rahul K. • Verified Purchase • Size: L • March 10, 2024                   │ │
│  │                                                                            │ │
│  │ Was this helpful? [Yes (12)] [No (0)]                                      │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                                                                 │
│  [Load More Reviews]                                                            │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  YOU MAY ALSO LIKE                                                             │
│  ─────────────────                                                             │
│                                                                                 │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│  │   [PRODUCT]    │ │   [PRODUCT]    │ │   [PRODUCT]    │ │   [PRODUCT]    │   │
│  │ Related 1      │ │ Related 2      │ │ Related 3      │ │ Related 4      │   │
│  │ ₹2,999         │ │ ₹1,999         │ │ ₹3,499         │ │ ₹2,499         │   │
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘   │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                              FOOTER                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────────┐
│ ←                   ♡  📤   │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │                         │ │
│ │    [PRODUCT IMAGE]      │ │
│ │                         │ │
│ │                         │ │
│ │      ● ○ ○ ○            │ │ ← swipe indicators
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ APOSTLE                   │
│ Supreme Oversized Tee       │
│ ★★★★☆ 4.2 (128 reviews)     │
│                             │
│ ₹2,499                      │
│ Inclusive of all taxes      │
├─────────────────────────────┤
│ COLOR: Black                │
│ [●] [○] [○]                │
│                             │
│ SIZE: M           [Size Guide] │
│ [S] [M] [L] [XL] [XXL]      │
│                             │
│ ⚠ Only 5 left in stock      │
├─────────────────────────────┤
│ Delivery: Enter pincode     │
│ ┌─────────────────┐ [CHECK] │
│ │ 560001          │         │
│ └─────────────────┘         │
│ ✓ Delivery by Mar 15-18     │
├─────────────────────────────┤
│ 🚚 Free shipping on ₹999+   │
│ 🔄 Easy 30-day returns      │
│ ✓ 100% Authentic           │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ Description         [+] │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Size Guide          [+] │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Reviews (128)       [+] │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Shipping Info       [+] │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ YOU MAY ALSO LIKE           │
│ ┌───────────┐ ┌───────────┐ │
│ │ [PRODUCT] │ │ [PRODUCT] │ │
│ └───────────┘ └───────────┘ │
│   ← swipe →                 │
├─────────────────────────────┤
│                             │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ [♡]    ADD TO CART      │ │ ← Sticky bottom bar
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## Image Gallery

### Desktop Behavior
- Main image with zoom on hover
- Click to open full-screen gallery
- Thumbnail strip below/left
- Arrow navigation

### Mobile Behavior
- Swipeable carousel
- Pinch to zoom
- Dot indicators
- Full-screen on tap

## Variant Selection

### Color Selector
```
COLOR: Black
┌────┐ ┌────┐ ┌────┐
│ ●  │ │ ○  │ │ ○  │
│    │ │    │ │ ━━ │  ← strikethrough = out of stock
└────┘ └────┘ └────┘
Black   White  Navy
```

### Size Selector
```
SIZE: M                    [Size Guide]
[S]  [M]  [L]  [XL]  [━━]
      ↑            ↑
   selected    out of stock
```

### Size Guide Modal
```
┌────────────────────────────────────────────────────┐
│ Size Guide                                    ✕    │
├────────────────────────────────────────────────────┤
│                                                    │
│ Size    Chest    Length    Shoulder               │
│ ───────────────────────────────────────────────── │
│ S       38"      27"       18"                    │
│ M       40"      28"       19"                    │
│ L       42"      29"       20"                    │
│ XL      44"      30"       21"                    │
│ XXL     46"      31"       22"                    │
│                                                    │
│ ℹ Model is 6'0" wearing size L                    │
│                                                    │
│ HOW TO MEASURE                                     │
│ [Measurement guide illustration]                   │
│                                                    │
└────────────────────────────────────────────────────┘
```

## Stock Indicators
- `✓ In Stock` - Green
- `⚠ Only X left` - Warning (< 10)
- `✕ Out of Stock` - Red
- `📅 Pre-order` - Info

## Actions

### Add to Cart Success
```
┌────────────────────────────────────────┐
│ ✓ Added to Cart!                   ✕   │
│                                        │
│ ┌──────┐ Supreme Oversized Tee         │
│ │[IMG] │ Black • Size M                │
│ └──────┘ ₹2,499                        │
│                                        │
│ [Continue Shopping] [View Cart]        │
└────────────────────────────────────────┘
```

### Wishlist Toggle
- Empty heart → Filled heart on click
- Toast confirmation
- Animate with scale

## Tabs Content

### Description Tab
- Product story/description
- Key features (bullet list)
- Product details table

### Size Guide Tab
- Size chart table
- Model measurements
- How to measure guide

### Reviews Tab
- Rating summary with bars
- Individual reviews
- Filter by rating
- Sort options
- Pagination/Load more

### Shipping Tab
- Delivery estimates
- Shipping methods
- Return policy
- COD availability

## Data Requirements
```typescript
interface ProductPageData {
  product: {
    id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    comparePrice?: number;
    images: ProductImage[];
    variants: ProductVariant[];
    selectedVariant: ProductVariant;
    stock: number;
    sku: string;
    features: string[];
    details: Record<string, string>;
    rating: {
      average: number;
      count: number;
      distribution: number[];
    };
  };
  reviews: Review[];
  relatedProducts: Product[];
  recentlyViewed: Product[];
}
```

## SEO Requirements
- H1: Product name
- Meta title: "Product Name | Brand | APOSTLE"
- Meta description: Product description (truncated)
- Structured data: Product schema with
  - name, description, image
  - price, availability
  - aggregateRating
  - brand, sku
- Open Graph tags for sharing
- Canonical URL

## Component Dependencies
- ImageGallery
- VariantSelector
- QuantitySelector
- AddToCartButton
- WishlistButton
- PincodeChecker
- ProductTabs
- ReviewList
- RelatedProducts
- StickyBottomBar (mobile)
