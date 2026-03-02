# Input Component

## Overview
Text input field for form data entry. Supports various input types, validation states, and accessories.

## Variants

### Default
```
┌─────────────────────────────────────────┐
│ Email address                           │
└─────────────────────────────────────────┘
```
- Border: `colors.border.default` (#E5E5E5)
- Background: `colors.background.primary` (#FFFFFF)
- Placeholder: `colors.text.tertiary` (#737373)

### With Label
```
Email *
┌─────────────────────────────────────────┐
│ john@example.com                        │
└─────────────────────────────────────────┘
```
- Label: `typography.textStyles.body-sm`
- Required indicator: `colors.semantic.error.default`

### With Helper Text
```
Password *
┌─────────────────────────────────────────┐
│ ••••••••                                │
└─────────────────────────────────────────┘
Must be at least 8 characters
```
- Helper: `typography.fontSizes.xs` (#737373)

### With Icon
```
┌──────────────────────────────────────────┐
│ 🔍  Search products...                   │
└──────────────────────────────────────────┘
```
- Icon padding: `spacing.semantic.md`
- Icon color: `colors.text.tertiary`

### With Action Button
```
┌──────────────────────────────────────────┐
│ Enter coupon code              [APPLY]   │
└──────────────────────────────────────────┘
```

## States

### Default
```
┌─────────────────────────────────────────┐
│ Placeholder text                        │
└─────────────────────────────────────────┘
```

### Focus
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
│ Typing here...                          │
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
- Border: `colors.border.focus` (#000000) 2px
- Shadow: `shadows.component.input.focus`

### Error
```
Email *
┌─────────────────────────────────────────┐
│ invalid-email                           │  ← Red border
└─────────────────────────────────────────┘
⚠ Please enter a valid email address
```
- Border: `colors.semantic.error.default`
- Error text: `colors.semantic.error.default`

### Success
```
Email *
┌─────────────────────────────────────────┐
│ john@example.com                     ✓  │  ← Green check
└─────────────────────────────────────────┘
```
- Border: `colors.semantic.success.default`
- Success icon

### Disabled
```
┌─────────────────────────────────────────┐
│ Cannot edit                             │  ← Grayed out
└─────────────────────────────────────────┘
```
- Background: `colors.neutral.100`
- Cursor: not-allowed

## Sizes

### Small (sm)
- Height: 32px
- Padding: 8px 12px
- Font: `typography.fontSizes.sm`

### Medium (md) - Default
- Height: 40px
- Padding: 10px 16px
- Font: `typography.fontSizes.base`

### Large (lg)
- Height: 48px
- Padding: 12px 16px
- Font: `typography.fontSizes.lg`

## Input Types

- `text` - Default text input
- `email` - Email with validation
- `password` - Masked with toggle
- `number` - Numeric with stepper
- `tel` - Phone number
- `search` - Search with clear button
- `url` - URL validation

## Password Input
```
Password *
┌─────────────────────────────────────────┐
│ ••••••••                            👁  │
└─────────────────────────────────────────┘
```
- Toggle icon to show/hide
- Strength indicator (optional)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | InputType | 'text' | Input type |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Input size |
| label | string | - | Label text |
| placeholder | string | - | Placeholder text |
| helperText | string | - | Helper/description |
| error | string | - | Error message |
| isRequired | boolean | false | Show required indicator |
| isDisabled | boolean | false | Disable input |
| leftIcon | ReactNode | - | Left icon |
| rightIcon | ReactNode | - | Right icon/action |

## Accessibility

- Always associate `<label>` with input via `htmlFor`
- Use `aria-describedby` for helper/error text
- Use `aria-invalid="true"` for error state
- Use `aria-required="true"` for required fields
- Ensure error messages are announced
- Maintain visible focus indicator

## Usage Examples

### Email Input
```tsx
<Input
  type="email"
  label="Email"
  placeholder="you@example.com"
  isRequired
  error={errors.email?.message}
/>
```

### Search Input
```tsx
<Input
  type="search"
  placeholder="Search products..."
  leftIcon={<SearchIcon />}
  size="lg"
/>
```
