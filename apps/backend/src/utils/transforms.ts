/**
 * Transform backend Mongoose documents to frontend-compatible API shapes
 */

interface MongoProduct {
  _id: any;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  basePrice: number;
  comparePrice?: number;
  images: string[];
  thumbnail?: string;
  category?: { _id: any; name: string; slug: string } | any;
  variants: Array<{
    size: string;
    color: string;
    sku: string;
    stock: number;
    price?: number;
  }>;
  isFeatured?: boolean;
  isActive?: boolean;
  tags?: string[];
  rating?: { average: number; count: number };
  material?: string;
  careInstructions?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

interface FrontendProduct {
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
  colors: Array<{ name: string; hex: string; image?: string }>;
  sizes: string[];
  description?: string;
}

const COLOR_HEX_MAP: Record<string, string> = {
  Black: '#000000',
  White: '#FFFFFF',
  Navy: '#1B2A4A',
  Charcoal: '#36454F',
  Olive: '#556B2F',
  Grey: '#808080',
  'Grey Melange': '#C0C0C0',
  Beige: '#F5F5DC',
  'Black/Red': '#000000',
  'Black/White': '#000000',
  'Black/White/Grey': '#000000',
  'All Black': '#000000',
};

export function transformProduct(doc: MongoProduct): FrontendProduct {
  const uniqueColors = [...new Set(doc.variants.map((v) => v.color))];
  const uniqueSizes = [...new Set(doc.variants.map((v) => v.size))];
  const totalStock = doc.variants.reduce((sum, v) => sum + v.stock, 0);

  const isNew =
    doc.createdAt
      ? Date.now() - new Date(doc.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000
      : false;

  let badge: FrontendProduct['badge'] | undefined;
  if (totalStock === 0) badge = 'SOLD OUT';
  else if (doc.tags?.includes('limited')) badge = 'LIMITED';
  else if (doc.tags?.includes('drop')) badge = 'DROP';
  else if (isNew) badge = 'NEW';

  return {
    _id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    price: doc.basePrice,
    comparePrice: doc.comparePrice,
    images: doc.images?.length ? doc.images : [doc.thumbnail || '/images/placeholder.jpg'],
    category: doc.category?.name || 'Uncategorized',
    categorySlug: doc.category?.slug || 'uncategorized',
    badge,
    isNew,
    stock: totalStock,
    colors: uniqueColors.map((c) => ({
      name: c,
      hex: COLOR_HEX_MAP[c] || '#888888',
    })),
    sizes: uniqueSizes,
    description: doc.description || doc.shortDescription,
  };
}

export function transformProducts(docs: MongoProduct[]): FrontendProduct[] {
  return docs.map(transformProduct);
}

interface MongoCollection {
  _id: any;
  name: string;
  slug: string;
  description: string;
  image?: string;
  products?: any[];
  [key: string]: any;
}

interface FrontendCollection {
  _id: string;
  name: string;
  slug: string;
  bannerImage: string;
  description: string;
  productCount: number;
}

export function transformCollection(doc: MongoCollection): FrontendCollection {
  return {
    _id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    bannerImage: doc.image || '/images/collections/default.jpg',
    description: doc.description,
    productCount: doc.products?.length || 0,
  };
}

export function transformCollections(docs: MongoCollection[]): FrontendCollection[] {
  return docs.map(transformCollection);
}
