import Image from "next/image";
import Link from "next/link";
import { heroData } from "../services/landing.service";

export function HeroSection() {
  return (
    <section className="px-4 py-4 md:px-10">
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroData.image}
            alt="Editorial fashion photography of a high-end luxury outfit in soft lighting"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50"></div>
        </div>
        <div className="z-10 text-center px-6 max-w-4xl">
          <span className="text-white/80 uppercase tracking-[0.3em] text-sm mb-4 block">
            {heroData.season}
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8">
            {heroData.headline.split(" ").slice(0, 3).join(" ")} <br />
            {heroData.headline.split(" ").slice(3).join(" ")}
          </h1>
          <Link
            href="/collections"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest transition-all transform hover:scale-105"
          >
            {heroData.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
