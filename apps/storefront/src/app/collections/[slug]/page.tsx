import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ProductGridSection } from '@/components/sections';
import { collections, products, getProductsByCategory } from '@/data/mock';

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

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] min-h-[300px] overflow-hidden">
        <Image
          src={collection.bannerImage}
          alt={collection.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4">
              {collection.name}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-md mx-auto px-4">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <ProductGridSection
        products={collectionProducts.length > 0 ? collectionProducts : products.slice(0, 8)}
        columns={4}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}
