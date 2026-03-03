/**
 * UrbanCart Home Page Mock Data
 */

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  badge?: string;
}

export interface HomeFeaturedSection {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  href: string;
  position: 'left' | 'right' | 'full';
}

export interface Announcement {
  id: string;
  text: string;
  link?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'STREETWEAR REDEFINED',
    subtitle: 'Winter Collection 2026',
    description: 'Premium Indian streetwear for the culture-forward generation. Exclusive drops. Limited editions. Unapologetic style.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&q=90',
    cta: {
      primary: { label: 'Shop the Drop', href: '/shop' },
      secondary: { label: 'Explore Collections', href: '/collections' },
    },
    badge: 'New Drop Available',
  },
  {
    id: 'hero-2',
    title: 'LIMITED DROPS',
    subtitle: 'Exclusive Release',
    description: 'Once they\'re gone, they\'re gone forever. Collector\'s pieces for the true streetwear enthusiast.',
    image: 'https://images.unsplash.com/photo-1558171013-128e4c5a8c3c?w=1920&h=1080&fit=crop&q=90',
    cta: {
      primary: { label: 'Shop Limited', href: '/collections/limited-drops' },
    },
    badge: 'Only 100 Units',
  },
  {
    id: 'hero-3',
    title: 'PREMIUM ESSENTIALS',
    subtitle: 'Core Collection',
    description: 'Build your foundation with timeless pieces crafted from premium materials. Quality that speaks for itself.',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1920&h=1080&fit=crop&q=90',
    cta: {
      primary: { label: 'Shop Essentials', href: '/collections/streetwear-essentials' },
    },
  },
];

export const featuredSections: HomeFeaturedSection[] = [
  {
    id: 'section-winter',
    title: 'Winter Collection \'26',
    subtitle: 'Featured Collection',
    description: 'Bold layers for the cold',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop&q=80',
    href: '/collections/winter-2026',
    position: 'full',
  },
  {
    id: 'section-essentials',
    title: 'Streetwear Essentials',
    subtitle: 'Core Collection',
    description: 'Core pieces you need',
    image: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800&h=600&fit=crop&q=80',
    href: '/collections/streetwear-essentials',
    position: 'left',
  },
  {
    id: 'section-limited',
    title: 'Limited Drops',
    subtitle: 'Exclusive',
    description: 'Exclusive limited edition pieces',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&q=80',
    href: '/collections/limited-drops',
    position: 'right',
  },
];

export const announcements: Announcement[] = [
  { id: 'ann-1', text: 'FREE SHIPPING ON ₹999+' },
  { id: 'ann-2', text: 'NEW DROP EVERY FRIDAY' },
  { id: 'ann-3', text: 'PREMIUM QUALITY GUARANTEED' },
  { id: 'ann-4', text: 'USE CODE URBAN20 FOR 20% OFF' },
];

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  href: string;
}

export const categories: Category[] = [
  {
    id: 'cat_tshirts',
    name: 'T-Shirts',
    slug: 'tshirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    productCount: 60,
    href: '/shop?category=tshirts',
  },
  {
    id: 'cat_hoodies',
    name: 'Hoodies',
    slug: 'hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
    productCount: 50,
    href: '/shop?category=hoodies',
  },
  {
    id: 'cat_jackets',
    name: 'Jackets',
    slug: 'jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
    productCount: 35,
    href: '/shop?category=jackets',
  },
  {
    id: 'cat_pants',
    name: 'Pants',
    slug: 'pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
    productCount: 45,
    href: '/shop?category=pants',
  },
  {
    id: 'cat_accessories',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop',
    productCount: 40,
    href: '/shop?category=accessories',
  },
  {
    id: 'cat_footwear',
    name: 'Footwear',
    slug: 'footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop',
    productCount: 30,
    href: '/shop?category=footwear',
  },
];

export const brandFeatures = [
  {
    id: 'feature-shipping',
    icon: 'truck',
    title: 'Free Shipping',
    description: 'Orders above ₹999',
  },
  {
    id: 'feature-returns',
    icon: 'rotate-ccw',
    title: 'Easy Returns',
    description: '30-day policy',
  },
  {
    id: 'feature-secure',
    icon: 'shield',
    title: 'Secure Payments',
    description: 'UPI, Cards, Wallets',
  },
  {
    id: 'feature-quality',
    icon: 'sparkles',
    title: 'Premium Quality',
    description: 'Crafted in India',
  },
];

export const brandStory = {
  title: 'Born on the Streets',
  subtitle: 'Our Story',
  description: 'UrbanCart was founded with a simple mission: to bring premium streetwear to the Indian market without the premium price tag. Every piece is designed in Mumbai, crafted with care, and made for those who refuse to blend in.',
  image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=800&fit=crop',
  cta: { label: 'Learn More', href: '/about' },
  stats: [
    { value: '50K+', label: 'Happy Customers' },
    { value: '300+', label: 'Products' },
    { value: '25+', label: 'Collections' },
    { value: '4.8', label: 'Average Rating' },
  ],
};
