# Initialize APOSTLE Frontend

Set up the Next.js 14 e-commerce storefront from scratch.

## Prerequisites

Ensure these are installed:
- Node.js 18.17+ (`node --version`)
- pnpm 8+ (`pnpm --version`) - Install via `npm install -g pnpm`

## 1. Create Next.js 14 Project

```bash
pnpm create next-app@14 frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd frontend
```

Options selected:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Import alias: `@/*`

## 2. Install Core Dependencies

```bash
# State Management & Data Fetching
pnpm add @tanstack/react-query@5 zustand@4

# Forms & Validation
pnpm add react-hook-form zod @hookform/resolvers

# HTTP Client
pnpm add axios

# UI Components (shadcn/ui)
pnpm dlx shadcn@latest init
```

When prompted by shadcn/ui:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

## 3. Install shadcn/ui Components

```bash
pnpm dlx shadcn@latest add button input label card dialog dropdown-menu select tabs toast skeleton badge separator sheet scroll-area avatar
```

## 4. Install Additional Dependencies

```bash
# Styling utilities
pnpm add class-variance-authority clsx tailwind-merge

# Icons
pnpm add lucide-react

# Date handling (for orders/drops)
pnpm add date-fns
```

## 5. Install Dev Dependencies

```bash
pnpm add -D @types/node prettier prettier-plugin-tailwindcss
```

## 6. Create Project Structure

```bash
mkdir -p src/{api/{auth,core,services},features,components/{layout,form,feedback,ui},hooks,stores,lib,config,types,utils}
```

Directory structure:
```
src/
├── api/                 # API layer
│   ├── auth/           # Auth API, hooks, provider
│   ├── core/           # Axios client, endpoints, interceptors
│   └── services/       # Domain services (products, cart, etc.)
├── app/                # Next.js App Router pages
├── features/           # Domain-driven feature modules
├── components/         # Shared components
│   ├── layout/        # Header, Footer, Sidebar
│   ├── form/          # Form components
│   ├── feedback/      # Toast, Spinner, Alert
│   └── ui/            # shadcn/ui primitives
├── hooks/             # Global custom hooks
├── stores/            # Zustand stores
├── lib/               # Utilities, providers
├── config/            # Routes, navigation, theme
├── types/             # Shared TypeScript types
└── utils/             # Helper functions
```

## 7. Create Utility Files

Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 8. Configure TypeScript

Update `tsconfig.json` to add strict settings:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

## 9. Create Environment File

Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=APOSTLE
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
```

## 10. Add npm Scripts

Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx}\""
  }
}
```

## 11. Start Development Server

```bash
pnpm dev
```

Next.js dev server runs on http://localhost:3000 with:
- Hot Module Replacement (HMR)
- Fast Refresh for React components
- TypeScript error overlay

## Validation

```bash
# Check server is running
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3000

# Verify build works
pnpm build

# Check for TypeScript errors
pnpm typecheck

# Lint the codebase
pnpm lint
```

## Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 (planned) |

## Quick Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm format` | Format with Prettier |

## Testing Setup (Optional)

```bash
# Unit testing with Vitest
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom

# E2E testing with Playwright
pnpm add -D @playwright/test
pnpm exec playwright install
```

## Notes

- Uses Next.js 14 App Router with React Server Components
- shadcn/ui components are copied to `src/components/ui/`
- TanStack Query handles server state, Zustand handles client state
- All styling via Tailwind CSS - no separate CSS files
- Reference `CLAUDE.md` for code conventions and patterns
- Reference `.claude/PRD.md` for full requirements
