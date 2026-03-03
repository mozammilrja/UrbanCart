'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { products } from '@/data/mock';

// Mock wishlist items for demo
const initialWishlistItems = [products[2], products[4], products[6], products[9]];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const removeItem = (productId: string) => {
    setWishlistItems((items) => items.filter((item) => item._id !== productId));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <Heart className="w-16 h-16 mx-auto mb-6 text-[#999]" />
          <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            Your wishlist is empty
          </h1>
          <p className="text-[#777] mb-8">
            Save your favorite items here to buy them later.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-black/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-light tracking-tight">
            Wishlist ({wishlistItems.length})
          </h1>
          <button className="text-sm text-[#777] hover:text-[#111] transition-colors">
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistItems.map((product) => (
            <div key={product._id} className="relative group">
              <ProductCard product={product} />
              <button
                onClick={() => removeItem(product._id)}
                className="absolute top-3 right-3 p-2 bg-white shadow-sm hover:bg-[#f5f5f5] transition-colors z-10"
                aria-label="Remove from wishlist"
              >
                <Heart className="w-5 h-5 fill-black stroke-black" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
