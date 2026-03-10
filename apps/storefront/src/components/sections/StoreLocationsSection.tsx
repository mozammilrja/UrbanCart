'use client';

import Image from 'next/image';
import { memo, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ChevronRight } from 'lucide-react';
import type { StoreLocation } from '@/types';
import { cn } from '@/lib/utils';

interface StoreLocationsSectionProps {
  stores: StoreLocation[];
}

// Store hours - premium streetwear stores often have these hours
const storeHours = {
  weekdays: '11:00 AM - 9:00 PM',
  weekend: '10:00 AM - 10:00 PM',
};

function StoreLocationsSectionComponent({
  stores,
}: StoreLocationsSectionProps) {
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);

  return (
    <section 
      className="py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50"
      aria-labelledby="stores-title"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="stores-title" className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
            Visit Our Stores
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Experience the collection in person. Our flagship stores offer an immersive shopping experience.
          </p>
        </div>
        
        {/* Store Cards Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Store locations"
        >
          {stores.map((store, index) => (
            <article
              key={store._id}
              className={cn(
                'group relative bg-white rounded-2xl overflow-hidden transition-all duration-500',
                'border border-neutral-100 hover:border-neutral-200',
                'shadow-sm hover:shadow-xl hover:shadow-neutral-200/50',
                'transform hover:-translate-y-1'
              )}
              role="listitem"
              onMouseEnter={() => setHoveredStore(store._id)}
              onMouseLeave={() => setHoveredStore(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Store Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={store.images[0]}
                  alt={`${store.name} store interior`}
                  fill
                  className={cn(
                    'object-cover transition-all duration-700',
                    hoveredStore === store._id ? 'scale-110' : 'scale-100'
                  )}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent',
                  'transition-opacity duration-300',
                  hoveredStore === store._id ? 'opacity-80' : 'opacity-50'
                )} />
                
                {/* City Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-neutral-900 shadow-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {store.city}
                  </span>
                </div>
                
                {/* Store Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl font-semibold text-white mb-1">
                    {store.name}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2">
                    {store.address}
                  </p>
                </div>
              </div>

              {/* Store Details */}
              <div className="p-6 space-y-4">
                {/* Store Hours */}
                <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                  <div className="flex-shrink-0 w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Store Hours</p>
                    <p className="text-sm text-neutral-900">Mon - Fri: {storeHours.weekdays}</p>
                    <p className="text-sm text-neutral-900">Sat - Sun: {storeHours.weekend}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-3">
                  {store.phone && (
                    <a
                      href={`tel:${store.phone}`}
                      className={cn(
                        'flex items-center gap-2 p-3 rounded-xl transition-all duration-200',
                        'bg-neutral-50 hover:bg-neutral-100',
                        'group/link'
                      )}
                      aria-label={`Call ${store.city} store`}
                    >
                      <Phone className="w-4 h-4 text-neutral-400 group-hover/link:text-neutral-900 transition-colors" />
                      <span className="text-xs text-neutral-600 group-hover/link:text-neutral-900 truncate transition-colors">
                        Call Store
                      </span>
                    </a>
                  )}
                  
                  {store.email && (
                    <a
                      href={`mailto:${store.email}`}
                      className={cn(
                        'flex items-center gap-2 p-3 rounded-xl transition-all duration-200',
                        'bg-neutral-50 hover:bg-neutral-100',
                        'group/link'
                      )}
                      aria-label={`Email ${store.city} store`}
                    >
                      <Mail className="w-4 h-4 text-neutral-400 group-hover/link:text-neutral-900 transition-colors" />
                      <span className="text-xs text-neutral-600 group-hover/link:text-neutral-900 truncate transition-colors">
                        Email Us
                      </span>
                    </a>
                  )}
                </div>

                {/* Get Directions Button */}
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl',
                    'bg-neutral-900 text-white font-medium text-sm',
                    'hover:bg-neutral-800 transition-all duration-200',
                    'group/btn'
                  )}
                  aria-label={`Get directions to ${store.city} store`}
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                  <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all duration-200" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center p-8 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl">
            <h3 className="text-xl font-semibold text-white mb-2">Can't visit a store?</h3>
            <p className="text-neutral-400 mb-6 max-w-sm">
              Shop online and enjoy free shipping on orders over ₹2,000
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-colors"
            >
              Shop Online
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const StoreLocationsSection = memo(StoreLocationsSectionComponent);
