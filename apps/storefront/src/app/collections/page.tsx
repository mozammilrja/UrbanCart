import type { Metadata } from 'next';
import { collections, products } from '@/data/mock';
import { CollectionsPageClient } from './CollectionsPageClient';

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse all APOSTLE collections - Premium Indian streetwear',
};

export default function CollectionsPage() {
  const totalProducts = collections.reduce((sum, c) => sum + c.productCount, 0);

  // Hero images for the slider
  const heroImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=80',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80',
  ];

  return (
    <CollectionsPageClient 
      collections={collections}
      products={products.slice(0, 8)}
      totalProducts={totalProducts}
      heroImages={heroImages}
    />
  );
}
