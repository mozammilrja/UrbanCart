import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { HeroSection } from '@/components/sections';
import { LazySection } from '@/components/ui/LazySection';
import {
  products,
  getCapsProducts,
  getLatestProducts,
  banners,
  storeLocations,
} from '@/data/mock';

// Dynamically import below-fold sections to reduce initial bundle
const LatestDropSection = dynamic(
  () => import('@/components/sections/LatestDropSection').then(mod => ({ default: mod.LatestDropSection })),
  { 
    loading: () => <SectionSkeleton height="500px" />,
    ssr: true 
  }
);

const CategorySection = dynamic(
  () => import('@/components/sections/CategorySection').then(mod => ({ default: mod.CategorySection })),
  { 
    loading: () => <SectionSkeleton height="500px" />,
    ssr: true 
  }
);

const BannerSection = dynamic(
  () => import('@/components/sections/BannerSection').then(mod => ({ default: mod.BannerSection })),
  { 
    loading: () => <SectionSkeleton height="400px" />,
    ssr: true 
  }
);

const ProductGridSection = dynamic(
  () => import('@/components/sections/ProductGridSection').then(mod => ({ default: mod.ProductGridSection })),
  { 
    loading: () => <SectionSkeleton height="600px" />,
    ssr: true 
  }
);

const StoreLocationsSection = dynamic(
  () => import('@/components/sections/StoreLocationsSection').then(mod => ({ default: mod.StoreLocationsSection })),
  { 
    loading: () => <SectionSkeleton height="400px" />,
    ssr: true 
  }
);

// Lightweight skeleton for sections
function SectionSkeleton({ height }: { height: string }) {
  return (
    <div 
      className="w-full bg-gray-100 animate-pulse" 
      style={{ height }}
      aria-hidden="true"
    />
  );
}

export default function HomePage() {
  const latestProducts = getLatestProducts(8);
  const capsProducts = getCapsProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      {/* Hero Section - Critical, loaded immediately */}
      <HeroSection
        image="https://bluorng.com/cdn/shop/files/htfyjh.jpg?v=1772344996"
        mobileImage="https://bluorng.com/cdn/shop/files/e5hg4te.jpg?v=1772264873"
      />

      {/* Latest Drop Section - First below fold, high priority */}
      <Suspense fallback={<SectionSkeleton height="500px" />}>
        <LatestDropSection
          title="Latest drop"
          products={latestProducts}
          viewAllHref="/collections/new"
          viewAllText="Discover more"
        />
      </Suspense>

      {/* Remaining sections - Lazy loaded */}
      <LazySection minHeight="500px" rootMargin="300px">
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <CategorySection
            title="Caps"
            products={capsProducts}
            viewAllHref="/caps"
            viewAllText="Discover more"
            bgColor="gray"
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="400px" rootMargin="300px">
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <BannerSection banners={banners} />
        </Suspense>
      </LazySection>

      <LazySection minHeight="600px" rootMargin="300px">
        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <ProductGridSection
            title="Featured Pieces"
            subtitle="Curated selection of our best sellers"
            products={featuredProducts}
            columns={4}
            viewAllHref="/collections"
            viewAllText="View All Products"
            showFilters={false}
          />
        </Suspense>
      </LazySection>

      <LazySection minHeight="400px" rootMargin="300px">
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <StoreLocationsSection stores={storeLocations} />
        </Suspense>
      </LazySection>
    </>
  );
}
