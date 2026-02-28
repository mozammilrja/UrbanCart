"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";

export function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="flex items-center justify-between border-b border-primary/10 px-6 py-4 lg:px-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-3xl">auto_awesome</span>
          <h2 className="text-xl font-extrabold tracking-tighter uppercase">ELÉGANCE</h2>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest"
          >
            Shop
          </Link>
          <Link
            href="/collections"
            className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest"
          >
            Philosophy
          </Link>
          <Link
            href="/journal"
            className="text-sm font-semibold hover:text-primary transition-colors uppercase tracking-widest"
          >
            Journal
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-primary/5 rounded-full px-4 py-1.5 border border-primary/10">
          <span className="material-symbols-outlined text-primary text-sm">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-32 placeholder:text-primary/40"
            placeholder="Explore..."
          />
        </div>
        <div className="flex gap-4">
          <Link
            href="/cart"
            className="p-2 hover:bg-primary/10 rounded-full transition-colors relative"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}
