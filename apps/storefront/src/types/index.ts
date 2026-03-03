// Product Types
export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  badge?: 'NEW' | 'DROP' | 'LIMITED' | 'SOLD OUT';
  isNew: boolean;
  stock: number;
  colors: ProductColor[];
  sizes: string[];
  description?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

// Collection Types
export interface Collection {
  _id: string;
  name: string;
  slug: string;
  bannerImage: string;
  description: string;
  productCount: number;
}

// Store Location Types
export interface StoreLocation {
  _id: string;
  city: string;
  name: string;
  address: string;
  image: string;
  mapUrl: string;
  phone?: string;
  hours?: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Banner Types
export interface Banner {
  _id: string;
  image: string;
  mobileImage?: string;
  title: string;
  subtitle?: string;
  cta?: {
    text: string;
    href: string;
  };
}
