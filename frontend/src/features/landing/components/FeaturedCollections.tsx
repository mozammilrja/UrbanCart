import Image from "next/image";
import Link from "next/link";
import { featuredCollections } from "../services/landing.service";

export function FeaturedCollections() {
  return (
    <section className="px-4 md:px-10 py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight mb-2">
            Featured Series
          </h2>
          <p className="text-slate-500 uppercase text-xs tracking-widest">Seasonal Highlights</p>
        </div>
        <Link href="/collections" className="text-primary font-bold text-sm underline underline-offset-4">
          View All Collections
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuredCollections.map((collection) => (
          <Link key={collection.id} href="/collections" className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden rounded-xl mb-6 relative">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              {collection.name}
            </h3>
            <p className="text-slate-500 text-sm uppercase tracking-widest">{collection.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
