# T-CLIENT-018: Wishlist Page

## Page Overview
Saved items collection with organization, quick actions, and sharing capabilities.

## Wireframe

### Desktop (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              HEADER (sticky)                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Home / My Account / Wishlist                                                   │
│                                                                                 │
├────────────────────────┬────────────────────────────────────────────────────────┤
│                        │                                                        │
│  MY ACCOUNT            │  MY WISHLIST (5 items)                                 │
│  ─────────────         │  ══════════════════════                                │
│                        │                                                        │
│  📊 Dashboard          │  ┌─────────────────────────────────────────────────────┐│
│  📦 Orders             │  │ [All Items (5)]  [In Stock (4)]  [Out of Stock (1)]││
│  ♡  Wishlist (5)       │  │                                                     ││
│     ═══════════        │  │            [Share Wishlist 📤]  [Clear All 🗑️]       ││
│  📍 Addresses          │  └─────────────────────────────────────────────────────┘│
│  👤 Profile            │                                                        │
│  ⚙️ Settings           │  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐│
│                        │  │                │ │                │ │                ││
│  ─────────────         │  │   [PRODUCT     │ │   [PRODUCT     │ │   [PRODUCT     ││
│                        │  │    IMAGE]  ✕   │ │    IMAGE]  ✕   │ │    IMAGE]  ✕   ││
│  🚪 Sign Out           │  │                │ │                │ │                ││
│                        │  │                │ │                │ │                ││
│                        │  ├────────────────┤ ├────────────────┤ ├────────────────┤│
│                        │  │ URBANCART      │ │ URBANCART      │ │ URBANCART      ││
│                        │  │ Supreme Tee    │ │ Urban Hoodie   │ │ Basic Tee      ││
│                        │  │                │ │                │ │                ││
│                        │  │ ₹2,499         │ │ ₹3,499         │ │ ₹1,999         ││
│                        │  │                │ │                │ │                ││
│                        │  │ Size: [S][M][L]│ │ Size: [M][L]   │ │ OUT OF STOCK   ││
│                        │  │                │ │                │ │                ││
│                        │  │ [ADD TO CART]  │ │ [ADD TO CART]  │ │ [NOTIFY ME]    ││
│                        │  │                │ │                │ │                ││
│                        │  │ Added Mar 12   │ │ Added Mar 10   │ │ Added Mar 8    ││
│                        │  └────────────────┘ └────────────────┘ └────────────────┘│
│                        │                                                        │
│                        │  ┌────────────────┐ ┌────────────────┐                  │
│                        │  │                │ │                │                  │
│                        │  │   [PRODUCT     │ │   [PRODUCT     │                  │
│                        │  │    IMAGE]  ✕   │ │    IMAGE]  ✕   │                  │
│                        │  │                │ │                │                  │
│                        │  │ ⚡SALE         │ │                │                  │
│                        │  ├────────────────┤ ├────────────────┤                  │
│                        │  │ URBANCART      │ │ URBANCART      │                  │
│                        │  │ Graphic Tee    │ │ Joggers        │                  │
│                        │  │                │ │                │                  │
│                        │  │ ₹1,499 ₹1,999  │ │ ₹2,999         │                  │
│                        │  │ 25% OFF!       │ │                │                  │
│                        │  │                │ │                │                  │
│                        │  │ Size: [M][L]   │ │ Size: [30][32] │                  │
│                        │  │                │ │                │                  │
│                        │  │ [ADD TO CART]  │ │ [ADD TO CART]  │                  │
│                        │  │                │ │                │                  │
│                        │  │ Added Mar 5    │ │ Added Feb 28   │                  │
│                        │  └────────────────┘ └────────────────┘                  │
│                        │                                                        │
├────────────────────────┴────────────────────────────────────────────────────────┤
│                                                                                 │
│  RECENTLY VIEWED                                                                │
│  ───────────────                                                                │
│                                                                                 │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│  │   [PRODUCT]    │ │   [PRODUCT]    │ │   [PRODUCT]    │ │   [PRODUCT]    │   │
│  │ Recent 1       │ │ Recent 2       │ │ Recent 3       │ │ Recent 4       │   │
│  │ ₹2,499  [♡]    │ │ ₹3,499  [♡]    │ │ ₹1,999  [♡]    │ │ ₹4,499  [♡]    │   │
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘   │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                              FOOTER                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────────┐
│ ← Wishlist              📤  │
├─────────────────────────────┤
│ 5 items                     │
├─────────────────────────────┤
│ [All] [In Stock] [Out]      │
├─────────────────────────────┤
│ ┌───────────┐ ┌───────────┐ │
│ │           │ │           │ │
│ │ [IMAGE] ✕ │ │ [IMAGE] ✕ │ │
│ │           │ │           │ │
│ │ Supreme   │ │ Urban     │ │
│ │ Tee       │ │ Hoodie    │ │
│ │ ₹2,499    │ │ ₹3,499    │ │
│ │           │ │           │ │
│ │ [Add] [S] │ │ [Add] [M] │ │
│ └───────────┘ └───────────┘ │
│ ┌───────────┐ ┌───────────┐ │
│ │           │ │           │ │
│ │ [IMAGE] ✕ │ │ [IMAGE] ✕ │ │
│ │[OUT STOCK]│ │ [SALE]    │ │
│ │ Basic Tee │ │ Graphic   │ │
│ │ ₹1,999    │ │ ₹1,499    │ │
│ │           │ │           │ │
│ │ [Notify]  │ │ [Add] [L] │ │
│ └───────────┘ └───────────┘ │
│                             │
│ RECENTLY VIEWED             │
│ ← [Product] [Product] →    │
└─────────────────────────────┘
```

## Wishlist Card States

### In Stock
```
┌────────────────────────────┐
│                        ✕   │  ← Remove button
│    [PRODUCT IMAGE]         │
│                            │
├────────────────────────────┤
│ URBANCART                  │
│ Supreme Oversized Tee      │
│                            │
│ ₹2,499                     │
│                            │
│ Size: [S] [M] [L] [XL]     │  ← Quick size select
│                            │
│ ┌────────────────────────┐ │
│ │      ADD TO CART       │ │
│ └────────────────────────┘ │
│                            │
│ Added Mar 12, 2024         │
└────────────────────────────┘
```

### Out of Stock
```
┌────────────────────────────┐
│                        ✕   │
│    [PRODUCT IMAGE]         │
│         (dimmed)           │
│    ┌──────────────┐        │
│    │  OUT OF STOCK │        │
│    └──────────────┘        │
├────────────────────────────┤
│ URBANCART                  │
│ Basic Tee                  │
│                            │
│ ₹1,999 (Currently unavailable)│
│                            │
│ ┌────────────────────────┐ │
│ │    🔔 NOTIFY ME        │ │
│ └────────────────────────┘ │
│                            │
│ Added Mar 8, 2024          │
└────────────────────────────┘
```

### On Sale
```
┌────────────────────────────┐
│ ⚡SALE 25% OFF          ✕   │
│    [PRODUCT IMAGE]         │
│                            │
├────────────────────────────┤
│ URBANCART                  │
│ Graphic Tee                │
│                            │
│ ₹1,499  ₹1,999             │
│          ↑ strikethrough   │
│ You save ₹500!             │  ← Green highlight
│                            │
│ Size: [M] [L] [XL]         │
│                            │
│ ┌────────────────────────┐ │
│ │      ADD TO CART       │ │
│ └────────────────────────┘ │
│                            │
│ Added Mar 5, 2024          │
└────────────────────────────┘
```

### Low Stock
```
┌────────────────────────────┐
│                        ✕   │
│    [PRODUCT IMAGE]         │
│                            │
├────────────────────────────┤
│ URBANCART                  │
│ Limited Edition Hoodie     │
│                            │
│ ₹4,999                     │
│ ⚠ Only 2 left!             │  ← Warning highlight
│                            │
│ Size: [M] [L]              │
│                            │
│ ┌────────────────────────┐ │
│ │      ADD TO CART       │ │
│ └────────────────────────┘ │
│                            │
│ Added Mar 1, 2024          │
└────────────────────────────┘
```

## Filter Tabs

```
[All Items (5)]          ← Total items
[In Stock (4)]           ← Available to purchase
[Out of Stock (1)]       ← Unavailable items
[On Sale (1)]            ← Price reduced items
```

## Actions

### Bulk Actions
```
┌─────────────────────────────────────────────────────────────┐
│ ☑ Select All (5)    [Add All to Cart]    [Clear Selected]  │
└─────────────────────────────────────────────────────────────┘
```

### Share Wishlist Modal
```
┌────────────────────────────────────────────────────────────┐
│  Share Your Wishlist                                  ✕    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Copy Link                                                 │
│  ┌────────────────────────────────────────────┐ [Copy]     │
│  │ https://urbancart.in/wishlist/abc123       │            │
│  └────────────────────────────────────────────┘            │
│                                                            │
│  Or share via                                              │
│                                                            │
│  [📱 WhatsApp]  [📘 Facebook]  [🐦 Twitter]  [✉️ Email]     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Notify When Available
```
┌────────────────────────────────────────────────────────────┐
│  🔔 Notify When Available                            ✕     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  We'll email you when this item is back in stock.         │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ✓ rahul@example.com                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────────┐│
│  │                  NOTIFY ME                             ││
│  └────────────────────────────────────────────────────────┘│
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Empty State
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                           ♡                                 │
│                                                             │
│               Your wishlist is empty                        │
│                                                             │
│       Save items you love by clicking the heart icon       │
│                 on any product page                         │
│                                                             │
│                    [Start Shopping]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Price Drop Notification
```
┌─────────────────────────────────────────────────────────────┐
│ 🎉 Price dropped on 1 item in your wishlist!               │
│                                                             │
│ Graphic Tee is now ₹1,499 (was ₹1,999)                     │
│                                                   [View]    │
└─────────────────────────────────────────────────────────────┘
```

## Data Requirements
```typescript
interface WishlistPageData {
  items: WishlistItem[];
  filters: {
    status: 'all' | 'in-stock' | 'out-of-stock' | 'on-sale';
  };
  stats: {
    total: number;
    inStock: number;
    outOfStock: number;
    onSale: number;
  };
  recentlyViewed: Product[];
}

interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
  isAvailable: boolean;
  stockLevel: number;
  priceDropped: boolean;
  originalPrice?: number;
}
```

## Component Dependencies
- WishlistCard
- FilterTabs
- SizeSelector
- ShareModal
- NotifyModal
- EmptyState
- RecentlyViewed
