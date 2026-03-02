# T-CLIENT-007: Cart Page

## Page Overview
Shopping cart displaying selected items with quantity controls, pricing summary, and checkout initiation.

## Wireframe

### Desktop (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              HEADER (sticky)                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Home / Shopping Cart                                                           │
│                                                                                 │
│  SHOPPING CART (3 items)                                                        │
│  ═══════════════════════                                                        │
│                                                                                 │
├─────────────────────────────────────────────────────────────┬───────────────────┤
│                                                             │                   │
│  ┌─────────────────────────────────────────────────────────┐│  ORDER SUMMARY    │
│  │ ┌──────┐                                                ││  ───────────────  │
│  │ │      │  Supreme Oversized Tee                    ✕    ││                   │
│  │ │[IMG] │  Black • Size M                                ││  Subtotal (3)     │
│  │ │      │  SKU: UC-TSH-001-BLK                           ││  ₹7,497           │
│  │ └──────┘                                                ││                   │
│  │           ₹2,499                                        ││  Shipping         │
│  │                                                         ││  Calculated at    │
│  │           Qty: [−]  2  [+]         Total: ₹4,998       ││  checkout         │
│  │                                                         ││                   │
│  │  [♡ Move to Wishlist]                                   ││  ─────────────    │
│  │                                                         ││                   │
│  └─────────────────────────────────────────────────────────┘│  Estimated Total  │
│                                                             │  ₹7,497           │
│  ┌─────────────────────────────────────────────────────────┐│                   │
│  │ ┌──────┐                                                ││  ─────────────    │
│  │ │      │  Urban Graphic Hoodie                     ✕    ││                   │
│  │ │[IMG] │  Navy • Size L                                 ││  COUPON CODE      │
│  │ │      │  SKU: UC-HOD-002-NAV                           ││  ┌─────────────┐  │
│  │ └──────┘                                                ││  │ Enter code  │  │
│  │           ₹3,499                                        ││  └─────────────┘  │
│  │                                                         ││  [APPLY]          │
│  │           Qty: [−]  1  [+]         Total: ₹3,499       ││                   │
│  │                                                         ││  ─────────────    │
│  │  [♡ Move to Wishlist]                                   ││                   │
│  │                                                         ││ ┌───────────────┐ │
│  └─────────────────────────────────────────────────────────┘│ │   CHECKOUT    │ │
│                                                             │ └───────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐│                   │
│  │ ┌──────┐                                                ││  Secure checkout  │
│  │ │[OUT  │  Premium Basic Tee                        ✕    ││  🔒 SSL secured   │
│  │ │ OF   │  White • Size M                                ││                   │
│  │ │STOCK]│  ⚠ Currently unavailable                       ││  ─────────────    │
│  │ └──────┘                                                ││                   │
│  │           ₹1,999  (removed from total)                  ││  WE ACCEPT        │
│  │                                                         ││  💳 💳 💳 📱      │
│  │  [♡ Move to Wishlist]  [Notify When Available]          ││  Visa MC UPI GPay │
│  │                                                         ││                   │
│  └─────────────────────────────────────────────────────────┘│  ─────────────    │
│                                                             │                   │
│  ┌─────────────────────────────────────────────────────────┐│  🚚 Free shipping │
│  │                                                         ││     on ₹999+      │
│  │  Have a coupon? Enter code above to apply discount.     ││                   │
│  │                                                         ││  🔄 30-day        │
│  │  ─────────────────────────────────────────────────────  ││     returns       │
│  │                                                         ││                   │
│  │  Need help? [Contact Support]                           ││  ✓ 100% Authentic │
│  │                                                         ││                   │
│  └─────────────────────────────────────────────────────────┘│                   │
│                                                             │                   │
├─────────────────────────────────────────────────────────────┴───────────────────┤
│                                                                                 │
│  YOU MAY ALSO LIKE                                                              │
│  ─────────────────                                                              │
│                                                                                 │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│  │   [PRODUCT]    │ │   [PRODUCT]    │ │   [PRODUCT]    │ │   [PRODUCT]    │   │
│  │ Cross-sell 1   │ │ Cross-sell 2   │ │ Cross-sell 3   │ │ Cross-sell 4   │   │
│  │ ₹1,999         │ │ ₹2,499         │ │ ₹3,499         │ │ ₹1,499         │   │
│  │ [+ Add]        │ │ [+ Add]        │ │ [+ Add]        │ │ [+ Add]        │   │
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘   │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                              FOOTER                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────────────────┐
│ ← Cart (3)          🛒      │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ ┌─────┐ Supreme Tee   ✕ │ │
│ │ │[IMG]│ Black • M       │ │
│ │ └─────┘                 │ │
│ │ ₹2,499                   │ │
│ │ [−] 2 [+]  Total: ₹4,998│ │
│ │ [♡ Save for later]      │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ ┌─────┐ Urban Hoodie  ✕ │ │
│ │ │[IMG]│ Navy • L        │ │
│ │ └─────┘                 │ │
│ │ ₹3,499                   │ │
│ │ [−] 1 [+]  Total: ₹3,499│ │
│ │ [♡ Save for later]      │ │
│ └─────────────────────────┘ │
│                             │
│ ⚠ 1 item unavailable       │
│ [View unavailable items]    │
│                             │
├─────────────────────────────┤
│ COUPON CODE                 │
│ ┌─────────────────┐ [APPLY] │
│ │ Enter code      │         │
│ └─────────────────┘         │
├─────────────────────────────┤
│ CROSS-SELL PRODUCTS         │
│ ← [Product] [Product] →    │
├─────────────────────────────┤
│                             │
├─────────────────────────────┤ ← Sticky
│ Subtotal: ₹7,497           │
│ ┌─────────────────────────┐ │
│ │      CHECKOUT            │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## Cart Item States

### In Stock
```
┌──────────────────────────────────────────────────────┐
│ ┌──────┐ Product Name                            ✕   │
│ │      │ Color • Size                                │
│ │[IMG] │ ₹2,499                                      │
│ │      │                                             │
│ └──────┘ Qty: [−] 2 [+]           Total: ₹4,998     │
│                                                      │
│ [♡ Move to Wishlist]                                │
└──────────────────────────────────────────────────────┘
```

### Out of Stock
```
┌──────────────────────────────────────────────────────┐
│ ┌──────┐ Product Name                            ✕   │
│ │[OUT  │ Color • Size                                │
│ │ OF   │ ₹1,999  ⚠ Currently unavailable            │
│ │STOCK]│                                             │
│ └──────┘ (removed from total)                        │
│                                                      │
│ [♡ Move to Wishlist]  [🔔 Notify When Available]    │
└──────────────────────────────────────────────────────┘
```

### Low Stock Warning
```
┌──────────────────────────────────────────────────────┐
│ ┌──────┐ Product Name                            ✕   │
│ │      │ Color • Size                                │
│ │[IMG] │ ₹2,499                                      │
│ │      │ ⚠ Only 2 left in stock!                    │
│ └──────┘ Qty: [−] 1 [+]           Total: ₹2,499     │
│                                                      │
│ [♡ Move to Wishlist]                                │
└──────────────────────────────────────────────────────┘
```

## Order Summary

### Before Coupon
```
┌─────────────────────────────┐
│ ORDER SUMMARY               │
├─────────────────────────────┤
│ Subtotal (3 items)  ₹7,497  │
│ Shipping           Calculate│
│ ────────────────────────────│
│ Estimated Total     ₹7,497  │
└─────────────────────────────┘
```

### With Coupon Applied
```
┌─────────────────────────────┐
│ ORDER SUMMARY               │
├─────────────────────────────┤
│ Subtotal (3 items)  ₹7,497  │
│ Discount (SAVE20)   -₹1,499 │ ← Green text
│ Shipping            FREE    │
│ ────────────────────────────│
│ Estimated Total     ₹5,998  │
│                             │
│ 🎉 You're saving ₹1,499!    │
└─────────────────────────────┘
```

### Coupon States
```
Applied:
┌─────────────────────────────┐
│ SAVE20                   ✕  │ ← Removable tag
│ 20% off applied             │
└─────────────────────────────┘

Invalid:
┌─────────────────────────────┐
│ ⚠ Invalid coupon code       │
└─────────────────────────────┘

Expired:
┌─────────────────────────────┐
│ ⚠ This coupon has expired   │
└─────────────────────────────┘

Min not met:
┌─────────────────────────────┐
│ ⚠ Add ₹503 more to use      │
│   this coupon               │
└─────────────────────────────┘
```

## Empty Cart State
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                   🛒                                            │
│                                                                                 │
│                          Your cart is empty                                     │
│                                                                                 │
│                 Looks like you haven't added anything yet.                      │
│                                                                                 │
│                          [START SHOPPING]                                       │
│                                                                                 │
│  ───────────────────────────────────────────────────────────────────────────── │
│                                                                                 │
│                          SAVED FOR LATER (2)                                    │
│                                                                                 │
│  ┌────────────────┐ ┌────────────────┐                                         │
│  │   [WISHLIST    │ │   [WISHLIST    │                                         │
│  │    ITEM 1]     │ │    ITEM 2]     │                                         │
│  │ [+ Add to Cart]│ │ [+ Add to Cart]│                                         │
│  └────────────────┘ └────────────────┘                                         │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Interactions

### Quantity Update
- Increment/decrement buttons
- Max limit per product (e.g., 10)
- Debounce API calls (500ms)
- Loading state while updating
- Optimistic UI update

### Remove Item
- Confirm modal for higher-value items
- Undo toast notification
- Animate item removal

### Move to Wishlist
- Transfer item to wishlist
- Remove from cart
- Show confirmation toast

## Data Requirements
```typescript
interface CartPageData {
  items: CartItem[];
  summary: {
    subtotal: number;
    discount: number;
    shipping: number | null;
    tax: number | null;
    total: number;
  };
  appliedCoupon: Coupon | null;
  crossSellProducts: Product[];
  savedForLater: WishlistItem[];
}

interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  price: number;
  lineTotal: number;
  isAvailable: boolean;
  stockLevel: number;
}
```

## Cart Persistence
- Store in localStorage for guests
- Sync with server for logged-in users
- Merge carts on login
- Persist for 30 days

## Component Dependencies
- CartItem
- CartSummary
- CouponInput
- QuantitySelector
- CrossSellCarousel
- EmptyCart
