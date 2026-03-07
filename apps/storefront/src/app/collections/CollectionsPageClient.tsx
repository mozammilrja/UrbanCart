'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/ui/ProductCard';
import { 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowDown,
  Sparkles,
  Package,
  Truck,
  Shield,
  TrendingUp,
  Grid3X3,
  LayoutGrid,
  Heart,
  Eye,
  ShoppingBag,
  SlidersHorizontal,
  X,
  Check,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product, Collection } from '@/types';

interface CollectionsPageClientProps {
  collections: Collection[];
  products: Product[];
  totalProducts: number;
  heroImages: string[];
}

type SortOption = 'default' | 'name-asc' | 'name-desc' | 'products-high' | 'products-low';

export function CollectionsPageClient({ 
  collections,
  products,
  totalProducts,
  heroImages 
}: CollectionsPageClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Sort collections based on selected option
  const sortedCollections = useMemo(() => {
    const sorted = [...collections];
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'products-high':
        return sorted.sort((a, b) => b.productCount - a.productCount);
      case 'products-low':
        return sorted.sort((a, b) => a.productCount - b.productCount);
      default:
        return sorted;
    }
  }, [collections, sortBy]);

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'products-high', label: 'Most Products' },
    { value: 'products-low', label: 'Least Products' },
  ];
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, [heroImages.length]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <div className="min-h-screen">
      {/* Hero Slider - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Slides */}
        {heroImages.map((image, index) => (
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
              alt={`Collections slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70 pointer-events-none" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/90">Collections</span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white mb-6">
            Collections
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-xl mb-12">
            Explore our curated drops and seasonal releases. Be the first to cop.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light text-white">{collections.length}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">Collections</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light text-white">{totalProducts}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">Products</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Scroll to Shop</span>
          <ArrowDown className="w-4 h-4 text-white/40 animate-bounce" />
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
            {/* Prev */}
            <button 
              onClick={prevSlide}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "transition-all duration-300",
                    index === currentSlide 
                      ? "w-8 h-2 bg-white rounded-full" 
                      : "w-2 h-2 bg-white/40 rounded-full hover:bg-white/60"
                  )}
                />
              ))}
            </div>
            
            {/* Next */}
            <button 
              onClick={nextSlide}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Play/Pause */}
            <div className="w-px h-6 bg-white/20" />
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 z-20 text-white/50 text-lg font-light">
          <span className="text-white text-2xl">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(heroImages.length).padStart(2, '0')}</span>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-[#111] text-white">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex items-center justify-center gap-4 p-6">
              <Truck className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white/70">Free Shipping Over ₹2,000</span>
            </div>
            <div className="flex items-center justify-center gap-4 p-6">
              <Package className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white/70">Premium Quality Materials</span>
            </div>
            <div className="flex items-center justify-center gap-4 p-6">
              <Shield className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white/70">Easy 7-Day Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white via-[#fafafa] to-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, #111 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative w-full">
          {/* Section Header */}
          <div className="px-3 sm:px-6 lg:px-10 mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-[#111]" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-[#555] font-medium">
                    All Collections
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-3">
                  Browse Collections
                </h2>
                <p className="text-base md:text-lg text-[#666] max-w-md">
                  {sortedCollections.length} curated collections for the bold
                </p>
              </div>
              
              {/* Filter & Sort Controls */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Filter & Sort Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-5 py-3 text-sm text-[#555] hover:text-[#111] bg-white border border-[#e0e0e0] rounded-full hover:border-[#111] hover:shadow-lg transition-all duration-300"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="font-medium">Filter & Sort</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isFilterOpen && "rotate-180"
                    )} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isFilterOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsFilterOpen(false)}
                      />
                      
                      {/* Dropdown */}
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#e5e5e5] z-50 overflow-hidden">
                        <div className="p-4 border-b border-[#f0f0f0]">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#111]">Sort By</span>
                            <button 
                              onClick={() => setIsFilterOpen(false)}
                              className="p-1 hover:bg-[#f5f5f5] rounded-full transition-colors"
                            >
                              <X className="w-4 h-4 text-[#999]" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="py-2">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value as SortOption);
                                setIsFilterOpen(false);
                              }}
                              className={cn(
                                "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors",
                                sortBy === option.value 
                                  ? "bg-[#111] text-white" 
                                  : "text-[#555] hover:bg-[#f5f5f5]"
                              )}
                            >
                              <span>{option.label}</span>
                              {sortBy === option.value && (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                          ))}
                        </div>
                        
                        {sortBy !== 'default' && (
                          <div className="p-3 border-t border-[#f0f0f0]">
                            <button
                              onClick={() => {
                                setSortBy('default');
                                setIsFilterOpen(false);
                              }}
                              className="w-full py-2 text-sm text-[#999] hover:text-[#111] transition-colors"
                            >
                              Reset to Default
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center bg-white border border-[#e0e0e0] rounded-full overflow-hidden shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "px-5 py-3 transition-all duration-300",
                      viewMode === 'grid' 
                        ? "bg-[#111] text-white" 
                        : "text-[#777] hover:text-[#111] hover:bg-[#f5f5f5]"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('carousel')}
                    className={cn(
                      "px-5 py-3 transition-all duration-300",
                      viewMode === 'carousel' 
                        ? "bg-[#111] text-white" 
                        : "text-[#777] hover:text-[#111] hover:bg-[#f5f5f5]"
                    )}
                    aria-label="Carousel view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="px-2 sm:px-4 lg:px-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                {sortedCollections.map((collection) => (
                  <Link
                    key={collection._id}
                    href={`/collections/${collection.slug}`}
                    className="group relative aspect-[3/4] overflow-hidden bg-[#111]"
                    onMouseEnter={() => setHoveredCollection(collection._id)}
                    onMouseLeave={() => setHoveredCollection(null)}
                  >
                    <Image
                      src={collection.bannerImage}
                      alt={collection.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-sm text-white">
                        {collection.productCount} Items
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className={cn(
                      "absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-all duration-300",
                      hoveredCollection === collection._id ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="p-3 bg-white rounded-full shadow-lg">
                        <ArrowRight className="w-4 h-4 text-[#111]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg md:text-xl font-medium text-white mb-1 line-clamp-1">
                        {collection.name}
                      </h3>
                      <p className="text-xs text-white/60 line-clamp-1">
                        {collection.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Carousel View */}
          {viewMode === 'carousel' && (
            <div className="relative px-2 sm:px-4 lg:px-6">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
                  {sortedCollections.map((collection) => (
                    <CarouselItem 
                      key={collection._id} 
                      className="pl-2 sm:pl-3 md:pl-4 basis-[70%] sm:basis-[45%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="group relative aspect-[3/4] block overflow-hidden bg-[#111]"
                      >
                        <Image
                          src={collection.bannerImage}
                          alt={collection.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 text-[10px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-sm text-white">
                            {collection.productCount} Items
                          </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-medium text-white mb-1">
                            {collection.name}
                          </h3>
                          <div className="flex items-center gap-2 text-white/70 text-sm group-hover:text-white transition-colors">
                            <span>Shop Now</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious 
                  variant="light" 
                  className="left-4 hidden md:flex w-12 h-12 bg-white shadow-xl border-0"
                />
                <CarouselNext 
                  variant="light" 
                  className="right-4 hidden md:flex w-12 h-12 bg-white shadow-xl border-0"
                />
              </Carousel>
              
              {/* Mobile Swipe Hint */}
              <div className="flex justify-center mt-6 md:hidden">
                <span className="text-xs text-[#999] tracking-wider flex items-center gap-2">
                  <span className="w-8 h-px bg-[#ccc]" />
                  Swipe to explore
                  <span className="w-8 h-px bg-[#ccc]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* You May Also Like - Products */}
      <section className="py-16 md:py-24 bg-[#111] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative w-full">
          {/* Header */}
          <div className="px-3 sm:px-6 lg:px-10 mb-10 md:mb-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-white/60" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-white/60 font-medium">
                    Popular Products
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                  You May Also Like
                </h2>
              </div>
              <Link 
                href="/shop"
                className="hidden md:inline-flex items-center gap-3 px-8 py-4 bg-white text-[#111] rounded-full hover:bg-white/90 transition-all duration-300 group"
              >
                <span className="text-sm font-semibold tracking-wide">View All Drops</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Products Carousel */}
          <div className="relative px-2 sm:px-4 lg:px-6">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4">
                {products.map((product) => (
                  <CarouselItem 
                    key={product._id} 
                    className="pl-2 sm:pl-3 md:pl-4 basis-[60%] sm:basis-[45%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious 
                variant="dark" 
                className="left-4 hidden md:flex w-12 h-12 bg-white/10 backdrop-blur-sm border-white/20"
              />
              <CarouselNext 
                variant="dark" 
                className="right-4 hidden md:flex w-12 h-12 bg-white/10 backdrop-blur-sm border-white/20"
              />
            </Carousel>
          </div>
          
          {/* Mobile CTA */}
          <div className="flex justify-center mt-10 md:hidden px-6">
            <Link 
              href="/shop"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#111] rounded-full w-full max-w-xs"
            >
              <span className="text-sm font-semibold">View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#222]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
        </div>
        
        <div className="relative w-full px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-6">
            Explore More Collections
          </h2>
          
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
            Each collection tells a unique story. Discover more styles that define street culture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#111] rounded-full hover:bg-white/90 transition-colors"
            >
              <span className="font-medium tracking-wide">Shop All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/chapter"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <span className="font-medium tracking-wide">Our Story</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
