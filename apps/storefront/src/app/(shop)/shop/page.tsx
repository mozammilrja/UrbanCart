'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@urbancart/ui';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Grid2X2,
  LayoutGrid,
} from 'lucide-react';
import {
  Section,
  Container,
  ProductGrid,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn, StaggerReveal } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { productService, type ProductFilters, type PaginatedResponse } from '@/services/product.service';
import { toStorefrontProduct, type StorefrontProduct } from '@/types/storefront.types';
import type { Product } from '@urbancart/types';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const categories = [
  { slug: 'all', name: 'All' },
  { slug: 't-shirts', name: 'T-Shirts' },
  { slug: 'hoodies', name: 'Hoodies' },
  { slug: 'pants', name: 'Pants' },
  { slug: 'jackets', name: 'Jackets' },
  { slug: 'sneakers', name: 'Sneakers' },
  { slug: 'accessories', name: 'Accessories' },
];

const priceRanges = [
  { min: 0, max: 999, label: 'Under ₹999' },
  { min: 1000, max: 1999, label: '₹1,000 - ₹1,999' },
  { min: 2000, max: 2999, label: '₹2,000 - ₹2,999' },
  { min: 3000, max: 4999, label: '₹3,000 - ₹4,999' },
  { min: 5000, max: Infinity, label: '₹5,000+' },
];

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<StorefrontProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [columns, setColumns] = useState<2 | 3 | 4>(4);
  
  // Parse URL params
  const category = searchParams.get('category') || 'all';
  const sort = (searchParams.get('sort') as ProductFilters['sort']) || 'featured';
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  const updateURL = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 when filters change
    if (key !== 'page') {
      params.delete('page');
    }
    router.push(`/shop?${params.toString()}`);
  }, [router, searchParams]);
  
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const filters: ProductFilters = {
          sort,
          page,
          limit: 16,
        };
        
        if (category !== 'all') {
          filters.category = category;
        }
        
        if (priceMin) {
          filters.priceMin = parseInt(priceMin, 10);
        }
        if (priceMax && priceMax !== 'Infinity') {
          filters.priceMax = parseInt(priceMax, 10);
        }
        
        const response = await productService.getAll(filters);
        setProducts(response.data.map(toStorefrontProduct));
        setTotalProducts(response.pagination.total);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProducts();
  }, [category, sort, priceMin, priceMax, page]);
  
  const activePriceRange = priceRanges.find(
    r => r.min.toString() === priceMin && r.max.toString() === priceMax
  );
  
  const hasActiveFilters = category !== 'all' || activePriceRange;
  
  const clearFilters = () => {
    router.push('/shop');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        {/* Page Header */}
        <Section className="pt-32 pb-8">
          <Container>
            <FadeIn>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Browse Collection
                </p>
                <h1 className="mt-4 text-4xl font-extralight tracking-tight text-white md:text-6xl">
                  Shop All
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
                  {totalProducts} products
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>
        
        {/* Filters Bar */}
        <Section className="py-4 border-y border-white/10">
          <Container>
            <div className="flex items-center justify-between gap-4">
              {/* Left: Filter toggle & active filters */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 text-sm transition-colors',
                    showFilters
                      ? 'bg-white text-black'
                      : 'border border-white/20 text-white hover:border-white/40'
                  )}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
                
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-white/50 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                    Clear all
                  </button>
                )}
              </div>
              
              {/* Right: Sort & view */}
              <div className="flex items-center gap-4">
                {/* Sort dropdown */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => updateURL('sort', e.target.value)}
                    className="appearance-none bg-transparent pr-8 text-sm text-white/70 focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-black">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                </div>
                
                {/* View toggles */}
                <div className="hidden items-center gap-1 sm:flex">
                  <button
                    onClick={() => setColumns(2)}
                    className={cn(
                      'p-2 transition-colors',
                      columns === 2 ? 'text-white' : 'text-white/30 hover:text-white/60'
                    )}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setColumns(4)}
                    className={cn(
                      'p-2 transition-colors',
                      columns === 4 ? 'text-white' : 'text-white/30 hover:text-white/60'
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Filter Panel */}
        {showFilters && (
          <Section className="py-6 border-b border-white/10 bg-neutral-950">
            <Container>
              <FadeIn>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {/* Categories */}
                  <div>
                    <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/50">
                      Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => updateURL('category', cat.slug === 'all' ? null : cat.slug)}
                          className={cn(
                            'px-3 py-1.5 text-sm transition-colors',
                            category === cat.slug
                              ? 'bg-white text-black'
                              : 'border border-white/20 text-white/70 hover:border-white/40'
                          )}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/50">
                      Price Range
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((range) => (
                        <button
                          key={range.label}
                          onClick={() => {
                            if (activePriceRange === range) {
                              updateURL('priceMin', null);
                              updateURL('priceMax', null);
                            } else {
                              const params = new URLSearchParams(searchParams.toString());
                              params.set('priceMin', range.min.toString());
                              params.set('priceMax', range.max.toString());
                              params.delete('page');
                              router.push(`/shop?${params.toString()}`);
                            }
                          }}
                          className={cn(
                            'px-3 py-1.5 text-sm transition-colors',
                            activePriceRange === range
                              ? 'bg-white text-black'
                              : 'border border-white/20 text-white/70 hover:border-white/40'
                          )}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </Container>
          </Section>
        )}
        
        {/* Products Grid */}
        <Section>
          <Container>
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
            ) : products.length === 0 ? (
              <FadeIn>
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-xl text-white/60">No products found</p>
                  <p className="mt-2 text-sm text-white/40">
                    Try adjusting your filters or browse all products
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-6 border border-white px-6 py-2 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Clear Filters
                  </button>
                </div>
              </FadeIn>
            ) : (
              <StaggerReveal stagger={0.05}>
                <ProductGrid 
                  products={products} 
                  columns={columns}
                  variant="default"
                />
              </StaggerReveal>
            )}
            
            {/* Pagination */}
            {totalProducts > 16 && (
              <div className="mt-16 flex justify-center gap-2">
                {Array.from({ length: Math.ceil(totalProducts / 16) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => updateURL('page', (i + 1).toString())}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center text-sm transition-colors',
                      page === i + 1
                        ? 'bg-white text-black'
                        : 'border border-white/20 text-white/70 hover:border-white/40'
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
