import type { Product } from '@urbancart/types';

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Urban Oversized Tee',
    slug: 'urban-oversized-tee',
    description: 'Premium cotton oversized t-shirt with a relaxed fit. Features dropped shoulders and a boxy silhouette that defines modern streetwear.',
    shortDescription: 'Premium oversized cotton tee with relaxed fit',
    price: 1999,
    compareAtPrice: 2499,
    currency: 'INR',
    sku: 'UC-TEE-001',
    barcode: '8901234567890',
    inventory: {
      quantity: 150,
      lowStockThreshold: 20,
      trackInventory: true,
    },
    category: {
      id: 'cat_tees',
      name: 'Tees',
      slug: 'tees',
    },
    subcategory: {
      id: 'subcat_oversized',
      name: 'Oversized',
      slug: 'oversized',
    },
    collections: [
      { id: 'col_essentials', name: 'Streetwear Essentials', slug: 'streetwear-essentials' },
    ],
    variants: [
      { id: 'var_001_s_blk', size: 'S', color: 'Black', colorCode: '#000000', sku: 'UC-TEE-001-S-BLK', inventory: 25, price: 1999 },
      { id: 'var_001_m_blk', size: 'M', color: 'Black', colorCode: '#000000', sku: 'UC-TEE-001-M-BLK', inventory: 30, price: 1999 },
      { id: 'var_001_l_blk', size: 'L', color: 'Black', colorCode: '#000000', sku: 'UC-TEE-001-L-BLK', inventory: 35, price: 1999 },
      { id: 'var_001_xl_blk', size: 'XL', color: 'Black', colorCode: '#000000', sku: 'UC-TEE-001-XL-BLK', inventory: 30, price: 1999 },
      { id: 'var_001_m_wht', size: 'M', color: 'White', colorCode: '#FFFFFF', sku: 'UC-TEE-001-M-WHT', inventory: 20, price: 1999 },
      { id: 'var_001_l_wht', size: 'L', color: 'White', colorCode: '#FFFFFF', sku: 'UC-TEE-001-L-WHT', inventory: 10, price: 1999 },
    ],
    images: [
      { id: 'img_001_1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop', alt: 'Urban Oversized Tee - Front', isPrimary: true },
      { id: 'img_001_2', url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop', alt: 'Urban Oversized Tee - Back', isPrimary: false },
      { id: 'img_001_3', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop', alt: 'Urban Oversized Tee - Detail', isPrimary: false },
    ],
    tags: ['oversized', 'cotton', 'streetwear', 'casual', 'bestseller'],
    rating: 4.5,
    reviewCount: 127,
    isActive: true,
    isFeatured: true,
    isNew: true,
    metadata: {
      material: '100% Premium Cotton',
      weight: '280 GSM',
      fit: 'Oversized',
      care: 'Machine wash cold, tumble dry low',
    },
    seo: {
      title: 'Urban Oversized Tee | UrbanCart',
      description: 'Shop the Urban Oversized Tee - Premium cotton streetwear essential with relaxed fit and dropped shoulders.',
      keywords: ['oversized tee', 'streetwear', 'premium cotton', 'urban fashion'],
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'prod_002',
    name: 'Street Drop Hoodie',
    slug: 'street-drop-hoodie',
    description: 'Our signature hoodie featuring heavyweight fleece, a kangaroo pocket, and adjustable drawstring hood. The perfect layering piece for any season.',
    shortDescription: 'Heavyweight fleece hoodie with premium finish',
    price: 3499,
    currency: 'INR',
    sku: 'UC-HOD-001',
    barcode: '8901234567891',
    inventory: {
      quantity: 85,
      lowStockThreshold: 15,
      trackInventory: true,
    },
    category: {
      id: 'cat_hoodies',
      name: 'Hoodies',
      slug: 'hoodies',
    },
    collections: [
      { id: 'col_essentials', name: 'Streetwear Essentials', slug: 'streetwear-essentials' },
      { id: 'col_winter', name: 'Winter Collection', slug: 'winter-collection' },
    ],
    variants: [
      { id: 'var_002_m_nav', size: 'M', color: 'Navy', colorCode: '#1E3A5F', sku: 'UC-HOD-001-M-NAV', inventory: 20, price: 3499 },
      { id: 'var_002_l_nav', size: 'L', color: 'Navy', colorCode: '#1E3A5F', sku: 'UC-HOD-001-L-NAV', inventory: 25, price: 3499 },
      { id: 'var_002_xl_nav', size: 'XL', color: 'Navy', colorCode: '#1E3A5F', sku: 'UC-HOD-001-XL-NAV', inventory: 20, price: 3499 },
      { id: 'var_002_m_blk', size: 'M', color: 'Black', colorCode: '#000000', sku: 'UC-HOD-001-M-BLK', inventory: 10, price: 3499 },
      { id: 'var_002_l_blk', size: 'L', color: 'Black', colorCode: '#000000', sku: 'UC-HOD-001-L-BLK', inventory: 10, price: 3499 },
    ],
    images: [
      { id: 'img_002_1', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop', alt: 'Street Drop Hoodie - Front', isPrimary: true },
      { id: 'img_002_2', url: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&h=1000&fit=crop', alt: 'Street Drop Hoodie - Back', isPrimary: false },
    ],
    tags: ['hoodie', 'fleece', 'streetwear', 'winter', 'essential'],
    rating: 4.8,
    reviewCount: 89,
    isActive: true,
    isFeatured: true,
    isNew: false,
    metadata: {
      material: '80% Cotton, 20% Polyester',
      weight: '380 GSM',
      fit: 'Regular',
      care: 'Machine wash cold, do not bleach',
    },
    seo: {
      title: 'Street Drop Hoodie | UrbanCart',
      description: 'Premium heavyweight fleece hoodie with kangaroo pocket. Essential streetwear layering piece.',
    },
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'prod_003',
    name: 'Classic Cargo Pants',
    slug: 'classic-cargo-pants',
    description: 'Utility-inspired cargo pants with multiple pockets and a relaxed tapered fit. Features adjustable ankle cuffs and durable cotton twill fabric.',
    shortDescription: 'Utility cargo pants with tapered fit',
    price: 2999,
    currency: 'INR',
    sku: 'UC-PNT-001',
    barcode: '8901234567892',
    inventory: {
      quantity: 60,
      lowStockThreshold: 10,
      trackInventory: true,
    },
    category: {
      id: 'cat_pants',
      name: 'Pants',
      slug: 'pants',
    },
    subcategory: {
      id: 'subcat_cargo',
      name: 'Cargo',
      slug: 'cargo',
    },
    collections: [
      { id: 'col_essentials', name: 'Streetwear Essentials', slug: 'streetwear-essentials' },
    ],
    variants: [
      { id: 'var_003_30_olv', size: '30', color: 'Olive', colorCode: '#556B2F', sku: 'UC-PNT-001-30-OLV', inventory: 15, price: 2999 },
      { id: 'var_003_32_olv', size: '32', color: 'Olive', colorCode: '#556B2F', sku: 'UC-PNT-001-32-OLV', inventory: 20, price: 2999 },
      { id: 'var_003_34_olv', size: '34', color: 'Olive', colorCode: '#556B2F', sku: 'UC-PNT-001-34-OLV', inventory: 15, price: 2999 },
      { id: 'var_003_32_blk', size: '32', color: 'Black', colorCode: '#000000', sku: 'UC-PNT-001-32-BLK', inventory: 10, price: 2999 },
    ],
    images: [
      { id: 'img_003_1', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop', alt: 'Classic Cargo Pants - Front', isPrimary: true },
    ],
    tags: ['cargo', 'pants', 'utility', 'streetwear'],
    rating: 4.3,
    reviewCount: 45,
    isActive: true,
    isFeatured: false,
    isNew: false,
    metadata: {
      material: '100% Cotton Twill',
      fit: 'Relaxed Tapered',
      care: 'Machine wash warm',
    },
    createdAt: '2023-08-01T00:00:00Z',
    updatedAt: '2024-01-05T14:20:00Z',
  },
  {
    id: 'prod_004',
    name: 'Limited Edition Cap',
    slug: 'limited-edition-cap',
    description: 'Structured cap with embroidered logo and adjustable strap. Part of our limited edition collection with only 500 units produced.',
    shortDescription: 'Limited edition structured cap',
    price: 999,
    compareAtPrice: 1299,
    currency: 'INR',
    sku: 'UC-CAP-001',
    barcode: '8901234567893',
    inventory: {
      quantity: 42,
      lowStockThreshold: 10,
      trackInventory: true,
    },
    category: {
      id: 'cat_accessories',
      name: 'Accessories',
      slug: 'accessories',
    },
    subcategory: {
      id: 'subcat_headwear',
      name: 'Headwear',
      slug: 'headwear',
    },
    collections: [
      { id: 'col_limited', name: 'Limited Drops', slug: 'limited-drops' },
    ],
    variants: [
      { id: 'var_004_os_blk', size: 'One Size', color: 'Black', colorCode: '#000000', sku: 'UC-CAP-001-OS-BLK', inventory: 25, price: 999 },
      { id: 'var_004_os_wht', size: 'One Size', color: 'White', colorCode: '#FFFFFF', sku: 'UC-CAP-001-OS-WHT', inventory: 17, price: 999 },
    ],
    images: [
      { id: 'img_004_1', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=1000&fit=crop', alt: 'Limited Edition Cap', isPrimary: true },
    ],
    tags: ['cap', 'limited', 'accessories', 'headwear'],
    rating: 4.9,
    reviewCount: 156,
    isActive: true,
    isFeatured: true,
    isNew: true,
    metadata: {
      material: '100% Cotton Twill',
      care: 'Spot clean only',
    },
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-12T09:00:00Z',
  },
  {
    id: 'prod_005',
    name: 'Premium Sneakers',
    slug: 'premium-sneakers',
    description: 'Handcrafted leather sneakers with cushioned insole and rubber outsole. Designed for all-day comfort with a clean minimalist aesthetic.',
    shortDescription: 'Handcrafted leather sneakers',
    price: 5999,
    currency: 'INR',
    sku: 'UC-SNK-001',
    barcode: '8901234567894',
    inventory: {
      quantity: 35,
      lowStockThreshold: 8,
      trackInventory: true,
    },
    category: {
      id: 'cat_footwear',
      name: 'Footwear',
      slug: 'footwear',
    },
    collections: [
      { id: 'col_essentials', name: 'Streetwear Essentials', slug: 'streetwear-essentials' },
    ],
    variants: [
      { id: 'var_005_8_wht', size: 'UK8', color: 'White', colorCode: '#FFFFFF', sku: 'UC-SNK-001-8-WHT', inventory: 8, price: 5999 },
      { id: 'var_005_9_wht', size: 'UK9', color: 'White', colorCode: '#FFFFFF', sku: 'UC-SNK-001-9-WHT', inventory: 10, price: 5999 },
      { id: 'var_005_10_wht', size: 'UK10', color: 'White', colorCode: '#FFFFFF', sku: 'UC-SNK-001-10-WHT', inventory: 10, price: 5999 },
      { id: 'var_005_9_blk', size: 'UK9', color: 'Black', colorCode: '#000000', sku: 'UC-SNK-001-9-BLK', inventory: 7, price: 5999 },
    ],
    images: [
      { id: 'img_005_1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop', alt: 'Premium Sneakers', isPrimary: true },
    ],
    tags: ['sneakers', 'footwear', 'leather', 'premium'],
    rating: 4.7,
    reviewCount: 78,
    isActive: true,
    isFeatured: true,
    isNew: false,
    metadata: {
      material: 'Genuine Leather Upper, Rubber Outsole',
      care: 'Wipe with damp cloth',
    },
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-01-08T11:30:00Z',
  },
  {
    id: 'prod_006',
    name: 'Graphic Tee - Abstract',
    slug: 'graphic-tee-abstract',
    description: 'Limited print graphic t-shirt featuring exclusive abstract artwork. Made from soft organic cotton for everyday comfort.',
    shortDescription: 'Limited edition graphic tee',
    price: 1799,
    currency: 'INR',
    sku: 'UC-TEE-002',
    barcode: '8901234567895',
    inventory: {
      quantity: 75,
      lowStockThreshold: 15,
      trackInventory: true,
    },
    category: {
      id: 'cat_tees',
      name: 'Tees',
      slug: 'tees',
    },
    subcategory: {
      id: 'subcat_graphic',
      name: 'Graphic',
      slug: 'graphic',
    },
    collections: [
      { id: 'col_collab', name: 'Artist Collaborations', slug: 'collaboration' },
    ],
    variants: [
      { id: 'var_006_s_wht', size: 'S', color: 'White', colorCode: '#FFFFFF', sku: 'UC-TEE-002-S-WHT', inventory: 15, price: 1799 },
      { id: 'var_006_m_wht', size: 'M', color: 'White', colorCode: '#FFFFFF', sku: 'UC-TEE-002-M-WHT', inventory: 25, price: 1799 },
      { id: 'var_006_l_wht', size: 'L', color: 'White', colorCode: '#FFFFFF', sku: 'UC-TEE-002-L-WHT', inventory: 20, price: 1799 },
      { id: 'var_006_xl_wht', size: 'XL', color: 'White', colorCode: '#FFFFFF', sku: 'UC-TEE-002-XL-WHT', inventory: 15, price: 1799 },
    ],
    images: [
      { id: 'img_006_1', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop', alt: 'Graphic Tee - Abstract', isPrimary: true },
    ],
    tags: ['graphic', 'tee', 'limited', 'artist', 'organic'],
    rating: 4.4,
    reviewCount: 34,
    isActive: true,
    isFeatured: false,
    isNew: true,
    metadata: {
      material: '100% Organic Cotton',
      weight: '180 GSM',
      fit: 'Regular',
      care: 'Machine wash cold, inside out',
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-14T15:00:00Z',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((p) => p.category.slug === categorySlug);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.includes(lowerQuery))
  );
};
