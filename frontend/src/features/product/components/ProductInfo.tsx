"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";
import { featuredProduct, productDetails } from "../services/product.service";

export function ProductInfo() {
  const [selectedSize, setSelectedSize] = useState("S");
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(featuredProduct, 1, selectedSize);
  };

  return (
    <aside className="w-full lg:w-5/12 p-6 lg:p-10 lg:sticky lg:top-24 h-fit">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 mb-8">
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
        <span className="hover:text-primary">{featuredProduct.category}</span>
        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-100">
          {featuredProduct.name.split(" ").slice(-2).join(" ")}
        </span>
      </nav>

      <h1 className="font-serif text-5xl lg:text-6xl text-warm-black dark:text-slate-100 mb-4 leading-tight">
        {featuredProduct.name}
      </h1>

      <div className="flex items-center justify-between mb-10 border-b border-primary/10 pb-6">
        <p className="text-2xl font-light text-primary">${featuredProduct.price.toFixed(2)}</p>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-yellow-500 fill-1">star</span>
          <span className="text-sm font-bold">{productDetails.rating}</span>
          <span className="text-xs text-slate-400">({productDetails.reviewCount} Reviews)</span>
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-4">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Select Size
          </label>
          <a href="#" className="text-xs underline text-slate-400 hover:text-primary">
            Size Guide
          </a>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {featuredProduct.sizes?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-12 flex items-center justify-center text-sm font-medium transition-colors rounded-lg ${
                selectedSize === size
                  ? "border-2 border-primary bg-primary/5 font-bold"
                  : "border border-slate-200 dark:border-slate-700 hover:border-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-12 space-y-4">
        <button
          onClick={handleAddToCart}
          className="w-full bg-warm-black dark:bg-primary text-white h-16 rounded-xl font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
          Add to Cart
        </button>
        <button className="w-full border border-warm-black/20 dark:border-white/20 h-16 rounded-xl font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined">favorite</span>
          Wishlist
        </button>
      </div>

      {/* Product Details */}
      <div className="space-y-8">
        <section className="border-t border-primary/10 pt-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">eco</span>
            Fabric & Care
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">
            {productDetails.fabricCare}
          </p>
        </section>

        <section className="border-t border-primary/10 pt-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">stylus</span>
            Styling Suggestions
          </h3>
          <ul className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light list-disc list-inside">
            {productDetails.stylingSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </section>

        <section className="border-t border-primary/10 pt-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            Shipping & Returns
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-light">
            {productDetails.shippingReturns}
          </p>
        </section>
      </div>
    </aside>
  );
}
