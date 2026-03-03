'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  image: string;
  mobileImage?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function HeroSection({
  image,
  mobileImage,
  ctaText = 'Shop now',
  ctaHref = '/collections',
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen min-h-[600px]">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt="Hero"
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Bottom CTA Link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <Link
          href={ctaHref}
          className="text-white text-base font-normal tracking-wide border-b border-white/80 pb-1 hover:border-white transition-colors"
        >
          {ctaText}
        </Link>
      </motion.div>
    </section>
  );
}
