# Card Component

## Overview
Container component for grouping related content. Foundation for product cards, content sections, and data display.

## Variants

### Product Card
```
┌──────────────────────────────────┐
│ ┌──────────────────────────────┐ │
│ │                              │ │
│ │                              │ │
│ │       PRODUCT IMAGE          │ │
│ │                              │ │
│ │                              │ │
│ │  [QUICK VIEW]                │ │ ← Hover overlay
│ └──────────────────────────────┘ │
│                            ♡     │ ← Wishlist
│ BRAND NAME                       │
│ Product Title Here               │
│ ★★★★☆ (24)                       │
│ ₹2,499  ₹3,999  37% off          │
└──────────────────────────────────┘
```

### Collection Card
```
┌──────────────────────────────────────────────────┐
│                                                  │
│                                                  │
│           WINTER COLLECTION                      │
│           Explore the latest drops               │
│                                                  │
│              [SHOP NOW →]                        │
│                                                  │
└──────────────────────────────────────────────────┘
```
- Full-width background image
- Overlay gradient for text readability

### Content Card
```
┌──────────────────────────────────┐
│                                  │
│  Card Title                      │
│                                  │
│  Card content goes here with    │
│  supporting text and details.    │
│                                  │
│                  [Action]        │
│                                  │
└──────────────────────────────────┘
```

### Stats Card (Admin)
```
┌──────────────────────────────────┐
│  📊  Total Revenue               │
│                                  │
│      ₹45,678                     │
│      ↑ 12% from last month       │
│                                  │
└──────────────────────────────────┘
```

### Image Card
```
┌──────────────────────────────────┐
│ ┌──────────────────────────────┐ │
│ │                              │ │
│ │                              │ │
│ │         IMAGE                │ │
│ │                              │ │
│ │                              │ │
│ └──────────────────────────────┘ │
│                                  │
│ Title                            │
│ Description text here            │
│                                  │
└──────────────────────────────────┘
```

## States

### Default
```
┌──────────────────────────────────┐
│                                  │
│          CONTENT                 │
│                                  │
└──────────────────────────────────┘
```
- Shadow: `shadows.component.card.default`
- Border: none or subtle

### Hover (Interactive)
```
┌══════════════════════════════════┐
│                                  │
│          CONTENT                 │  ← Elevated
│                                  │
└══════════════════════════════════┘
```
- Shadow: `shadows.component.card.hover`
- Transform: translateY(-2px)
- Transition: 200ms ease-out

### Selected/Active
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
│                                  │  ← Border highlight
│          CONTENT                 │
│                                  │
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
- Border: `colors.brand.primary` 2px

### Disabled
```
┌──────────────────────────────────┐
│                                  │
│          CONTENT                 │  ← Grayed
│                                  │
└──────────────────────────────────┘
```
- Opacity: 0.5
- No hover effects

## Anatomy

### Product Card Anatomy
```
┌──────────────────────────────────┐
│         IMAGE CONTAINER          │ ← Aspect ratio: 4:5 or 1:1
│  ┌───┐                     ┌───┐ │
│  │NEW│                     │ ♡ │ │ ← Badges & Actions
│  └───┘                     └───┘ │
│         [QUICK VIEW]             │ ← Hover CTA
├──────────────────────────────────┤
│  BODY                            │
│  Brand Name                      │ ← Overline style
│  Product Title                   │ ← Body text
│  ★★★★☆ (24)                      │ ← Rating
│  ₹2,499  ₹3,999  37% off         │ ← Pricing
└──────────────────────────────────┘
```

## Spacing

- Padding: `spacing.component.card.padding` (1.5rem)
- Gap between elements: `spacing.component.card.gap` (1rem)
- Border radius: 8px (0.5rem)

## Product Card Badges

### Position
```
┌──────────────────────────────────┐
│ [NEW] [SALE]               [♡]  │
│ └─Top Left─┘            └Top Right
```

### Badge Types
```
[NEW]     ← Black bg, white text
[SALE]    ← Accent orange bg
[-30%]    ← Discount percentage
[SOLD OUT] ← Gray bg, disabled
[LIMITED] ← Black bg, shows scarcity
```

## Price Display

### Regular Price
```
₹2,499
```

### Sale Price
```
₹2,499  ₹3,999  37% off
  ↑        ↑       ↑
Current  Original  Discount
(bold)  (strikethrough)  (accent)
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'elevated' \| 'outlined' | 'default' | Visual style |
| isInteractive | boolean | false | Enable hover effects |
| isSelected | boolean | false | Show selected state |
| isDisabled | boolean | false | Disable interactions |
| padding | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | Internal padding |
| onClick | () => void | - | Click handler |
| as | ElementType | 'div' | Render element |

## Product Card Props

| Prop | Type | Description |
|------|------|-------------|
| product | Product | Product data |
| showRating | boolean | Show rating stars |
| showWishlist | boolean | Show wishlist button |
| showQuickView | boolean | Show quick view on hover |
| aspectRatio | '1:1' \| '4:5' \| '3:4' | Image aspect ratio |
| onAddToWishlist | () => void | Wishlist handler |
| onQuickView | () => void | Quick view handler |

## Accessibility

- Use semantic elements (`<article>` for products)
- Ensure interactive cards are keyboard accessible
- Include `aria-label` for icon buttons
- Use `alt` text for images
- Focus visible state matching hover

## Usage Examples

### Product Card
```tsx
<ProductCard
  product={product}
  showRating
  showWishlist
  showQuickView
  onAddToWishlist={() => addToWishlist(product.id)}
  onQuickView={() => openQuickView(product)}
/>
```

### Content Card
```tsx
<Card variant="elevated" padding="lg">
  <CardHeader>
    <CardTitle>Featured Collection</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Discover our latest streetwear drops</p>
  </CardContent>
  <CardFooter>
    <Button>Shop Now</Button>
  </CardFooter>
</Card>
```
