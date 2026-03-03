'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import type { StoreLocation } from '@/types';
import { staggerContainer, staggerItem } from '@/styles/theme';

interface StoreLocationsSectionProps {
  title?: string;
  subtitle?: string;
  stores: StoreLocation[];
}

export function StoreLocationsSection({
  title = 'Our Stores',
  subtitle = 'Visit us in person',
  stores,
}: StoreLocationsSectionProps) {
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#111] mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-[#777] tracking-wide">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Store Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {stores.map((store) => (
            <motion.div
              key={store._id}
              variants={staggerItem}
              className="group bg-white overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-4">
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase text-[#777] mb-1">
                    {store.city}
                  </p>
                  <h3 className="text-lg font-medium text-[#111]">
                    {store.name}
                  </h3>
                </div>

                <div className="flex items-start gap-2 text-sm text-[#777]">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{store.address}</span>
                </div>

                {store.hours && (
                  <p className="text-sm text-[#777]">{store.hours}</p>
                )}

                {/* Get Directions Button */}
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#111] hover:text-[#777] transition-colors group/link"
                >
                  Get Directions
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
