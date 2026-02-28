# Admin Panel UI Design

This folder contains design artifacts for the UrbanCart admin dashboard.

## Purpose

- Visual mockups, wireframes, and prototypes for admin pages
- Data table and form designs
- Workflow diagrams and state transitions
- Responsive layouts for admin operations
- Permission-based UI variations

## Execution Authority

**For complete route specifications, requirements, and technical implementation details, see:**
- [Admin Panel Page Coverage Plan](../../plans/admin/admin_frontend_page_coverage_plan.md)

This folder contains **visual design assets only**. All feature requirements, API mappings, permission models, and workflow logic are documented in the canonical plan above.

## Template ID Reference

Design artifacts should reference these template IDs from the execution plan:

### Authentication & Dashboard
- **T-ADMIN-001**: Admin Login (\`/admin/login\`)
- **T-ADMIN-002**: Admin Dashboard (\`/admin/dashboard\`)

### Product Management
- **T-ADMIN-003**: All Products List (\`/admin/products\`)
- **T-ADMIN-004**: Create Product (\`/admin/products/new\`)
- **T-ADMIN-005**: Edit Product (\`/admin/products/[id]/edit\`)
- **T-ADMIN-006**: Product Detail (\`/admin/products/[id]\`)

### Collection & Category Management
- **T-ADMIN-007**: All Collections (\`/admin/collections\`)
- **T-ADMIN-008**: Create Collection (\`/admin/collections/new\`)
- **T-ADMIN-009**: Edit Collection (\`/admin/collections/[id]/edit\`)
- **T-ADMIN-010**: All Categories (\`/admin/categories\`)

### Order & Customer Management
- **T-ADMIN-012**: All Orders (\`/admin/orders\`)
- **T-ADMIN-013**: Order Detail (\`/admin/orders/[id]\`)
- **T-ADMIN-014**: All Customers (\`/admin/customers\`)
- **T-ADMIN-015**: Customer Detail (\`/admin/customers/[id]\`)

## Status

- [ ] Dashboard mockups (revenue charts, KPI cards)
- [ ] Product list with filters and bulk actions
- [ ] Product creation form (all steps)
- [ ] Image upload and variant editor
- [ ] Order management screens
- [ ] Customer management screens
- [ ] Permission-based UI variations
- [ ] Workflow diagrams
