"use client";

import Image from "next/image";
import { JournalArticle } from "../services/journal.service";

interface ArticleCardProps {
  article: JournalArticle;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 relative">
        <Image
          src={article.image}
          alt={article.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900 rounded">
            {article.category}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs text-primary font-bold">{article.date}</p>
        <h3 className="text-3xl font-serif group-hover:italic transition-all leading-tight">
          {article.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
