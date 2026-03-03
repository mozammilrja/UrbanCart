import type { Product, Collection, StoreLocation, Banner } from '@/types';

// Mock Products - Premium streetwear aesthetic
export const products: Product[] = [
  {
    _id: '1',
    name: 'Oversized Essential Tee',
    slug: 'oversized-essential-tee',
    price: 2499,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ],
    category: 'T-Shirts',
    categorySlug: 't-shirts',
    badge: 'NEW',
    isNew: true,
    stock: 45,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Grey', hex: '#808080' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium heavyweight cotton oversized tee with dropped shoulders.',
  },
  {
    _id: '2',
    name: 'Vintage Wash Hoodie',
    slug: 'vintage-wash-hoodie',
    price: 4999,
    comparePrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80',
    ],
    category: 'Hoodies',
    categorySlug: 'hoodies',
    badge: 'DROP',
    isNew: true,
    stock: 23,
    colors: [
      { name: 'Washed Black', hex: '#2a2a2a' },
      { name: 'Stone', hex: '#c4b7a6' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Vintage acid wash hoodie with kangaroo pocket.',
  },
  {
    _id: '3',
    name: 'Structured Dad Cap',
    slug: 'structured-dad-cap',
    price: 1499,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80',
    ],
    category: 'Caps',
    categorySlug: 'caps',
    badge: 'LIMITED',
    isNew: false,
    stock: 12,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1e3a5f' },
    ],
    sizes: ['One Size'],
    description: 'Premium structured dad cap with embroidered logo.',
  },
  {
    _id: '4',
    name: 'Cargo Joggers',
    slug: 'cargo-joggers',
    price: 3999,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    ],
    category: 'Bottoms',
    categorySlug: 'bottoms',
    isNew: true,
    stock: 34,
    colors: [
      { name: 'Olive', hex: '#556b2f' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Relaxed fit cargo joggers with utility pockets.',
  },
  {
    _id: '5',
    name: 'Cropped Bomber',
    slug: 'cropped-bomber',
    price: 7499,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
    ],
    category: 'Outerwear',
    categorySlug: 'outerwear',
    badge: 'DROP',
    isNew: true,
    stock: 8,
    colors: [
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Cropped bomber jacket with satin finish.',
  },
  {
    _id: '6',
    name: 'Box Logo Tee',
    slug: 'box-logo-tee',
    price: 2999,
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    ],
    category: 'T-Shirts',
    categorySlug: 't-shirts',
    isNew: false,
    stock: 67,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Classic box logo tee in premium cotton.',
  },
  {
    _id: '7',
    name: 'Canvas Bucket Hat',
    slug: 'canvas-bucket-hat',
    price: 1799,
    images: [
      'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=800&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80',
    ],
    category: 'Caps',
    categorySlug: 'caps',
    badge: 'NEW',
    isNew: true,
    stock: 25,
    colors: [
      { name: 'Khaki', hex: '#c3b091' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['S/M', 'L/XL'],
    description: 'Reversible canvas bucket hat.',
  },
  {
    _id: '8',
    name: 'Tech Fleece Zip-Up',
    slug: 'tech-fleece-zip-up',
    price: 5499,
    images: [
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
    ],
    category: 'Hoodies',
    categorySlug: 'hoodies',
    isNew: false,
    stock: 19,
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium tech fleece full-zip hoodie.',
  },
  {
    _id: '9',
    name: 'Distressed Denim Cap',
    slug: 'distressed-denim-cap',
    price: 1699,
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80',
    ],
    category: 'Caps',
    categorySlug: 'caps',
    isNew: false,
    stock: 31,
    colors: [
      { name: 'Light Wash', hex: '#a0c4e8' },
      { name: 'Dark Wash', hex: '#1e3a5f' },
    ],
    sizes: ['One Size'],
    description: 'Distressed denim dad cap with brass buckle.',
  },
  {
    _id: '10',
    name: 'Heavyweight Crewneck',
    slug: 'heavyweight-crewneck',
    price: 4299,
    images: [
      'https://images.unsplash.com/photo-1609873814058-a8928924184a?w=800&q=80',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80',
    ],
    category: 'Hoodies',
    categorySlug: 'hoodies',
    badge: 'LIMITED',
    isNew: true,
    stock: 15,
    colors: [
      { name: 'Cream', hex: '#f5f5dc' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '400gsm heavyweight crewneck sweatshirt.',
  },
  {
    _id: '11',
    name: 'Mesh Back Trucker',
    slug: 'mesh-back-trucker',
    price: 1399,
    images: [
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80',
    ],
    category: 'Caps',
    categorySlug: 'caps',
    isNew: false,
    stock: 42,
    colors: [
      { name: 'Black/White', hex: '#000000' },
      { name: 'Navy/White', hex: '#1e3a5f' },
    ],
    sizes: ['One Size'],
    description: 'Classic trucker cap with mesh back panel.',
  },
  {
    _id: '12',
    name: 'Relaxed Track Pants',
    slug: 'relaxed-track-pants',
    price: 3499,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&q=80',
    ],
    category: 'Bottoms',
    categorySlug: 'bottoms',
    badge: 'NEW',
    isNew: true,
    stock: 28,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#808080' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Wide-leg track pants with contrast piping.',
  },
];

// Mock Collections
export const collections: Collection[] = [
  {
    _id: '1',
    name: 'Drop 001',
    slug: 'drop-001',
    bannerImage: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600&q=80',
    description: 'The inaugural drop. Essential streetwear redefined.',
    productCount: 12,
  },
  {
    _id: '2',
    name: 'Summer Essentials',
    slug: 'summer-essentials',
    bannerImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80',
    description: 'Lightweight pieces for the warm season.',
    productCount: 8,
  },
  {
    _id: '3',
    name: 'Caps Collection',
    slug: 'caps',
    bannerImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=1600&q=80',
    description: 'Premium headwear for every occasion.',
    productCount: 5,
  },
  {
    _id: '4',
    name: 'Hoodies & Fleece',
    slug: 'hoodies',
    bannerImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1600&q=80',
    description: 'Heavyweight comfort meets street style.',
    productCount: 6,
  },
];

// Mock Store Locations
export const storeLocations: StoreLocation[] = [
  {
    _id: '1',
    city: 'Mumbai',
    name: 'APOSTLE Mumbai',
    address: 'Ground Floor, Linking Road, Bandra West, Mumbai 400050',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Mumbai',
    phone: '+91 22 2640 1234',
    hours: 'Mon-Sun: 11AM - 9PM',
  },
  {
    _id: '2',
    city: 'Delhi',
    name: 'APOSTLE Delhi',
    address: 'Shop 42, Select Citywalk, Saket, New Delhi 110017',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Delhi',
    phone: '+91 11 2956 7890',
    hours: 'Mon-Sun: 11AM - 10PM',
  },
  {
    _id: '3',
    city: 'Bangalore',
    name: 'APOSTLE Bangalore',
    address: 'Level 2, Phoenix Marketcity, Whitefield, Bangalore 560048',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=Bangalore',
    phone: '+91 80 4567 8901',
    hours: 'Mon-Sun: 10AM - 9PM',
  },
];

// Mock Banners
export const banners: Banner[] = [
  {
    _id: '1',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1920&q=80',
    title: 'Drop 001',
    subtitle: 'The beginning of something new',
    cta: {
      text: 'Shop Now',
      href: '/collections/drop-001',
    },
  },
  {
    _id: '2',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    title: 'Summer Ready',
    subtitle: 'Lightweight essentials for the season',
    cta: {
      text: 'Explore',
      href: '/collections/summer-essentials',
    },
  },
];

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((p) => p.categorySlug === categorySlug);
};

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((c) => c.slug === slug);
};

export const getLatestProducts = (count: number = 8): Product[] => {
  return products.filter((p) => p.isNew).slice(0, count);
};

export const getCapsProducts = (): Product[] => {
  return products.filter((p) => p.categorySlug === 'caps');
};
