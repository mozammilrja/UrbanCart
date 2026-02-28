# Frontend Execution Index (Agent)

Document Version: 1.0  
Date: 28 February 2026

## Purpose

This index is the agent-operational entrypoint for frontend execution.

- Source of truth remains in `plans/`.
- Agent execution checklists and runbooks live in `.agents/plans/`.

## Files

- Client Execution Plan: [.agents/plans/client_execution_plan.md](.agents/plans/client_execution_plan.md)
- Admin Execution Plan: [.agents/plans/admin_execution_plan.md](.agents/plans/admin_execution_plan.md)

## Source of Truth Links

- Client Source Plan: [plans/client/client_frontend_page_coverage_plan.md](plans/client/client_frontend_page_coverage_plan.md)
- Admin Source Plan: [plans/admin/admin_frontend_page_coverage_plan.md](plans/admin/admin_frontend_page_coverage_plan.md)
- Primary Index: [plans/frontend_plans_index.md](plans/frontend_plans_index.md)

## Agent Rules

1. Do not add/remove routes without updating source plans in `plans/` first.
2. Treat this folder as execution-layer guidance, not scope authority.
3. Validate route parity before marking any module complete.
4. Enforce MVP boundary and excluded Phase-2 features.
