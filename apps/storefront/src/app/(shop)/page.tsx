import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Truck, RotateCcw, Shield, Sparkles } from 'lucide-react';
import {
  Section,
  Container,
  SectionHeader,
  ProductGrid,
  CollectionCard,
  CollectionGrid,
  FeatureCard,
  InfiniteMarquee,
  GrainOverlay,
} from '@/components/ui';
import {
  FadeIn,
  StaggerReveal,
  Parallax,
} from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { productService } from '@/services/product.service';
import { collectionService } from '@/services/collection.service';
import { toStorefrontProduct } from '@/types/storefront.types';

// Dynamic import for hero (client-side only)
const HeroCanvas = dynamic(
  () => import('@/components/three/hero-fallback'),
  { ssr: false, loading: () => <HeroFallback /> }
);

function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black" />
  );
}

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'Orders above ₹999' },
  { icon: RotateCcw, title: 'Easy Returns', description: '30-day policy' },
  { icon: Shield, title: 'Secure Payments', description: 'UPI, Cards, Wallets' },
  { icon: Sparkles, title: 'Premium Quality', description: 'Crafted in India' },
];

export default async function HomePage() {
  // Fetch data using services (mock mode)
  const [rawFeaturedProducts, collections] = await Promise.all([
    productService.getFeatured(8),
    collectionService.getFeatured(4),
  ]);
  
  // Convert to storefront products (normalize images to string[])
  const featuredProducts = rawFeaturedProducts.map(toStorefrontProduct);
  
  const announcements = [
    'FREE SHIPPING ON ₹999+',
    'NEW DROP EVERY FRIDAY',
    'PREMIUM QUALITY GUARANTEED',
    'USE CODE URBAN20 FOR 20% OFF',
  ];
  
  return (
    <PageTransition>
      <div className="bg-black">
        {/* Film grain overlay */}
        <GrainOverlay opacity={0.02} />
        
        {/* Hero Section - Three.js Cinematic */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Three.js Canvas */}
          <div className="absolute inset-0">
            <Suspense fallback={<HeroFallback />}>
              <HeroCanvas />
            </Suspense>
          </div>
          
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          
          {/* Hero Content */}
          <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <FadeIn delay={0.5}>
              <span className="text-xs uppercase tracking-[0.4em] text-white/50">
                Premium Indian Streetwear
              </span>
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <h1 className="font-display text-5xl font-light tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
                URBAN
                <span className="block text-white/40">CART</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={1.4}>
              <p className="mx-auto mt-8 max-w-md text-base text-white/60 sm:text-lg">
                Where street culture meets premium craftsmanship.
                Exclusive drops. Limited editions.
              </p>
            </FadeIn>
            
            <FadeIn delay={1.8}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
                <a
                  href="/shop"
                  className="group inline-flex h-14 items-center justify-center gap-3 bg-white px-8 text-sm font-medium uppercase tracking-wider text-black transition-all hover:bg-white/90"
                >
                  Shop Collection
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/collections"
                  className="inline-flex h-14 items-center justify-center border border-white/30 bg-transparent px-8 text-sm font-medium uppercase tracking-wider text-white transition-all hover:border-white hover:bg-white/5"
                >
                  Explore Drops
                </a>
              </div>
            </FadeIn>
            
            {/* Scroll indicator */}
            <FadeIn delay={2.2} className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
                <div className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Announcement Marquee */}
        <section className="border-y border-white/10 bg-black py-4">
          <InfiniteMarquee speed={40}>
            <div className="flex items-center gap-16 px-8">
              {announcements.map((text, i) => (
                <span key={i} className="flex items-center gap-16 text-xs font-medium uppercase tracking-widest text-white/60">
                  {text}
                  <span className="text-white/20">◆</span>
                </span>
              ))}
            </div>
          </InfiniteMarquee>
        </section>

        {/* Brand Values */}
        <Section className="border-b border-white/10">
          <Container>
            <StaggerReveal>
              <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {features.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    icon={<feature.icon className="h-5 w-5" />}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </StaggerReveal>
          </Container>
        </Section>

        {/* Featured Products */}
        <Section>
          <Container>
            <SectionHeader
              eyebrow="Latest Drop"
              title="Featured Products"
              description="Premium streetwear pieces, crafted with precision for the culture"
              ctaText="View All"
              ctaHref="/shop"
            />
            
            <div className="mt-16">
              <StaggerReveal stagger={0.1}>
                <ProductGrid 
                  products={featuredProducts} 
                  columns={4}
                />
              </StaggerReveal>
            </div>
          </Container>
        </Section>

        {/* Featured Collection Banner */}
        {collections[0] && (
          <Section className="py-0">
            <Parallax speed={0.3}>
              <CollectionCard
                collection={collections[0]}
                variant="large"
              />
            </Parallax>
          </Section>
        )}

        {/* More Collections */}
        <Section>
          <Container>
            <SectionHeader
              eyebrow="Curated"
              title="Shop Collections"
              description="Explore our carefully curated selection of premium streetwear"
            />
            
            <div className="mt-16">
              <StaggerReveal stagger={0.15}>
                <CollectionGrid
                  collections={collections.slice(1, 4)}
                  columns={3}
                />
              </StaggerReveal>
            </div>
          </Container>
        </Section>

        {/* Newsletter Section */}
        <Section className="border-t border-white/10 bg-neutral-950">
          <Container size="narrow">
            <FadeIn>
              <div className="text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Stay Connected
                </span>
                <h2 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">
                  Join the Movement
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base text-white/60">
                  Subscribe for early access to drops, exclusive offers, and 10% off your first order.
                </p>
                
                <form className="mx-auto mt-8 max-w-md">
                  <div className="flex gap-0">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="h-14 flex-1 border border-white/20 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-0"
                    />
                    <button
                      type="submit"
                      className="h-14 shrink-0 bg-white px-6 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-white/90"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-white/40">
                    By subscribing, you agree to our Privacy Policy
                  </p>
                </form>
              </div>
            </FadeIn>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
}
