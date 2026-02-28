# Authentication System

## Feature Description
Implement complete authentication flows for shoppers and admins: registration, login, refresh token rotation, logout, forgot/reset password, and email verification.

## Problem Statement
Backend foundation exists, but no secure identity lifecycle. Without auth, protected APIs, checkout ownership, admin security, and user personalization cannot be implemented safely.

## Solution Statement
Build JWT-based auth with short-lived access tokens and rotating refresh tokens, secure credential handling, and role-aware authorization middleware. Provide frontend integration points and deterministic validation checkpoints.

---

## Context References

Read first:
- `.claude/PRD.md` → auth requirements and user journeys
- `research/TRD.md` → API and security constraints
- `frontend/src/api/auth/*` → existing auth client patterns
- `.agents/plans/backend-foundation.md` → shared middleware/logging/error patterns

Follow existing patterns from:
- `frontend/src/api/core/client.ts`
- `frontend/src/stores/auth.store.ts`
- `frontend/src/hooks/useAuth.ts`

---

## New Files to Create

Backend:
- `backend/src/modules/auth/auth.controller.ts`
- `backend/src/modules/auth/auth.service.ts`
- `backend/src/modules/auth/auth.routes.ts`
- `backend/src/modules/auth/auth.schemas.ts`
- `backend/src/modules/auth/auth.repository.ts`
- `backend/src/modules/auth/auth.tokens.ts`
- `backend/src/modules/auth/auth.email.ts`

Frontend (if missing during implementation):
- `frontend/src/features/auth/hooks/useAuthMutations.ts`
- `frontend/src/features/auth/types/auth.types.ts`

---

## API Contracts

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`
- `POST /api/v1/auth/verify-email`
- `GET /api/v1/auth/me`

---

## Atomic Tasks

### Task 1: Define Zod request/response schemas
- Add validation for all auth endpoints.
- Enforce email normalization and strong password policy.

VALIDATE:
- Invalid payloads return `400` with structured field errors.

### Task 2: Implement password hashing strategy
- Use `bcrypt` with configurable rounds.
- Store only hash + metadata, never plaintext.

VALIDATE:
- Same password hashes differently per user (salted).

### Task 3: Implement token generation
- Access token: short TTL.
- Refresh token: longer TTL with unique token ID (`jti`).
- Include user id + role claims.

VALIDATE:
- Decoded claims include `sub`, `role`, `exp`, `jti` where expected.

### Task 4: Implement refresh token persistence/rotation
- Save refresh token hash or token ID in database.
- On refresh, invalidate old token and issue new pair.

VALIDATE:
- Reusing old refresh token fails with `401`.

### Task 5: Implement register + login service
- Register: unique email check, hash password, create user profile.
- Login: verify hash, issue tokens, update last login.

VALIDATE:
- Duplicate email returns `409`.
- Valid login returns token pair + user summary.

### Task 6: Implement `me` and logout endpoints
- `me` returns current authenticated user.
- Logout revokes refresh token/session.

VALIDATE:
- Authenticated `me` returns `200`, unauthenticated returns `401`.

### Task 7: Implement forgot/reset password flow
- Generate time-limited reset token.
- Send reset link/email via configured provider.
- Reset endpoint validates token and updates password hash.

VALIDATE:
- Expired reset token is rejected.

### Task 8: Implement email verification flow
- Generate one-time verification token.
- Mark user email as verified after successful confirm.

VALIDATE:
- `isEmailVerified` toggles true only on valid token.

### Task 9: Add role-based authorization middleware
- `requireAuth`, `requireRole('admin')`, `requireRole('customer')`.

VALIDATE:
- Customer cannot access admin-only endpoint.

### Task 10: Wire frontend auth API hooks
- Ensure frontend uses centralized auth service and token manager.
- Use query invalidation on login/logout.

VALIDATE:
- Login updates auth state; logout clears state and protected views.

---

## Gotchas
- Never store raw refresh tokens.
- Always rotate refresh token on refresh endpoint.
- Reject tokens signed with unexpected algorithm.
- Enforce consistent UTC timestamps for token expiry checks.

---

## Completion Checklist
- [ ] All auth endpoints implemented
- [ ] Refresh rotation covered by tests
- [ ] Password reset and email verification operational
- [ ] Role middleware enforced on protected routes
- [ ] Frontend auth flow validated end-to-end

---

## Next Feature
Proceed to `product-catalog.md` after auth is complete.