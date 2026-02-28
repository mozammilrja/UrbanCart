# Shopping Cart

## Feature Description
Implement guest and authenticated shopping carts with add/update/remove, promo-ready totals, cart persistence, and guest-to-user cart merge on login.

## Problem Statement
Conversion flow breaks without robust cart behavior across anonymous and authenticated sessions. Cart state inconsistency causes revenue loss and poor UX.

## Solution Statement
Build server-authoritative cart APIs with idempotent operations and clear merge strategy, then integrate with Zustand + TanStack Query for responsive UI.

---

## Context References

Read first:
- `.claude/PRD.md` → cart and conversion requirements
- `research/TRD.md` → data consistency constraints
- `.agents/plans/authentication-system.md`
- `.agents/plans/product-catalog.md`

Inspect existing files:
- `frontend/src/stores/cart.store.ts`
- `frontend/src/api/services/cart.service.ts`
- `frontend/src/features/cart/**`

---

## New Files to Create

Backend:
- `backend/src/modules/cart/cart.model.ts`
- `backend/src/modules/cart/cart.controller.ts`
- `backend/src/modules/cart/cart.service.ts`
- `backend/src/modules/cart/cart.routes.ts`
- `backend/src/modules/cart/cart.schemas.ts`

---

## API Contracts

- `GET /api/v1/cart`
- `POST /api/v1/cart/items`
- `PATCH /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart`
- `POST /api/v1/cart/merge`

---

## Atomic Tasks

### Task 1: Define cart schema
- Cart keyed by user id or guest session id.
- Store line items with variant SKU, qty, unit price snapshot.

VALIDATE:
- Guest and user carts are represented with one schema.

### Task 2: Implement get/create cart behavior
- `GET /cart` creates empty cart lazily if not found.

VALIDATE:
- First call for new guest returns empty cart with id.

### Task 3: Implement add item
- Upsert line if same variant exists.
- Validate stock and quantity limits.

VALIDATE:
- Duplicate add increments qty, not duplicate lines.

### Task 4: Implement update qty
- Support explicit quantity set and min/max constraints.

VALIDATE:
- Quantity `0` removes line or returns validation error per policy.

### Task 5: Implement remove item and clear cart
- Remove single line by id and clear all lines endpoint.

VALIDATE:
- Totals recalculate correctly after removal.

### Task 6: Implement totals calculation
- Subtotal, discount placeholder, shipping placeholder, grand total.

VALIDATE:
- Cart totals match deterministic formula for same payload.

### Task 7: Implement guest→user merge strategy
- On login, merge guest cart into user cart.
- Resolve conflicts by summing qty within stock caps.

VALIDATE:
- Merge endpoint preserves all valid lines and caps overflow.

### Task 8: Add concurrency guards
- Use version field or atomic update to reduce race issues.

VALIDATE:
- Parallel updates do not produce negative/incorrect qty.

### Task 9: Integrate frontend cart store and API hooks
- Persist cart for guests, sync with server responses.

VALIDATE:
- Login triggers merge and UI updates without manual refresh.

---

## Gotchas
- Never trust client-sent totals.
- Always validate variant existence and stock server-side.
- Keep pricing snapshot per line for audit, but recalc with live rules before checkout.

---

## Completion Checklist
- [ ] Full cart CRUD endpoints complete
- [ ] Guest and user carts supported
- [ ] Cart merge on login implemented
- [ ] Frontend store synchronization stable

---

## Next Feature
Proceed to `checkout-payment.md` after cart behavior is stable.