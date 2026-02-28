"use client";

import { collectionProducts } from "../services/collection.service";
import { CollectionProductCard } from "./CollectionProductCard";

export function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-20 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
        {collectionProducts.map((product) => (
          <CollectionProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
