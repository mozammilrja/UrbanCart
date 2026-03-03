import Link from 'next/link';
import Image from 'next/image';
import {
  Section,
  Container,
  GrainOverlay,
  InfiniteMarquee,
} from '@/components/ui';
import { FadeIn, StaggerReveal, Parallax } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';

export const metadata = {
  title: 'About | UrbanCart',
  description: 'Discover the story behind UrbanCart - India\'s premium streetwear destination.',
};

const values = [
  {
    title: 'Authenticity',
    description: 'We celebrate genuine self-expression through fashion that speaks to the streets.',
  },
  {
    title: 'Quality',
    description: 'Every piece is crafted with premium materials that stand the test of time.',
  },
  {
    title: 'Culture',
    description: 'We draw inspiration from India\'s rich urban landscape and global street culture.',
  },
  {
    title: 'Community',
    description: 'We\'re building a movement of like-minded individuals who live and breathe street style.',
  },
];

const milestones = [
  { year: '2020', title: 'Founded', description: 'Started with a vision to redefine Indian streetwear' },
  { year: '2021', title: '10K Community', description: 'Built a loyal following of streetwear enthusiasts' },
  { year: '2022', title: 'First Drop', description: 'Launched our debut limited edition collection' },
  { year: '2023', title: 'National Reach', description: 'Expanded delivery across all of India' },
  { year: '2024', title: 'Premium Launch', description: 'Introduced our luxury streetwear line' },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        {/* Hero Section */}
        <Section className="relative pt-32 pb-24">
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Our Story
                </p>
                <h1 className="mt-4 text-4xl font-extralight tracking-tight text-white md:text-6xl lg:text-7xl">
                  Born from the <span className="font-medium">Streets</span>
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
                  UrbanCart isn't just a brand—it's a movement. We're redefining what Indian streetwear 
                  can be, blending global aesthetics with local culture to create something entirely new.
                </p>
              </div>
            </FadeIn>
          </Container>
        </Section>
        
        {/* Full-width Image */}
        <Section className="py-0">
          <Parallax speed={0.3}>
            <div className="relative aspect-[21/9] overflow-hidden bg-neutral-900">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=2000&h=800&fit=crop)'
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <FadeIn delay={0.3}>
                  <div className="text-center">
                    <p className="text-6xl font-extralight text-white md:text-8xl lg:text-9xl">2024</p>
                    <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/60">And Beyond</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Parallax>
        </Section>
        
        {/* Mission Statement */}
        <Section>
          <Container>
            <div className="mx-auto max-w-3xl">
              <FadeIn>
                <blockquote className="text-center">
                  <p className="text-2xl font-light leading-relaxed text-white md:text-3xl lg:text-4xl">
                    "We believe streetwear is more than clothing—it's identity, culture, and self-expression 
                    woven into fabric."
                  </p>
                  <footer className="mt-8 text-sm uppercase tracking-widest text-white/40">
                    — The UrbanCart Team
                  </footer>
                </blockquote>
              </FadeIn>
            </div>
          </Container>
        </Section>
        
        {/* Values */}
        <Section className="border-t border-white/10">
          <Container>
            <FadeIn>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">What We Stand For</p>
                <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white md:text-4xl">
                  Our Values
                </h2>
              </div>
            </FadeIn>
            
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <StaggerReveal stagger={0.1}>
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="border border-white/10 p-8 text-center transition-colors hover:border-white/20"
                  >
                    <h3 className="text-lg font-medium text-white">{value.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/60">{value.description}</p>
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </Container>
        </Section>
        
        {/* Timeline */}
        <Section className="border-t border-white/10">
          <Container>
            <FadeIn>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Our Journey</p>
                <h2 className="mt-4 text-3xl font-extralight tracking-tight text-white md:text-4xl">
                  Milestones
                </h2>
              </div>
            </FadeIn>
            
            <div className="mt-16">
              <StaggerReveal stagger={0.1}>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
                  
                  {milestones.map((milestone, index) => (
                    <div 
                      key={index}
                      className={`relative flex items-center gap-8 py-8 ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <p className="text-4xl font-extralight text-white">{milestone.year}</p>
                        <p className="mt-2 text-lg font-medium text-white/80">{milestone.title}</p>
                        <p className="mt-1 text-sm text-white/50">{milestone.description}</p>
                      </div>
                      
                      <div className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white" />
                      
                      <div className="flex-1" />
                    </div>
                  ))}
                </div>
              </StaggerReveal>
            </div>
          </Container>
        </Section>
        
        {/* Marquee */}
        <Section className="py-0 border-y border-white/10">
          <InfiniteMarquee>
            <div className="flex items-center gap-12 px-6">
              <span className="text-sm uppercase tracking-widest text-white/60">Premium Quality</span>
              <span className="text-white/20">•</span>
              <span className="text-sm uppercase tracking-widest text-white/60">Made in India</span>
              <span className="text-white/20">•</span>
              <span className="text-sm uppercase tracking-widest text-white/60">Limited Drops</span>
              <span className="text-white/20">•</span>
              <span className="text-sm uppercase tracking-widest text-white/60">Street Culture</span>
              <span className="text-white/20">•</span>
              <span className="text-sm uppercase tracking-widest text-white/60">Authentic Style</span>
              <span className="text-white/20">•</span>
            </div>
          </InfiniteMarquee>
        </Section>
        
        {/* CTA */}
        <Section>
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-extralight tracking-tight text-white md:text-4xl">
                  Ready to Join the Movement?
                </h2>
                <p className="mt-4 text-white/60">
                  Explore our latest collections and find your style.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/shop"
                    className="bg-white px-8 py-4 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-neutral-200"
                  >
                    Shop Now
                  </Link>
                  <Link
                    href="/contact"
                    className="border border-white/30 px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/5"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
}
