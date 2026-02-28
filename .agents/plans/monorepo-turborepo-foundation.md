# Monorepo Foundation (Turborepo)

## Feature Description
Set up UrbanCart as a Turborepo monorepo with isolated apps and shared packages for UI, configs, and types.

## Problem Statement
Current plans refer to standalone `frontend`, `backend`, and `admin` paths. Without a monorepo foundation, cross-app consistency, shared libraries, and CI performance are fragmented.

## Solution Statement
Adopt Turborepo workspace architecture with `apps/*` and `packages/*`, standardized scripts, shared TS config, and cache-aware CI to accelerate multi-app development.

---

## Context References

Read first:
- `.claude/PRD.md` → product modules and team boundaries
- `.claude/SYSTEM_DESIGN.md` → service boundaries and interfaces
- `.agents/plans/infra-foundation.md` → environment + CI prerequisites
- `CLAUDE.md` → coding conventions and stack requirements

---

## Target Structure

```text
UrbanCart/
├── apps/
│   ├── storefront/        # Next.js storefront
│   ├── admin/             # Vite admin app
│   └── api/               # Express backend
├── packages/
│   ├── ui/                # shared UI primitives
│   ├── types/             # shared TypeScript contracts
│   ├── config/            # shared eslint/tsconfig/prettier
│   └── utils/             # shared utilities
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Atomic Tasks

### Task 1: Initialize root workspace
- Create root `package.json` with workspace scripts.
- Create `pnpm-workspace.yaml` for `apps/*` and `packages/*`.

VALIDATE:
- `pnpm install` resolves all workspaces.

### Task 2: Add Turborepo pipeline
- Create `turbo.json` with `dev`, `build`, `lint`, `typecheck`, `test` tasks.
- Configure task dependencies and outputs.

VALIDATE:
- `pnpm turbo run build` completes across workspaces.

### Task 3: Create app workspaces
- `apps/storefront` (Next.js), `apps/admin` (Vite), `apps/api` (Express TS).
- Ensure each app has independent scripts.

VALIDATE:
- `pnpm turbo run dev --parallel` starts all apps.

### Task 4: Create shared packages
- `packages/types` for API/data contracts.
- `packages/config` for lint/tsconfig presets.
- `packages/ui` for shared UI components.

VALIDATE:
- Apps can import from shared packages without local path hacks.

### Task 5: Configure TypeScript project references
- Add base tsconfig and per-workspace extends.
- Configure path aliases where needed.

VALIDATE:
- `pnpm turbo run typecheck` passes.

### Task 6: Standardize lint/format tooling
- Centralize ESLint/Prettier config in `packages/config`.

VALIDATE:
- `pnpm turbo run lint` runs consistently in all apps.

### Task 7: Add monorepo-aware CI
- Run Turbo tasks with remote/local caching.
- Use affected task execution strategy where applicable.

VALIDATE:
- CI duration improves on incremental changes.

### Task 8: Define legacy path mapping
- Map old plan paths to monorepo paths:
  - `frontend/*` → `apps/storefront/*`
  - `backend/*` → `apps/api/*`
  - `admin/*` → `apps/admin/*`

VALIDATE:
- Agents can execute existing plans using this mapping without confusion.

---

## Gotchas
- Avoid circular dependencies between `packages/*`.
- Keep `packages/types` runtime-free where possible.
- Do not over-share app-specific code into shared packages prematurely.

---

## Completion Checklist
- [ ] Workspace and turbo pipeline initialized
- [ ] apps/storefront, apps/admin, apps/api created
- [ ] shared packages wired and consumed
- [ ] lint/typecheck/build/test run through turbo
- [ ] path mapping documented for all feature plans

---

## Next Feature
After this plan, execute `infra-foundation.md`, then `backend-foundation.md` using monorepo paths.