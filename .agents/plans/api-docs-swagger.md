# API Documentation (Swagger UI)

## Feature Description
Implement OpenAPI 3 documentation and Swagger UI for UrbanCart backend so engineers, frontend, admin, QA, and integrations can discover and test APIs consistently.

## Problem Statement
Current plan references API docs but has no dedicated implementation track. Without Swagger UI, API contracts are harder to validate and frontend/backend integration slows down.

## Solution Statement
Add OpenAPI spec generation and Swagger UI endpoint in backend (`/docs`), keep schema definitions close to route modules, and enforce doc accuracy via CI validation.

---

## Context References

Read first:
- `.agents/plans/backend-foundation.md` → backend app/middleware structure
- `.agents/plans/authentication-system.md` → auth routes + schemas
- `.agents/plans/product-catalog.md` → product endpoint contracts
- `.claude/PRD.md` → API requirements
- `.claude/SYSTEM_DESIGN.md` → service boundaries and endpoint groups

---

## New Files to Create

Backend (when backend workspace exists):
- `backend/src/docs/openapi.ts`
- `backend/src/docs/swagger.ts`
- `backend/src/docs/schemas/common.ts`
- `backend/src/docs/schemas/auth.ts`
- `backend/src/docs/schemas/product.ts`
- `backend/src/docs/schemas/order.ts`

Optional:
- `backend/openapi.json` (generated artifact)

---

## Dependencies
- `swagger-ui-express`
- `swagger-jsdoc` (or route-first OpenAPI generator)
- `yaml` (optional if exporting yaml)

---

## API Docs Targets

- Swagger UI URL: `/docs`
- OpenAPI JSON URL: `/openapi.json`
- Include auth bearer scheme, request/response schemas, and common error models.

---

## Atomic Tasks

### Task 1: Install and configure Swagger dependencies
- Add required packages in backend `package.json`.

VALIDATE:
- Backend builds and starts without dependency errors.

### Task 2: Create base OpenAPI config
- Define `info`, `servers`, `tags`, and security schemes.
- Configure environment-specific server URLs.

VALIDATE:
- Generated spec has valid OpenAPI `3.x` root fields.

### Task 3: Mount Swagger UI and raw spec routes
- Register `/docs` and `/openapi.json` in backend bootstrap.

VALIDATE:
- Visiting `/docs` renders UI and `/openapi.json` returns JSON.

### Task 4: Document auth endpoints
- Register/login/refresh/logout/forgot/reset/verify/me paths.
- Include request body and success/error responses.

VALIDATE:
- Try-it-out works for at least login + me flow.

### Task 5: Document product/search/cart endpoints
- Add public and admin operation docs with examples.
- Include pagination/filter query parameters.

VALIDATE:
- Frontend team can test shop APIs from Swagger directly.

### Task 6: Document checkout/payment/order endpoints
- Include Razorpay flow docs and webhook endpoint notes.
- Mark sensitive/internal endpoints clearly.

VALIDATE:
- QA can run checkout contract checks from docs.

### Task 7: Add reusable schema components
- Create shared DTO/error schemas and reference via `$ref`.

VALIDATE:
- No duplicate schema drift across paths.

### Task 8: Add auth in Swagger UI
- Configure Bearer token auth and protected route testing.

VALIDATE:
- Protected endpoint works after authorizing token in UI.

### Task 9: Add OpenAPI quality gate in CI
- Validate spec generation and fail on invalid/broken schema refs.

VALIDATE:
- CI fails when malformed spec is introduced.

### Task 10: Publish docs usage notes
- Add short instructions in backend README (`/docs` and auth testing).

VALIDATE:
- New engineer can discover and use API docs in <5 minutes.

---

## Gotchas
- Keep OpenAPI schemas aligned with Zod/request validators.
- Avoid exposing internal admin-only webhook secrets in examples.
- Always include standardized error response format.

---

## Completion Checklist
- [ ] `/docs` and `/openapi.json` live
- [ ] Core modules documented (auth, products, cart, checkout, orders)
- [ ] Bearer auth usable from Swagger UI
- [ ] CI validates OpenAPI spec
- [ ] Backend README includes docs usage

---

## Next Feature
After this, continue with `testing-qa.md` contract and E2E validation using documented endpoints.