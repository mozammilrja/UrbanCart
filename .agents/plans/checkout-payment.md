# Checkout & Payment

## Feature Description
Implement multi-step checkout with address, shipping, payment initiation, Razorpay verification, and order placement with transactional integrity.

## Problem Statement
Cart alone does not generate revenue; secure and reliable checkout is the critical monetization path. Any inconsistency in payment/order state can cause charge disputes and support burden.

## Solution Statement
Use a stateful checkout flow with server-side order intent creation, Razorpay order integration, signature verification, and idempotent order finalization.

---

## Context References

Read first:
- `.claude/PRD.md` → checkout requirements
- `research/TRD.md` → payment/security constraints
- `.agents/plans/shopping-cart.md`
- `.agents/plans/authentication-system.md`

Inspect existing files:
- `frontend/src/api/services/orders.service.ts`
- `frontend/src/app/cart/page.tsx`

---

## New Files to Create

Backend:
- `backend/src/modules/checkout/checkout.controller.ts`
- `backend/src/modules/checkout/checkout.service.ts`
- `backend/src/modules/checkout/checkout.routes.ts`
- `backend/src/modules/checkout/checkout.schemas.ts`
- `backend/src/modules/payments/razorpay.service.ts`
- `backend/src/modules/payments/payment.webhook.ts`

Frontend:
- `frontend/src/features/checkout/hooks/useCheckout.ts`
- `frontend/src/features/checkout/components/CheckoutStepper.tsx`

---

## API Contracts

- `POST /api/v1/checkout/intent`
- `POST /api/v1/payments/razorpay/create-order`
- `POST /api/v1/payments/razorpay/verify`
- `POST /api/v1/checkout/complete`
- `POST /api/v1/payments/webhooks/razorpay`

---

## Atomic Tasks

### Task 1: Define checkout data contract
- Billing/shipping address, contact, cart snapshot, delivery option.

VALIDATE:
- Missing required address fields return `400`.

### Task 2: Implement checkout intent endpoint
- Validate cart ownership and stock availability.
- Generate price breakdown and lock minimal order context.

VALIDATE:
- Intent returns amount/currency consistent with cart rules.

### Task 3: Integrate Razorpay order creation
- Create Razorpay order on server.
- Persist local payment attempt record.

VALIDATE:
- Razorpay order id stored and linked to user/cart intent.

### Task 4: Implement signature verification endpoint
- Verify Razorpay signature using secret.
- Mark payment status atomically.

VALIDATE:
- Invalid signature rejected with `401/400`.

### Task 5: Implement idempotent checkout completion
- Convert paid intent to final order once.
- Prevent duplicate order creation on retries.

VALIDATE:
- Repeated completion call returns same order reference.

### Task 6: Update inventory and clear cart
- Decrement variant stock safely.
- Clear cart only after successful order commit.

VALIDATE:
- Failed commit does not partially clear cart.

### Task 7: Add webhook handler
- Accept Razorpay webhook events with signature verification.
- Reconcile payment state transitions.

VALIDATE:
- Duplicate webhook events handled idempotently.

### Task 8: Build frontend multi-step checkout UX
- Stepper for address → review → payment.
- Integrate Razorpay checkout script and callbacks.

VALIDATE:
- Successful payment redirects to order confirmation.

### Task 9: Add failure recovery UX
- Retry payment, clear error states, support safe back navigation.

VALIDATE:
- Payment failure keeps intent/cart recoverable.

---

## Gotchas
- Never mark order paid based only on client callback.
- Signature verification must happen server-side only.
- Ensure amount and currency used for verification match intent.

---

## Completion Checklist
- [ ] Checkout intent + completion endpoints complete
- [ ] Razorpay create/verify/webhook implemented
- [ ] Inventory and cart transitions transactional
- [ ] Frontend checkout flow end-to-end verified

---

## Next Feature
Proceed to `order-management.md` after checkout reliability is validated.