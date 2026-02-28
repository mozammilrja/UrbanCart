import { signatureQuote } from "../services/about.service";

export function SignatureQuote() {
  return (
    <section className="px-6 lg:px-20 py-32 text-center">
      <div className="max-w-4xl mx-auto border-y border-primary/20 py-20">
        <span className="material-symbols-outlined text-primary text-5xl mb-6">
          format_quote
        </span>
        <h2 className="text-3xl lg:text-5xl font-light italic tracking-tight leading-snug text-slate-900 dark:text-slate-100">
          {signatureQuote.text}{" "}
          <span className="text-primary font-extrabold">{signatureQuote.highlight}</span>{" "}
          {signatureQuote.textContinued}
        </h2>
        <p className="mt-8 text-xs tracking-[0.5em] uppercase font-bold text-primary">
          {signatureQuote.author}
        </p>
      </div>
    </section>
  );
}
