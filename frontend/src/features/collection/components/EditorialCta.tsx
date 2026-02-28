"use client";

import { editorialCta } from "../services/collection.service";

export function EditorialCta() {
  return (
    <section className="bg-primary/5 dark:bg-primary/10 py-24 px-6 lg:px-20 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <span className="material-symbols-outlined text-4xl text-primary">
          {editorialCta.icon}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif italic">
          {editorialCta.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-loose">
          {editorialCta.description}
        </p>
        <button className="border border-primary text-primary px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all">
          {editorialCta.buttonText}
        </button>
      </div>
    </section>
  );
}
