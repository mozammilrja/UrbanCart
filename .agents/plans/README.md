# UrbanCart Feature-Based Implementation Plans

This directory contains granular, agent-focused implementation plans for UrbanCart.

**Architecture Baseline:** Turborepo monorepo (`apps/*`, `packages/*`).

**Path Mapping for Legacy Plan Paths:**
- `frontend/*` means `apps/storefront/*`
- `backend/*` means `apps/api/*`
- `admin/*` means `apps/admin/*`

**Plan Structure:**
Each plan covers ONE FEATURE with:
- Feature description & user story
- Problem/solution statements
- Context references (what to read, why)
- Code patterns to follow
- Step-by-step atomic tasks
- Validation requirements

**How to Use:**
1. Read relevant reference documents first (listed in CONTEXT REFERENCES)
2. Check existing files & patterns
3. Execute tasks in order (top to bottom)
4. Validate each task before moving to next

---

## Feature Plans Overview

| Plan | Scope | Duration | Team |
|------|-------|----------|------|
| `monorepo-turborepo-foundation.md` | Turborepo setup (`apps/*`, `packages/*`, turbo pipeline) | Week 0 | 1 Platform, 1 Full-stack |
| `infra-foundation.md` | Hosting, DB/cache, CI/CD, observability, backups | Week 0-1 | 1 DevOps, 1 Backend |
| `backend-foundation.md` | Express + MongoDB + Redis setup | Week 1-2 | 1-2 Backend |
| `authentication-system.md` | Auth endpoints (register, login, JWT) | Week 2-3 | 1 Backend |
| `api-docs-swagger.md` | OpenAPI spec + Swagger UI (`/docs`) | Week 2-4 | 1 Backend |
| `product-catalog.md` | Product CRUD + categories + variants | Week 3-5 | 1 Backend |
| `product-search-filter.md` | Search + filtering + sorting | Week 5 | 1 Backend |
| `shopping-cart.md` | Guest & authenticated cart | Week 5-7 | 1 Backend, 1 Frontend |
| `checkout-payment.md` | Multi-step checkout + Razorpay | Week 7-10 | 2 Backend, 1 Frontend |
| `order-management.md` | Order tracking + shipping | Week 10-12 | 1 Backend, 1 Frontend |
| `admin-dashboard.md` | Admin panel + analytics | Week 7-12 | 1 Admin Dev |
| `frontend-storefront.md` | All frontend pages & components | Week 3-12 | 2 Frontend |
| `testing-qa.md` | Unit + integration + E2E tests | Week 8-15 | 1 QA, Engineers |

---

## Implementation Sequence

### Critical Path (Blocks Other Work):
1. Monorepo Foundation (Turborepo) → Workspace architecture and pipelines
2. Infra Foundation → Environments, CI/CD, DB/cache provisioning
3. Backend Foundation → API skeleton + models
4. Authentication → User registration/login
5. API Docs (Swagger UI) → Contract visibility + API testability
6. Product Catalog → Data model
7. Product Search → API endpoint
8. Shopping Cart → Session management
9. Checkout & Payment → Order creation
10. Order Management → Tracking

### Parallel Tracks:
- Frontend Storefront (after API endpoints exist)
- Testing (after features complete)
- Admin Dashboard (after core data models)

---

## Quick Reference

**Frontend Tech Stack:**
- Next.js 15, React 19, TypeScript 5.x
- TanStack Query 5.x, Zustand 4.x
- Tailwind CSS 3.x, shadcn/ui

**Backend Tech Stack:**
- Express.js + TypeScript
- MongoDB + Mongoose + Redis
- Razorpay, Cloudinary, Resend

**Testing:**
- Vitest + RTL (Frontend)
- Vitest + Supertest (Backend)
- Playwright E2E (MCP)

---

**Start with:** Read `monorepo-turborepo-foundation.md`  
**Then:** `infra-foundation.md`  
**Next:** `backend-foundation.md`  
**Then:** `authentication-system.md`  
**Then:** `api-docs-swagger.md`

Each plan includes exact implementation steps, code snippets, and validation checkpoints.
