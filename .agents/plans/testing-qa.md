# Testing & QA

## Feature Description
Establish quality gates across backend, frontend, and critical user journeys using unit, integration, and end-to-end testing.

## Problem Statement
Large multi-feature implementation without automated validation leads to regressions and deployment risk. Current planning requires explicit, enforceable QA steps.

## Solution Statement
Create a layered testing strategy aligned with UrbanCart architecture: service/unit tests for logic, integration tests for APIs/stores, and E2E coverage for revenue-critical flows.

---

## Context References

Read first:
- `research/TRD.md` → NFRs and reliability targets
- `.claude/PRD.md` → critical user journeys
- `CLAUDE.md` → expected testing stack and conventions
- All feature plans in `.agents/plans/*.md`

Inspect existing files:
- `frontend/package.json` scripts
- Existing test setup files (if present)

---

## New Files to Create

Backend:
- `backend/tests/auth/auth.integration.test.ts`
- `backend/tests/products/products.integration.test.ts`
- `backend/tests/cart/cart.integration.test.ts`
- `backend/tests/checkout/checkout.integration.test.ts`

Frontend:
- `frontend/src/features/**/__tests__/*.test.tsx`
- `frontend/playwright/e2e/checkout-flow.spec.ts`
- `frontend/playwright/e2e/auth-cart-merge.spec.ts`

---

## Test Matrix

### Unit
- Validation schemas
- Domain pricing/totals logic
- Utility and formatter functions

### Integration
- Auth APIs (register/login/refresh/logout)
- Product listing/search/filter endpoints
- Cart merge and totals
- Checkout payment verification and order creation

### E2E
- Browse → Product Detail → Cart → Checkout → Confirmation
- Register/Login → Cart merge → Checkout
- Admin product update → storefront visibility

---

## Atomic Tasks

### Task 1: Configure backend test runner
- Vitest/Jest + Supertest setup, isolated test DB env.

VALIDATE:
- Sample API test runs in CI mode.

### Task 2: Configure frontend test runner
- Vitest + React Testing Library setup.

VALIDATE:
- Component smoke test passes.

### Task 3: Add auth integration tests
- Success/failure for register/login/refresh/logout/reset.

VALIDATE:
- Refresh rotation and invalid token tests pass.

### Task 4: Add catalog and search integration tests
- CRUD visibility rules and search filter combinations.

VALIDATE:
- Unpublished products excluded from public API tests.

### Task 5: Add cart integration tests
- Add/update/remove/merge flow.

VALIDATE:
- Merge behavior deterministic across conflict cases.

### Task 6: Add checkout/payment tests
- Intent creation, signature verification, idempotent completion.

VALIDATE:
- Duplicate completion does not create duplicate orders.

### Task 7: Add order lifecycle tests
- Status transitions and invalid transition rejection.

VALIDATE:
- Timeline events recorded in expected order.

### Task 8: Create Playwright critical journey tests
- Guest + authenticated checkout path.
- Admin workflow smoke path.

VALIDATE:
- E2E tests produce deterministic pass/fail output.

### Task 9: Add CI quality gates
- Lint, typecheck, unit, integration, E2E (tiered).

VALIDATE:
- PR fails on broken tests, passes on green suite.

---

## Gotchas
- Avoid coupling tests to unstable UI text where possible.
- Use deterministic seed data and clock controls for flaky flows.
- Keep payment E2E in sandbox/mock mode.

---

## Completion Checklist
- [ ] Unit/integration/E2E suites configured
- [ ] Revenue-critical journeys covered
- [ ] CI gates enforce quality before merge
- [ ] Regression baseline documented

---

## Next Step
After this plan, run stabilization/performance hardening and release readiness review.