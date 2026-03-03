/**
 * UrbanCart Search Mock Data
 */

export interface SearchSuggestion {
  type: 'product' | 'collection' | 'category' | 'recent';
  text: string;
  href: string;
  image?: string;
  price?: number;
}

export const trendingSearches = [
  'oversized tee',
  'hoodie',
  'cargo pants',
  'sneakers',
  'limited edition',
  'black',
  'streetwear',
];

export const recentSearches: SearchSuggestion[] = [
  { type: 'recent', text: 'black hoodie', href: '/search?q=black+hoodie' },
  { type: 'recent', text: 'cargo pants olive', href: '/search?q=cargo+pants+olive' },
  { type: 'recent', text: 'limited cap', href: '/search?q=limited+cap' },
];

export const popularCategories: SearchSuggestion[] = [
  { type: 'category', text: 'T-Shirts', href: '/shop?category=tshirts' },
  { type: 'category', text: 'Hoodies', href: '/shop?category=hoodies' },
  { type: 'category', text: 'Jackets', href: '/shop?category=jackets' },
  { type: 'category', text: 'Accessories', href: '/shop?category=accessories' },
];

export const popularCollections: SearchSuggestion[] = [
  { 
    type: 'collection', 
    text: 'New Arrivals', 
    href: '/collections/new-arrivals',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop',
  },
  { 
    type: 'collection', 
    text: 'Limited Drops', 
    href: '/collections/limited-drops',
    image: 'https://images.unsplash.com/photo-1558171013-128e4c5a8c3c?w=100&h=100&fit=crop',
  },
  { 
    type: 'collection', 
    text: 'Bestsellers', 
    href: '/collections/bestsellers',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=100&h=100&fit=crop',
  },
];

export interface SearchFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sizes?: string[];
  colors?: string[];
  sort?: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  inStock?: boolean;
}

export const defaultFilters: SearchFilters = {
  sort: 'featured',
  inStock: false,
};

export const priceRanges = [
  { label: 'Under ₹1000', min: 0, max: 999 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: '₹2000 - ₹3500', min: 2000, max: 3500 },
  { label: '₹3500 - ₹5000', min: 3500, max: 5000 },
  { label: 'Above ₹5000', min: 5000, max: undefined },
];

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export const filterColors = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Navy', code: '#1E3A5F' },
  { name: 'Grey', code: '#6B7280' },
  { name: 'Olive', code: '#556B2F' },
  { name: 'Charcoal', code: '#2D2D2D' },
  { name: 'Cream', code: '#FFFDD0' },
  { name: 'Burgundy', code: '#722F37' },
];

export const filterSizes = {
  apparel: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  pants: ['28', '30', '32', '34', '36', '38'],
  footwear: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
};
