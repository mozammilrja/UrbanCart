'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@urbancart/ui';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import {
  Section,
  Container,
  ProductGrid,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn, StaggerReveal } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { productService, type ProductFilters } from '@/services/product.service';
import { collectionService } from '@/services/collection.service';
import { toStorefrontProduct, type StorefrontProduct } from '@/types/storefront.types';
import type { Collection } from '@urbancart/types';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

function CollectionContent() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<StorefrontProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const sort = (searchParams.get('sort') as ProductFilters['sort']) || 'featured';
  const page = parseInt(searchParams.get('page') || '1', 10);
  
  const updateURL = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') {
      params.delete('page');
    }
    router.push(`/collections/${params.get('slug') || ''}?${params.toString()}`);
  }, [router, searchParams]);
  
  useEffect(() => {
    async function loadCollection() {
      setIsLoading(true);
      try {
        const col = await collectionService.getBySlug(params.slug);
        if (!col) {
          return;
        }
        setCollection(col);
        
        const response = await productService.getByCollection(params.slug, {
          sort,
          page,
          limit: 12,
        });
        
        setProducts(response.data.map(toStorefrontProduct));
        setTotalProducts(response.pagination.total);
      } catch (error) {
        console.error('Failed to load collection:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadCollection();
  }, [params.slug, sort, page]);
  
  if (!isLoading && !collection) {
    notFound();
  }
  
  if (isLoading || !collection) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        {/* Collection Hero */}
        <Section className="relative pt-28 pb-24 overflow-hidden">
          {/* Background Image */}
          {collection.image && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${collection.image})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
          
          <Container className="relative">
            <FadeIn>
              {/* Breadcrumb */}
              <nav className="mb-8 flex items-center gap-2 text-sm">
                <Link href="/" className="text-white/40 hover:text-white/60">Home</Link>
                <span className="text-white/20">/</span>
                <Link href="/collections" className="text-white/40 hover:text-white/60">Collections</Link>
                <span className="text-white/20">/</span>
                <span className="text-white/60">{collection.name}</span>
              </nav>
              
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Collection
                </p>
                <h1 className="mt-4 text-4xl font-extralight tracking-tight text-white md:text-6xl lg:text-7xl">
                  {collection.name}
                </h1>
                {collection.description && (
                  <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
                    {collection.description}
                  </p>
                )}
                <p className="mt-4 text-sm text-white/40">
                  {totalProducts} Products
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>
        
        {/* Filters Bar */}
        <Section className="py-4 border-y border-white/10">
          <Container>
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-white/50">
                Showing {products.length} of {totalProducts} products
              </div>
              
              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('sort', e.target.value);
                    params.delete('page');
                    router.push(`/collections/${collection.slug}?${params.toString()}`);
                  }}
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
            </div>
          </Container>
        </Section>
        
        {/* Products Grid */}
        <Section>
          <Container>
            {products.length === 0 ? (
              <FadeIn>
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-xl text-white/60">No products in this collection</p>
                  <p className="mt-2 text-sm text-white/40">
                    Check back later or browse other collections
                  </p>
                  <Link
                    href="/collections"
                    className="mt-6 border border-white px-6 py-2 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Browse Collections
                  </Link>
                </div>
              </FadeIn>
            ) : (
              <StaggerReveal stagger={0.05}>
                <ProductGrid 
                  products={products} 
                  columns={4}
                  variant="default"
                />
              </StaggerReveal>
            )}
            
            {/* Pagination */}
            {totalProducts > 12 && (
              <div className="mt-16 flex justify-center gap-2">
                {Array.from({ length: Math.ceil(totalProducts / 12) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams.toString());
                      newParams.set('page', (i + 1).toString());
                      router.push(`/collections/${collection.slug}?${newParams.toString()}`);
                    }}
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

export default function CollectionDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    }>
      <CollectionContent />
    </Suspense>
  );
}
