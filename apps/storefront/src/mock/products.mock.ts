/**
 * UrbanCart Products Mock Data
 * 300 products across multiple categories for realistic catalog simulation
 */

import type { Product, ProductImage, ProductVariant } from '@urbancart/types';

// Product image URLs organized by category
const productImages = {
  tshirts: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=1000&fit=crop',
  ],
  hoodies: [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1542327897-d73f4005b533?w=800&h=1000&fit=crop',
  ],
  pants: [
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=1000&fit=crop',
  ],
  jackets: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&h=1000&fit=crop',
  ],
  footwear: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=1000&fit=crop',
  ],
  sweaters: [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1580331451062-99ff652288d7?w=800&h=1000&fit=crop',
  ],
  shirts: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=1000&fit=crop',
  ],
};

const colors = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Navy', code: '#1E3A5F' },
  { name: 'Grey', code: '#6B7280' },
  { name: 'Olive', code: '#556B2F' },
  { name: 'Charcoal', code: '#2D2D2D' },
  { name: 'Cream', code: '#FFFDD0' },
  { name: 'Burgundy', code: '#722F37' },
  { name: 'Forest', code: '#228B22' },
  { name: 'Sand', code: '#C2B280' },
];

const sizes = {
  apparel: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  pants: ['28', '30', '32', '34', '36', '38'],
  footwear: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
  accessories: ['One Size'],
};

const productTemplates = [
  // T-Shirts (60 products)
  { name: 'Urban Oversized Tee', category: 'tshirts', basePrice: 1999, tags: ['oversized', 'cotton', 'streetwear'] },
  { name: 'Graphic Print Tee', category: 'tshirts', basePrice: 1799, tags: ['graphic', 'statement', 'urban'] },
  { name: 'Essential Crew Tee', category: 'tshirts', basePrice: 1499, tags: ['basic', 'everyday', 'comfort'] },
  { name: 'Boxy Fit Tee', category: 'tshirts', basePrice: 1899, tags: ['boxy', 'modern', 'relaxed'] },
  { name: 'Longline Tee', category: 'tshirts', basePrice: 2199, tags: ['longline', 'layering', 'street'] },
  { name: 'Vintage Wash Tee', category: 'tshirts', basePrice: 2299, tags: ['vintage', 'washed', 'retro'] },
  { name: 'Japanese Print Tee', category: 'tshirts', basePrice: 2499, tags: ['japanese', 'artistic', 'premium'] },
  { name: 'Pocket Tee', category: 'tshirts', basePrice: 1699, tags: ['pocket', 'casual', 'minimal'] },
  { name: 'Raglan Sleeve Tee', category: 'tshirts', basePrice: 1899, tags: ['raglan', 'sporty', 'classic'] },
  { name: 'Premium Cotton Tee', category: 'tshirts', basePrice: 2699, tags: ['premium', 'luxury', 'essential'] },
  
  // Hoodies (50 products)
  { name: 'Street Drop Hoodie', category: 'hoodies', basePrice: 3499, tags: ['heavyweight', 'fleece', 'statement'] },
  { name: 'Oversized Zip Hoodie', category: 'hoodies', basePrice: 3999, tags: ['zip', 'oversized', 'comfort'] },
  { name: 'Cropped Hoodie', category: 'hoodies', basePrice: 2999, tags: ['cropped', 'trendy', 'streetwear'] },
  { name: 'Wash Effect Hoodie', category: 'hoodies', basePrice: 4299, tags: ['washed', 'vintage', 'unique'] },
  { name: 'Essential Pullover', category: 'hoodies', basePrice: 2799, tags: ['basic', 'pullover', 'everyday'] },
  { name: 'Tech Fleece Hoodie', category: 'hoodies', basePrice: 4999, tags: ['tech', 'performance', 'modern'] },
  { name: 'Graphic Hoodie', category: 'hoodies', basePrice: 3699, tags: ['graphic', 'statement', 'bold'] },
  { name: 'Half-Zip Pullover', category: 'hoodies', basePrice: 3299, tags: ['half-zip', 'sporty', 'versatile'] },
  
  // Pants (45 products)
  { name: 'Classic Cargo Pants', category: 'pants', basePrice: 2999, tags: ['cargo', 'utility', 'streetwear'] },
  { name: 'Essential Joggers', category: 'pants', basePrice: 2499, tags: ['joggers', 'comfort', 'casual'] },
  { name: 'Straight Fit Trousers', category: 'pants', basePrice: 3499, tags: ['straight', 'formal', 'smart'] },
  { name: 'Wide Leg Pants', category: 'pants', basePrice: 3299, tags: ['wide', 'relaxed', 'trend'] },
  { name: 'Parachute Pants', category: 'pants', basePrice: 3699, tags: ['parachute', 'street', 'statement'] },
  { name: 'Tech Cargo Pants', category: 'pants', basePrice: 4299, tags: ['tech', 'cargo', 'functional'] },
  { name: 'Slim Fit Chinos', category: 'pants', basePrice: 2799, tags: ['slim', 'chino', 'versatile'] },
  
  // Jackets (35 products)
  { name: 'Vintage Denim Jacket', category: 'jackets', basePrice: 4999, tags: ['denim', 'vintage', 'classic'] },
  { name: 'Bomber Jacket', category: 'jackets', basePrice: 5499, tags: ['bomber', 'street', 'essential'] },
  { name: 'Oversized Blazer', category: 'jackets', basePrice: 6999, tags: ['blazer', 'oversized', 'premium'] },
  { name: 'Windbreaker', category: 'jackets', basePrice: 3999, tags: ['windbreaker', 'light', 'sport'] },
  { name: 'Varsity Jacket', category: 'jackets', basePrice: 7499, tags: ['varsity', 'college', 'statement'] },
  { name: 'Quilted Jacket', category: 'jackets', basePrice: 5999, tags: ['quilted', 'winter', 'warm'] },
  { name: 'Coach Jacket', category: 'jackets', basePrice: 4499, tags: ['coach', 'utility', 'minimal'] },
  
  // Accessories (40 products)
  { name: 'Limited Edition Cap', category: 'accessories', basePrice: 999, tags: ['cap', 'headwear', 'limited'] },
  { name: 'Logo Beanie', category: 'accessories', basePrice: 799, tags: ['beanie', 'winter', 'cozy'] },
  { name: 'Bucket Hat', category: 'accessories', basePrice: 1299, tags: ['bucket', 'summer', 'trendy'] },
  { name: 'Crossbody Bag', category: 'accessories', basePrice: 1999, tags: ['bag', 'crossbody', 'utility'] },
  { name: 'Chain Necklace', category: 'accessories', basePrice: 1499, tags: ['chain', 'jewelry', 'street'] },
  { name: 'Leather Belt', category: 'accessories', basePrice: 1799, tags: ['belt', 'leather', 'essential'] },
  { name: 'Socks Pack', category: 'accessories', basePrice: 599, tags: ['socks', 'basics', 'comfort'] },
  { name: 'Bandana', category: 'accessories', basePrice: 499, tags: ['bandana', 'accessory', 'style'] },
  
  // Footwear (30 products)
  { name: 'Premium Sneakers', category: 'footwear', basePrice: 5999, tags: ['sneakers', 'premium', 'street'] },
  { name: 'High Top Sneakers', category: 'footwear', basePrice: 6499, tags: ['high-top', 'basketball', 'bold'] },
  { name: 'Canvas Shoes', category: 'footwear', basePrice: 2999, tags: ['canvas', 'casual', 'classic'] },
  { name: 'Chelsea Boots', category: 'footwear', basePrice: 7999, tags: ['boots', 'chelsea', 'smart'] },
  { name: 'Slides', category: 'footwear', basePrice: 1499, tags: ['slides', 'comfort', 'casual'] },
  
  // Sweaters (25 products)
  { name: 'Knit Sweater', category: 'sweaters', basePrice: 3999, tags: ['knit', 'cozy', 'winter'] },
  { name: 'Crewneck Sweater', category: 'sweaters', basePrice: 3499, tags: ['crewneck', 'classic', 'warm'] },
  { name: 'Cable Knit', category: 'sweaters', basePrice: 4499, tags: ['cable', 'textured', 'premium'] },
  { name: 'V-Neck Sweater', category: 'sweaters', basePrice: 3299, tags: ['vneck', 'smart', 'layering'] },
  { name: 'Turtleneck', category: 'sweaters', basePrice: 4299, tags: ['turtleneck', 'elevated', 'winter'] },
  
  // Shirts (25 products)
  { name: 'Relaxed Fit Shirt', category: 'shirts', basePrice: 3299, tags: ['relaxed', 'linen', 'summer'] },
  { name: 'Camp Collar Shirt', category: 'shirts', basePrice: 2999, tags: ['camp', 'casual', 'vacation'] },
  { name: 'Oxford Shirt', category: 'shirts', basePrice: 3499, tags: ['oxford', 'classic', 'smart'] },
  { name: 'Flannel Shirt', category: 'shirts', basePrice: 2799, tags: ['flannel', 'check', 'cozy'] },
  { name: 'Work Shirt', category: 'shirts', basePrice: 3699, tags: ['workwear', 'utility', 'durable'] },
];

const collections = [
  { id: 'col_essentials', name: 'Streetwear Essentials', slug: 'streetwear-essentials' },
  { id: 'col_winter', name: 'Winter Collection', slug: 'winter-collection' },
  { id: 'col_limited', name: 'Limited Drops', slug: 'limited-drops' },
  { id: 'col_new', name: 'New Arrivals', slug: 'new-arrivals' },
  { id: 'col_bestseller', name: 'Bestsellers', slug: 'bestsellers' },
  { id: 'col_premium', name: 'Premium Selection', slug: 'premium-selection' },
];

const categories = {
  tshirts: { id: 'cat_tshirts', name: 'T-Shirts', slug: 'tshirts' },
  hoodies: { id: 'cat_hoodies', name: 'Hoodies', slug: 'hoodies' },
  pants: { id: 'cat_pants', name: 'Pants', slug: 'pants' },
  jackets: { id: 'cat_jackets', name: 'Jackets', slug: 'jackets' },
  accessories: { id: 'cat_accessories', name: 'Accessories', slug: 'accessories' },
  footwear: { id: 'cat_footwear', name: 'Footwear', slug: 'footwear' },
  sweaters: { id: 'cat_sweaters', name: 'Sweaters', slug: 'sweaters' },
  shirts: { id: 'cat_shirts', name: 'Shirts', slug: 'shirts' },
};

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function generateVariants(category: string, basePrice: number): ProductVariant[] {
  const sizeSet = category === 'pants' ? sizes.pants 
    : category === 'footwear' ? sizes.footwear 
    : category === 'accessories' ? sizes.accessories 
    : sizes.apparel;
  
  const selectedColors = colors.slice(0, Math.floor(Math.random() * 3) + 2);
  const variants: ProductVariant[] = [];
  
  selectedColors.forEach((color, colorIndex) => {
    sizeSet.forEach((size, sizeIndex) => {
      variants.push({
        id: `var_${Date.now()}_${colorIndex}_${sizeIndex}`,
        sku: `UC-${category.toUpperCase().slice(0, 3)}-${colorIndex}-${sizeIndex}`,
        size,
        color: color.name,
        colorCode: color.code,
        price: basePrice,
        inventory: Math.floor(Math.random() * 50) + 5,
        isAvailable: Math.random() > 0.1,
      });
    });
  });
  
  return variants;
}

function generateImages(category: keyof typeof productImages, productName: string): ProductImage[] {
  const categoryImages = productImages[category] || productImages.tshirts;
  const numImages = Math.min(Math.floor(Math.random() * 3) + 2, categoryImages.length);
  
  return categoryImages.slice(0, numImages).map((url, index) => ({
    id: `img_${Date.now()}_${index}`,
    url,
    alt: `${productName} - View ${index + 1}`,
    position: index,
    isPrimary: index === 0,
  }));
}

// Generate 300 products
export const mockProducts: Product[] = [];

let productCounter = 1;

productTemplates.forEach(template => {
  const variations = Math.floor(Math.random() * 4) + 4; // 4-7 color variations per template
  
  for (let i = 0; i < variations && mockProducts.length < 300; i++) {
    const colorVariant = colors[i % colors.length];
    const hasDiscount = Math.random() > 0.6;
    const discountPercent = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;
    const originalPrice = template.basePrice + (Math.floor(Math.random() * 500));
    const price = hasDiscount ? Math.floor(originalPrice * (1 - discountPercent / 100)) : originalPrice;
    
    const productName = i === 0 ? template.name : `${template.name} - ${colorVariant.name}`;
    const slug = generateSlug(productName) + `-${productCounter}`;
    
    const product: Product = {
      id: `prod_${String(productCounter).padStart(3, '0')}`,
      name: productName,
      slug,
      description: `Premium quality ${template.name.toLowerCase()} from UrbanCart. Crafted with attention to detail and designed for the modern streetwear enthusiast. Features premium materials and an exceptional fit.`,
      shortDescription: `Premium ${template.name.toLowerCase()} with exceptional quality`,
      price,
      compareAtPrice: hasDiscount ? originalPrice : undefined,
      currency: 'INR',
      sku: `UC-${template.category.toUpperCase().slice(0, 3)}-${String(productCounter).padStart(3, '0')}`,
      barcode: `890123456${String(productCounter).padStart(4, '0')}`,
      status: 'active',
      category: categories[template.category as keyof typeof categories],
      tags: [...template.tags, template.category, 'premium', 'streetwear'],
      images: generateImages(template.category as keyof typeof productImages, productName),
      variants: generateVariants(template.category, price),
      inventory: {
        trackQuantity: true,
        quantity: Math.floor(Math.random() * 200) + 20,
        lowStockThreshold: 15,
        continueSellingWhenOut: false,
      },
      collections: [
        collections[Math.floor(Math.random() * collections.length)],
        ...(Math.random() > 0.5 ? [collections[Math.floor(Math.random() * collections.length)]] : []),
      ],
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 200) + 10,
      isActive: true,
      isFeatured: Math.random() > 0.8,
      isNew: Math.random() > 0.7,
      isBestseller: Math.random() > 0.85,
      metadata: {
        material: template.category === 'accessories' ? 'Various' : '100% Premium Cotton',
        fit: ['Regular', 'Relaxed', 'Oversized', 'Slim'][Math.floor(Math.random() * 4)],
        care: 'Machine wash cold',
      },
      seo: {
        title: `${productName} | UrbanCart`,
        description: `Shop ${productName} - Premium Indian streetwear at UrbanCart`,
        keywords: template.tags,
      },
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockProducts.push(product);
    productCounter++;
  }
});

// Helper functions for filtering and searching
export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find(p => p.slug === slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return mockProducts.filter(p => p.isFeatured).slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return mockProducts.filter(p => p.isNew).slice(0, limit);
}

export function getBestsellers(limit = 8): Product[] {
  return mockProducts.filter(p => p.isBestseller).slice(0, limit);
}

export function getProductsByCategory(categorySlug: string, limit?: number): Product[] {
  const filtered = mockProducts.filter(p => p.category.slug === categorySlug);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getProductsByCollection(collectionSlug: string, limit?: number): Product[] {
  const filtered = mockProducts.filter(p => 
    p.collections.some(c => typeof c === 'object' && c.slug === collectionSlug)
  );
  return limit ? filtered.slice(0, limit) : filtered;
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.tags.some(t => t.toLowerCase().includes(lowercaseQuery)) ||
    p.category.name.toLowerCase().includes(lowercaseQuery)
  );
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return mockProducts.slice(0, limit);
  
  return mockProducts
    .filter(p => p.id !== productId && p.category.id === product.category.id)
    .slice(0, limit);
}

export { categories, collections, colors, sizes };
