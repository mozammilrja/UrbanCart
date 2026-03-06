/**
 * Lazy Loading - Landing Page
 */

import dynamic from 'next/dynamic';

// Lazy load hero sections
export const BluorngHeroSection = dynamic(
  () => import('@/components/hero/BluorngHeroSection').then((mod) => mod.BluorngHeroSection),
  {
    loading: () => (
      <div className="h-screen animate-pulse bg-neutral-100" />
    ),
    ssr: true,
  }
);

// Lazy load heavy 3D components
export const HeroSpline = dynamic(
  () => import('@/components/hero/hero-spline').then((mod) => mod.HeroSpline),
  {
    loading: () => (
      <div className="h-screen animate-pulse bg-neutral-900" />
    ),
    ssr: false,
  }
);

// Lazy load sections below the fold
export const ProductGridSection = dynamic(
  () => import('@/components/sections/ProductGridSection').then((mod) => mod.ProductGridSection),
  {
    loading: () => (
      <div className="h-96 animate-pulse bg-neutral-100" />
    ),
  }
);

export const StoreLocationsSection = dynamic(
  () => import('@/components/sections/StoreLocationsSection').then((mod) => mod.StoreLocationsSection),
  {
    loading: () => (
      <div className="h-96 animate-pulse bg-neutral-100" />
    ),
  }
);
