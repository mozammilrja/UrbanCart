# UI Patterns

## Overview

Reusable interaction patterns and compound components used throughout UrbanCart. These patterns ensure consistency in user experience across the platform.

## Data Display Patterns

### Data Grid
```
┌─────────────────────────────────────────────────────────────────┐
│ [Search...        ]  [Filter ▼]  [Sort ▼]    [+ Add New]       │
├────────┬────────────────┬──────────┬──────────┬────────────────┤
│ ☐ ID   │ Name           │ Status   │ Price    │ Actions        │
├────────┼────────────────┼──────────┼──────────┼────────────────┤
│ ☐ 001  │ Product Name   │ ● Active │ ₹2,499   │ [Edit] [···]   │
│ ☐ 002  │ Another Item   │ ○ Draft  │ ₹1,999   │ [Edit] [···]   │
│ ☐ 003  │ Third Product  │ ● Active │ ₹3,499   │ [Edit] [···]   │
├────────┴────────────────┴──────────┴──────────┴────────────────┤
│ Showing 1-10 of 156              [←] [1] [2] [3] ... [16] [→]  │
└─────────────────────────────────────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          📦                                     │
│                                                                 │
│              Your cart is empty                                 │
│     Start shopping and add items to your cart                   │
│                                                                 │
│                    [Start Shopping]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          ⚠️                                     │
│                                                                 │
│              Something went wrong                               │
│     We couldn't load the products. Please try again.            │
│                                                                 │
│                    [Try Again]                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Navigation Patterns

### Breadcrumbs
```
Home  /  Shop  /  T-Shirts  /  Graphic Tees
  ↑       ↑          ↑            ↑
Links   Links      Links      Current (non-clickable)
```

### Tabs
```
┌──────────────────────────────────────────────────────────────────┐
│  [Description]   Reviews (24)   Size Guide   Shipping           │
│  ═══════════                                                     │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Tab content area                                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Pagination
```
[←]  [1]  [2]  [3]  ...  [12]  [→]
      ↑
   Active (filled)
```

### Steps/Progress
```
    ① ─────────── ② ─────────── ③ ─────────── ④
  Cart          Address       Payment        Done
    ✓          (current)      (pending)    (pending)
```

## Filter Patterns

### Filter Sidebar
```
┌────────────────────────┐
│ Filters       [Clear]  │
├────────────────────────┤
│ Category               │
│ ☐ T-Shirts            │
│ ☑ Hoodies             │
│ ☐ Jackets             │
├────────────────────────┤
│ Size                   │
│ [S] [M] [L] [XL]       │
├────────────────────────┤
│ Price Range            │
│ ₹Min  ────●────  ₹Max  │
│ ₹500       ₹5000       │
├────────────────────────┤
│ Color                  │
│ ● ● ○ ● ○ ○ ○          │
├────────────────────────┤
│ [Apply Filters]        │
└────────────────────────┘
```

### Active Filter Tags
```
┌─────────────────────────────────────────────────────────┐
│ Active: [Hoodies ×] [Size: M ×] [₹500-₹2000 ×] [Clear] │
└─────────────────────────────────────────────────────────┘
```

## Form Patterns

### Multi-step Form
```
Step 1 of 3: Personal Information
━━━━━━━━━━━━━━━━━━━━○────────────○

┌──────────────────────────────────┐
│ Full Name *                      │
│ ┌────────────────────────────┐   │
│ │                            │   │
│ └────────────────────────────┘   │
│                                  │
│ Email *                          │
│ ┌────────────────────────────┐   │
│ │                            │   │
│ └────────────────────────────┘   │
│                                  │
│           [Back]    [Continue]   │
└──────────────────────────────────┘
```

### Form Validation
```
Email *
┌────────────────────────────────┐
│ invalid-email                  │  ← Red border
└────────────────────────────────┘
⚠ Please enter a valid email

Password *                           ← Strength indicator
┌────────────────────────────────┐
│ ●●●●●●●●                   👁  │
└────────────────────────────────┘
████████░░░░░░░  Weak
```

### Inline Edit
```
Product Name: Supreme Tee  [✎]
                            ↓
Product Name: ┌─────────────────┐ [✓] [✕]
              │ Supreme Tee     │
              └─────────────────┘
```

## Selection Patterns

### Size Selector
```
Size: [S] [M] [L] [XL] [XXL]
           ↑
      Selected (filled)

Size: [S] [M] [—] [XL] [XXL]
           ↑
    Out of stock (strikethrough)
```

### Color Selector
```
Color: ●  ○  ●  ○  ○
       ↑
   Selected (ring)
```

### Quantity Stepper
```
┌─────────────────────┐
│  [−]    2    [+]    │
└─────────────────────┘
```

## Feedback Patterns

### Loading
```
Page Loading:
┌─────────────────────────────────┐
│      🔄 Loading...              │
└─────────────────────────────────┘

Button Loading:
┌─────────────────────────────────┐
│      ○ Processing...            │
└─────────────────────────────────┘

Skeleton:
┌─────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░                  │
└─────────────────────────────────┘
```

### Success Confirmation
```
      ✓

 Order Placed!
 
 Order #12345 confirmed
 Check your email for details
 
 [View Order]  [Continue Shopping]
```

### Inline Notification
```
┌────────────────────────────────────────────────────────┐
│ ℹ️  Item moved to wishlist                   [Undo]    │
└────────────────────────────────────────────────────────┘
```

## Overlay Patterns

### Slide-over Panel (Cart/Filters)
```
┌────────────────────────┬─────────────────────────────────┐
│                        │                            ✕    │
│                        │  Shopping Cart (3)              │
│     Main Content       ├─────────────────────────────────│
│     (dimmed)           │  ┌──────────────────────────┐   │
│                        │  │ Item 1         ₹2,499    │   │
│                        │  └──────────────────────────┘   │
│                        │  ┌──────────────────────────┐   │
│                        │  │ Item 2         ₹1,999    │   │
│                        │  └──────────────────────────┘   │
│                        ├─────────────────────────────────┤
│                        │  Subtotal        ₹4,498         │
│                        │  [Checkout]                     │
└────────────────────────┴─────────────────────────────────┘
```

### Dropdown Menu
```
        [User Name ▼]
        ┌────────────────────┐
        │ 👤 My Account      │
        │ 📦 Orders          │
        │ ♥  Wishlist        │
        ├────────────────────┤
        │ ⚙ Settings         │
        │ 🚪 Sign Out        │
        └────────────────────┘
```

### Tooltip
```
      ♥
   ┌─────────────────┐
   │ Add to Wishlist │
   └────────┬────────┘
            ▼
```

## E-commerce Patterns

### Product Quick Add
```
┌─────────────────────────────────────────────────────────────┐
│ [Image]  Product Name               ₹2,499                  │
│          Size: [S] [M] [L]          [Add to Cart →]         │
└─────────────────────────────────────────────────────────────┘
```

### Cart Summary
```
┌───────────────────────────────────┐
│ Order Summary                     │
├───────────────────────────────────┤
│ Subtotal (3 items)     ₹7,497    │
│ Shipping               FREE       │
│ Estimated Tax          ₹450       │
├───────────────────────────────────┤
│ Total                  ₹7,947    │
├───────────────────────────────────┤
│ [Proceed to Checkout]             │
└───────────────────────────────────┘
```

### Payment Methods
```
┌───────────────────────────────────┐
│ Payment Method                    │
├───────────────────────────────────┤
│ ◉ UPI                             │
│   ○ Google Pay                    │
│   ○ PhonePe                       │
│   ○ Enter UPI ID                  │
├───────────────────────────────────┤
│ ○ Credit/Debit Card               │
├───────────────────────────────────┤
│ ○ Net Banking                     │
├───────────────────────────────────┤
│ ○ Cash on Delivery                │
└───────────────────────────────────┘
```

## Implementation Notes

Each pattern should be implemented as a reusable component or composition of components. Patterns should:

1. Be keyboard accessible
2. Work on all screen sizes
3. Handle loading/error states
4. Include proper ARIA attributes
5. Match the design tokens
