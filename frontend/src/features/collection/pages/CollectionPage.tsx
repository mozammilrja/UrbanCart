"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CollectionHero } from "../components/CollectionHero";
import { CollectionFilters } from "../components/CollectionFilters";
import { ProductGrid } from "../components/ProductGrid";
import { EditorialCta } from "../components/EditorialCta";

export function CollectionPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Header />
      <main className="flex-1">
        <CollectionHero />
        <CollectionFilters />
        <ProductGrid />
        <EditorialCta />
      </main>
      <Footer />
    </div>
  );
}
