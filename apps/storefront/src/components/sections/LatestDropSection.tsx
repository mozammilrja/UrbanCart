'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Product } from '@/types';
import { staggerContainer, staggerItem } from '@/styles/theme';

interface LatestDropSectionProps {
  title?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllText?: string;
}

export function LatestDropSection({
  title = 'Latest drop',
  products,
  viewAllHref = '/collections/new',
  viewAllText = 'Discover more',
}: LatestDropSectionProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6 md:mb-8"
        >
          <h2 className="text-base md:text-lg font-normal text-[#111]">
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="inline-flex items-center px-4 py-2 text-sm font-normal text-[#111] border border-[#e0e0e0] rounded-full hover:border-[#111] transition-colors"
          >
            {viewAllText}
          </Link>
        </motion.div>

        {/* Product Grid - 4 columns on desktop */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product._id}
              variants={staggerItem}
            >
              <ProductCard product={product} priority={index < 4} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
