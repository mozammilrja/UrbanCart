'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Share2, 
  ArrowRight, 
  Sparkles, 
  Grid3X3, 
  List,
  Package,
  Clock,
  TrendingUp,
  Bell,
  Star,
  Check,
  SlidersHorizontal,
  ChevronDown,
  X,
  LayoutGrid
} from 'lucide-react';
import { products } from '@/data/mock';
import { formatPriceCompact, cn } from '@/lib/utils';
import { ProductCard } from '@/components/ui/ProductCard';

type SortOption = 'date-added' | 'name-asc' | 'name-desc' | 'price-low' | 'price-high';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date-added', label: 'Recently Added' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

// Mock wishlist items for demo
const initialWishlistItems = [products[2], products[4], products[6], products[9]];

// Recommended products
const recommendedProducts = [products[1], products[3], products[5], products[7]];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedToCart, setAddedToCart] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('date-added');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortedItems = useMemo(() => {
    const sorted = [...wishlistItems];
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [wishlistItems, sortBy]);

  const removeItem = (productId: string) => {
    setWishlistItems((items) => items.filter((item) => item._id !== productId));
  };

  const moveToCart = (productId: string) => {
    setAddedToCart(prev => [...prev, productId]);
    setTimeout(() => {
      removeItem(productId);
    }, 800);
  };

  const addAllToCart = () => {
    wishlistItems.forEach((item, index) => {
      setTimeout(() => {
        setAddedToCart(prev => [...prev, item._id]);
      }, index * 200);
    });
    setTimeout(() => {
      setWishlistItems([]);
      setAddedToCart([]);
    }, wishlistItems.length * 200 + 500);
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const avgPrice = wishlistItems.length > 0 ? totalValue / wishlistItems.length : 0;

  if (wishlistItems.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-[#fafafa]">
        {/* Empty State Hero */}
        <div className="relative bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#222] py-24 md:py-32 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-lg mx-auto text-center px-4">
            {/* Animated Heart Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-full flex items-center justify-center">
                  <Heart className="w-12 h-12 text-pink-400" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 bg-pink-400/50 rounded-full"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Your Wishlist is Empty
            </h1>
            <p className="text-white/60 mb-10 leading-relaxed text-lg">
              Save items you love by tapping the heart icon. Your perfect pieces are waiting to be discovered.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 bg-white text-[#111] px-8 py-4 font-semibold tracking-wide hover:bg-white/90 transition-all rounded-full shadow-2xl hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white px-6 py-4 font-medium transition-colors"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">You Might Love These</h2>
            <p className="text-[#777]">Curated picks just for you</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts.map((product, index) => (
              <ProductCard 
                key={product._id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#fafafa]">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#222] py-12 md:py-16 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-red-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Title Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl">
                  <Heart className="w-7 h-7 text-pink-400 fill-pink-400" />
                </div>
                <span className="text-white/50 text-sm font-medium tracking-widest uppercase">My Collection</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
                Wishlist
              </h1>
              <p className="text-white/60 text-lg">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-white/50" />
                  <span className="text-white/50 text-xs uppercase tracking-wider">Items</span>
                </div>
                <p className="text-3xl font-bold text-white">{wishlistItems.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-white/50" />
                  <span className="text-white/50 text-xs uppercase tracking-wider">Total</span>
                </div>
                <p className="text-3xl font-bold text-white">{formatPriceCompact(totalValue)}</p>
              </div>
              <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-2xl p-5 min-w-[140px]">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-white/50" />
                  <span className="text-white/50 text-xs uppercase tracking-wider">Avg Price</span>
                </div>
                <p className="text-3xl font-bold text-white">{formatPriceCompact(avgPrice)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Filter & Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e5e5e5] rounded-full hover:border-[#111] transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium text-sm">Filter & Sort</span>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  isFilterOpen && "rotate-180"
                )} />
              </button>

              {/* Dropdown Menu */}
              {isFilterOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#e5e5e5] z-50 overflow-hidden">
                    <div className="p-4 border-b border-[#e5e5e5]">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">Sort By</h3>
                        <button 
                          onClick={() => setIsFilterOpen(false)}
                          className="p-1 hover:bg-[#f5f5f5] rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-2">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsFilterOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                            sortBy === option.value
                              ? "bg-[#111] text-white"
                              : "hover:bg-[#f5f5f5]"
                          )}
                        >
                          <span>{option.label}</span>
                          {sortBy === option.value && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                    <div className="p-3 border-t border-[#e5e5e5] bg-[#fafafa]">
                      <p className="text-xs text-[#777]">{sortedItems.length} items</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-[#f5f5f5] rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-full transition-all",
                  viewMode === 'grid' 
                    ? "bg-[#111] text-white" 
                    : "text-[#666] hover:text-[#111]"
                )}
                aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-full transition-all",
                  viewMode === 'list' 
                    ? "bg-[#111] text-white" 
                    : "text-[#666] hover:text-[#111]"
                )}
                aria-label="List view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-3 text-sm text-[#555] hover:text-black border border-[#e5e5e5] rounded-full hover:border-[#ccc] transition-all bg-white shadow-sm">
              <Share2 className="w-4 h-4" />
              Share List
            </button>
            <button className="flex items-center gap-2 px-5 py-3 text-sm text-[#555] hover:text-black border border-[#e5e5e5] rounded-full hover:border-[#ccc] transition-all bg-white shadow-sm">
              <Bell className="w-4 h-4" />
              Price Alerts
            </button>
            <button
              onClick={() => setWishlistItems([])}
              className="flex items-center gap-2 px-5 py-3 text-sm text-red-600 hover:text-white border border-red-200 rounded-full hover:bg-red-600 hover:border-red-600 transition-all bg-white shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Quick Add All Banner */}
        <div className="relative bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#222] rounded-3xl p-8 md:p-10 mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="hidden md:flex w-16 h-16 bg-white/10 rounded-2xl items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Ready to Make Them Yours?</h2>
                <p className="text-white/60">Add all {wishlistItems.length} items to your cart with one click</p>
              </div>
            </div>
            <button 
              onClick={addAllToCart}
              className="group flex items-center gap-3 bg-white text-[#111] px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              Add All to Cart
              <span className="px-2.5 py-1 bg-[#111] text-white text-xs rounded-full">
                {formatPriceCompact(totalValue)}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {sortedItems.map((product) => (
              <div 
                key={product._id} 
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
                  addedToCart.includes(product._id) ? 'scale-95 opacity-50' : ''
                }`}
              >
                <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </Link>
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1.5 bg-[#111] text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {product.badge}
                    </span>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => removeItem(product._id)}
                      className="p-2.5 bg-white shadow-lg hover:bg-red-50 rounded-full transition-all"
                      aria-label="Remove from wishlist"
                    >
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </button>
                  </div>

                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => moveToCart(product._id)}
                      disabled={addedToCart.includes(product._id)}
                      className="w-full flex items-center justify-center gap-2 bg-white text-[#111] py-3 rounded-full font-semibold text-sm hover:bg-white/90 transition-all disabled:opacity-50"
                    >
                      {addedToCart.includes(product._id) ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          Added!
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-[#555] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[#999] text-xs mt-1 capitalize">{product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-bold">{formatPriceCompact(product.price)}</p>
                    <div className="flex items-center gap-1 text-xs text-[#999]">
                      <Clock className="w-3 h-3" />
                      <span>Added today</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedItems.map((product) => (
              <div
                key={product._id}
                className={`bg-white rounded-2xl border border-[#e5e5e5] p-5 md:p-6 flex gap-5 md:gap-8 hover:shadow-lg transition-all duration-300 ${
                  addedToCart.includes(product._id) ? 'opacity-50' : ''
                }`}
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative w-28 h-36 md:w-36 md:h-44 bg-[#f5f5f5] rounded-xl overflow-hidden flex-shrink-0 group"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="144px"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-[#111] text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                      {product.badge}
                    </span>
                  )}
                </Link>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="text-lg md:text-xl font-semibold hover:text-[#555] transition-colors"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-[#999] mt-1 capitalize">{product.category}</p>
                      </div>
                      <p className="text-xl font-bold">{formatPriceCompact(product.price)}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-xs text-[#999]">
                        <Clock className="w-3 h-3" />
                        <span>Added today</span>
                      </div>
                      {product.stock < 10 && (
                        <span className="text-xs text-amber-600 font-medium">Only {product.stock} left!</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => moveToCart(product._id)}
                      disabled={addedToCart.includes(product._id)}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-[#111] text-white font-semibold rounded-full hover:bg-black transition-all disabled:opacity-50"
                    >
                      {addedToCart.includes(product._id) ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => removeItem(product._id)}
                      className="p-3.5 text-[#999] hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button className="p-3.5 text-[#999] hover:text-black hover:bg-[#f5f5f5] rounded-full transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* You May Also Like */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">You May Also Like</h2>
              <p className="text-[#777] mt-1">Based on your wishlist</p>
            </div>
            <Link 
              href="/shop"
              className="flex items-center gap-2 text-sm font-medium text-[#555] hover:text-black transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts.map((product, index) => (
              <ProductCard 
                key={product._id}
                product={product}
                priority={index < 4}
              />
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#111] text-[#111] font-semibold rounded-full hover:bg-[#111] hover:text-white transition-all"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
