import { manifesto } from "../services/landing.service";

export function ManifestoSection() {
  return (
    <section className="bg-neutral-ivory dark:bg-primary/5 py-32 px-10 text-center">
      <div className="max-w-4xl mx-auto">
        <span className="material-symbols-outlined text-primary text-5xl mb-8">format_quote</span>
        <h2 className="text-slate-900 dark:text-slate-100 text-3xl md:text-5xl font-light leading-snug italic">
          {manifesto.text}{" "}
          <span className="text-primary font-bold not-italic">{manifesto.highlight}</span>
        </h2>
        <div className="mt-12 h-px w-24 bg-primary mx-auto"></div>
      </div>
    </section>
  );
}
