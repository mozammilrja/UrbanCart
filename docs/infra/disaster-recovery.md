# Disaster Recovery

## Objective
Define minimum recovery expectations and restore process.

## Targets
- RPO: <= 24 hours (maximum acceptable data loss window)
- RTO: <= 4 hours for critical services

## Backup Policy
- MongoDB snapshots daily with retention policy
- Redis persistence/snapshot policy aligned to session/cache role
- Verify restore viability at least monthly in staging

## Recovery Steps
1. Confirm incident scope (DB, cache, app host, network).
2. Freeze deploys and notify stakeholders.
3. Restore MongoDB from latest valid snapshot to recovery environment.
4. Reconnect backend to restored DB.
5. Validate auth, product, cart, checkout critical paths.
6. Re-enable traffic progressively.

## Validation Checklist
- Data integrity spot checks pass
- API health stable for 30+ minutes
- Error rate returned to baseline
- Postmortem scheduled with action items
