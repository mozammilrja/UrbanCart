'use client';

import { useState, useMemo } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { products } from '@/data/mock';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#777]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full h-14 pl-12 pr-12 border border-[#e5e5e5] text-lg focus:border-[#111] focus:outline-none transition-colors placeholder:text-[#999]"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#f5f5f5] rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {query.trim() ? (
          <>
            <p className="text-sm text-[#777] mb-8">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for &quot;{query}&quot;
            </p>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-[#777] mb-4">No products found matching your search.</p>
                <p className="text-sm text-[#999]">
                  Try searching for &quot;caps&quot;, &quot;hoodies&quot;, or &quot;tee&quot;
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-light tracking-tight mb-4">Popular Searches</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Caps', 'Hoodies', 'T-Shirts', 'New Arrivals'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 border border-[#e5e5e5] text-sm hover:border-[#111] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
