"use client";

import Image from "next/image";
import { featuredInterview } from "../services/journal.service";

export function FeaturedInterview() {
  return (
    <section className="border-t border-primary/20 pt-24 mb-24">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-6 block">
          {featuredInterview.badge}
        </span>
        <h2 className="text-5xl lg:text-7xl font-serif leading-tight mb-8">
          {featuredInterview.title}
        </h2>
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <span>By {featuredInterview.author}</span>
          <span className="w-1 h-1 bg-primary rounded-full" />
          <span>{featuredInterview.readTime}</span>
        </div>
      </div>
      <div className="w-full aspect-video rounded-xl overflow-hidden mb-16 shadow-lg relative">
        <Image
          src={featuredInterview.heroImage}
          alt={featuredInterview.heroAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="max-w-2xl mx-auto prose prose-slate dark:prose-invert lg:prose-lg">
        <p className="text-xl font-serif italic text-primary leading-relaxed mb-8">
          {featuredInterview.pullQuote}
        </p>
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-loose">
          <p>{featuredInterview.paragraphs[0]}</p>
          <p>{featuredInterview.paragraphs[1]}</p>
          <div className="py-8">
            <div className="relative aspect-video rounded-lg shadow-md overflow-hidden">
              <Image
                src={featuredInterview.inlineImage}
                alt={featuredInterview.inlineImageAlt}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs italic text-center mt-4 text-slate-500">
              {featuredInterview.inlineImageCaption}
            </p>
          </div>
          <p>{featuredInterview.paragraphs[2]}</p>
        </div>
      </div>
    </section>
  );
}
