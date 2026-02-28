import Image from "next/image";
import { storeMap } from "../services/store.service";

export function StoreMap() {
  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-primary/5 dark:bg-primary/10 rounded-xl overflow-hidden p-4 lg:p-0">
        <div className="h-[400px] w-full relative rounded-lg lg:rounded-none overflow-hidden grayscale contrast-125">
          <Image
            src={storeMap.image}
            alt="Minimalist street map view of New York City neighborhood"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="p-8 lg:p-16">
          <span className="material-symbols-outlined text-primary text-4xl mb-4">
            location_on
          </span>
          <h3 className="text-2xl font-semibold mb-4">Visit Us</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 font-light">
            {storeMap.directions}
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all font-medium text-sm flex items-center gap-2">
            Get Directions
            <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
