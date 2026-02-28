# Infrastructure Runbook

## Purpose
Provide operational procedures for deploy, validation, rollback, and incident triage.

## Pre-Deploy Checklist
- CI is green (lint, typecheck, tests)
- Staging smoke checks pass
- Release notes prepared
- Rollback target identified (previous stable SHA)

## Post-Deploy Smoke Checks
- API health endpoint responds `200`
- Storefront home/product/cart pages render
- Admin login + dashboard load
- Error monitoring has no spike in critical errors

## Rollback Procedure
1. Identify failing release SHA.
2. Trigger production rollback workflow to previous stable SHA.
3. Verify health checks and critical user flows.
4. Post incident update with timeline + impact.

## Incident Severity Guide
- Sev 1: Payment/checkout unavailable or major data risk
- Sev 2: Core browsing/cart partially degraded
- Sev 3: Non-critical admin/reporting issues

## Ownership
- Incident Commander: on-call engineer
- Communications: product/ops owner
- Resolution: service owner (frontend/backend/admin)
