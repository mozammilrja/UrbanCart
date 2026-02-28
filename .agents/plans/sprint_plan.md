# UrbanCart Sprint Planning Template

**Sprint Cycle:** Bi-weekly (2 weeks)  
**Planning Date:** Every other Monday  
**Review Date:** Every other Friday

---

## Sprint Structure

### Sprint Planning (Monday, 10:00 AM)
- Review previous sprint (2 hours)
- Estimate new stories using Fibonacci
- Assign to team members
- Identify blockers & dependencies
- Set sprint goal

### Daily Standup (10:30 AM, 15 min)
- What did I complete?
- What will I work on today?
- Any blockers?

### Mid-Sprint Check-in (Wednesday, 3:00 PM)
- Scope review
- Risk assessment
- Dependency check

### Sprint Review (Friday, 2:00 PM, 1.5 hours)
- Demo completed work
- Get stakeholder feedback
- Gather QA sign-off

### Retrospective (Friday, 3:30 PM, 1 hour)
- What went well?
- What needs improvement?
- Action items for next sprint

---

## Sprint Capacity Planning

### Team Size & Capacity
```
Developers:     4 engineers × 10 story points = 40 points
QA:             1 engineer × 5 story points = 5 points
DevOps:         0.5 engineer × 2 story points = 2 points
Design:         0.5 person × 2 story points = 2 points

Total Capacity: ~49 story points per sprint
Buffer:         20% for bugs/tech debt = ~40 points available
```

### Estimated Velocity
- Sprint 1-2: 30 points (ramp-up)
- Sprint 3+: 40 points (full capacity)
- Long-term: 40-45 points (stable)

---

## Sample Sprint (May 2026) - Sprint 1

**Sprint Goal:** "Set up infrastructure and begin auth implementation"

### Stories & Tasks

#### Backend Auth (Sprint 1) - 13 points
```
AS a user
I WANT to register with email and password
SO THAT I can create an account

Acceptance Criteria:
- [ ] Endpoint POST /api/v1/auth/register
- [ ] Email validation (RFC 5322)
- [ ] Password requirements (min 8, uppercase, number)
- [ ] Duplicate email check
- [ ] Send verification email (Resend)
- [ ] Return 201 with user data on success
- [ ] Hash password with Argon2id
- [ ] Unit tests (>90% coverage)
- [ ] API documentation

Estimate: 5 points
Assignee: Backend Dev 1
Depends on: Database setup
```

#### Email Verification (Sprint 1) - 8 points
```
AS a user
I WANT to verify my email address
SO THAT my account is fully activated

Acceptance Criteria:
- [ ] Email token generation (secure, expires in 24h)
- [ ] Endpoint GET /api/v1/auth/verify?token=xxx
- [ ] Resend verification email option
- [ ] Mark user as emailVerified
- [ ] Unit & integration tests

Estimate: 3 points
Assignee: Backend Dev 1
Depends on: Auth registration
```

#### Database Setup (Sprint 1) - 8 points
```
AS a developer
I WANT to have MongoDB schema setup
SO THAT we can store user and product data

Acceptance Criteria:
- [ ] MongoDB M10 cluster created (Atlas)
- [ ] Connection string secured in .env
- [ ] User schema with indexes
- [ ] Product schema with indexes
- [ ] Seed script for test data
- [ ] Backup configuration
- [ ] Documentation

Estimate: 5 points
Assignee: DevOps/Backend Lead
Depends on: None
```

#### Login & JWT (Sprint 1) - 8 points
```
AS an authenticated user
I WANT to log in with email and password
SO THAT I can access my account

Acceptance Criteria:
- [ ] Endpoint POST /api/v1/auth/login
- [ ] Check password with Argon2id
- [ ] Generate JWT tokens (15min access, 7-day refresh)
- [ ] Set httpOnly refresh token cookie
- [ ] Return access token + user data
- [ ] Unit & integration tests
- [ ] Error handling (invalid credentials)

Estimate: 5 points
Assignee: Backend Dev 2
Depends on: Auth registration
```

#### GitHub Actions CI/CD (Sprint 1) - 3 points
```
AS a developer
I WANT to have automated CI/CD
SO THAT code quality is maintained

Acceptance Criteria:
- [ ] Lint workflow (ESLint)
- [ ] Type check (TypeScript)
- [ ] Unit tests (Vitest)
- [ ] Build verification
- [ ] Fail on errors

Estimate: 3 points
Assignee: DevOps
Depends on: Repository setup
```

#### API Documentation (Sprint 1) - 3 points
```
AS a developer
I WANT to have API docs
SO THAT I can understand the endpoints

Acceptance Criteria:
- [ ] OpenAPI/Swagger spec
- [ ] Example requests & responses
- [ ] Authentication docs
- [ ] Error code documentation

Estimate: 2 points
Assignee: Backend Lead
Depends on: API endpoints
```

### Sprint Metrics

```
Sprint 1 Planning:
├── Total Points: 45 (within 40-49 capacity)
├── Backend Work: 34 points (70%)
├── DevOps Work: 8 points (18%)
├── Documentation: 3 points (7%)
├── Stretch Goal: 5 extra points (buffer)
└── Risk: Low (straightforward infrastructure setup)
```

---

## Sprint Execution Template

### Story Status Board

| Story | Status | Progress | Blockers | ETA |
|-------|--------|----------|----------|-----|
| Auth Registration | In Progress | 50% | None | Wed |
| Email Verification | Not Started | 0% | Auth blocking | Thu |
| Database Setup | In Progress | 75% | None | Tue |
| Login & JWT | Not Started | 0% | Auth blocking | Fri |
| CI/CD Pipeline | In Progress | 25% | None | Fri |

### Daily Progress

**Monday:**
- Sprint planning complete
- Stories assigned
- Capacity: 45 points

**Tuesday:**
- Auth registration: 50% complete
- Database setup: 75% complete
- Blockers: None

**Wednesday:**
- Auth registration: Complete (moved to review)
- Email verification: Started (50%)
- Database setup: Complete
- Mid-sprint check-in OK

**Thursday:**
- Email verification: Complete
- Login & JWT: 50% complete
- CI/CD: 25% complete
- On track for sprint goals

**Friday:**
- Login & JWT: Complete
- CI/CD: 75% complete (some refinement needed in next sprint)
- API docs: Complete
- Sprint review at 2 PM
- Retrospective at 3:30 PM

### Burndown Chart

```
Points Remaining vs Days

50 ├─ ■ (Monday)
   │
40 ├─ ░ ■ (Tuesday)
   │    
30 ├─ ░ ░ ■ (Wednesday)
   │         
20 ├────┤ ░ ░ ■ (Thursday)
   │         
10 ├────────┤ ░ ░ ■ (Friday)
   │                 
 0 └────────────────── ✓ Complete
   M  T  W  T  F
```

---

## Defect Management

### Critical (P0) - Fix Immediately
- Security vulnerabilities
- Data loss
- Payment failures
- Production outages

**SLA:** 1 hour response

### High (P1) - Fix in Current Sprint
- Major feature broken
- Significant performance issue
- UX blocker

**SLA:** 4 hour response

### Medium (P2) - Fix When Possible
- Minor bugs
- Small performance issues
- Polish items

**SLA:** Next sprint

### Low (P3) - Document for Later
- Edge cases
- Nice-to-haves
- Design polish

**SLA:** Backlog

---

## Sprint Retrospective Template

### What Went Well? ✅
- Example: "Auth implementation was smooth"
- Example: "Good collaboration on DB design"

### What Could Be Better? 📈
- Example: "Needed more upfront testing"
- Example: "API documentation took longer than expected"

### Action Items 🎯
- [ ] Action: Create testing checklist
  Owner: QA Lead
  Due: Next sprint
  
- [ ] Action: Improve estimation for docs
  Owner: Team
  Due: This sprint

### Velocity Trend
- Sprint 1: 35 points (ramp-up)
- Sprint 2: 38 points (increasing)
- Sprint 3: 42 points (target)

---

## Definition of Done (DoD)

A story is "Done" when:

- [ ] Code written and reviewed (2+ approvals)
- [ ] Unit tests written (>80% coverage)
- [ ] Integration tests passing
- [ ] Linting & type checking passing
- [ ] Documentation updated
- [ ] Security review completed
- [ ] API docs updated (if backend)
- [ ] QA sign-off received
- [ ] No open blockers
- [ ] Ready for deployment

---

## Risk Management

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Database connection issues | High | Low | Connection pooling, retry logic |
| JWT implementation bugs | High | Low | Thorough unit testing |
| Email delivery failures | Medium | Low | Use Resend + retry queue |
| Performance degradation | Medium | Low | Load testing early |

### Resource Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|-----------|
| Developer absence | High | Low | Cross-training, pair programming |
| Scope creep | Medium | High | Strict MVP definition |
| Integration delays | Medium | Low | Start integrations early |

---

## Dependencies & Blockers

### Inter-Sprint Dependencies
```
Sprint 1 → Sprint 2
├─ Database setup (MUST complete)
├─ Auth complete (BLOCKS cart)
└─ API structure set (BLOCKS all features)

Sprint 2 → Sprint 3
├─ Product catalog (BLOCKS checkout)
└─ Cart implementation (BLOCKS checkout)
```

### External Dependencies
- Razorpay sandbox access
- MongoDB Atlas M10 cluster
- Cloudinary account setup
- Vercel project creation

---

## Communication Template

### Daily Standup Report
```
Team: Backend
Date: Tuesday, May 7, 2026

✅ Completed:
- Auth registration endpoint (50%)

🏗️ In Progress:
- Email verification (50%)

⚠️ Blockers:
- None

📅 Next:
- Complete email verification by Wednesday
```

### Sprint Summary Report
```
Sprint 1 (May 1-15) - COMPLETE

Goal: "Infrastructure & Auth Foundation"

Results:
├─ Stories Completed: 5/6 (83%)
├─ Points: 43/45 (96%)
├─ Quality: 100% unit test coverage
├─ Velocity: 43 points
└─ On Schedule: YES ✓

Metrics:
├─ Code Coverage: 91%
├─ Test Pass Rate: 100%
├─ Build Success: 100%
└─ Deployment: Successful

Next Sprint: Products & Catalog
```

---

## Tools & Integration

### Jira Configuration
- Epic: Phase 1 MVP
- Issues linked to GitHub
- Burndown chart enabled
- Velocity tracking

### GitHub Integration
- Branches named `feature/#ISSUE-ID`
- PRs linked to Jira issues
- Automated status updates

### Slack Notifications
- Daily standup reminder (10:30 AM)
- Deployment notifications
- Build failure alerts
- PR review requests

---

*Last Updated: February 28, 2026*  
*Template Version: 1.0*  
*Next Review: May 1, 2026 (Sprint Kickoff)*
