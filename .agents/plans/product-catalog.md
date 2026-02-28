# Product Catalog

## Feature Description
Implement complete product catalog management with product CRUD, media, variants, categories, collections, pricing metadata, and publish/unpublish lifecycle.

## Problem Statement
Core commerce features depend on a stable catalog model. Without robust product entities and admin operations, storefront listing, search, and checkout cannot function reliably.

## Solution Statement
Design normalized product schemas and APIs that support Indian streetwear use cases (sizes, colorways, drops, inventory), plus admin-safe workflows for draft/publish and archival.

---

## Context References

Read first:
- `.claude/PRD.md` → product and merchandising requirements
- `research/TRD.md` → domain models and API expectations
- `.agents/plans/backend-foundation.md` → base API patterns
- `.agents/plans/admin-dashboard.md` → admin UI integration expectations

Inspect existing files:
- `frontend/src/api/services/products.service.ts`
- `frontend/src/types/product.ts`
- `frontend/src/features/product/**`

---

## New Files to Create

Backend:
- `backend/src/modules/products/product.model.ts`
- `backend/src/modules/products/product.controller.ts`
- `backend/src/modules/products/product.service.ts`
- `backend/src/modules/products/product.routes.ts`
- `backend/src/modules/products/product.schemas.ts`
- `backend/src/modules/categories/category.model.ts`
- `backend/src/modules/collections/collection.model.ts`

---

## API Contracts

- `GET /api/v1/products`
- `GET /api/v1/products/:id`
- `POST /api/v1/admin/products`
- `PATCH /api/v1/admin/products/:id`
- `DELETE /api/v1/admin/products/:id`
- `POST /api/v1/admin/products/:id/publish`
- `POST /api/v1/admin/products/:id/unpublish`
- `GET /api/v1/categories`
- `POST /api/v1/admin/categories`
- `GET /api/v1/collections`

---

## Atomic Tasks

### Task 1: Define product schema
- Include slug, title, description, base price, discount, tax class.
- Add variant matrix: size, color, SKU, stock.

VALIDATE:
- Product can have multiple variants with unique SKU.

### Task 2: Add category and collection schemas
- Category: name, slug, hierarchy metadata.
- Collection: title, campaign window, featured products.

VALIDATE:
- Product can belong to multiple categories/collections.

### Task 3: Create admin product create endpoint
- Validate payload via Zod.
- Persist product + variants atomically.

VALIDATE:
- Invalid variant schema returns `400`.

### Task 4: Create product update endpoint
- Support partial updates and variant reconciliation.
- Protect immutable fields as needed.

VALIDATE:
- Updating one variant does not overwrite others.

### Task 5: Implement publish/unpublish lifecycle
- Draft products hidden from storefront queries.
- Publish stores `publishedAt` and actor metadata.

VALIDATE:
- Draft product not visible in public `GET /products`.

### Task 6: Implement public listing endpoint
- Return paginated, filter-ready output.
- Expose only storefront-safe fields.

VALIDATE:
- Pagination metadata returned consistently.

### Task 7: Implement single product endpoint
- Resolve by id or slug.
- Return variant availability summary.

VALIDATE:
- Unpublished products return `404` for public route.

### Task 8: Add soft delete/archive behavior
- Prevent hard delete for linked order history.

VALIDATE:
- Archived product excluded from active listings.

### Task 9: Add admin audit metadata
- Track createdBy, updatedBy, version.

VALIDATE:
- Update operation increments version.

### Task 10: Align frontend services/types
- Ensure `products.service.ts` and product types map to API response.

VALIDATE:
- Shop and product detail pages render without shape mismatch.

---

## Gotchas
- Keep variant stock at variant level, not parent product only.
- Do not expose internal cost/margin fields to public APIs.
- Preserve order referential integrity when archiving products.

---

## Completion Checklist
- [ ] Product/category/collection schemas finalized
- [ ] Admin CRUD + publish lifecycle complete
- [ ] Public listing/detail endpoints operational
- [ ] Frontend product consumers aligned

---

## Next Feature
Proceed to `product-search-filter.md` after catalog APIs are stable.