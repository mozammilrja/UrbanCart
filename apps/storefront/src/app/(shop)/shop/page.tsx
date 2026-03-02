'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Separator,
} from '@urbancart/ui';
import { SlidersHorizontal, Grid3X3, LayoutList, ChevronDown, X, Heart } from 'lucide-react';

const products = [
  {
    id: '1',
    name: 'Urban Oversized Tee',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    category: 'T-Shirts',
    badge: 'Bestseller',
    colors: ['Black', 'White', 'Grey'],
  },
  {
    id: '2',
    name: 'Street Drop Hoodie',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    category: 'Hoodies',
    badge: 'New',
    colors: ['Black', 'Navy'],
  },
  {
    id: '3',
    name: 'Classic Cargo Pants',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
    category: 'Pants',
    colors: ['Olive', 'Black', 'Beige'],
  },
  {
    id: '4',
    name: 'Limited Edition Cap',
    price: 999,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop',
    category: 'Accessories',
    badge: 'Limited',
    colors: ['Black', 'White'],
  },
  {
    id: '5',
    name: 'Premium Sneakers',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    category: 'Footwear',
    colors: ['White', 'Black'],
  },
  {
    id: '6',
    name: 'Graphic Print Tee',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop',
    category: 'T-Shirts',
    colors: ['Black', 'White'],
  },
  {
    id: '7',
    name: 'Essential Joggers',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=500&fit=crop',
    category: 'Pants',
    colors: ['Grey', 'Black'],
  },
  {
    id: '8',
    name: 'Chain Necklace',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop',
    category: 'Accessories',
    badge: 'New',
    colors: ['Gold', 'Silver'],
  },
];

const categories = ['All', 'T-Shirts', 'Hoodies', 'Pants', 'Accessories', 'Footwear'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Shop</span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar filters - Desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="mb-4 font-semibold">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left text-sm ${
                      selectedCategory === category
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 font-semibold">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="flex h-9 w-9 items-center justify-center rounded border text-sm hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="mb-4 font-semibold">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="price-1" />
                  <label htmlFor="price-1" className="text-sm">Under ₹1,000</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="price-2" />
                  <label htmlFor="price-2" className="text-sm">₹1,000 - ₹2,500</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="price-3" />
                  <label htmlFor="price-3" className="text-sm">₹2,500 - ₹5,000</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="price-4" />
                  <label htmlFor="price-4" className="text-sm">Above ₹5,000</label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Shop All</h1>
              <p className="text-muted-foreground">{filteredProducts.length} products</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="bestselling">Bestselling</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden sm:flex">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile filters */}
          {showFilters && (
            <div className="mb-6 rounded-lg border p-4 lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Products grid */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                : 'space-y-4'
            }
          >
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <Card className="overflow-hidden border-0 shadow-none">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge className="absolute left-3 top-3" variant="secondary">
                        {product.badge}
                      </Badge>
                    )}
                    <button
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to wishlist
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="px-0 pt-4">
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <h3 className="font-medium group-hover:text-accent">{product.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-semibold">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex gap-1">
                      {product.colors.slice(0, 3).map((color) => (
                        <span
                          key={color}
                          className="text-xs text-muted-foreground"
                        >
                          {color}
                          {product.colors.indexOf(color) < Math.min(product.colors.length, 3) - 1 && ', '}
                        </span>
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{product.colors.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load more */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Products
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
