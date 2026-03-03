# Accessibility Guidelines

## Overview

APOSTLE is committed to providing an accessible shopping experience for all users, including those with disabilities. This document outlines our accessibility requirements and best practices.

## Standards

### Compliance Target
- **WCAG 2.1 Level AA** - Minimum standard
- **WCAG 2.1 Level AAA** - Target for critical flows

### Legal Considerations
- Rights of Persons with Disabilities Act, 2016 (India)
- ADA compliance for US market reach
- EN 301 549 for EU accessibility

## Core Principles (POUR)

### 1. Perceivable
Information must be presentable in ways users can perceive.

### 2. Operable
Interface components must be operable by all users.

### 3. Understandable
Information and operation must be understandable.

### 4. Robust
Content must be robust enough for various assistive technologies.

## Color & Contrast

### Minimum Contrast Ratios
| Element | Ratio | Example |
|---------|-------|---------|
| Normal text | 4.5:1 | #525252 on #FFFFFF ✓ |
| Large text (18px+ bold, 24px+) | 3:1 | #737373 on #FFFFFF ✓ |
| UI components | 3:1 | Borders, icons |
| Focus indicators | 3:1 | Black focus ring |

### Color Independence
```
❌ Error indicated by red color only
✓  Error indicated by red color + icon + text message

❌ Required fields in red
✓  Required fields marked with asterisk (*)

❌ Links indicated by color only
✓  Links underlined AND colored
```

### Testing Tools
- axe DevTools
- WebAIM Contrast Checker
- Colour Contrast Analyser

## Keyboard Accessibility

### Focus Management
```
Tab → Next focusable element
Shift+Tab → Previous element
Enter/Space → Activate
Escape → Close/Cancel
Arrow keys → Navigate within components
```

### Focus Indicators
```css
/* Visible focus ring */
:focus-visible {
  outline: 2px solid #000000;
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Tab Order
```
┌─────────────────────────────────────────────────────────┐
│ [1]Logo  [2]Nav  [3]Nav  [4]Nav  [5]Search  [6]Cart    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [7]Product    [8]Product    [9]Product                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
- Logical, predictable tab order
- Skip to main content link
- Skip navigation links

### Skip Links
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

## Screen Reader Support

### Semantic HTML
```html
<!-- Use proper elements -->
<nav> instead of <div class="nav">
<button> instead of <div onclick>
<main> for primary content
<aside> for sidebars
<header> and <footer>
```

### ARIA Usage
```html
<!-- Labels -->
<button aria-label="Close modal">✕</button>
<input aria-describedby="password-hint">

<!-- States -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<div role="alert">Error message</div>

<!-- Live regions -->
<div aria-live="polite">Cart updated</div>
<div aria-live="assertive">Error occurred</div>
```

### Landmark Roles
```
┌─────────────────────────────────────────────────────────┐
│ <header> role="banner"                                  │
├───────────────────────┬─────────────────────────────────┤
│ <nav> role="nav"      │ <main> role="main"              │
│                       │                                 │
│ <aside>               │                                 │
│ role="complementary"  │                                 │
├───────────────────────┴─────────────────────────────────┤
│ <footer> role="contentinfo"                             │
└─────────────────────────────────────────────────────────┘
```

## Images & Media

### Alternative Text
```html
<!-- Informative image -->
<img src="product.jpg" alt="Black oversized hoodie with logo print">

<!-- Decorative image -->
<img src="decoration.svg" alt="" role="presentation">

<!-- Complex image -->
<figure>
  <img src="size-chart.png" alt="Size chart showing measurements">
  <figcaption>See table below for detailed measurements</figcaption>
</figure>
```

### Video Content
- Provide captions for all video
- Offer audio descriptions
- Include transcript option
- Allow pause/stop controls

## Forms

### Labels
```html
<!-- Explicit label -->
<label for="email">Email address</label>
<input id="email" type="email" required aria-required="true">

<!-- Error handling -->
<label for="password">Password</label>
<input id="password" type="password" aria-invalid="true" aria-describedby="pwd-error">
<span id="pwd-error" role="alert">Password must be at least 8 characters</span>
```

### Required Fields
```
Email *
┌────────────────────────────────────────┐
│                                        │
└────────────────────────────────────────┘
* Required field

<!-- Also use aria-required="true" -->
```

### Error Messages
```html
<!-- Announce errors -->
<div role="alert" aria-live="assertive">
  <ul>
    <li>Email is required</li>
    <li>Password must be at least 8 characters</li>
  </ul>
</div>
```

### Autocomplete
```html
<input type="text" autocomplete="name">
<input type="email" autocomplete="email">
<input type="tel" autocomplete="tel">
<input type="text" autocomplete="street-address">
```

## Interactive Components

### Buttons
```html
<button type="button" aria-label="Add to cart">
  <CartIcon aria-hidden="true" />
  Add to Cart
</button>

<!-- Loading state -->
<button type="button" aria-busy="true" disabled>
  <Spinner aria-hidden="true" />
  Adding...
</button>
```

### Modals
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm Action</h2>
  <!-- Focus trapped within modal -->
  <!-- Close on Escape -->
  <!-- Return focus on close -->
</div>
```

### Tabs
```html
<div role="tablist" aria-label="Product information">
  <button role="tab" aria-selected="true" aria-controls="panel-1">
    Description
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">
    Reviews
  </button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
  Content here
</div>
```

### Accordions
```html
<div>
  <button aria-expanded="false" aria-controls="section-1">
    Section Title
    <ChevronIcon aria-hidden="true" />
  </button>
  <div id="section-1" hidden>
    Content
  </div>
</div>
```

## Mobile Accessibility

### Touch Targets
- Minimum size: 44×44 pixels
- Adequate spacing between targets
- Consider thumb zones

### Gestures
- Provide alternatives to complex gestures
- Support pinch-to-zoom
- Don't disable zoom

### Orientation
- Support both portrait and landscape
- Don't lock orientation unless essential

## Responsive Design

### Text Resizing
- Support up to 200% zoom
- No horizontal scrolling at 400% zoom
- Use relative units (rem, em)

### Reflow
- Content reflows at 320px width
- No loss of information or functionality
- Single column at narrow viewpoints

## Testing Checklist

### Automated Testing
- [ ] axe-core integration
- [ ] Lighthouse accessibility audit
- [ ] ESLint jsx-a11y plugin
- [ ] CI/CD accessibility checks

### Manual Testing
- [ ] Keyboard-only navigation
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Zoom to 200%
- [ ] Check focus indicators
- [ ] Verify color contrast
- [ ] Test with prefers-reduced-motion

### Screen Readers
| OS | Screen Reader |
|----|---------------|
| Windows | NVDA (free), JAWS |
| macOS | VoiceOver |
| iOS | VoiceOver |
| Android | TalkBack |

## Critical User Flows

### Must Be Fully Accessible
1. Product browsing and search
2. Product details and selection
3. Add to cart
4. Checkout process
5. Account creation/login
6. Order tracking
7. Contact/support

## Resources

### Guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Tools
- axe DevTools
- WAVE Evaluation Tool
- Accessibility Insights
- Pa11y

### Testing Services
- WebAIM
- Deque
- Level Access
