'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

// Mock products data
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
    category: 'T-Shirts',
    badge: 'Bestseller',
  },
  {
    id: '2',
    name: 'Street Drop Hoodie',
    variant: 'Navy',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=750&fit=crop',
    colors: ['Black', 'Navy'],
    category: 'Hoodies',
    badge: 'New',
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
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&h=750&fit=crop',
    colors: ['Black', 'White'],
    category: 'Accessories',
    badge: 'Limited',
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
    name: 'Graphic Print Tee',
    variant: 'Black',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop',
    colors: ['Black', 'White'],
    category: 'T-Shirts',
  },
  {
    id: '7',
    name: 'Essential Joggers',
    variant: 'Grey',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop',
    colors: ['Grey', 'Black'],
    category: 'Pants',
  },
  {
    id: '8',
    name: 'Chain Necklace',
    variant: 'Gold',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=750&fit=crop',
    colors: ['Gold', 'Silver'],
    category: 'Accessories',
    badge: 'New',
  },
  {
    id: '9',
    name: 'Relaxed Fit Shirt',
    variant: 'White',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=750&fit=crop',
    colors: ['White', 'Blue', 'Pink'],
    category: 'Shirts',
  },
  {
    id: '10',
    name: 'Vintage Denim Jacket',
    variant: 'Blue',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=750&fit=crop',
    colors: ['Blue', 'Black'],
    category: 'Jackets',
  },
  {
    id: '11',
    name: 'Logo Embroidered Beanie',
    variant: 'Black',
    price: 799,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1576871337589-9cfb8c8b3743?w=600&h=750&fit=crop',
    colors: ['Black', 'Grey', 'Navy'],
    category: 'Accessories',
  },
  {
    id: '12',
    name: 'Knit Sweater',
    variant: 'Cream',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1580331451062-99ff652288d7?w=600&h=750&fit=crop',
    colors: ['Cream', 'Black', 'Brown'],
    category: 'Sweaters',
  },
];

const categories = ['All', 'T-Shirts', 'Hoodies', 'Pants', 'Shirts', 'Jackets', 'Sweaters', 'Accessories', 'Footwear'];

const formatPrice = (price: number) => {
  return `Rs. ${price.toLocaleString('en-IN')}`;
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 8, filteredProducts.length));
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Page Header */}
      <div className="border-b border-neutral-800">
        <div className="container py-8 sm:py-12">
          <h1 className="text-center text-2xl font-light tracking-wide text-white sm:text-3xl md:text-4xl">
            Shop <span className="font-medium">All</span>
          </h1>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-neutral-800 overflow-x-auto">
        <div className="container flex items-center gap-6 py-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleProducts(12);
              }}
              className={`whitespace-nowrap text-sm transition-colors ${
                selectedCategory === category
                  ? 'font-medium text-white'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-neutral-800">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-400">
              Items: <span className="text-white">{filteredProducts.length}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-sm text-white transition-colors hover:text-neutral-300"
            >
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
                <option value="bestselling" className="bg-neutral-900">Bestselling</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="border-b border-neutral-800 bg-neutral-900/50">
          <div className="container py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-white">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              <div>
                <h4 className="mb-3 text-xs uppercase tracking-wider text-neutral-500">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className="flex h-8 w-8 items-center justify-center border border-neutral-700 text-xs text-neutral-400 transition-colors hover:border-white hover:text-white"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-xs uppercase tracking-wider text-neutral-500">Price</h4>
                <div className="space-y-2 text-sm text-neutral-400">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input type="checkbox" className="form-checkbox bg-transparent" />
                    Under Rs.1,000
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input type="checkbox" className="form-checkbox bg-transparent" />
                    Rs.1,000 - Rs.2,500
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input type="checkbox" className="form-checkbox bg-transparent" />
                    Rs.2,500 - Rs.5,000
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                    <input type="checkbox" className="form-checkbox bg-transparent" />
                    Above Rs.5,000
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="container py-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
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
                {product.badge && (
                  <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-900">
                    {product.badge}
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
        {visibleProducts < filteredProducts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 border border-neutral-700 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white hover:text-neutral-900"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
