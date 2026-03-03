'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Product } from '@/types';
import { staggerContainer, staggerItem } from '@/styles/theme';

interface ProductGridSectionProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  columns?: 3 | 4;
  viewAllHref?: string;
  viewAllText?: string;
  bgColor?: 'white' | 'gray';
}

export function ProductGridSection({
  title,
  subtitle,
  products,
  columns = 4,
  viewAllHref,
  viewAllText = 'View All',
  bgColor = 'white',
}: ProductGridSectionProps) {
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section
      className={`py-20 md:py-24 lg:py-32 ${
        bgColor === 'gray' ? 'bg-[#f7f7f7]' : 'bg-white'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || viewAllHref) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14"
          >
            <div>
              {title && (
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#111]">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm md:text-base text-[#777] tracking-wide mt-2">
                  {subtitle}
                </p>
              )}
            </div>
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="inline-flex items-center gap-2 text-sm tracking-wide text-[#111] hover:text-[#777] transition-colors group"
              >
                {viewAllText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className={`grid ${gridCols[columns]} gap-4 md:gap-6`}
        >
          {products.map((product) => (
            <motion.div key={product._id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
