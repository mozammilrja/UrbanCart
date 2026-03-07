'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search as SearchIcon, X, TrendingUp, Clock, Sparkles, Filter, SlidersHorizontal, ArrowRight, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { products, collections } from '@/data/mock';

const trendingSearches = ['Oversized Hoodies', 'Graphic Tees', 'Caps', 'Streetwear', 'Limited Edition', 'Black'];

const popularCategories = [
  { name: 'T-Shirts', slug: 't-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', count: 24 },
  { name: 'Hoodies', slug: 'hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80', count: 18 },
  { name: 'Caps', slug: 'caps', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80', count: 12 },
  { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80', count: 8 },
];

const categories = [
  { name: 'All', value: '' },
  { name: 'T-Shirts', value: 't-shirts' },
  { name: 'Hoodies', value: 'hoodies' },
  { name: 'Caps', value: 'caps' },
  { name: 'Accessories', value: 'accessories' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Oversized fit', 'Black hoodies', 'Summer drops']);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = products;

    if (selectedCategory) {
      results = results.filter((product) =>
        product.categorySlug?.toLowerCase() === selectedCategory.toLowerCase() ||
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (!query.trim()) return selectedCategory ? results : [];

    const searchTerm = query.toLowerCase();
    return results.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
    );
  }, [query, selectedCategory]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    const productNames = products
      .filter(p => p.name.toLowerCase().includes(searchTerm))
      .map(p => p.name)
      .slice(0, 5);
    const categoryMatches = categories
      .filter(c => c.name.toLowerCase().includes(searchTerm) && c.value)
      .map(c => c.name);
    return Array.from(new Set([...categoryMatches, ...productNames])).slice(0, 6);
  }, [query]);

  const handleSearch = (term: string) => {
    setQuery(term);
    setShowSuggestions(false);
    if (term && !recentSearches.includes(term)) {
      setRecentSearches((prev) => [term, ...prev].slice(0, 5));
    }
  };

  const clearRecentSearch = (term: string) => {
    setRecentSearches(prev => prev.filter(s => s !== term));
  };

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-[#fafafa] to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Hero Search Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Find Your <span className="bg-gradient-to-r from-[#333] to-[#666] bg-clip-text text-transparent">Style</span>
          </h1>
          <p className="text-[#666] text-lg">Search through our premium streetwear collection</p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <div className={`relative bg-white rounded-2xl transition-all duration-300 ${
            isInputFocused ? 'shadow-2xl ring-2 ring-black' : 'shadow-lg'
          }`}>
            <SearchIcon className={`absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${
              isInputFocused ? 'text-black' : 'text-[#999]'
            }`} />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => { setIsInputFocused(true); setShowSuggestions(true); }}
              onBlur={() => setTimeout(() => { setIsInputFocused(false); setShowSuggestions(false); }, 200)}
              placeholder="Search for products..."
              className="w-full h-16 pl-14 pr-14 text-lg bg-transparent focus:outline-none placeholder:text-[#999] rounded-2xl"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-[#f5f5f5] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#e5e5e5] overflow-hidden z-50">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#f5f5f5] transition-colors text-left"
                >
                  <SearchIcon className="w-4 h-4 text-[#999]" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches - Quick Tags */}
          <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
            <span className="text-sm text-[#999]">Popular:</span>
            {trendingSearches.slice(0, 4).map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="px-3 py-1.5 bg-white border border-[#e5e5e5] rounded-full text-sm hover:border-black hover:bg-black hover:text-white transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {query.trim() || selectedCategory ? (
          <>
            {/* Category Filter Pills */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              <SlidersHorizontal className="w-5 h-5 text-[#777] flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-black text-white'
                      : 'bg-white text-[#555] hover:bg-[#f5f5f5] border border-[#e5e5e5]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-[#666]">
                <span className="font-semibold text-black">{filteredProducts.length}</span> result{filteredProducts.length !== 1 ? 's' : ''}
                {query && <span className="text-[#999]"> for &quot;{query}&quot;</span>}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#f0f0f0] to-[#e5e5e5] rounded-full flex items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-[#bbb]" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">No results found</h3>
                <p className="text-[#777] mb-8 max-w-md mx-auto">
                  We couldn&apos;t find any products matching &quot;{query}&quot;. Try different keywords or browse our categories.
                </p>
                <button
                  onClick={() => { setQuery(''); setSelectedCategory(''); }}
                  className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-[#333] transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        ) : (
          /* Default View - No Search */
          <div className="space-y-16">
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Searches
                  </h2>
                  <button
                    onClick={() => setRecentSearches([])}
                    className="text-sm text-[#999] hover:text-black transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((term) => (
                    <div
                      key={term}
                      className="flex items-center gap-2 pl-4 pr-2 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm hover:border-black transition-all group"
                    >
                      <button onClick={() => handleSearch(term)} className="hover:text-black">
                        {term}
                      </button>
                      <button
                        onClick={() => clearRecentSearch(term)}
                        className="p-1 hover:bg-[#f5f5f5] rounded-full"
                      >
                        <X className="w-3 h-3 text-[#999]" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Trending Searches */}
            <section>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5" />
                Trending Now
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {trendingSearches.map((term, i) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="flex items-center gap-4 p-4 bg-white border border-[#e5e5e5] rounded-xl hover:border-black hover:shadow-lg transition-all group text-left"
                  >
                    <span className="w-8 h-8 bg-[#f5f5f5] rounded-full flex items-center justify-center text-sm font-bold text-[#999] group-hover:bg-black group-hover:text-white transition-colors">
                      {i + 1}
                    </span>
                    <span className="font-medium group-hover:text-black transition-colors">{term}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Browse Categories with Images */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Shop by Category
                </h2>
                <Link href="/collections" className="text-sm text-[#666] hover:text-black flex items-center gap-1 transition-colors">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/collections/${category.slug}`}
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                      <p className="text-white/70 text-sm">{category.count} products</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">Popular Products</h2>
                <Link href="/shop" className="text-sm text-[#666] hover:text-black flex items-center gap-1 transition-colors">
                  Shop all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>

          </div>
        )}
      </div>
    </div>
  );
}
