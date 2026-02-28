# Infrastructure Foundation

## Feature Description
Provision and standardize infrastructure for UrbanCart across local, staging, and production: hosting, networking, databases, caching, secrets, observability, CI/CD, and backup/recovery.

## Problem Statement
Application feature plans assume infrastructure exists, but no dedicated plan defines environment setup, operational guardrails, or deployment reliability. This creates blockers for backend/frontend/admin execution.

## Solution Statement
Create an infrastructure-first implementation track that establishes reproducible environments, secure secret management, service health monitoring, deployment pipelines, and rollback-ready release operations.

---

## Context References

Read first:
- `.claude/PRD.md` → business goals, scale assumptions, release priorities
- `.claude/SYSTEM_DESIGN.md` → architecture topology, data flow, reliability expectations
- `research/TRD.md` → technical constraints and non-functional requirements
- `README.md` → current local workflow and scripts
- `.agents/instructions.md` → agent workflow and quality requirements

---

## Scope

### In Scope
- Environment strategy (`local`, `staging`, `production`)
- Hosting layout for frontend, backend, and admin
- MongoDB + Redis provisioning and access control
- Secret and environment variable management
- CI/CD pipelines for build/test/deploy
- Logging, metrics, alerting, and uptime checks
- Backup, restore, and incident-ready rollback process

### Out of Scope
- Business feature implementation (auth/cart/checkout)
- Cost optimization beyond baseline safeguards
- Vendor migration strategy

---

## Target Infrastructure Baseline

- **Frontend Storefront:** Next.js deployment platform with preview + production environments
- **Admin Dashboard:** Vite static app deployment with protected access
- **Backend API:** Node runtime host with autoscaling-compatible process model
- **Database:** Managed MongoDB with staging/prod isolation
- **Cache/Rate Limiting:** Managed Redis (Upstash-compatible)
- **Storage/CDN:** Product image/media hosting with CDN delivery
- **Observability:** Structured logs + error monitoring + health checks

---

## Required Files to Create/Update

Repository-level:
- `.env.example` (root, reference only)
- `apps/storefront/.env.example`
- `apps/api/.env.example` (when API workspace is created)
- `apps/admin/.env.example` (when admin workspace is created)
- `.github/workflows/ci.yml`
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`
- `docs/infra/runbook.md`
- `docs/infra/environments.md`
- `docs/infra/disaster-recovery.md`

---

## Atomic Tasks

### Task 1: Define environment matrix
- Create env matrix with required variables per app (`frontend`, `backend`, `admin`).
- Mark each variable as `required`/`optional` and environment-specific.

VALIDATE:
- Every required variable in code has documented source and owner.

### Task 2: Set naming conventions and branch-to-env mapping
- `main` → production, `develop` (or equivalent) → staging, PRs → preview.
- Standardize naming for domains, projects, and secrets.

VALIDATE:
- Deployment target can be inferred only from branch context.

### Task 3: Provision MongoDB environments
- Create separate clusters or databases for staging and production.
- Configure IP/network rules and least-privilege DB users.

VALIDATE:
- Staging credentials cannot access production data.

### Task 4: Provision Redis environments
- Create isolated Redis instances for staging and production.
- Configure TLS, auth tokens, and eviction policy suitable for session/cache.

VALIDATE:
- Redis connectivity health check passes from backend in each environment.

### Task 5: Provision app hosting
- Configure frontend storefront deployment and preview links.
- Configure backend API runtime with health endpoint and restart policy.
- Configure admin deployment endpoint.

VALIDATE:
- All three apps have reachable staging URLs.

### Task 6: Configure domain and TLS
- Map custom domains and subdomains:
  - `www`/storefront
  - `api`
  - `admin`
- Enforce HTTPS and HSTS where applicable.

VALIDATE:
- HTTP requests redirect to HTTPS; certificate auto-renew confirmed.

### Task 7: Implement secret management strategy
- Store secrets only in managed secret stores or CI environment settings.
- Rotate high-risk keys (JWT, payment keys) on schedule.

VALIDATE:
- No secrets appear in repository history or logs.

### Task 8: Add CI pipeline
- Build, lint, typecheck, and test for changed apps.
- Use dependency caching and fail-fast strategy.

VALIDATE:
- Pull request cannot merge when required checks fail.

### Task 9: Add staging deployment pipeline
- Auto deploy from staging branch after passing CI.
- Run post-deploy smoke checks (`/health`, critical page render).

VALIDATE:
- Failed smoke check marks deployment failed.

### Task 10: Add production deployment pipeline
- Manual approval gate before production deploy.
- Zero/minimal downtime deployment strategy.

VALIDATE:
- Production deploy logs include commit SHA and release metadata.

### Task 11: Add observability baseline
- Structured logs from backend, request ids, error correlation.
- Error tracking integration (Sentry or equivalent).
- Uptime monitors for storefront, admin, API health.

VALIDATE:
- Forced test error appears in monitoring dashboard with environment tag.

### Task 12: Configure rate limiting and abuse protection
- Enable API rate limiting and bot mitigation baseline.
- Protect auth/payment endpoints with stricter limits.

VALIDATE:
- Burst traffic over threshold returns expected throttling response.

### Task 13: Configure data backup policy
- Daily snapshots, retention window, and restore SOP.
- Document RPO/RTO assumptions.

VALIDATE:
- Restore drill in staging successfully recovers sample dataset.

### Task 14: Create rollback and incident runbook
- Define rollback triggers, ownership, and communication template.
- Include one-command or one-workflow rollback path.

VALIDATE:
- Team executes dry-run rollback in staging without ambiguity.

### Task 15: Final infra readiness gate
- Confirm all core dependencies available for app teams.

VALIDATE:
- Backend, frontend, and admin teams can run against staging without infra blockers.

---

## Gotchas
- Never share one database between staging and production.
- Avoid long-lived static secrets in local developer machines.
- Do not deploy payment credentials to preview environments.
- Keep observability enabled before first production traffic.

---

## Completion Checklist
- [ ] Environment matrix documented and validated
- [ ] MongoDB + Redis staging/prod isolated and healthy
- [ ] Hosting + domain + TLS configured
- [ ] CI + staging + production pipelines operational
- [ ] Observability + uptime checks active
- [ ] Backup/restore + rollback runbooks verified

---

## Next Feature
After infra readiness, proceed to `backend-foundation.md` and `frontend-storefront.md` in parallel (backend first for API contracts).