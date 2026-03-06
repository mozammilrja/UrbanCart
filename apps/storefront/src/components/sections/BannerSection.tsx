'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import type { Banner } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface BannerSectionProps {
  banners: Banner[];
}

function BannerSectionComponent({ banners }: BannerSectionProps) {
  return (
    <section 
      className="relative w-full"
      aria-label="Promotional banners"
      role="region"
    >
      <Carousel
        opts={{
          loop: true,
          align: 'center',
          skipSnaps: false,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {banners.map((banner, index) => (
            <CarouselItem key={banner._id} className="pl-0">
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
                {/* Image - Only first banner gets priority */}
                <Image
                  src={banner.image}
                  alt={banner.title || 'Promotional banner'}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  quality={80}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

                {/* Content - Using CSS animations */}
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div className="max-w-2xl mx-auto px-4 space-y-4 md:space-y-6 animate-fade-in-up">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
                      {banner.title}
                    </h2>
                    {banner.subtitle && (
                      <p className="text-base md:text-lg text-white/90 tracking-wide">
                        {banner.subtitle}
                      </p>
                    )}
                    {banner.cta && (
                      <Link
                        href={banner.cta.href}
                        className="inline-block bg-white text-black px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                      >
                        {banner.cta.text}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious 
          variant="dark" 
          className="hidden md:flex left-6 w-12 h-12" 
          aria-label="Previous banner"
        />
        <CarouselNext 
          variant="dark" 
          className="hidden md:flex right-6 w-12 h-12" 
          aria-label="Next banner"
        />

        {/* Pagination Dots */}
        <CarouselDots 
          className="absolute bottom-6 left-1/2 -translate-x-1/2" 
          aria-label="Banner pagination"
        />
      </Carousel>
    </section>
  );
}

export const BannerSection = memo(BannerSectionComponent);
