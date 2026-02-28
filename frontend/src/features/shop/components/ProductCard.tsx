"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart.store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.sizes?.[0]);
  };

  return (
    <Link href={`/product/${product.id}`} className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-primary/5 mb-6">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-700 group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.name} lifestyle`}
            fill
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 px-3 py-1 text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-white"
        >
          Quick Add
        </button>
      </div>
      <div className="space-y-1 text-center">
        <h3 className="font-serif text-xl">{product.name}</h3>
        <p className="text-sm text-primary/70 font-medium">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
