# APOSTLE

> Premium Indian Streetwear E-Commerce Storefront

A modern, high-performance e-commerce storefront built with Next.js 14, featuring a rich interactive experience with 3D elements, smooth animations, and a scalable architecture.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14, React 18, TypeScript |
| **Styling** | TailwindCSS, class-variance-authority |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query, Axios |
| **Animations** | Framer Motion, GSAP, Lenis (smooth scroll) |
| **3D Graphics** | React Three Fiber, Drei, Spline |
| **UI Components** | Radix UI Primitives |
| **Forms** | React Hook Form, Zod |
| **Carousel** | Embla Carousel, Swiper |

## Features

- **Product Catalog** — Browse collections, categories (hoodies, caps), and search functionality
- **Shopping Cart** — Add to cart, quantity management, persistent cart state
- **Wishlist** — Save favorite items for later
- **User Accounts** — Authentication, orders, addresses, payment methods, settings
- **Store Locator** — Find physical store locations
- **3D Experiences** — Interactive 3D product views and hero sections
- **Smooth Animations** — Page transitions and micro-interactions
- **Performance Optimized** — Dynamic imports, lazy loading, image optimization
- **SEO Ready** — Meta tags, Open Graph, structured data

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/APOSTLE.git
cd APOSTLE

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=https://apostle.in
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

## Project Structure

```
src/
├── api/              # API client, services, and auth
│   ├── auth/         # Authentication (provider, hooks, storage)
│   ├── core/         # HTTP client, endpoints, interceptors
│   └── services/     # Domain services (cart, products, orders)
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
│   ├── feedback/     # Alerts, spinners, toasts
│   ├── form/         # Form inputs
│   ├── hero/         # Hero sections
│   ├── interactive/  # Interactive elements
│   ├── layout/       # Layout components
│   ├── sections/     # Page sections
│   └── ui/           # Base UI primitives
├── config/           # App configuration (constants, routes, SEO)
├── data/             # Mock data
├── features/         # Feature modules
├── hooks/            # Custom React hooks
├── lazy/             # Lazy-loaded components
├── lib/              # Utilities and providers
├── stores/           # Zustand stores
├── styles/           # Theme and global styles
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

## Configuration

- **Currency**: INR (₹)
- **GST Rate**: 18%
- **Free Shipping**: Orders above ₹5,000
- **Max Cart Items**: 50

## License

Private — All rights reserved.
