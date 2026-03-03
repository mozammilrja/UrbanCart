# Client Storefront UI Design

This folder contains design artifacts for the APOSTLE customer-facing storefront.

## Purpose

- Visual mockups, wireframes, and prototypes for client pages
- Component design specifications
- User flow diagrams and interaction patterns
- Mobile/responsive design variations
- Accessibility annotations

## Execution Authority

**For complete route specifications, requirements, and technical implementation details, see:**
- [Client Storefront Page Coverage Plan](../../plans/client/client_frontend_page_coverage_plan.md)

This folder contains **visual design assets only**. All feature requirements, API mappings, state management, and rendering strategies are documented in the canonical plan above.

## Template ID Reference

Design artifacts should reference these template IDs from the execution plan:

### Public Commerce
- **T-CLIENT-001**: Home Page (\`/\`)
- **T-CLIENT-002**: Shop Catalog (\`/shop\`)
- **T-CLIENT-003**: Product Detail Page (\`/product/[id]\`)
- **T-CLIENT-004**: Collection Page (\`/collections/[slug]\`)
- **T-CLIENT-005**: Category Browse (\`/category/[slug]\`)
- **T-CLIENT-006**: Search Results (\`/search\`)

### Checkout Flow
- **T-CLIENT-007**: Cart Page (\`/cart\`)
- **T-CLIENT-008**: Checkout Page (\`/checkout\`)
- **T-CLIENT-009**: Payment Page (\`/checkout/payment\`)
- **T-CLIENT-010**: Order Confirmation (\`/order/confirmation\`)

### Authentication
- **T-CLIENT-011**: Login Page (\`/login\`)
- **T-CLIENT-012**: Register Page (\`/register\`)
- **T-CLIENT-013**: Forgot Password (\`/forgot-password\`)

### Account Management
- **T-CLIENT-014**: Account Dashboard (\`/account\`)
- **T-CLIENT-015**: Order History (\`/account/orders\`)
- **T-CLIENT-016**: Order Detail (\`/account/orders/[id]\`)
- **T-CLIENT-017**: Saved Addresses (\`/account/addresses\`)
- **T-CLIENT-018**: Wishlist (\`/account/wishlist\`)
- **T-CLIENT-019**: Profile Settings (\`/account/settings\`)

## Status

- [x] Home page mockups
- [x] Shop catalog variations (grid, filters)
- [x] Product detail page (all variants)
- [x] Cart and checkout flow
- [x] Account dashboard suite
- [ ] Static pages
- [ ] Component library in Figma/Storybook
- [x] Mobile-first responsive layouts
- [x] Accessibility audit

## Created Pages

```
pages/
├── T-CLIENT-001-home.md
├── T-CLIENT-002-shop.md
├── T-CLIENT-003-product-detail.md
├── T-CLIENT-004-collection.md
├── T-CLIENT-006-search.md
├── T-CLIENT-007-cart.md
├── T-CLIENT-008-checkout.md
├── T-CLIENT-011-login.md
├── T-CLIENT-014-account-dashboard.md
├── T-CLIENT-015-order-history.md
└── T-CLIENT-018-wishlist.md
```
