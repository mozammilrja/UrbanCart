# Product Search & Filter

## Feature Description
Implement fast and relevant product discovery with keyword search, filters (category, size, color, price), sorting, and pagination.

## Problem Statement
Catalog data alone is insufficient for user conversion. Users need efficient discovery to find relevant products quickly, especially on mobile and high-SKU drops.

## Solution Statement
Build indexed search + structured filtering at API layer, with frontend URL-synced filter state and deterministic query keys for cache efficiency.

---

## Context References

Read first:
- `.claude/PRD.md` → discovery and UX requirements
- `research/TRD.md` → performance and API constraints
- `.agents/plans/product-catalog.md` → product fields and index candidates
- `frontend/src/features/shop/**`

Inspect:
- `frontend/src/hooks/useDebounce.ts`
- `frontend/src/api/services/products.service.ts`

---

## New Files to Create

Backend:
- `backend/src/modules/search/search.service.ts`
- `backend/src/modules/search/search.routes.ts`
- `backend/src/modules/search/search.schemas.ts`

Frontend (if needed):
- `frontend/src/features/shop/hooks/useProductSearch.ts`
- `frontend/src/features/shop/types/search.types.ts`

---

## API Contracts

- `GET /api/v1/products/search?q=&category=&size=&color=&minPrice=&maxPrice=&sort=&page=&limit=`
- `GET /api/v1/products/filters/meta`

---

## Atomic Tasks

### Task 1: Define searchable fields and indexes
- Add text/compound indexes for name, tags, category, publish status, price.

VALIDATE:
- Query plan uses indexes for common filter combinations.

### Task 2: Implement search schema validation
- Parse query params safely; enforce bounds for page/limit.

VALIDATE:
- Invalid sort/filter values return `400`.

### Task 3: Implement keyword search behavior
- Support partial keyword and tokenized matching.
- Rank exact matches higher than partials.

VALIDATE:
- Exact title match appears before fuzzy results.

### Task 4: Implement faceted filtering
- Category, collection, size, color, price range.

VALIDATE:
- Combined filters return intersection, not union.

### Task 5: Implement sorting
- Newest, price low-high, price high-low, popularity.

VALIDATE:
- Sorting is stable and deterministic.

### Task 6: Implement pagination metadata
- Include total, page, limit, hasNext, hasPrev.

VALIDATE:
- Last page metadata reports `hasNext=false`.

### Task 7: Implement filter meta endpoint
- Return available facets and counts.

VALIDATE:
- Facet counts reflect currently published products.

### Task 8: Integrate frontend query hooks
- Use TanStack Query key factory with filter object.
- Debounce keyword input.

VALIDATE:
- Rapid typing does not spam requests.

### Task 9: Sync filters with URL params
- Preserve shareable URLs and browser back/forward behavior.

VALIDATE:
- Refreshing page retains current filter state.

---

## Gotchas
- Ensure search endpoint excludes unpublished products by default.
- Normalize string filters (case, whitespace) before querying.
- Guard against expensive unbounded regex queries.

---

## Completion Checklist
- [ ] Indexed search endpoint implemented
- [ ] Full filter + sort matrix working
- [ ] Frontend URL-synced filter state complete
- [ ] Performance baseline validated

---

## Next Feature
Proceed to `shopping-cart.md` after search and filters are stable.