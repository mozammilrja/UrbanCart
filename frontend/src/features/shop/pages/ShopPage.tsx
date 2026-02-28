import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShopFilters } from "../components/ShopFilters";
import { ProductGrid } from "../components/ProductGrid";
import Link from "next/link";

export function ShopPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Header />
      <main className="max-w-7xl mx-auto w-full px-6 lg:px-20 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary/60 mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-bold">Shop All</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          <ShopFilters />
          <ProductGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
