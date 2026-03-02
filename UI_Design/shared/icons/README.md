# Icon Library

## Overview

UrbanCart uses a custom icon set designed for consistency across the platform. Icons follow the brand's bold, clean aesthetic.

## Icon Style

### Specifications
- **Grid**: 24x24px base
- **Stroke**: 1.5px - 2px
- **Corner radius**: 2px
- **Line cap**: Round
- **Line join**: Round

### Sizing Scale
| Size | Pixels | Usage |
|------|--------|-------|
| xs | 12px | Inline indicators |
| sm | 16px | Dense UI, badges |
| md | 20px | Default UI elements |
| lg | 24px | Navigation, prominent |
| xl | 32px | Feature highlights |
| 2xl | 48px | Empty states, hero |

## Icon Categories

### Navigation
```
┌────────────────────────────────────────┐
│  🏠  Home      🔍  Search              │
│  📦  Orders   👤  Account              │
│  ≡   Menu     ✕   Close                │
│  ←   Back     →   Forward              │
│  ↑   Up       ↓   Down                 │
└────────────────────────────────────────┘
```

### E-commerce
```
┌────────────────────────────────────────┐
│  🛒  Cart         🛍️  Bag              │
│  ♡   Heart        ♥   Heart Filled     │
│  🏷️  Tag          💳  Card             │
│  📦  Package      🚚  Truck            │
│  🎁  Gift         %   Discount         │
└────────────────────────────────────────┘
```

### Actions
```
┌────────────────────────────────────────┐
│  +   Add         −   Remove            │
│  ✓   Check       ✕   Close             │
│  ✎   Edit        🗑️  Delete            │
│  ↻   Refresh     📤  Share             │
│  📋  Copy        📥  Download          │
└────────────────────────────────────────┘
```

### Status
```
┌────────────────────────────────────────┐
│  ✓   Success     ⚠   Warning          │
│  ✕   Error       ℹ   Info              │
│  ●   Active      ○   Inactive          │
│  ⏳  Pending     ✓✓  Verified          │
└────────────────────────────────────────┘
```

### Social
```
┌────────────────────────────────────────┐
│  📷  Instagram   🐦  Twitter           │
│  📘  Facebook    🎥  YouTube           │
│  📱  WhatsApp    ✉️  Email             │
└────────────────────────────────────────┘
```

### Form
```
┌────────────────────────────────────────┐
│  👁️  Show        👁️‍🗨️  Hide             │
│  📅  Calendar    ⏰  Time              │
│  📎  Attachment  📤  Upload            │
│  🔍  Search      ✕   Clear             │
└────────────────────────────────────────┘
```

### User
```
┌────────────────────────────────────────┐
│  👤  User        👥  Users             │
│  ⚙️  Settings    🔔  Notifications     │
│  📍  Location    📞  Phone             │
│  🔒  Locked      🔓  Unlocked          │
└────────────────────────────────────────┘
```

### Product
```
┌────────────────────────────────────────┐
│  👕  Clothing    📏  Size              │
│  🎨  Color       📷  Image             │
│  ⭐  Star        🏷️  Category          │
│  📊  Chart       📦  Inventory         │
└────────────────────────────────────────┘
```

## Implementation

### React Component
```tsx
interface IconProps {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  className?: string;
}

<Icon name="cart" size="lg" />
<Icon name="heart" color="red" />
```

### Icon Names (kebab-case)
```
home, search, cart, user, menu, close,
arrow-left, arrow-right, arrow-up, arrow-down,
heart, heart-filled, share, edit, delete,
check, x, alert-circle, info,
package, truck, credit-card,
plus, minus, refresh, filter, sort,
star, star-filled, eye, eye-off,
...
```

## Icon Source

### Recommended Libraries
1. **Lucide React** - Primary (MIT License)
2. **Heroicons** - Alternative (MIT License)
3. **Custom SVGs** - Brand-specific icons

### Custom Icons
Design custom icons for:
- Logo mark variations
- Category-specific icons
- Brand patterns
- Empty states

## Accessibility

- Always include `aria-label` for interactive icons
- Use `aria-hidden="true"` for decorative icons
- Ensure sufficient contrast (4.5:1 minimum)
- Icons in buttons should have text alternatives
- Test with screen readers

## Do's and Don'ts

### Do
- Use consistent stroke weights
- Align to pixel grid
- Maintain optical balance
- Use icons with text labels when possible
- Keep icons simple and recognizable

### Don't
- Mix filled and outlined styles
- Use overly detailed icons
- Scale icons disproportionately
- Use icons without accessible alternatives
- Add unnecessary decorative elements
