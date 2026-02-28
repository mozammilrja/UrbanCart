# Environments

## Purpose
Define environment boundaries, ownership, and variable policy for UrbanCart.

## Environment Matrix

| Environment | Branch Source | Data Policy | External Integrations | Access |
|-------------|---------------|-------------|-----------------------|--------|
| local | feature/* | local/mock | sandbox only | developers |
| staging | develop (or staging branch) | synthetic/anonymized | sandbox only | team/internal QA |
| production | main | real user data | live integrations | restricted ops/admin |

## URL Convention
- Storefront: `https://<env>.store.urbancart` (or platform equivalent)
- API: `https://<env>.api.urbancart`
- Admin: `https://<env>.admin.urbancart`

## Variable Ownership
- Application variables: owned by app team
- Platform/infra secrets: owned by ops/devops
- Payment credentials: restricted to backend + ops

## Rules
- Never reuse production secrets in local/staging.
- Never connect staging services to production DB/cache.
- Rotate JWT/payment/webhook secrets on schedule.
