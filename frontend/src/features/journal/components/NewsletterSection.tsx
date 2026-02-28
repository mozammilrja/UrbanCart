"use client";

import { newsletterSection } from "../services/journal.service";

export function NewsletterSection() {
  return (
    <section className="bg-primary/5 rounded-2xl p-12 lg:p-20 text-center border border-primary/10">
      <h2 className="text-3xl lg:text-5xl font-serif mb-6">
        {newsletterSection.title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-10 text-lg">
        {newsletterSection.description}
      </p>
      <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder={newsletterSection.placeholder}
          className="flex-1 bg-white dark:bg-slate-800 border-primary/20 rounded-lg px-6 py-4 focus:ring-primary focus:border-primary"
        />
        <button
          type="submit"
          className="bg-primary text-white font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          {newsletterSection.buttonText}
        </button>
      </form>
    </section>
  );
}
