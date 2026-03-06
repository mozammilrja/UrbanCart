'use client';

import Image from 'next/image';
import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { StoreLocation } from '@/types';

interface StoreLocationsSectionProps {
  stores: StoreLocation[];
}

function StoreLocationsSectionComponent({
  stores,
}: StoreLocationsSectionProps) {
  return (
    <section 
      className="py-10 md:py-16 bg-[#f5f5f5]"
      aria-labelledby="stores-title"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        {/* Visually hidden title for accessibility */}
        <h2 id="stores-title" className="sr-only">Our Store Locations</h2>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-animation"
          role="list"
          aria-label="Store locations"
        >
          {stores.map((store) => (
            <article
              key={store._id}
              className="group bg-white overflow-hidden shadow-sm rounded-lg animate-fade-in-up"
              role="listitem"
            >
              {/* Store Images */}
              <div className="relative">
                {store.images[0] && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e5e5e5]">
                    <Image
                      src={store.images[0]}
                      alt={`${store.name} - ${store.city} interior`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                )}
                
                {store.images[1] && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e5e5e5]">
                    <Image
                      src={store.images[1]}
                      alt={`${store.name} - ${store.city} exterior`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Store Info */}
              <div className="p-5 md:p-6 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-medium text-[#111] flex-shrink-0">
                    {store.city}
                  </h3>
                  <address className="text-xs text-[#666] text-right leading-relaxed not-italic">
                    {store.address}
                  </address>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#111] hover:opacity-60 transition-opacity underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-black rounded"
                    aria-label={`Get directions to ${store.city} store`}
                  >
                    Get Direction
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  
                  {store.phone && (
                    <a
                      href={`tel:${store.phone}`}
                      className="text-xs text-[#666] hover:text-[#111] transition-colors focus:outline-none focus:underline"
                      aria-label={`Call ${store.city} store at ${store.phone}`}
                    >
                      {store.phone}
                    </a>
                  )}
                  
                  {store.email && (
                    <a
                      href={`mailto:${store.email}`}
                      className="text-xs text-[#666] hover:text-[#111] transition-colors focus:outline-none focus:underline"
                      aria-label={`Email ${store.city} store`}
                    >
                      {store.email}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const StoreLocationsSection = memo(StoreLocationsSectionComponent);
