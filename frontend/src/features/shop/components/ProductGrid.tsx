import { ProductCard } from "./ProductCard";
import { shopProducts } from "../services/shop.service";

export function ProductGrid() {
  return (
    <div className="flex-1">
      <div className="flex items-baseline justify-between mb-10 border-b border-primary/10 pb-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-serif italic text-slate-900 dark:text-slate-100">
            The Modern Edit
          </h1>
          <p className="text-sm text-primary/60 font-medium">Showing 32 curated pieces</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
          <span className="text-primary/40">Sort by:</span>
          <button className="flex items-center gap-1">
            Newest <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {shopProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-20 flex justify-center items-center gap-8">
        <button className="material-symbols-outlined text-primary/40 hover:text-primary transition-colors">
          west
        </button>
        <div className="flex gap-4 text-sm font-bold">
          <span className="text-primary border-b-2 border-primary pb-1">01</span>
          <span className="text-primary/40 hover:text-primary cursor-pointer transition-colors">
            02
          </span>
          <span className="text-primary/40 hover:text-primary cursor-pointer transition-colors">
            03
          </span>
          <span className="text-primary/40">...</span>
          <span className="text-primary/40 hover:text-primary cursor-pointer transition-colors">
            12
          </span>
        </div>
        <button className="material-symbols-outlined text-primary hover:text-primary/70 transition-colors">
          east
        </button>
      </div>
    </div>
  );
}
