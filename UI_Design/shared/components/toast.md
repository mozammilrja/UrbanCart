# Toast Component

## Overview
Non-blocking notification messages for feedback, alerts, and status updates. Auto-dismissible with optional actions.

## Variants

### Success
```
┌────────────────────────────────────────────────────┐
│  ✓  Item added to cart                        ✕   │
└────────────────────────────────────────────────────┘
```
- Left border/icon: `colors.semantic.success.default` (#10B981)
- Background: White
- Icon: Checkmark

### Error
```
┌────────────────────────────────────────────────────┐
│  ✕  Payment failed. Please try again.         ✕   │
└────────────────────────────────────────────────────┘
```
- Left border/icon: `colors.semantic.error.default` (#EF4444)
- Icon: X circle

### Warning
```
┌────────────────────────────────────────────────────┐
│  ⚠  Only 2 items left in stock                ✕   │
└────────────────────────────────────────────────────┘
```
- Left border/icon: `colors.semantic.warning.default` (#F59E0B)
- Icon: Warning triangle

### Info
```
┌────────────────────────────────────────────────────┐
│  ℹ  Free shipping on orders above ₹999        ✕   │
└────────────────────────────────────────────────────┘
```
- Left border/icon: `colors.semantic.info.default` (#3B82F6)
- Icon: Info circle

### With Action
```
┌────────────────────────────────────────────────────┐
│  ✓  Item added to cart             [VIEW CART] ✕  │
└────────────────────────────────────────────────────┘
```
- Action button: Ghost style
- Right-aligned action

### With Description
```
┌────────────────────────────────────────────────────┐
│  ✓  Order placed successfully                 ✕   │
│     Your order #12345 will be delivered by        │
│     March 15, 2024                                │
└────────────────────────────────────────────────────┘
```
- Title: `typography.textStyles.body` bold
- Description: `typography.textStyles.body-sm`

## Position

### Top Right (Default)
```
┌─────────────────────────────────────────────────────┐
│                                          ┌─Toast─┐  │
│                                          │       │  │
│                                          └───────┘  │
│                                          ┌─Toast─┐  │
│           PAGE CONTENT                   │       │  │
│                                          └───────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Top Center
```
┌─────────────────────────────────────────────────────┐
│              ┌─────────Toast─────────┐              │
│              └───────────────────────┘              │
│                                                     │
│               PAGE CONTENT                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Bottom Center
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│               PAGE CONTENT                          │
│                                                     │
│              ┌─────────Toast─────────┐              │
│              └───────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

## Anatomy

```
┌────────────────────────────────────────────────────┐
│ █ │ [Icon]  Title              [Action]  [Close]  │
│   │         Description (optional)                │
└────────────────────────────────────────────────────┘
  ↑      ↑         ↑                 ↑        ↑
Color  Icon    Content           Action   Dismiss
Stripe                           Button   Button
```

## Animation

### Enter (slideInRight)
```
From: translateX(100%), opacity: 0
To: translateX(0), opacity: 1
Duration: 300ms
Easing: ease-out
```

### Exit (slideOutRight)
```
From: translateX(0), opacity: 1
To: translateX(100%), opacity: 0
Duration: 200ms
Easing: ease-in
```

### Progress Bar (optional)
```
┌────────────────────────────────────────────────────┐
│  ✓  Item added to cart                        ✕   │
│ ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────────────────┘
```
- Shows remaining time before auto-dismiss
- Pauses on hover

## Stacking

```
┌─Toast 3 (newest)─┐  ← Most recent on top
├─────────────────┤
│                 │
└─────────────────┘
┌─Toast 2─────────┐
│                 │
└─────────────────┘
┌─Toast 1 (oldest)─┐
│                 │
└─────────────────┘
```
- Max visible: 3-5 toasts
- Gap between: 8px
- Older toasts pushed down (or up for bottom position)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'success' \| 'error' \| 'warning' \| 'info' | 'info' | Toast type |
| title | string | - | Main message |
| description | string | - | Additional details |
| duration | number | 5000 | Auto-dismiss time (ms) |
| isClosable | boolean | true | Show close button |
| action | { label, onClick } | - | Action button |
| position | Position | 'top-right' | Screen position |
| id | string | auto | Unique identifier |

## Toast Manager API

```ts
// Show toast
toast.success('Item added to cart');
toast.error('Payment failed');
toast.warning('Low stock');
toast.info('Free shipping available');

// With options
toast.success({
  title: 'Order placed',
  description: 'Order #12345 confirmed',
  duration: 7000,
  action: {
    label: 'View Order',
    onClick: () => navigate('/orders/12345'),
  },
});

// Dismiss
toast.dismiss(toastId);
toast.dismissAll();

// Promise toast
toast.promise(submitOrder(), {
  loading: 'Processing order...',
  success: 'Order placed successfully!',
  error: 'Failed to place order',
});
```

## Accessibility

- Use `role="alert"` for important messages
- Use `role="status"` for non-critical
- Use `aria-live="polite"` or `aria-live="assertive"`
- Ensure close button is keyboard accessible
- Don't auto-dismiss errors (user needs time)
- Provide sufficient contrast
- z-index: `z-index.toast` (80)

## Usage Examples

### Basic Success
```tsx
toast.success('Item added to cart');
```

### With Action
```tsx
toast.success({
  title: 'Item added to cart',
  action: {
    label: 'View Cart',
    onClick: () => navigate('/cart'),
  },
});
```

### Error with Persistence
```tsx
toast.error({
  title: 'Payment failed',
  description: 'Your card was declined. Please try another.',
  duration: Infinity, // Don't auto-dismiss
});
```
