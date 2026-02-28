"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";
import { relatedProducts } from "../services/product.service";

export function RelatedProducts() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="bg-primary/5 dark:bg-background-dark py-20 px-6 lg:px-20 mt-20 border-t border-primary/10">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-serif text-3xl mb-12">Complete the Look</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product, 1, product.sizes?.[0]);
                  }}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <h4 className="font-bold text-sm">{product.name}</h4>
              <p className="text-slate-500 text-sm">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
