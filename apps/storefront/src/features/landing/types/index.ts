/**
 * Landing Feature Types
 */

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  cta?: {
    label: string;
    href: string;
  };
}

export interface FeaturedSection {
  id: string;
  type: 'products' | 'collections' | 'banner';
  title: string;
  items: string[]; // IDs
}

export interface LandingPageData {
  hero: HeroSlide[];
  featuredProducts: string[];
  newArrivals: string[];
  collections: string[];
  banners: Banner[];
}

export interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  position: 'top' | 'middle' | 'bottom';
  isActive: boolean;
}
