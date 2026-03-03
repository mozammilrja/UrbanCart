/**
 * UrbanCart Collections Mock Data
 */

import type { Collection } from '@urbancart/types';

export const mockCollections: Collection[] = [
  {
    id: 'col_essentials',
    name: 'Streetwear Essentials',
    slug: 'streetwear-essentials',
    description: 'Core pieces that define the urban aesthetic. Build your wardrobe with these must-have streetwear staples that never go out of style.',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&h=800&fit=crop',
    type: 'manual',
    productCount: 48,
    status: 'active',
    seo: {
      title: 'Streetwear Essentials | UrbanCart',
      description: 'Shop essential streetwear pieces that define urban fashion',
      keywords: ['streetwear', 'essentials', 'urban fashion', 'basics'],
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'col_winter',
    name: 'Winter Collection 2026',
    slug: 'winter-2026',
    description: 'Bold layers for the cold. Premium jackets, heavyweight hoodies, and cozy knits designed to keep you warm without compromising style.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop',
    type: 'manual',
    productCount: 32,
    status: 'active',
    seo: {
      title: 'Winter Collection 2026 | UrbanCart',
      description: 'Shop the Winter 2026 collection - Premium layers and cozy pieces',
    },
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2025-12-15T10:30:00Z',
  },
  {
    id: 'col_limited',
    name: 'Limited Drops',
    slug: 'limited-drops',
    description: 'Exclusive releases with limited quantities. Once they\'re gone, they\'re gone forever. Don\'t miss out on these collector\'s pieces.',
    image: 'https://images.unsplash.com/photo-1558171013-128e4c5a8c3c?w=1200&h=800&fit=crop',
    type: 'manual',
    productCount: 12,
    status: 'active',
    seo: {
      title: 'Limited Drops | UrbanCart',
      description: 'Exclusive limited edition streetwear releases',
    },
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'col_new',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Fresh from the studio. Discover our latest designs and newest additions to the UrbanCart family. Be the first to rock the latest trends.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop',
    type: 'automated',
    conditions: [{ field: 'isNew', operator: 'equals', value: 'true' }],
    productCount: 24,
    status: 'active',
    seo: {
      title: 'New Arrivals | UrbanCart',
      description: 'Shop the newest streetwear arrivals at UrbanCart',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col_bestseller',
    name: 'Bestsellers',
    slug: 'bestsellers',
    description: 'Community favorites and top-rated pieces. Discover what everyone\'s wearing and why these items have become instant classics.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop',
    type: 'automated',
    conditions: [{ field: 'isBestseller', operator: 'equals', value: 'true' }],
    productCount: 18,
    status: 'active',
    seo: {
      title: 'Bestsellers | UrbanCart',
      description: 'Shop our most popular streetwear pieces',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'col_premium',
    name: 'Premium Selection',
    slug: 'premium-selection',
    description: 'For those who demand the finest. Premium materials, exceptional craftsmanship, and elevated designs for the discerning streetwear connoisseur.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    type: 'manual',
    productCount: 16,
    status: 'active',
    seo: {
      title: 'Premium Selection | UrbanCart',
      description: 'Luxury streetwear and premium fashion pieces',
    },
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-01-05T14:20:00Z',
  },
  {
    id: 'col_monochrome',
    name: 'Monochrome',
    slug: 'monochrome',
    description: 'Classic black and white statement pieces for the minimalist. Timeless colorways that never go out of style.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop',
    type: 'manual',
    productCount: 28,
    status: 'active',
    seo: {
      title: 'Monochrome Collection | UrbanCart',
      description: 'Black and white streetwear essentials',
    },
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'col_accessories',
    name: 'Urban Accessories',
    slug: 'urban-accessories',
    description: 'Complete your look with premium accessories. From caps to bags, chains to belts - everything you need to elevate your style.',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1200&h=800&fit=crop',
    type: 'manual',
    productCount: 40,
    status: 'active',
    seo: {
      title: 'Urban Accessories | UrbanCart',
      description: 'Premium streetwear accessories and add-ons',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z',
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return mockCollections.find(c => c.slug === slug);
}

export function getCollectionById(id: string): Collection | undefined {
  return mockCollections.find(c => c.id === id);
}

export function getFeaturedCollections(limit = 4): Collection[] {
  return mockCollections.slice(0, limit);
}
