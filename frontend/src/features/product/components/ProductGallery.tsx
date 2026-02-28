"use client";

import { useState } from "react";
import Image from "next/image";
import { featuredProduct } from "../services/product.service";

export function ProductGallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = featuredProduct.images || [featuredProduct.image];

  return (
    <div className="w-full lg:w-7/12 flex flex-col gap-4 p-4 lg:p-10">
      {images.map((image, index) => (
        <div
          key={index}
          className={`w-full aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 relative cursor-pointer ${
            index === selectedImageIndex ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setSelectedImageIndex(index)}
        >
          <Image
            src={image}
            alt={`${featuredProduct.name} view ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
