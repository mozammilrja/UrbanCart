"use client";

import Image from "next/image";
import { journalHero } from "../services/journal.service";

export function JournalHero() {
  return (
    <section className="mb-20">
      <div className="flex flex-col md:flex-row gap-12 items-end mb-12">
        <div className="flex-1">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
            {journalHero.volume}
          </span>
          <h2 className="text-6xl lg:text-8xl font-serif leading-tight mb-6 italic">
            {journalHero.title} <br />
            {journalHero.titleLine2}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            {journalHero.description}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
            {journalHero.ctaText}
          </button>
        </div>
      </div>
      <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
        <Image
          src={journalHero.heroImage}
          alt={journalHero.heroAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </section>
  );
}
