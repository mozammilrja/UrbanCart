# Assets Directory

This directory contains static assets for the application.

## Structure

```
assets/
├── images/       # Product images, backgrounds, etc.
├── icons/        # SVG icons and icon sprites
└── illustrations/# Decorative illustrations and graphics
```

## Usage

Reference assets using the `/assets/` prefix in your code:

```tsx
// Images
<Image src="/assets/images/hero.jpg" alt="Hero" />

// Icons (prefer inline SVG components for icons)
import { IconName } from '@/components/icons';
```

## Guidelines

- Use WebP format for images when possible
- Keep icons as SVG for scalability
- Optimize all images before committing
- Use descriptive file names (e.g., `hero-banner-desktop.webp`)
