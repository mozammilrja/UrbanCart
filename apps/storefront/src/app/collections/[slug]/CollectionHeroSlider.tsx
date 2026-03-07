'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSliderProps {
  collectionName: string;
  collectionDescription: string;
  productCount: number;
  images: string[];
}

export function CollectionHeroSlider({ 
  collectionName, 
  collectionDescription, 
  productCount,
  images 
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          )}
        >
          <Image
            src={image}
            alt={`${collectionName} - Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 z-10 pointer-events-none" />
      
      {/* Back Link */}
      <Link 
        href="/collections"
        className="absolute top-24 left-6 md:left-12 z-20 flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm font-medium">All Collections</span>
      </Link>
      
      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase font-medium">Collection</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-8">
            {collectionName}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            {collectionDescription}
          </p>
          
          <div className="flex items-center justify-center gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light mb-2">{productCount}</div>
              <div className="text-sm tracking-widest uppercase text-white/50">Pieces</div>
            </div>
            <div className="w-px h-16 bg-white/30" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light mb-2">New</div>
              <div className="text-sm tracking-widest uppercase text-white/50">Season</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-xs tracking-widest uppercase text-white/50">Scroll to Shop</span>
        <ArrowDown className="w-5 h-5 text-white/50 animate-bounce" />
      </div>

      {/* Slider Controls - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 px-6 py-4 bg-black/30 backdrop-blur-sm rounded-full">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                index === currentSlide
                  ? "w-10 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/20" />

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Slide Counter - Bottom Right */}
      <div className="absolute bottom-8 right-8 md:right-12 z-20 hidden md:block">
        <div className="flex items-baseline gap-1 text-white font-mono">
          <span className="text-3xl font-light">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-white/40 text-lg">/</span>
          <span className="text-white/40">{String(images.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div 
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
        />
      </div>
    </section>
  );
}
