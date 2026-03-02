# UI Design Assets

Document Version: 1.0  
Date: 28 February 2026

## Purpose

This folder contains UI design artifacts, not execution plans.

**For execution plans, see:** [plans/frontend_plans_index.md](../plans/frontend_plans_index.md)

## Structure

- [client/](client/) - Client storefront design assets (11 page wireframes)
- [admin/](admin/) - Admin panel design assets (8 page wireframes)  
- [shared/](shared/) - Shared design system assets (tokens, components, guidelines)

## Completion Status

### Design Tokens (7/7) ✅
- `shared/tokens/colors.json` - Brand, semantic, neutral colors
- `shared/tokens/typography.json` - Fonts, sizes, text styles
- `shared/tokens/spacing.json` - Scale, semantic, layout spacing
- `shared/tokens/shadows.json` - Elevation levels, focus states
- `shared/tokens/animations.json` - Duration, easing, keyframes
- `shared/tokens/breakpoints.json` - Responsive breakpoints, grid
- `shared/tokens/z-index.json` - Layer hierarchy

### Component Specs (7/7) ✅
- `shared/components/button.md` - Variants, sizes, states
- `shared/components/input.md` - Text inputs, validation
- `shared/components/select.md` - Dropdowns, multi-select
- `shared/components/modal.md` - Dialog variants, focus management
- `shared/components/toast.md` - Notifications, stacking
- `shared/components/card.md` - Product, collection, stats cards
- `shared/components/skeleton.md` - Loading placeholders

### Guidelines (4/4) ✅
- `shared/brand/guidelines.md` - Logo, colors, voice & tone
- `shared/icons/README.md` - Icon style guide
- `shared/patterns/README.md` - UI patterns
- `shared/accessibility/README.md` - WCAG 2.1 AA compliance

### Client Pages (11/11) ✅
- `T-CLIENT-001-home.md` - Landing page
- `T-CLIENT-002-shop.md` - Product listing
- `T-CLIENT-003-product-detail.md` - PDP
- `T-CLIENT-004-collection.md` - Collection page
- `T-CLIENT-006-search.md` - Search results
- `T-CLIENT-007-cart.md` - Shopping cart
- `T-CLIENT-008-checkout.md` - Checkout flow
- `T-CLIENT-011-login.md` - Authentication
- `T-CLIENT-014-account-dashboard.md` - Account overview
- `T-CLIENT-015-order-history.md` - Order history
- `T-CLIENT-018-wishlist.md` - Saved items

### Admin Pages (8/8) ✅
- `T-ADMIN-001-login.md` - Admin login with 2FA
- `T-ADMIN-002-dashboard.md` - KPIs and analytics
- `T-ADMIN-003-products-list.md` - Product management
- `T-ADMIN-004-005-product-form.md` - Add/edit products
- `T-ADMIN-007-008-009-collections.md` - Collections management
- `T-ADMIN-012-orders-list.md` - Order management
- `T-ADMIN-013-order-detail.md` - Order detail/fulfillment
- `T-ADMIN-014-015-customers.md` - Customer management

## What Belongs Here

- Design mockups and wireframes
- Component design specifications
- Visual design guidelines
- Design tokens and theme files
- Brand asset references
- UI pattern libraries
- Interaction design specs
- Accessibility guidelines
- Responsive breakpoint matrices

## What Does NOT Belong Here

- Code (belongs in codebase)
- Execution plans (belongs in [plans/](../plans/))
- PRD/BRD/TRD docs (belongs in [.claude/](.claude/) or [research/](../research/))

## Link to Execution Plans

- Client execution plan: [plans/client/client_frontend_page_coverage_plan.md](../plans/client/client_frontend_page_coverage_plan.md)
- Admin execution plan: [plans/admin/admin_frontend_page_coverage_plan.md](../plans/admin/admin_frontend_page_coverage_plan.md)
- Agent execution: [.agents/plans/execution_index.md](../.agents/plans/execution_index.md)
