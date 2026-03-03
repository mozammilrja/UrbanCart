# APOSTLE

**Next-Generation Indian Streetwear Platform**

A digitally-native, culturally-grounded e-commerce platform positioned at the intersection of designer-led narrative identity, multi-brand cultural retail, and high-performance e-commerce architecture.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.x-FF4154)](https://tanstack.com/query)

## Features

### Core E-Commerce
- 🛍️ Product catalog with categories, collections, and variants
- 🔍 Full-text search with filters
- 🛒 Shopping cart with real-time updates
- 💳 Indian payments (Razorpay: UPI, cards, wallets, netbanking)
- 📦 Order tracking and history

### Architecture
- ⚡ Next.js 14 App Router with SSR/SSG
- 🎨 Tailwind CSS + shadcn/ui components
- 📊 TanStack Query for server state
- 🗄️ Zustand for client state
- 🔐 JWT authentication with refresh tokens

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS 3.x |
| UI Components | shadcn/ui |
| State (Server) | TanStack Query 5.x |
| State (Client) | Zustand 4.x |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Date | Day.js |

## Getting Started

### Prerequisites

- Node.js 20+ LTS
- pnpm 8+ (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/APOSTLE.git
cd APOSTLE

# Install dependencies
cd frontend
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
APOSTLE/
├── frontend/                    # Next.js 14 Storefront
│   ├── src/
│   │   ├── api/                # API layer (auth, services, core client)
│   │   ├── app/                # Next.js App Router pages
│   │   ├── features/           # Domain-driven feature modules
│   │   ├── components/         # Shared UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── stores/             # Zustand state stores
│   │   ├── lib/                # Utilities & providers
│   │   ├── config/             # App configuration
│   │   ├── types/              # TypeScript types
│   │   └── utils/              # Helper functions
│   ├── public/                 # Static assets
│   └── package.json
│
├── html_templates/             # Static HTML reference designs
├── research/                   # BRD, PRD, TRD documentation
├── .claude/                    # AI assistant context
│   └── PRD.md                  # Product Requirements Document
└── README.md
```

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server with hot reload
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm typecheck        # TypeScript type checking

# Testing (planned)
pnpm test             # Run unit tests
pnpm test:e2e         # Run Playwright E2E tests
```

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=APOSTLE
NEXT_PUBLIC_SENTRY_DSN=           # Optional: Error tracking
```

## Documentation

| Document | Description |
|----------|-------------|
| [PRD](.claude/PRD.md) | Product Requirements & Architecture |
| [BRD](research/BRD.md) | Business Requirements |
| [TRD](research/TRD.md) | Technical Requirements |

## Roadmap

- [x] Project setup with Next.js 14
- [x] Component architecture
- [x] API layer with TanStack Query
- [ ] Authentication flow
- [ ] Product catalog pages
- [ ] Shopping cart & checkout
- [ ] Payment integration (Razorpay)
- [ ] Admin panel (React + Vite)
- [ ] Backend API (Express + MongoDB)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for Indian streetwear culture**
