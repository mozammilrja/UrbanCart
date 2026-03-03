export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image: string;
  bannerImage?: string;
  productCount: number;
  products: string[]; // Product IDs
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export const collections: Collection[] = [
  {
    id: 'col_essentials',
    name: 'Streetwear Essentials',
    slug: 'streetwear-essentials',
    description: 'Core pieces that define the urban aesthetic. Build your wardrobe with these must-have streetwear staples that blend comfort with style.',
    shortDescription: 'Core pieces that define the urban aesthetic',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&h=400&fit=crop',
    productCount: 24,
    products: ['prod_001', 'prod_002', 'prod_003', 'prod_005'],
    isActive: true,
    isFeatured: true,
    sortOrder: 1,
    seo: {
      title: 'Streetwear Essentials | APOSTLE',
      description: 'Shop essential streetwear pieces - oversized tees, hoodies, cargo pants and more.',
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'col_limited',
    name: 'Limited Drops',
    slug: 'limited-drops',
    description: 'Exclusive releases with limited quantities. Once they are gone, they are gone forever. Be quick to secure your piece of streetwear history.',
    shortDescription: 'Exclusive releases, limited quantities',
    image: 'https://images.unsplash.com/photo-1558171013-128e4c5a8c3c?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1558171013-128e4c5a8c3c?w=1200&h=400&fit=crop',
    productCount: 8,
    products: ['prod_004'],
    isActive: true,
    isFeatured: true,
    sortOrder: 2,
    seo: {
      title: 'Limited Drops | APOSTLE',
      description: 'Exclusive limited edition streetwear releases. Limited quantities available.',
    },
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'col_summer24',
    name: 'Summer 2024',
    slug: 'summer-2024',
    description: 'Lightweight and breathable styles perfect for the warm season ahead. Stay fresh and comfortable without compromising on style.',
    shortDescription: 'Lightweight styles for the season',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=400&fit=crop',
    productCount: 18,
    products: ['prod_001', 'prod_006'],
    isActive: true,
    isFeatured: false,
    sortOrder: 3,
    seo: {
      title: 'Summer 2024 Collection | APOSTLE',
      description: 'Shop our Summer 2024 collection - lightweight streetwear for the warm season.',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
  {
    id: 'col_mono',
    name: 'Monochrome',
    slug: 'monochrome',
    description: 'Classic black and white statement pieces. Timeless colors that never go out of style. Mix and match for the perfect monochrome outfit.',
    shortDescription: 'Classic black and white statement pieces',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=400&fit=crop',
    productCount: 12,
    products: ['prod_001', 'prod_002', 'prod_004'],
    isActive: true,
    isFeatured: false,
    sortOrder: 4,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'col_accessories',
    name: 'Urban Accessories',
    slug: 'urban-accessories',
    description: 'Complete your look with premium accessories. Caps, bags, jewelry and more to elevate any outfit.',
    shortDescription: 'Complete your look with premium accessories',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1200&h=400&fit=crop',
    productCount: 15,
    products: ['prod_004'],
    isActive: true,
    isFeatured: false,
    sortOrder: 5,
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  {
    id: 'col_collab',
    name: 'Artist Collaborations',
    slug: 'collaboration',
    description: 'Unique designs from creative partnerships with local and international artists. Limited edition pieces that celebrate art and fashion.',
    shortDescription: 'Unique designs from creative partnerships',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&h=400&fit=crop',
    productCount: 6,
    products: ['prod_006'],
    isActive: true,
    isFeatured: true,
    sortOrder: 6,
    seo: {
      title: 'Artist Collaborations | APOSTLE',
      description: 'Exclusive artist collaboration streetwear. Limited edition designs.',
    },
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
  },
];

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find((c) => c.id === id);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((c) => c.slug === slug);
};

export const getFeaturedCollections = (): Collection[] => {
  return collections.filter((c) => c.isFeatured && c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
};

export const getActiveCollections = (): Collection[] => {
  return collections.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
};
