"use client";

import Image from "next/image";
import { CollectionProduct } from "../services/collection.service";

interface CollectionProductCardProps {
  product: CollectionProduct;
}

export function CollectionProductCard({ product }: CollectionProductCardProps) {
  return (
    <div
      className={`group cursor-pointer ${
        product.offset ? "mt-16 md:mt-32" : ""
      }`}
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-primary/5">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary hover:text-white transition-colors">
          <span className="material-symbols-outlined">favorite</span>
        </button>
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-background-dark/60 to-transparent">
          <button className="w-full bg-white text-background-dark py-4 font-bold uppercase tracking-widest text-xs">
            Quick Add to Bag
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-serif italic mb-2">{product.name}</h3>
        <p className="text-slate-500 uppercase tracking-widest text-xs mb-4">
          {product.color}
        </p>
        <p className="text-primary font-bold text-lg">{product.price}</p>
      </div>
    </div>
  );
}
