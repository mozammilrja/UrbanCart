"use client";

import { journalCategories } from "../services/journal.service";

export function CategoryFilter() {
  return (
    <nav className="flex overflow-x-auto gap-10 border-b border-primary/10 pb-6 mb-12 no-scrollbar">
      {journalCategories.map((category) => (
        <a
          key={category.slug}
          href="#"
          className={`whitespace-nowrap font-bold text-sm uppercase tracking-widest pb-6 -mb-[26px] ${
            category.active
              ? "text-primary border-b-2 border-primary"
              : "text-slate-400 hover:text-primary transition-colors"
          }`}
        >
          {category.label}
        </a>
      ))}
    </nav>
  );
}
