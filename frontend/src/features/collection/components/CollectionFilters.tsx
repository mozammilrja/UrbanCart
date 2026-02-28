"use client";

import {
  collectionFilters,
  collectionSortOptions,
} from "../services/collection.service";

export function CollectionFilters() {
  return (
    <div className="sticky top-[72px] z-40 bg-background-light/95 dark:bg-background-dark/95 border-b border-primary/5 py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-12">
          {collectionFilters.map((filter) => (
            <a
              key={filter.slug}
              href="#"
              className={`group relative py-1 text-sm uppercase tracking-widest ${
                filter.active
                  ? "font-bold text-primary"
                  : "font-semibold text-slate-500 hover:text-primary transition-colors"
              }`}
            >
              {filter.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary ${
                  filter.active ? "w-full" : "w-0 group-hover:w-full transition-all"
                }`}
              />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
          <span className="material-symbols-outlined">tune</span>
          <span className="uppercase tracking-widest">Sort By</span>
          <select className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest cursor-pointer">
            {collectionSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
