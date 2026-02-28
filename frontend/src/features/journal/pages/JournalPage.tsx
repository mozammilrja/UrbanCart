"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JournalHero } from "../components/JournalHero";
import { CategoryFilter } from "../components/CategoryFilter";
import { ArticleGrid } from "../components/ArticleGrid";
import { FeaturedInterview } from "../components/FeaturedInterview";
import { NewsletterSection } from "../components/NewsletterSection";

export function JournalPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        <JournalHero />
        <CategoryFilter />
        <ArticleGrid />
        <FeaturedInterview />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
