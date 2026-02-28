import Image from "next/image";
import { storeHero } from "../services/store.service";

export function StoreHero() {
  return (
    <section className="mb-16">
      <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 via-transparent to-transparent z-10"></div>
        <Image
          src={storeHero.image}
          alt="Modern architectural interior of a minimalist clothing boutique"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
          priority
        />
        <div className="absolute bottom-8 left-8 z-20">
          <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
            {storeHero.tagline}
          </span>
          <h1 className="text-white text-4xl lg:text-5xl font-light tracking-tight">
            {storeHero.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
