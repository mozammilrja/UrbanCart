# Order Management

## Feature Description
Implement post-purchase lifecycle: order creation persistence, status timeline, shipment integration hooks, cancellation/return rules, and admin order operations.

## Problem Statement
Without strong order lifecycle management, customer trust and operational execution fail after payment. Admins need controlled tooling for fulfillment and support.

## Solution Statement
Build a role-aware order domain with immutable payment records, editable fulfillment statuses, customer-visible tracking, and admin workflows backed by audit logs.

---

## Context References

Read first:
- `.claude/PRD.md` → order lifecycle and support requirements
- `research/TRD.md` → state machine and integration constraints
- `.agents/plans/checkout-payment.md`
- `.agents/plans/admin-dashboard.md`

Inspect existing files:
- `frontend/src/api/services/orders.service.ts`
- `frontend/src/features/store/**`

---

## New Files to Create

Backend:
- `backend/src/modules/orders/order.model.ts`
- `backend/src/modules/orders/order.controller.ts`
- `backend/src/modules/orders/order.service.ts`
- `backend/src/modules/orders/order.routes.ts`
- `backend/src/modules/orders/order.schemas.ts`
- `backend/src/modules/orders/order.timeline.ts`

---

## API Contracts

Customer:
- `GET /api/v1/orders`
- `GET /api/v1/orders/:id`
- `POST /api/v1/orders/:id/cancel`

Admin:
- `GET /api/v1/admin/orders`
- `PATCH /api/v1/admin/orders/:id/status`
- `POST /api/v1/admin/orders/:id/fulfill`

---

## Atomic Tasks

### Task 1: Define order schema
- Store line snapshots, totals, payment refs, addresses, status timeline.

VALIDATE:
- Order record remains readable if product later changes.

### Task 2: Define status state machine
- `PENDING -> PAID -> PACKED -> SHIPPED -> DELIVERED`.
- Add terminal states: `CANCELLED`, `REFUNDED`.

VALIDATE:
- Invalid transitions rejected with clear error.

### Task 3: Implement customer order listing/detail endpoints
- Restrict access to owner’s orders.

VALIDATE:
- User cannot fetch another user’s order.

### Task 4: Implement cancel rules
- Allow cancellation only in permitted statuses/time windows.

VALIDATE:
- Cancel after `SHIPPED` is blocked by policy.

### Task 5: Implement admin order list with filters
- Filter by status/date/payment method/search.

VALIDATE:
- Paginated response shape matches admin UI needs.

### Task 6: Implement admin status update endpoint
- Enforce state machine and store actor metadata.

VALIDATE:
- Timeline appends transition event on every update.

### Task 7: Add shipment integration hooks
- Add placeholder service for Shiprocket/aggregator sync.
- Store AWB/tracking id and courier metadata.

VALIDATE:
- Tracking data appears in order timeline.

### Task 8: Add notifications trigger points
- Order placed, shipped, delivered, cancellation.

VALIDATE:
- Event payloads include order id, status, user contact context.

### Task 9: Build frontend order history and detail views
- Customer pages for order list and timeline.
- Admin page for status actions.

VALIDATE:
- Status updates reflect in UI after mutation + refetch.

---

## Gotchas
- Never allow direct client-side status mutation without server validation.
- Keep payment status and fulfillment status separate but reconciled.
- Preserve immutable line-item financial snapshots for support and audits.

---

## Completion Checklist
- [ ] Order model + state machine implemented
- [ ] Customer and admin order APIs complete
- [ ] Shipment/tracking integration points added
- [ ] Timeline and notifications wired

---

## Next Feature
Proceed to `testing-qa.md` for full validation coverage.