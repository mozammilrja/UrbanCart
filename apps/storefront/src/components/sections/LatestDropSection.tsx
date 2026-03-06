'use client';

import Link from 'next/link';
import { memo } from 'react';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';
import type { Product } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

interface LatestDropSectionProps {
  title?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllText?: string;
}

function LatestDropSectionComponent({
  title = 'Latest drop',
  products,
  viewAllHref = '/collections/new',
  viewAllText = 'Discover more',
}: LatestDropSectionProps) {
  return (
    <section 
      className="py-6 md:py-10 bg-white"
      aria-labelledby="latest-drop-title"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        {/* Header - Using CSS animation instead of Framer Motion */}
        <div className="flex items-center justify-between mb-6 md:mb-8 animate-fade-in-up">
          <h2 
            id="latest-drop-title"
            className="text-base md:text-lg font-normal text-[#111]"
          >
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="inline-flex items-center px-4 py-2 text-sm font-normal text-[#111] border border-[#e0e0e0] rounded-full hover:border-[#111] transition-colors focus:outline-none focus:ring-2 focus:ring-black"
          >
            {viewAllText}
          </Link>
        </div>

        {/* Horizontal Scrolling Product Carousel */}
        <div className="relative touch-pan-y">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              dragFree: false,
              skipSnaps: false,
              containScroll: 'trimSnaps',
              watchDrag: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-5 cursor-grab active:cursor-grabbing">
              {products.map((product, index) => (
                <CarouselItem
                  key={product._id}
                  className="pl-4 md:pl-5 basis-[75%] sm:basis-[45%] md:basis-[32%] lg:basis-[24%] xl:basis-[20%]"
                >
                  <OptimizedProductCard 
                    product={product} 
                    priority={index < 4}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious 
              variant="light" 
              className="hidden sm:flex left-2 md:left-4 w-10 h-10 md:w-12 md:h-12" 
              aria-label="Previous products"
            />
            <CarouselNext 
              variant="light" 
              className="hidden sm:flex right-2 md:right-4 w-10 h-10 md:w-12 md:h-12" 
              aria-label="Next products"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export const LatestDropSection = memo(LatestDropSectionComponent);
