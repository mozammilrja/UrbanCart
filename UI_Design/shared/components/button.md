# Button Component

## Overview
Primary interactive element for user actions. Supports multiple variants, sizes, and states.

## Variants

### Primary (Default)
```
┌─────────────────────────┐
│    ADD TO CART          │  ← Black bg, white text
└─────────────────────────┘
```
- Background: `colors.brand.primary` (#000000)
- Text: `colors.text.inverse` (#FFFFFF)
- Hover: Slight opacity reduction (95%)

### Secondary
```
┌─────────────────────────┐
│    VIEW DETAILS         │  ← White bg, black border
└─────────────────────────┘
```
- Background: `colors.background.primary` (#FFFFFF)
- Border: `colors.border.default` (#E5E5E5)
- Text: `colors.text.primary` (#171717)
- Hover: Background `colors.neutral.50`

### Ghost
```
     VIEW ALL →              ← No border, text only
```
- Background: transparent
- Text: `colors.text.primary`
- Hover: Underline

### Danger
```
┌─────────────────────────┐
│    DELETE               │  ← Red bg for destructive
└─────────────────────────┘
```
- Background: `colors.semantic.error.default`
- Text: white

### Accent
```
┌─────────────────────────┐
│    BUY NOW              │  ← Orange accent
└─────────────────────────┘
```
- Background: `colors.brand.accent` (#FF6B35)
- Text: white

## Sizes

### Small (sm)
- Height: 32px
- Padding: `spacing.component.button.paddingY.sm` x `spacing.component.button.paddingX.sm`
- Font: `typography.fontSizes.sm` (0.875rem)

### Medium (md) - Default
- Height: 40px
- Padding: `spacing.component.button.paddingY.md` x `spacing.component.button.paddingX.md`
- Font: `typography.fontSizes.base` (1rem)

### Large (lg)
- Height: 48px
- Padding: `spacing.component.button.paddingY.lg` x `spacing.component.button.paddingX.lg`
- Font: `typography.fontSizes.lg` (1.125rem)

## States

### Default
```
┌─────────────────────────┐
│    BUTTON TEXT          │
└─────────────────────────┘
```

### Hover
```
┌═════════════════════════┐
│    BUTTON TEXT          │  ← Shadow + slight lift
└═════════════════════════┘
```
- Shadow: `shadows.component.button.hover`
- Transform: translateY(-1px)

### Active/Pressed
```
┌─────────────────────────┐
│    BUTTON TEXT          │  ← Pressed in
└─────────────────────────┘
```
- Transform: translateY(0)
- Opacity: 0.9

### Disabled
```
┌─────────────────────────┐
│    BUTTON TEXT          │  ← Grayed out
└─────────────────────────┘
```
- Opacity: 0.5
- Cursor: not-allowed
- No hover effects

### Loading
```
┌─────────────────────────┐
│    ○ Loading...         │  ← Spinner + text
└─────────────────────────┘
```
- Show spinner icon
- Disabled interaction
- Optional loading text

## Anatomy

```
┌──────────────────────────────────────┐
│  [Icon]   Button Label   [Icon]      │
│  (start)    (center)     (end)       │
└──────────────────────────────────────┘
     ↑           ↑           ↑
  Optional    Required    Optional
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'accent' | 'primary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| isLoading | boolean | false | Show loading state |
| loadingText | string | - | Text while loading |
| leftIcon | ReactNode | - | Icon before label |
| rightIcon | ReactNode | - | Icon after label |
| isDisabled | boolean | false | Disable interaction |
| fullWidth | boolean | false | Full container width |

## Accessibility

- Use `<button>` element (not div/span)
- Include `aria-label` for icon-only buttons
- `aria-busy="true"` when loading
- `aria-disabled="true"` when disabled
- Minimum touch target: 44x44px
- Focus ring: `shadows.focus.ring`

## Usage Examples

### Add to Cart
```tsx
<Button variant="primary" size="lg" leftIcon={<CartIcon />}>
  Add to Cart
</Button>
```

### View Product
```tsx
<Button variant="secondary" rightIcon={<ArrowRight />}>
  View Details
</Button>
```

### Delete Item
```tsx
<Button variant="danger" size="sm" leftIcon={<TrashIcon />}>
  Remove
</Button>
```
