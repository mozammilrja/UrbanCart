import Image from "next/image";
import { philosophyPillars } from "../services/about.service";

export function PhilosophyGrid() {
  return (
    <section className="px-6 lg:px-20 py-24 bg-white dark:bg-background-dark/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-primary/10 pt-16">
        {philosophyPillars.map((pillar) => (
          <div key={pillar.number} className="flex flex-col gap-6">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              {pillar.number}
            </span>
            <h3 className="text-3xl font-bold tracking-tight">{pillar.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              {pillar.description}
            </p>
            <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden mt-4 relative">
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
