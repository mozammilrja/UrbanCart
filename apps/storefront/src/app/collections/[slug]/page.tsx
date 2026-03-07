import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { collections, products, getProductsByCategory } from '@/data/mock';
import { CollectionProductsSection } from './CollectionProductsSection';
import { CollectionHeroSlider } from './CollectionHeroSlider';
import { 
  Package, 
  Truck, 
  Shield, 
  ArrowRight
} from 'lucide-react';

// Hero images for collections (multiple per collection for slider)
const collectionHeroImages: Record<string, string[]> = {
  'drop-001': [
    'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1920&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80',
  ],
  'summer-essentials': [
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    'https://images.unsplash.com/photo-1485968579169-19b5b6d8b764?w=1920&q=80',
  ],
  'caps': [
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1920&q=80',
    'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1920&q=80',
    'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=1920&q=80',
    'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1920&q=80',
  ],
  'hoodies': [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1920&q=80',
    'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=1920&q=80',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1920&q=80',
    'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=1920&q=80',
  ],
  'new': [
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=80',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
  ],
  'limited': [
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80',
  ],
  't-shirts': [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1920&q=80',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1920&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1920&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1920&q=80',
  ],
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  
  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  // Get products for this collection (using category for now)
  const collectionProducts = getProductsByCategory(slug) || products.slice(0, 8);
  const displayProducts = collectionProducts.length > 0 ? collectionProducts : products.slice(0, 8);
  
  // Get hero images for this collection
  const heroImages = collectionHeroImages[slug] || [collection.bannerImage];

  return (
    <div className="min-h-screen">
      {/* Full-Width Hero Slider */}
      <CollectionHeroSlider
        collectionName={collection.name}
        collectionDescription={collection.description}
        productCount={displayProducts.length}
        images={heroImages}
      />

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

      {/* Client-side Products Section with Carousel */}
      <CollectionProductsSection 
        products={displayProducts}
        collectionName={collection.name}
        recommendedProducts={products.slice(0, 8)}
      />

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#222]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-6">
            Explore More Collections
          </h2>
          
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
            Each collection tells a unique story. Discover more styles that define street culture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#111] rounded-full hover:bg-white/90 transition-colors"
            >
              <span className="font-medium tracking-wide">All Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <span className="font-medium tracking-wide">Shop All</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}
