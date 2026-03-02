# Modal Component

## Overview
Overlay dialog for focused interactions, confirmations, and forms. Blocks interaction with background content.

## Variants

### Default Modal
```
┌──────────────────────────────────────────────┐
│  Modal Title                            ✕    │
├──────────────────────────────────────────────┤
│                                              │
│  Modal content goes here. This can include   │
│  text, forms, images, or other components.   │
│                                              │
├──────────────────────────────────────────────┤
│                        [Cancel] [Confirm]    │
└──────────────────────────────────────────────┘
```

### Alert/Confirmation
```
┌──────────────────────────────────────────────┐
│                                         ✕    │
│               ⚠️                             │
│                                              │
│       Are you sure you want to               │
│       remove this item?                      │
│                                              │
│       This action cannot be undone.          │
│                                              │
│        [Cancel]        [Remove]              │
└──────────────────────────────────────────────┘
```
- Centered icon
- Centered text
- Destructive action highlighting

### Quick View (Product)
```
┌──────────────────────────────────────────────────────────────┐
│                                                         ✕    │
│  ┌─────────────────┐   SUPREME OVERSIZED TEE               │
│  │                 │   ★★★★☆ (128 reviews)                 │
│  │   [Product      │                                        │
│  │    Image]       │   ₹2,499                              │
│  │                 │                                        │
│  │                 │   Size: [S] [M] [L] [XL]               │
│  └─────────────────┘   Color: ● ○ ○                        │
│                                                              │
│                        [Add to Cart] [View Full Details]    │
└──────────────────────────────────────────────────────────────┘
```

### Form Modal
```
┌──────────────────────────────────────────────┐
│  Add New Address                        ✕    │
├──────────────────────────────────────────────┤
│                                              │
│  Full Name *                                 │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Phone Number *                              │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Address *                                   │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
├──────────────────────────────────────────────┤
│                          [Cancel] [Save]     │
└──────────────────────────────────────────────┘
```

## Sizes

### Small (sm)
- Max width: 400px
- Use for: Confirmations, alerts

### Medium (md) - Default
- Max width: 500px
- Use for: Forms, content

### Large (lg)
- Max width: 700px
- Use for: Complex forms, quick view

### Full (full)
- Max width: 90vw
- Max height: 90vh
- Use for: Image gallery, detailed content

## Anatomy

```
┌──────────────────────────────────────────────┐
│  HEADER                                 ✕    │  ← Sticky
├──────────────────────────────────────────────┤
│                                              │
│  BODY (scrollable if needed)                 │  ← Scrollable
│                                              │
├──────────────────────────────────────────────┤
│  FOOTER                                      │  ← Sticky
└──────────────────────────────────────────────┘
          ↑
    BACKDROP (dark overlay)
```

## States

### Opening Animation
```
Backdrop: fadeIn 200ms
Modal: scaleIn 200ms (scale 0.95 → 1, opacity 0 → 1)
```

### Closing Animation
```
Modal: scaleOut 150ms
Backdrop: fadeOut 150ms
```

## Backdrop
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ┃
┃ ░░░░░░░░░░┌────────────────┐░░░░░░░░░░░░░░ ┃
┃ ░░░░░░░░░░│     MODAL      │░░░░░░░░░░░░░░ ┃
┃ ░░░░░░░░░░└────────────────┘░░░░░░░░░░░░░░ ┃
┃ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
- Color: rgba(0, 0, 0, 0.5)
- Click to close (configurable)
- z-index: `z-index.modal-backdrop`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | false | Modal visibility |
| onClose | () => void | - | Close handler |
| title | string \| ReactNode | - | Header title |
| size | 'sm' \| 'md' \| 'lg' \| 'full' | 'md' | Modal size |
| closeOnBackdrop | boolean | true | Close on backdrop click |
| closeOnEscape | boolean | true | Close on Escape key |
| showCloseButton | boolean | true | Show X button |
| footer | ReactNode | - | Footer content |
| initialFocus | RefObject | - | Initial focus element |

## Accessibility

- Use `role="dialog"` and `aria-modal="true"`
- Set `aria-labelledby` to header
- Set `aria-describedby` to content
- Trap focus within modal
- Return focus to trigger on close
- Close on Escape key
- Prevent body scroll when open
- z-index: `z-index.modal` (60)

## Focus Management

1. On open: Focus first focusable element (or initialFocus)
2. Tab cycles through modal elements only
3. On close: Return focus to trigger element

## Usage Examples

### Confirmation Modal
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Delete"
  size="sm"
  footer={
    <>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm}>Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

### Quick View
```tsx
<Modal
  isOpen={showQuickView}
  onClose={() => setShowQuickView(false)}
  size="lg"
>
  <ProductQuickView product={selectedProduct} />
</Modal>
```
