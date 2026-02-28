# UrbanCart Agent Instructions

**Version:** 1.1  
**Last Updated:** February 28, 2026  
**Purpose:** Define agent capabilities and workflows for UrbanCart development

## Repository Architecture (Turborepo)

UrbanCart uses a Turborepo monorepo layout:

```text
apps/
   storefront/   # Next.js storefront
   admin/        # Vite admin dashboard
   api/          # Express backend
packages/
   ui/           # shared UI components
   types/        # shared TS contracts
   config/       # shared eslint/tsconfig/prettier
   utils/        # shared helpers
```

Path mapping for legacy references:
- `frontend/*` => `apps/storefront/*`
- `backend/*` => `apps/api/*`
- `admin/*` => `apps/admin/*`

---

## Available Agents

### 1. Browser Agent (Playwright MCP)

**Purpose:** Automate browser interactions for testing, validation, and data extraction

**Capabilities:**
- Navigate and test the storefront
- Fill checkout forms and test payment flows
- Validate UI/UX requirements
- Screenshot comparisons
- Test responsive design
- Simulate user journeys

**Common Tasks:**
```bash
# Test checkout flow
agent-browser test-checkout

# Validate product page
agent-browser validate-pdp --url="http://localhost:3000/product/tee-001"

# Screenshot dashboard
agent-browser screenshot --page="admin-dashboard" --output="./screenshots"

# Test form validation
agent-browser validate-form --form="checkout-address"
```

**Example Workflow:**
1. Navigate to product page
2. Select size/color variant
3. Add to cart
4. Proceed to checkout
5. Fill shipping address
6. Validate tax calculation
7. Complete payment
8. Verify order confirmation

### 2. Git Agent (GitKraken MCP)

**Purpose:** Manage version control and collaboration workflows

**Capabilities:**
- Create feature branches
- Commit changes with structured messages
- Create and manage pull requests
- View commit history and diffs
- Stash/pop changes
- Push to remote

**Common Tasks:**
```bash
# Start feature work
agent-git start-work --issue="URBAN-123"

# Create commit
agent-git commit --message="feat: add drop countdown timer"

# Create PR
agent-git pr-create --title="Feature: Drop Engine" --base="main"

# View changes
agent-git diff HEAD~5

# Stash work
agent-git stash --name="wip-search-filter"
```

**Branch Naming Convention:**
- Feature: `feature/URBAN-123-description`
- Bug fix: `fix/URBAN-456-description`
- Hotfix: `hotfix/critical-issue`
- Release: `release/v1.0.0`

**Commit Message Convention:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

### 3. Code Analysis Agent

**Purpose:** Analyze code quality, security, and adherence to project standards

**Capabilities:**
- Detect code smells and anti-patterns
- Check TypeScript strict mode compliance
- Validate naming conventions
- Find unused code
- Identify security vulnerabilities
- Generate documentation

**Common Tasks:**
```bash
# Analyze file
agent-code analyze apps/storefront/src/api/services/products.service.ts

# Find unused exports
agent-code find-unused-exports apps/storefront/src/

# Check type safety
agent-code check-types

# Security scan
agent-code security-scan

# Generate docs
agent-code generate-docs apps/storefront/src/api/
```

**Code Standards:**
- Strict TypeScript mode with noImplicitAny
- Functional components with TypeScript props interface
- Named exports (not default exports)
- Max 300 lines per file
- Max 20 lines per function
- All public functions documented with JSDoc

---

## Workflows

### Development Workflow
```
1. Create feature branch
   agent-git start-work --issue="URBAN-XXX"

2. Develop and test
   pnpm turbo run dev --parallel
   agent-browser test-feature

3. Code analysis
   agent-code analyze apps/

4. Commit changes
   agent-git commit --message="feat: ..."

5. Push and create PR
   agent-git push
   agent-git pr-create
```

### Testing Workflow
```
1. Run linter
   pnpm turbo run lint

2. Run type check
   pnpm turbo run typecheck

3. Run unit tests
   pnpm turbo run test

4. Run E2E tests
   agent-browser run-e2e

5. Validate code quality
   agent-code analyze

6. Validate API docs
   open http://localhost:8000/docs
   curl http://localhost:8000/openapi.json
```

### Deployment Workflow
```
1. Create release branch
   agent-git start-release v1.x.x

2. Build and test
   pnpm turbo run build
   pnpm turbo run test

3. Generate changelog
   agent-git generate-changelog

4. Create release
   agent-git release-create

5. Deploy
   pnpm deploy
```

---

## Integration Points

### With API Documentation (Swagger UI)
- Mount Swagger UI at `/docs`
- Expose OpenAPI JSON at `/openapi.json`
- Keep endpoint docs synced with request validation schemas
- Use Swagger "Try it out" for backend/frontend contract validation

### With Testing
- Run E2E tests with Playwright agent
- Validate critical user flows
- Screenshot comparison for UI regressions
- Performance metrics collection

### With Version Control
- Link commits to issue trackers
- Auto-generate changelogs
- Enforce commit message standards
- Manage release branches

### With Code Quality
- Pre-commit hooks for linting
- Type checking validation
- Security scanning
- Documentation coverage checks

---

## Environment Setup

### Playwright Configuration
```javascript
// playwright.config.ts
module.exports = {
  testDir: './e2e',
  webServer: {
    command: 'pnpm dev',
    port: 3000
  },
  use: {
    baseURL: 'http://localhost:3000'
  }
};
```

### Swagger UI Configuration (Backend)
```typescript
// apps/api/src/docs/swagger.ts
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const spec = swaggerJsdoc({
   definition: {
      openapi: '3.0.3',
      info: { title: 'UrbanCart API', version: '1.0.0' },
   },
   apis: ['src/modules/**/*.ts'],
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
app.get('/openapi.json', (_req, res) => res.json(spec));
```

### Git Configuration
```bash
# Set user identity
git config user.name "UrbanCart Bot"
git config user.email "bot@urbancart.dev"

# Set up commit template
git config commit.template .gitmessage
```

---

## Security & Compliance

### Passwords & Secrets
- Never log sensitive data
- Use environment variables
- Rotate tokens regularly
- Masked in logs and screenshots

### Data Handling
- No PII in test data
- No real payment info
- Use mock data for testing
- Sanitize E2E screenshots

### Access Control
- Browser agent: Read-only for prod
- Git agent: Branch protection rules
- Code agent: No destructive analysis

---

## Troubleshooting

### Browser Agent Issues

**Problem:** Timeouts during navigation
```bash
# Solution: Increase timeout
agent-browser test-checkout --timeout=30000
```

**Problem:** Screenshot comparison fails
```bash
# Solution: Update baseline
agent-browser screenshot --update-baseline
```

### Git Agent Issues

**Problem:** Merge conflicts
```bash
# Solution: Interactive rebase
agent-git rebase --interactive main
```

**Problem:** Detached HEAD state
```bash
# Solution: Return to branch
agent-git checkout main
```

### Code Analysis Issues

**Problem:** False positives in security scan
```bash
# Solution: Add ignore patterns
agent-code security-scan --ignore-patterns="test/**"
```

---

## Performance Targets

- Browser test execution: <5 min per suite
- Code analysis: <30 sec per file
- Git operations: <2 sec per command
- Build + test: <3 min full pipeline

---

## References

- [Playwright Docs](https://playwright.dev)
- [Project CLAUDE.md](../CLAUDE.md)
- [System Design](./SYSTEM_DESIGN.md)
- [Commit Convention](https://www.conventionalcommits.org/)

---

*Last Updated: February 28, 2026*  
*Next Review: August 28, 2026*
