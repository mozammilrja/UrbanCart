'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Banner } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

interface BannerSectionProps {
  banners: Banner[];
}

function BannerSectionComponent({ banners }: BannerSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  // Update current index when slide changes
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);
    onSelect(); // Set initial index
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section 
      className="relative w-full overflow-hidden bg-neutral-900"
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
            delay: 6000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {banners.map((banner, index) => (
            <CarouselItem key={banner._id} className="pl-0">
              <div className="relative w-full h-[75vh] min-h-[500px] max-h-[800px]">
                {/* Background Image with Ken Burns effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={banner.image}
                    alt={banner.title || 'Promotional banner'}
                    fill
                    className={cn(
                      'object-cover transition-transform duration-[8000ms] ease-out',
                      currentIndex === index && 'scale-110'
                    )}
                    sizes="100vw"
                    priority={index === 0}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    quality={90}
                  />
                </div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="max-w-2xl space-y-6 md:space-y-8">
                      {/* Eyebrow Text */}
                      <div 
                        className={cn(
                          'inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full',
                          'transform transition-all duration-700 delay-100',
                          currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        )}
                      >
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs text-white/90 font-medium tracking-widest uppercase">
                          Featured Collection
                        </span>
                      </div>

                      {/* Title */}
                      <h2 
                        className={cn(
                          'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1]',
                          'transform transition-all duration-700 delay-200',
                          currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        )}
                      >
                        {banner.title}
                      </h2>

                      {/* Subtitle */}
                      {banner.subtitle && (
                        <p 
                          className={cn(
                            'text-lg md:text-xl text-white/70 max-w-lg leading-relaxed',
                            'transform transition-all duration-700 delay-300',
                            currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          )}
                        >
                          {banner.subtitle}
                        </p>
                      )}

                      {/* CTA Button */}
                      {banner.cta && (
                        <div 
                          className={cn(
                            'transform transition-all duration-700 delay-400',
                            currentIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          )}
                        >
                          <Link
                            href={banner.cta.href}
                            className="group inline-flex items-center gap-3 bg-white text-neutral-900 px-8 py-4 text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-neutral-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-white/10"
                          >
                            {banner.cta.text}
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className={cn(
            'absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20',
            'flex items-center justify-center w-12 h-12 md:w-14 md:h-14',
            'bg-white/10 backdrop-blur-md rounded-full border border-white/20',
            'text-white hover:bg-white hover:text-neutral-900',
            'transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
            'opacity-0 md:opacity-100 group-hover:opacity-100'
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
        </button>
        
        <button
          onClick={scrollNext}
          className={cn(
            'absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20',
            'flex items-center justify-center w-12 h-12 md:w-14 md:h-14',
            'bg-white/10 backdrop-blur-md rounded-full border border-white/20',
            'text-white hover:bg-white hover:text-neutral-900',
            'transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
            'opacity-0 md:opacity-100 group-hover:opacity-100'
          )}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Premium Pagination Dots */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
          role="tablist"
          aria-label="Slide pagination"
        >
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                'relative h-1 rounded-full transition-all duration-500 overflow-hidden',
                currentIndex === index 
                  ? 'w-12 bg-white' 
                  : 'w-3 bg-white/40 hover:bg-white/60'
              )}
            >
              {currentIndex === index && (
                <span 
                  className="absolute inset-y-0 left-0 bg-white/50 animate-[progress_6s_ease-in-out]"
                  style={{ width: '100%' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-2 text-white/60 text-sm font-medium">
          <span className="text-white text-lg font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(banners.length).padStart(2, '0')}</span>
        </div>
      </Carousel>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}

export const BannerSection = memo(BannerSectionComponent);
