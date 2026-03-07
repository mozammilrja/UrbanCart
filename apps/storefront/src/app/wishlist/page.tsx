'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, Share2, ArrowRight, Sparkles, Grid3X3, List } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { products } from '@/data/mock';
import { formatPriceCompact } from '@/lib/utils';

// Mock wishlist items for demo
const initialWishlistItems = [products[2], products[4], products[6], products[9]];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date-added');

  const removeItem = (productId: string) => {
    setWishlistItems((items) => items.filter((item) => item._id !== productId));
  };

  const moveToCart = (productId: string) => {
    // Move item to cart logic
    removeItem(productId);
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  if (wishlistItems.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#f7f7f7]">
        <div className="text-center px-4 max-w-md">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center">
            <Heart className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your wishlist is empty
          </h1>
          <p className="text-[#777] mb-8 leading-relaxed">
            Start saving your favorite items by clicking the heart icon on products you love.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-black/90 transition-all rounded-full shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-white to-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              My Wishlist
            </h1>
            <p className="text-[#777] mt-1">
              {wishlistItems.length} saved item{wishlistItems.length !== 1 ? 's' : ''} • Total value: {formatPriceCompact(totalValue)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex items-center bg-white rounded-lg border border-[#e5e5e5] p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-black text-white' : 'text-[#777] hover:text-black'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-black text-white' : 'text-[#777] hover:text-black'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-[#777] hover:text-black border border-[#e5e5e5] rounded-lg hover:border-black transition-colors bg-white">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => setWishlistItems([])}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:border-red-300 transition-colors bg-white"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Quick Add All to Cart */}
        <div className="bg-gradient-to-r from-black to-[#333] rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium mb-1">Ready to check out?</h2>
              <p className="text-white/70 text-sm">Add all your wishlist items to cart with one click</p>
            </div>
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              Add All to Cart
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistItems.map((product) => (
              <div key={product._id} className="relative group">
                <ProductCard product={product} />
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                  <button
                    onClick={() => removeItem(product._id)}
                    className="p-2.5 bg-white shadow-md hover:bg-red-50 hover:text-red-500 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Remove from wishlist"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                  <button
                    onClick={() => moveToCart(product._id)}
                    className="p-2.5 bg-black text-white shadow-md hover:bg-black/80 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl border border-[#e5e5e5] p-4 md:p-6 flex gap-4 md:gap-6 hover:shadow-md transition-shadow"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative w-24 h-32 md:w-32 md:h-40 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </Link>

                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-lg font-medium hover:text-[#777] transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-[#777] mt-1">{product.category}</p>
                    <p className="text-lg font-semibold mt-2">{formatPriceCompact(product.price)}</p>
                    {product.badge && (
                      <span className="inline-block mt-2 px-3 py-1 bg-black text-white text-xs font-medium uppercase tracking-wider rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => moveToCart(product._id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-black/90 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(product._id)}
                      className="p-3 text-[#999] hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#777] hover:text-black transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
