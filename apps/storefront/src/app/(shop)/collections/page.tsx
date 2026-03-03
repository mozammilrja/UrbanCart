import {
  Section,
  Container,
  SectionHeader,
  CollectionGrid,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn, StaggerReveal } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { collectionService } from '@/services/collection.service';

export const metadata = {
  title: 'Collections | UrbanCart',
  description: 'Explore our curated collections of premium streetwear. From limited drops to seasonal essentials.',
};

export default async function CollectionsPage() {
  const collections = await collectionService.getAll();
  
  // Use first collection with most products as featured
  const sortedByProducts = [...collections].sort((a, b) => b.productCount - a.productCount);
  const featuredCollection = sortedByProducts[0];
  const regularCollections = collections.filter(c => c.id !== featuredCollection?.id);
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        {/* Page Header */}
        <Section className="pt-32 pb-16">
          <Container>
            <FadeIn>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Curated Selections
                </p>
                <h1 className="mt-4 text-4xl font-extralight tracking-tight text-white md:text-6xl lg:text-7xl">
                  Our <span className="font-medium">Collections</span>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
                  Discover our carefully curated collections, each telling a unique story of urban style and cultural expression.
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Featured Collection Hero */}
        {featuredCollection && (
          <Section className="py-0">
            <FadeIn delay={0.2}>
              <div className="relative aspect-[21/9] overflow-hidden bg-neutral-900">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: featuredCollection.image 
                      ? `url(${featuredCollection.image})` 
                      : 'linear-gradient(to right, #1a1a1a, #2a2a2a)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Featured Collection
                  </p>
                  <h2 className="mt-4 text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
                    {featuredCollection.name}
                  </h2>
                  <p className="mt-4 max-w-lg text-lg text-white/70">
                    {featuredCollection.description}
                  </p>
                  <div className="mt-8">
                    <a
                      href={`/collections/${featuredCollection.slug}`}
                      className="group inline-flex items-center gap-3 border border-white bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
                    >
                      Explore Now
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                  
                  <p className="mt-8 text-sm text-white/40">
                    {featuredCollection.productCount} Products
                  </p>
                </div>
              </div>
            </FadeIn>
          </Section>
        )}

        {/* All Collections Grid */}
        <Section>
          <Container>
            <SectionHeader
              eyebrow="Browse"
              title="All Collections"
              description="From limited drops to seasonal essentials"
            />
            
            <div className="mt-16">
              <StaggerReveal stagger={0.1}>
                <CollectionGrid collections={regularCollections} columns={3} />
              </StaggerReveal>
            </div>
          </Container>
        </Section>

        {/* Stats Section */}
        <Section className="border-t border-white/10">
          <Container>
            <FadeIn>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <p className="text-4xl font-light text-white md:text-5xl">{collections.length}</p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-white/40">Collections</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-light text-white md:text-5xl">300+</p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-white/40">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-light text-white md:text-5xl">15</p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-white/40">New This Week</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-light text-white md:text-5xl">∞</p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-white/40">Possibilities</p>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
}
