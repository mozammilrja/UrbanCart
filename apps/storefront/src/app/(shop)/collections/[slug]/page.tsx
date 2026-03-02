'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

const collectionData: Record<string, { name: string; description: string }> = {
  'streetwear-essentials': {
    name: 'Streetwear Essentials',
    description: 'Core pieces that define the urban aesthetic. Build your wardrobe with these must-have streetwear staples.',
  },
  'limited-drops': {
    name: 'Limited Drops',
    description: 'Exclusive releases with limited quantities. Once they are gone, they are gone forever.',
  },
  'summer-2024': {
    name: 'Summer 2024',
    description: 'Lightweight and breathable styles perfect for the warm season ahead.',
  },
  'monochrome': {
    name: 'Monochrome',
    description: 'Classic black and white statement pieces for the minimalist.',
  },
  'urban-accessories': {
    name: 'Urban Accessories',
    description: 'Complete your look with our premium accessories collection.',
  },
};

const products = [
  {
    id: '1',
    name: 'Urban Oversized Tee',
    variant: 'Black',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=750&fit=crop',
    colors: ['Black', 'White', 'Grey'],
    category: 'Tees',
    isNew: true,
  },
  {
    id: '2',
    name: 'Street Drop Hoodie',
    variant: 'Navy',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop',
    colors: ['Navy', 'Black'],
    category: 'Hoodies',
  },
  {
    id: '3',
    name: 'Classic Cargo Pants',
    variant: 'Olive',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop',
    colors: ['Olive', 'Black', 'Beige'],
    category: 'Pants',
  },
  {
    id: '4',
    name: 'Limited Edition Cap',
    variant: 'Black',
    price: 999,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=750&fit=crop',
    colors: ['Black', 'White'],
    category: 'Accessories',
    isNew: true,
  },
  {
    id: '5',
    name: 'Premium Sneakers',
    variant: 'White',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=750&fit=crop',
    colors: ['White', 'Black'],
    category: 'Footwear',
  },
  {
    id: '6',
    name: 'Graphic Tee',
    variant: 'Black',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop',
    colors: ['Black', 'White'],
    category: 'Tees',
  },
  {
    id: '7',
    name: 'Relaxed Fit Shirt',
    variant: 'White',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=750&fit=crop',
    colors: ['White', 'Blue'],
    category: 'Shirts',
  },
  {
    id: '8',
    name: 'Knit Sweater',
    variant: 'Cream',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1580331451062-99ff652288d7?w=600&h=750&fit=crop',
    colors: ['Cream', 'Black'],
    category: 'Sweaters',
  },
];

const formatPrice = (price: number) => {
  return `Rs. ${price.toLocaleString('en-IN')}`;
};

export default function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [sortBy, setSortBy] = useState('featured');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  
  const collection = collectionData[slug] || {
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: 'Explore our curated collection',
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Collection Header */}
      <div className="border-b border-neutral-800">
        <div className="container py-8 sm:py-12">
          <h1 className="text-center text-2xl font-light tracking-wide text-white sm:text-3xl md:text-4xl">
            Collection: <span className="font-medium">{collection.name}</span>
          </h1>
          <p className="mt-4 text-center text-sm text-neutral-400 sm:text-base">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-neutral-800">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-400">
              Items: <span className="text-white">{products.length}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-white transition-colors hover:text-neutral-300">
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pr-6 text-sm text-white outline-none"
              >
                <option value="featured" className="bg-neutral-900">Sort By</option>
                <option value="newest" className="bg-neutral-900">Newest</option>
                <option value="price-low" className="bg-neutral-900">Price: Low to High</option>
                <option value="price-high" className="bg-neutral-900">Price: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container py-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group block"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <Image
                  src={hoveredProduct === product.id ? product.hoverImage : product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />

                {/* Badge */}
                {product.isNew && (
                  <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-900">
                    New
                  </span>
                )}

                {/* Quick shop overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 p-3 text-center transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-xs font-medium uppercase tracking-wider text-neutral-900">
                    Quick Shop
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-white transition-colors group-hover:text-neutral-300">
                  {product.name}
                  {product.variant && (
                    <span className="font-normal text-neutral-400"> - {product.variant}</span>
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-400">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-600 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Color swatches */}
                {product.colors.length > 1 && (
                  <div className="flex gap-2 pt-1">
                    {product.colors.map((color, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-neutral-500 hover:text-neutral-300"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 border border-neutral-700 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-neutral-900">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
