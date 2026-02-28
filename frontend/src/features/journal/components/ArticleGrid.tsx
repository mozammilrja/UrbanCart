"use client";

import { journalArticles } from "../services/journal.service";
import { ArticleCard } from "./ArticleCard";

export function ArticleGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24">
      {journalArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  );
}
