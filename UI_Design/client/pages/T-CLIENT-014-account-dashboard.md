# T-CLIENT-014: Account Dashboard

## Page Overview
User account hub with overview of orders, wishlist, addresses, and account settings.

## Wireframe

### Desktop (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              HEADER (sticky)                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Home / My Account                                                              │
│                                                                                 │
├────────────────────────┬────────────────────────────────────────────────────────┤
│                        │                                                        │
│  MY ACCOUNT            │  WELCOME BACK, RAHUL!                                  │
│  ─────────────         │                                                        │
│                        │  ─────────────────────────────────────────────────────│
│  📊 Dashboard          │                                                        │
│     ═══════════        │  QUICK STATS                                          │
│  📦 Orders             │  ┌────────────────┐ ┌────────────────┐ ┌──────────────┐│
│  ♡  Wishlist (5)       │  │                │ │                │ │              ││
│  📍 Addresses          │  │      4         │ │      2         │ │     5        ││
│  👤 Profile            │  │    Orders      │ │   In Transit   │ │  Wishlist    ││
│  ⚙️ Settings           │  │                │ │                │ │              ││
│                        │  └────────────────┘ └────────────────┘ └──────────────┘│
│  ─────────────         │                                                        │
│                        │  ─────────────────────────────────────────────────────│
│  🚪 Sign Out           │                                                        │
│                        │  RECENT ORDERS                                [View All]│
│                        │                                                        │
│                        │  ┌─────────────────────────────────────────────────────┐│
│                        │  │ Order #12345                           Mar 12, 2024 ││
│                        │  │                                                     ││
│                        │  │ ┌──────┐  Supreme Oversized Tee                    ││
│                        │  │ │[IMG] │  Black • Size M • x2                      ││
│                        │  │ └──────┘                                           ││
│                        │  │                                                     ││
│                        │  │ Status: 🟢 Delivered                    ₹4,998     ││
│                        │  │                                                     ││
│                        │  │ [Track Order]  [View Details]  [Buy Again]         ││
│                        │  └─────────────────────────────────────────────────────┘│
│                        │                                                        │
│                        │  ┌─────────────────────────────────────────────────────┐│
│                        │  │ Order #12344                           Mar 8, 2024  ││
│                        │  │                                                     ││
│                        │  │ ┌──────┐  Urban Graphic Hoodie                     ││
│                        │  │ │[IMG] │  Navy • Size L • x1                       ││
│                        │  │ └──────┘                                           ││
│                        │  │                                                     ││
│                        │  │ Status: 🚚 In Transit                   ₹3,499     ││
│                        │  │                                                     ││
│                        │  │ [Track Order]  [View Details]                      ││
│                        │  └─────────────────────────────────────────────────────┘│
│                        │                                                        │
│                        │  ─────────────────────────────────────────────────────│
│                        │                                                        │
│                        │  SAVED ADDRESSES                             [Manage]  │
│                        │                                                        │
│                        │  ┌──────────────────────┐ ┌──────────────────────┐     │
│                        │  │ 🏠 Home (Default)    │ │ 🏢 Office            │     │
│                        │  │                      │ │                      │     │
│                        │  │ 123 MG Road,         │ │ 456 Tech Park,       │     │
│                        │  │ Koramangala          │ │ Whitefield           │     │
│                        │  │ Bangalore 560001     │ │ Bangalore 560066     │     │
│                        │  │                      │ │                      │     │
│                        │  │ [Edit]               │ │ [Edit]               │     │
│                        │  └──────────────────────┘ └──────────────────────┘     │
│                        │                                                        │
│                        │  ─────────────────────────────────────────────────────│
│                        │                                                        │
│                        │  WISHLIST PREVIEW                            [View All]│
│                        │                                                        │
│                        │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────┐│
│                        │  │ [PRODUCT] │ │ [PRODUCT] │ │ [PRODUCT] │ │ [PRODUCT]││
│                        │  │ ₹2,499    │ │ ₹3,499    │ │ ₹1,999    │ │ ₹4,499   ││
│                        │  │ [Add]     │ │ [Add]     │ │ [Add]     │ │ [Add]    ││
│                        │  └───────────┘ └───────────┘ └───────────┘ └──────────┘│
│                        │                                                        │
├────────────────────────┴────────────────────────────────────────────────────────┤
│                              FOOTER                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────────┐
│ ← My Account                │
├─────────────────────────────┤
│                             │
│ 👤  Hi, Rahul!              │
│     rahul@example.com       │
│                             │
├─────────────────────────────┤
│ QUICK STATS                 │
│ ┌───────┐ ┌───────┐ ┌─────┐ │
│ │ 4     │ │ 2     │ │ 5   │ │
│ │Orders │ │Transit│ │Wish │ │
│ └───────┘ └───────┘ └─────┘ │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ 📦 My Orders        →   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ ♡  Wishlist (5)     →   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 📍 Addresses        →   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 👤 Profile          →   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ ⚙️ Settings         →   │ │
│ └─────────────────────────┘ │
│                             │
├─────────────────────────────┤
│ RECENT ORDER                │
│ ┌─────────────────────────┐ │
│ │ #12345 • Mar 12         │ │
│ │ 🟢 Delivered            │ │
│ │ [Track]  [Details]      │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ 🚪 Sign Out             │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## Sidebar Navigation

### Menu Items
```
┌─────────────────────────┐
│ MY ACCOUNT              │
├─────────────────────────┤
│ 📊 Dashboard            │ ← Overview page
│ 📦 Orders               │ ← Order history
│ ♡  Wishlist (5)         │ ← Saved items
│ 📍 Addresses            │ ← Manage addresses
│ 👤 Profile              │ ← Personal info
│ ⚙️ Settings             │ ← Preferences
├─────────────────────────┤
│ 🚪 Sign Out             │
└─────────────────────────┘
```

### Active State
```
┌─────────────────────────┐
│ 📊 Dashboard            │ ← Bold + accent border/bg
│    ═══════════          │
└─────────────────────────┘
```

## Quick Stats

### Order Status Summary
```
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│                │ │                │ │                │
│      12        │ │      2         │ │      5         │
│   Total        │ │   In          │ │   Wishlist     │
│   Orders       │ │   Transit      │ │   Items        │
│                │ │                │ │                │
└────────────────┘ └────────────────┘ └────────────────┘
   ↑ Clickable        ↑ Clickable        ↑ Clickable
```

## Recent Orders Preview

### Order Card
```
┌─────────────────────────────────────────────────────────────┐
│ Order #12345                                   Mar 12, 2024 │
├─────────────────────────────────────────────────────────────┤
│ ┌──────┐  Supreme Oversized Tee                            │
│ │[IMG] │  Black • Size M • x2                              │
│ └──────┘                                                   │
│                                                             │
│ ┌──────┐  Urban Graphic Hoodie                             │
│ │[IMG] │  Navy • Size L • x1                               │
│ └──────┘  + 1 more item                                    │
├─────────────────────────────────────────────────────────────┤
│ Status: 🟢 Delivered                           ₹8,497      │
│                                                             │
│ [Track Order]  [View Details]  [Buy Again]                 │
└─────────────────────────────────────────────────────────────┘

Order Statuses:
🟡 Processing  - Yellow
🟠 Shipped     - Orange
🚚 In Transit  - Blue
🟢 Delivered   - Green
🔴 Cancelled   - Red
↩️ Returned    - Gray
```

## Saved Addresses
```
┌──────────────────────────────┐
│ 🏠 Home (Default)            │
│                              │
│ Rahul Kumar                  │
│ 123 MG Road, Koramangala     │
│ Bangalore, Karnataka 560001  │
│ 📞 +91 98765 43210           │
│                              │
│ [Edit]  [Delete]             │
└──────────────────────────────┘
```

## Wishlist Preview

### Grid Cards
```
┌───────────────┐
│               │
│   [IMAGE]     │
│               │
│ Product Name  │
│ ₹2,499        │
│               │
│ [Add to Cart] │
└───────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────────────────┐
│                           ♡                                 │
│                                                             │
│              Your wishlist is empty                         │
│                                                             │
│         Save items you love for later                       │
│                                                             │
│                  [Start Shopping]                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Requirements
```typescript
interface DashboardData {
  user: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  stats: {
    totalOrders: number;
    inTransit: number;
    wishlistCount: number;
  };
  recentOrders: Order[];
  addresses: Address[];
  wishlistPreview: Product[];
  notifications: Notification[];
}
```

## Component Dependencies
- AccountSidebar
- StatCard
- OrderCard
- AddressCard
- ProductCard (mini)
- Avatar
