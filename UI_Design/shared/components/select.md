# Select Component

## Overview
Dropdown selection component for choosing from a list of options. Supports single and multi-select modes.

## Variants

### Native Select
```
Size
┌─────────────────────────────────────▼┐
│ Choose size                          │
└──────────────────────────────────────┘
```
- Uses native `<select>` element
- Better for mobile devices
- Limited styling options

### Custom Select (Dropdown)
```
Size *
┌─────────────────────────────────────▼┐
│ Medium                               │
├──────────────────────────────────────┤
│ ○ Small                              │
│ ● Medium                        ✓    │
│ ○ Large                              │
│ ○ X-Large                            │
└──────────────────────────────────────┘
```
- Custom styling
- Keyboard navigation
- Search/filter support

### Multi-Select
```
Colors *
┌──────────────────────────────────────┐
│ [Black ×] [Navy ×]              ▼    │
├──────────────────────────────────────┤
│ ☑ Black                              │
│ ☑ Navy                               │
│ ☐ White                              │
│ ☐ Grey                               │
└──────────────────────────────────────┘
```
- Checkbox options
- Selected items as tags
- Clear all option

## States

### Default (Closed)
```
┌─────────────────────────────────────▼┐
│ Select option...                     │
└──────────────────────────────────────┘
```

### Open/Expanded
```
┌─────────────────────────────────────▲┐
│ Select option...                     │
├──────────────────────────────────────┤
│   Option 1                           │
│ ▸ Option 2 (highlighted)             │
│   Option 3                           │
└──────────────────────────────────────┘
```
- Highlight: `colors.neutral.100`
- Arrow rotates up

### Selected
```
┌─────────────────────────────────────▼┐
│ Option 2                             │
└──────────────────────────────────────┘
```

### Focus
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▼┓
│ Select option...                     │
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```
- Border: `colors.border.focus` 2px

### Disabled
```
┌─────────────────────────────────────▼┐
│ Select option...                     │  ← Grayed
└──────────────────────────────────────┘
```
- Background: `colors.neutral.100`
- Cursor: not-allowed

### Error
```
Size *
┌─────────────────────────────────────▼┐
│ Select option...                     │  ← Red border
└──────────────────────────────────────┘
⚠ Please select a size
```

## With Search
```
┌──────────────────────────────────────┐
│ 🔍 Search options...                 │
├──────────────────────────────────────┤
│   Matching Option 1                  │
│   Matching Option 2                  │
└──────────────────────────────────────┘
```
- Filter as user types
- Highlight matching text
- Show "No results" if empty

## Option Groups
```
┌──────────────────────────────────────┐
│ TOPS                                 │  ← Group header
│   T-Shirts                           │
│   Hoodies                            │
│   Jackets                            │
├──────────────────────────────────────┤
│ BOTTOMS                              │
│   Jeans                              │
│   Shorts                             │
└──────────────────────────────────────┘
```

## Sizes

### Small (sm)
- Height: 32px
- Font: 0.875rem

### Medium (md)
- Height: 40px
- Font: 1rem

### Large (lg)
- Height: 48px
- Font: 1.125rem

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| options | Option[] | [] | Array of options |
| value | string \| string[] | - | Selected value(s) |
| onChange | (value) => void | - | Change handler |
| placeholder | string | 'Select...' | Placeholder text |
| label | string | - | Label text |
| isMulti | boolean | false | Multi-select mode |
| isSearchable | boolean | false | Enable search |
| isDisabled | boolean | false | Disable select |
| isClearable | boolean | false | Show clear button |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Component size |
| error | string | - | Error message |

## Option Interface
```ts
interface Option {
  value: string;
  label: string;
  isDisabled?: boolean;
  group?: string;
  icon?: ReactNode;
}
```

## Accessibility

- Use `role="listbox"` for container
- Use `role="option"` for items
- `aria-selected` for selected options
- `aria-expanded` for open state
- `aria-activedescendant` for highlighted option
- Support keyboard navigation (↑↓ Enter Escape)
- Announce option changes to screen readers

## Keyboard Navigation

| Key | Action |
|-----|--------|
| ↓ / ↑ | Navigate options |
| Enter / Space | Select option |
| Escape | Close dropdown |
| Home | First option |
| End | Last option |
| Type characters | Jump to matching |

## Usage Examples

### Size Selector
```tsx
<Select
  label="Size"
  options={[
    { value: 'S', label: 'Small' },
    { value: 'M', label: 'Medium' },
    { value: 'L', label: 'Large' },
  ]}
  value={size}
  onChange={setSize}
  isRequired
/>
```

### Category Filter
```tsx
<Select
  placeholder="All Categories"
  options={categories}
  isSearchable
  isClearable
/>
```
