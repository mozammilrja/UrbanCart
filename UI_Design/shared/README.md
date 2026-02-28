# Shared Design System

This folder contains design tokens, component specifications, and brand assets shared across both client storefront and admin panel.

## Purpose

- Design tokens (colors, typography, spacing, shadows, animations)
- Shared component library (buttons, inputs, modals, etc.)
- Brand guidelines and visual identity
- Accessibility standards and patterns
- Icon library and asset registry

## Structure

```
shared/
├── README.md (this file)
├── tokens/                # Design tokens (JSON/CSS/TS)
├── components/            # Shared component specs
├── brand/                 # Brand identity assets
├── icons/                 # Icon library (SVG)
├── patterns/              # Common UI patterns
└── accessibility/         # A11y guidelines
```

## Design Tokens

### Brand Colors
- Primary: #000000 (Black)
- Secondary: #FFFFFF (White)
- Accent: #FF6B35 (Orange)

### Typography
- Sans: Inter, system-ui, sans-serif
- Display: Outfit, sans-serif

### Semantic Colors
- Success: #10B981
- Error: #EF4444
- Warning: #F59E0B
- Info: #3B82F6

## Component Library

### Buttons
- Primary, Secondary, Ghost, Danger variants
- Small (32px), Medium (40px), Large (48px) sizes
- States: Default, Hover, Active, Disabled, Loading

### Inputs
- Text, Number, Email, Password, Textarea, Select
- States: Default, Focus, Error, Disabled, Read-only

### Modals
- Backdrop overlay (60% opacity)
- White container, centered, max-width 500px
- Fade-in animation

### Toast Notifications
- Success, Error, Warning, Info variants
- Slide-in from top-right
- Auto-dismiss after 5 seconds

## Accessibility Standards

- Color Contrast: Minimum 4.5:1 ratio (WCAG AA)
- Keyboard Navigation: All interactive elements accessible
- Screen Reader Support: Semantic HTML + ARIA labels
- Motion: Respect \`prefers-reduced-motion\` setting

## Status

- [ ] Complete design token files (JSON)
- [ ] Component specification documents
- [ ] Brand guidelines document
- [ ] Logo files (SVG, PNG)
- [ ] Icon library selection
- [ ] Accessibility audit checklist
- [ ] Figma design system library
