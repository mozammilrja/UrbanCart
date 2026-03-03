'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Product } from '@/types';
import { staggerContainer, staggerItem } from '@/styles/theme';

interface CategorySectionProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllHref: string;
  viewAllText?: string;
  bgColor?: 'white' | 'gray';
}

export function CategorySection({
  title,
  description,
  products,
  viewAllHref,
  viewAllText = 'Discover More',
  bgColor = 'white',
}: CategorySectionProps) {
  return (
    <section
      className={`py-20 md:py-24 lg:py-32 ${
        bgColor === 'gray' ? 'bg-[#f7f7f7]' : 'bg-white'
      }`}
    >
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
          {description && (
            <p className="text-sm md:text-base text-[#777] tracking-wide max-w-md mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          {products.slice(0, 5).map((product) => (
            <motion.div key={product._id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 border border-[#111] text-[#111] px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-[#111] hover:text-white transition-all duration-300 group"
          >
            {viewAllText}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
