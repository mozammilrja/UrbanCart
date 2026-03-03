'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import type { Banner } from '@/types';

import 'swiper/css';
import 'swiper/css/pagination';

interface BannerSectionProps {
  banners: Banner[];
}

export function BannerSection({ banners }: BannerSectionProps) {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !bg-white/50 !opacity-100',
          bulletActiveClass: '!bg-white !w-6 !rounded-full',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={banners.length > 1}
        className="w-full aspect-[16/9] md:aspect-[21/9]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div className="relative w-full h-full">
              {/* Image */}
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="max-w-2xl mx-auto px-4 space-y-4 md:space-y-6"
                >
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
                      className="inline-block bg-white text-black px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-white/90 transition-colors"
                    >
                      {banner.cta.text}
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
        }
        .swiper-pagination-bullet {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
