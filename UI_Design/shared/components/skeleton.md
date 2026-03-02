# Skeleton Component

## Overview
Placeholder loading states that indicate content structure while data is being fetched. Improves perceived performance and reduces layout shift.

## Variants

### Text Skeleton
```
████████████████████████████████  ← Full line
████████████████████              ← Partial line
████████████                      ← Short line
```
- Height: Matches font size
- Border radius: 4px
- Animation: shimmer

### Image Skeleton
```
┌──────────────────────────────────┐
│                                  │
│                                  │
│              ░░░░                │
│                                  │
│                                  │
└──────────────────────────────────┘
```
- Aspect ratio preserved
- Border radius: matches image

### Avatar Skeleton
```
  ┌───┐
  │ ○ │
  └───┘
```
- Circle shape
- Common sizes: 32px, 40px, 48px

### Card Skeleton
```
┌──────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├──────────────────────────────────┤
│ ████████████████                 │
│ ████████████████████████████     │
│ ██████████                       │
└──────────────────────────────────┘
```

### Button Skeleton
```
┌──────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░ │
└──────────────────────┘
```
- Match exact button dimensions

## Animation

### Shimmer Effect
```
Direction: Left → Right
Duration: 2s
Timing: linear
Iteration: infinite

Background:
  linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  )
  background-size: 200% 100%
```

### Pulse Effect (Alternative)
```
Opacity: 1 → 0.5 → 1
Duration: 2s
Timing: ease-in-out
Iteration: infinite
```

## Product Card Skeleton
```
┌──────────────────────────────────┐
│ ┌──────────────────────────────┐ │
│ │                              │ │
│ │                              │ │
│ │           ░░░░░░░            │ │  ← Image
│ │                              │ │
│ │                              │ │
│ └──────────────────────────────┘ │
│                                  │
│ ████████████                     │  ← Brand
│ ████████████████████████         │  ← Title
│ ██████████                       │  ← Price
└──────────────────────────────────┘
```

## Product Grid Skeleton
```
┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│   ░░░░░    │  │   ░░░░░    │  │   ░░░░░    │  │   ░░░░░    │
│   ░░░░░    │  │   ░░░░░    │  │   ░░░░░    │  │   ░░░░░    │
│ ██████     │  │ ██████     │  │ ██████     │  │ ██████     │
│ ████████   │  │ ████████   │  │ ████████   │  │ ████████   │
│ ████       │  │ ████       │  │ ████       │  │ ████       │
└────────────┘  └────────────┘  └────────────┘  └────────────┘
```

## Table Skeleton
```
┌────────┬────────────────┬──────────┬──────────┐
│ ██████ │ ████████████   │ ████████ │ ████     │
├────────┼────────────────┼──────────┼──────────┤
│ ░░░░░░ │ ░░░░░░░░░░░░░░ │ ░░░░░░░░ │ ░░░░     │
├────────┼────────────────┼──────────┼──────────┤
│ ░░░░░░ │ ░░░░░░░░░░░░░░ │ ░░░░░░░░ │ ░░░░     │
├────────┼────────────────┼──────────┼──────────┤
│ ░░░░░░ │ ░░░░░░░░░░░░░░ │ ░░░░░░░░ │ ░░░░     │
└────────┴────────────────┴──────────┴──────────┘
```

## Form Skeleton
```
████████████
┌────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────┘

████████
┌────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└────────────────────────────────────────┘

┌────────────────────┐
│ ░░░░░░░░░░░░░░░░░░ │
└────────────────────┘
```

## Styling

### Base Skeleton
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e8e8e8 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: pulse 2s infinite;
  }
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'text' \| 'circular' \| 'rectangular' | 'text' | Shape variant |
| width | string \| number | '100%' | Element width |
| height | string \| number | '1em' | Element height |
| animation | 'shimmer' \| 'pulse' \| 'none' | 'shimmer' | Animation type |
| count | number | 1 | Number of elements |
| className | string | - | Additional classes |

## Compound Components

### SkeletonText
```tsx
<SkeletonText lines={3} />
```
Renders multiple lines with varied widths

### SkeletonAvatar
```tsx
<SkeletonAvatar size="md" />
```
Circular skeleton for avatars

### SkeletonImage
```tsx
<SkeletonImage aspectRatio="4:5" />
```
Maintains aspect ratio

## Usage Patterns

### With Suspense
```tsx
<Suspense fallback={<ProductGridSkeleton />}>
  <ProductGrid />
</Suspense>
```

### Conditional Loading
```tsx
{isLoading ? (
  <ProductCardSkeleton />
) : (
  <ProductCard product={product} />
)}
```

### TanStack Query
```tsx
const { data, isLoading } = useProducts();

if (isLoading) {
  return <ProductGridSkeleton count={8} />;
}
```

## Accessibility

- Use `aria-busy="true"` on loading container
- Use `aria-hidden="true"` on skeleton elements
- Provide `aria-label` describing loading state
- Ensure skeletons match final content dimensions
- Respect `prefers-reduced-motion`

## Usage Examples

### Product Card Skeleton
```tsx
export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="rectangular" height={300} />
      <Skeleton width="40%" />
      <Skeleton width="80%" />
      <Skeleton width="30%" />
    </div>
  );
}
```

### Product Grid Skeleton
```tsx
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
```
