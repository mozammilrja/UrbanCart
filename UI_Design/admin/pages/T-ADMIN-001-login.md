# T-ADMIN-001: Admin Login

## Page Overview
Secure admin authentication portal with enhanced security features.

## Wireframe

### Desktop (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                                                                 │
│                                                                                 │
│                    ┌──────────────────────────────────────────┐                │
│                    │                                          │                │
│                    │           APOSTLE                      │                │
│                    │           ──────────                     │                │
│                    │           ADMIN PORTAL                   │                │
│                    │                                          │                │
│                    │  ┌────────────────────────────────────┐  │                │
│                    │  │ Email                              │  │                │
│                    │  └────────────────────────────────────┘  │                │
│                    │                                          │                │
│                    │  ┌────────────────────────────────────┐  │                │
│                    │  │ Password                       👁  │  │                │
│                    │  └────────────────────────────────────┘  │                │
│                    │                                          │                │
│                    │  [Forgot Password?]                      │                │
│                    │                                          │                │
│                    │  ┌────────────────────────────────────┐  │                │
│                    │  │           SIGN IN                  │  │                │
│                    │  └────────────────────────────────────┘  │                │
│                    │                                          │                │
│                    │  ──────────────────────────────────────  │                │
│                    │                                          │                │
│                    │  🔒 This is a secure admin area.         │                │
│                    │     Access is logged and monitored.      │                │
│                    │                                          │                │
│                    └──────────────────────────────────────────┘                │
│                                                                                 │
│                           © 2024 APOSTLE. All rights reserved.               │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2FA Verification
```
┌──────────────────────────────────────────┐
│                                          │
│       TWO-FACTOR AUTHENTICATION          │
│                                          │
│  Enter the 6-digit code from your        │
│  authenticator app                        │
│                                          │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐    │
│  │   │ │   │ │   │ │   │ │   │ │   │    │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘    │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │            VERIFY                  │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Can't access your authenticator?        │
│  [Use recovery code]                     │
│                                          │
└──────────────────────────────────────────┘
```

### Password Reset
```
┌──────────────────────────────────────────┐
│                                          │
│           RESET PASSWORD                 │
│                                          │
│  Enter your admin email to receive       │
│  a password reset link.                  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ admin@apostle.in                 │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │         SEND RESET LINK            │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [← Back to Sign In]                     │
│                                          │
└──────────────────────────────────────────┘
```

## Security Features
- Rate limiting (5 attempts, then lockout)
- 2FA required for all admin accounts
- Session timeout (30 minutes)
- IP whitelist option
- Audit logging

## Error States
```
Invalid credentials:
┌────────────────────────────────────────┐
│ ⚠ Invalid email or password           │
└────────────────────────────────────────┘

Account locked:
┌────────────────────────────────────────┐
│ 🔒 Account locked. Too many attempts. │
│    Contact administrator.              │
└────────────────────────────────────────┘

Session expired:
┌────────────────────────────────────────┐
│ ⚠ Your session has expired.           │
│   Please sign in again.                │
└────────────────────────────────────────┘
```

## Component Dependencies
- AdminLoginForm
- TwoFactorInput
- SecurityNotice
