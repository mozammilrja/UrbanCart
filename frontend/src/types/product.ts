export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category?: string;
  description?: string;
  sizes?: string[];
  images?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt?: string;
  image: string;
  readTime?: string;
}

export interface StoreEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
