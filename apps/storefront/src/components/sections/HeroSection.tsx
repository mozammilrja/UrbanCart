'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { memo, Suspense } from 'react';

// Dynamically import HeroOrb to reduce initial JS
const HeroOrb = dynamic(
  () => import('@/components/hero/hero-orb').then(mod => ({ default: mod.HeroOrb })),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0" aria-hidden="true" />
  }
);

// Lazy load HeroSpline only when needed
const HeroSpline = dynamic(
  () => import('@/components/hero/hero-spline').then(mod => ({ default: mod.HeroSpline })),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0" aria-hidden="true" />
  }
);

interface HeroSectionProps {
  /** Desktop background image */
  image: string;
  /** Mobile background image */
  mobileImage?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Spline scene URL for 3D interactive element */
  splineUrl?: string;
  /** Show Spline 3D viewer */
  showSpline?: boolean;
  /** Show floating orb */
  showOrb?: boolean;
  /** Custom orb icon src */
  orbIconSrc?: string;
  /** Image to display inside the orb */
  orbImageSrc?: string;
}

function HeroSectionComponent({
  image,
  mobileImage,
  ctaText = 'Shop now',
  ctaHref = '/collections/all-products',
  splineUrl,
  showSpline = false,
  showOrb = true,
  orbIconSrc,
  orbImageSrc,
}: HeroSectionProps) {
  return (
    <section 
      className="hero-section relative w-full h-screen min-h-[600px]"
      aria-label="Hero banner"
    >
      <div className="hero-section-main relative w-full h-full">
        {/* Desktop Background Image - Optimized with proper priority and sizes */}
        <Image
          src={image}
          alt="APOSTLE premium streetwear collection"
          fill
          priority
          fetchPriority="high"
          quality={85}
          className="hidden md:block object-cover object-center"
          sizes="100vw"
          placeholder="empty"
        />

        {/* Mobile Background Image */}
        {mobileImage && (
          <Image
            src={mobileImage}
            alt="APOSTLE premium streetwear collection"
            fill
            priority
            fetchPriority="high"
            quality={85}
            className="block md:hidden object-cover object-center"
            sizes="100vw"
            placeholder="empty"
          />
        )}

        {/* Fallback: use desktop image on mobile if no mobile image provided */}
        {!mobileImage && (
          <Image
            src={image}
            alt="APOSTLE premium streetwear collection"
            fill
            priority
            fetchPriority="high"
            quality={85}
            className="block md:hidden object-cover object-center"
            sizes="100vw"
            placeholder="empty"
          />
        )}

        {/* Bottom CTA Link - CSS animation instead of Framer Motion for CLS */}
        <div className="hero-desc absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-fade-in-up">
          <Link
            href={ctaHref}
            className="text-white text-base font-normal tracking-wide border-b border-white/80 pb-1 hover:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label={`${ctaText} - Browse our collection`}
          >
            {ctaText}
          </Link>
        </div>

        {/* Floating Orb with mouse-follow + 3D tilt - Lazy loaded */}
        {showOrb && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 animate-fade-in pointer-events-none">
              <HeroOrb imageSrc={orbImageSrc} iconSrc={orbIconSrc} size={140} />
            </div>
          </Suspense>
        )}

        {/* Spline 3D Interactive Viewer (optional) - Only loaded when explicitly enabled */}
        {showSpline && splineUrl && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 animate-fade-in pointer-events-none">
              <HeroSpline sceneUrl={splineUrl} showHint={true} />
            </div>
          </Suspense>
        )}
      </div>
    </section>
  );
}

// Memoize to prevent unnecessary re-renders
export const HeroSection = memo(HeroSectionComponent);
