# T-CLIENT-011: Login/Register Page

## Page Overview
Authentication pages for user sign-in, registration, and password recovery.

## Wireframe

### Desktop Login (1280px+)
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  APOSTLE                                                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌────────────────────────────────────┬────────────────────────────────────────┐│
│  │                                    │                                        ││
│  │                                    │    WELCOME BACK                        ││
│  │                                    │                                        ││
│  │                                    │    [LOGIN]  [REGISTER]                 ││
│  │                                    │    ═════                               ││
│  │                                    │                                        ││
│  │                                    │    Email or Phone *                    ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │                                │  ││
│  │        [BRAND IMAGE/               │    └────────────────────────────────┘  ││
│  │         ILLUSTRATION]              │                                        ││
│  │                                    │    Password *                          ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │                            👁  │  ││
│  │                                    │    └────────────────────────────────┘  ││
│  │                                    │                                        ││
│  │                                    │    ☐ Remember me     [Forgot Password?]││
│  │                                    │                                        ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │          SIGN IN               │  ││
│  │                                    │    └────────────────────────────────┘  ││
│  │                                    │                                        ││
│  │                                    │    ─────────── OR ───────────          ││
│  │                                    │                                        ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │ 🔵 Continue with Google        │  ││
│  │                                    │    └────────────────────────────────┘  ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │ 📘 Continue with Facebook      │  ││
│  │                                    │    └────────────────────────────────┘  ││
│  │                                    │                                        ││
│  │                                    │    Don't have an account?              ││
│  │                                    │    [Create one now]                    ││
│  │                                    │                                        ││
│  └────────────────────────────────────┴────────────────────────────────────────┘│
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                           © 2024 APOSTLE                                      │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Desktop Register
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  APOSTLE                                                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌────────────────────────────────────┬────────────────────────────────────────┐│
│  │                                    │                                        ││
│  │                                    │    JOIN APOSTLE                      ││
│  │                                    │                                        ││
│  │                                    │    [LOGIN]  [REGISTER]                 ││
│  │                                    │             ════════                   ││
│  │                                    │                                        ││
│  │                                    │    Full Name *                         ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │                                │  ││
│  │                                    │    └────────────────────────────────┘  ││
│  │        [BRAND IMAGE/               │                                        ││
│  │         ILLUSTRATION]              │    Email *                             ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │        "Your style.                │    │                                │  ││
│  │         Your statement."           │    └────────────────────────────────┘  ││
│  │                                    │                                        ││
│  │                                    │    Phone Number *                      ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │ +91                            │  ││
│  │                                    │    └────────────────────────────────┘  ││
│  │                                    │                                        ││
│  │                                    │    Password *                          ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │                            👁  │  ││
│  │                                    │    └────────────────────────────────┘  ││
│  │                                    │    Password strength: ████░░░░ Medium  ││
│  │                                    │                                        ││
│  │                                    │    ☑ I agree to the Terms of Service   ││
│  │                                    │      and Privacy Policy                ││
│  │                                    │                                        ││
│  │                                    │    ☐ Send me updates and offers        ││
│  │                                    │                                        ││
│  │                                    │    ┌────────────────────────────────┐  ││
│  │                                    │    │       CREATE ACCOUNT           │  ││
│  │                                    │    └────────────────────────────────┘  ││
│  │                                    │                                        ││
│  │                                    │    Already have an account?            ││
│  │                                    │    [Sign in]                           ││
│  │                                    │                                        ││
│  └────────────────────────────────────┴────────────────────────────────────────┘│
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Forgot Password Flow
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                              RESET PASSWORD                                     │
│                                                                                 │
│                 Enter your email and we'll send you a link                      │
│                         to reset your password.                                 │
│                                                                                 │
│                    Email *                                                      │
│                    ┌────────────────────────────────────────┐                   │
│                    │ john@example.com                       │                   │
│                    └────────────────────────────────────────┘                   │
│                                                                                 │
│                    ┌────────────────────────────────────────┐                   │
│                    │          SEND RESET LINK               │                   │
│                    └────────────────────────────────────────┘                   │
│                                                                                 │
│                    Remember your password? [Sign in]                            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

Email Sent State:
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                   ✉️                                            │
│                                                                                 │
│                           CHECK YOUR EMAIL                                      │
│                                                                                 │
│              We sent a password reset link to                                   │
│                    john@example.com                                             │
│                                                                                 │
│              Didn't receive it? [Resend email]                                  │
│                                                                                 │
│                         [Back to Sign In]                                       │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### OTP Verification
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                           VERIFY YOUR PHONE                                     │
│                                                                                 │
│                 Enter the 6-digit code sent to                                  │
│                      +91 98765 43210                                            │
│                                                                                 │
│               ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐                             │
│               │ 4 │ │ 5 │ │ 2 │ │ 1 │ │   │ │   │                             │
│               └───┘ └───┘ └───┘ └───┘ └───┘ └───┘                             │
│                                                                                 │
│                    ┌────────────────────────────────────────┐                   │
│                    │             VERIFY                     │                   │
│                    └────────────────────────────────────────┘                   │
│                                                                                 │
│               Didn't receive code? Resend in 00:45                              │
│                                                                                 │
│               [Change phone number]                                             │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile Login
```
┌─────────────────────────────┐
│ ←                           │
├─────────────────────────────┤
│                             │
│      APOSTLE              │
│                             │
│   WELCOME BACK              │
│                             │
│   [LOGIN] [REGISTER]        │
│   ═════                     │
│                             │
│   Email or Phone *          │
│   ┌───────────────────────┐ │
│   │                       │ │
│   └───────────────────────┘ │
│                             │
│   Password *                │
│   ┌───────────────────────┐ │
│   │                   👁  │ │
│   └───────────────────────┘ │
│                             │
│   [Forgot Password?]        │
│                             │
│   ┌───────────────────────┐ │
│   │      SIGN IN          │ │
│   └───────────────────────┘ │
│                             │
│   ──────── OR ────────      │
│                             │
│   [🔵 Google] [📘 Facebook] │
│                             │
│   Don't have an account?    │
│   [Create one now]          │
│                             │
└─────────────────────────────┘
```

## Form Validation

### Email Validation
```
Valid:
┌────────────────────────────────┐
│ john@example.com           ✓  │
└────────────────────────────────┘

Invalid:
┌────────────────────────────────┐
│ invalid-email                  │  ← Red border
└────────────────────────────────┘
⚠ Please enter a valid email
```

### Password Requirements
```
Password *
┌────────────────────────────────┐
│ ●●●●●●●●                   👁 │
└────────────────────────────────┘

Password strength:
████░░░░░░ Weak      ← Red
██████░░░░ Medium    ← Yellow
██████████ Strong    ← Green

Requirements:
✓ At least 8 characters
✓ One uppercase letter
✕ One number
✕ One special character
```

### Phone Validation
```
Phone Number *
┌────────────────────────────────┐
│ +91 │ 98765 43210             │
└────────────────────────────────┘
     ↑
  Country code
```

## Authentication States

### Login Error
```
┌────────────────────────────────────────────────────────────┐
│ ⚠ Invalid email or password. Please try again.            │
│   [Forgot your password?]                                  │
└────────────────────────────────────────────────────────────┘
```

### Account Locked
```
┌────────────────────────────────────────────────────────────┐
│ 🔒 Account temporarily locked due to too many attempts.    │
│   Please try again in 15 minutes or reset your password.   │
└────────────────────────────────────────────────────────────┘
```

### Success
```
┌────────────────────────────────────────────────────────────┐
│ ✓ Account created successfully! Redirecting...            │
└────────────────────────────────────────────────────────────┘
```

## Social Login
- Google OAuth 2.0
- Facebook Login
- Apple Sign-In (iOS/Safari)

## Security Features
- Rate limiting on login attempts
- CAPTCHA after failed attempts
- Session management
- Secure cookie handling
- CSRF protection

## Data Requirements
```typescript
interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
}
```

## Component Dependencies
- AuthTabs
- InputField
- PasswordInput
- PhoneInput
- OTPInput
- SocialLoginButtons
- PasswordStrengthMeter
- FormError
