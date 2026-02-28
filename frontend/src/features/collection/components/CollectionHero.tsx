"use client";

import { collectionHero } from "../services/collection.service";

export function CollectionHero() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 21, 16, 0.4), rgba(34, 21, 16, 0.2)), url('${collectionHero.heroImage}')`,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span className="text-white/90 uppercase tracking-[0.4em] text-sm mb-6">
          {collectionHero.season}
        </span>
        <h1 className="text-white text-6xl md:text-8xl font-serif italic mb-8 max-w-4xl leading-tight">
          {collectionHero.title}
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-10">
          {collectionHero.description}
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-background-dark px-10 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all rounded-none">
            {collectionHero.ctaText}
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
        <span className="material-symbols-outlined text-3xl">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  );
}
