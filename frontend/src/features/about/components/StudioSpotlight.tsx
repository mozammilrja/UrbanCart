import Image from "next/image";
import { studioSpotlight } from "../services/about.service";

export function StudioSpotlight() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 px-6 lg:pl-20 lg:pr-12 py-12 bg-primary/5">
          <div className="max-w-md">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter mb-8 leading-tight">
              {studioSpotlight.title} <br />
              <span className="text-primary font-light italic">
                {studioSpotlight.titleAccent}
              </span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-lg mb-8 font-light italic leading-relaxed">
              {studioSpotlight.quote}
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              {studioSpotlight.description}
            </p>
            <button className="bg-primary text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-primary/90 transition-all uppercase">
              Take a Studio Tour
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative">
          <div className="aspect-square lg:aspect-video w-full relative">
            <Image
              src={studioSpotlight.image}
              alt="Wide angle shot of a bright modern minimal architecture interior studio"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
