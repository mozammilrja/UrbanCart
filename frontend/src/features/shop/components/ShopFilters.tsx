"use client";

import { shopCategories, shopSizes } from "../services/shop.service";

export function ShopFilters() {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-32 space-y-10">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/40 mb-6">
            Filters
          </h3>
          <div className="space-y-6">
            {/* Category */}
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-sm font-bold">Category</span>
                <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="mt-4 space-y-3">
                {shopCategories.slice(1).map((category, index) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 text-sm cursor-pointer hover:text-primary"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={index === 1}
                      className="rounded border-primary/20 text-primary focus:ring-primary/20 bg-transparent"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </details>

            {/* Size */}
            <details className="group border-t border-primary/10 pt-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-sm font-bold">Size</span>
                <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {shopSizes.map((size, index) => (
                  <button
                    key={size}
                    className={`border border-primary/20 py-2 text-xs hover:bg-primary hover:text-white transition-colors ${
                      index === 2 ? "bg-primary text-white" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </details>

            {/* Price */}
            <details className="group border-t border-primary/10 pt-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-sm font-bold">Price</span>
                <span className="material-symbols-outlined text-sm transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="mt-4 space-y-4">
                <input
                  type="range"
                  className="w-full accent-primary bg-primary/20 rounded-lg appearance-none h-1"
                />
                <div className="flex justify-between text-xs font-medium text-primary/60 uppercase tracking-tighter">
                  <span>$0</span>
                  <span>$1,000+</span>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Newsletter Banner */}
        <div className="bg-primary/5 p-6 rounded-lg space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Join the Atelier
          </p>
          <p className="text-sm leading-relaxed text-primary/80">
            Get early access to new collections and editorial stories.
          </p>
          <button className="w-full py-3 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded shadow-lg shadow-primary/20 hover:bg-primary/90">
            Subscribe
          </button>
        </div>
      </div>
    </aside>
  );
}
