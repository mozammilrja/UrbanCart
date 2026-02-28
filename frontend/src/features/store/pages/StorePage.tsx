import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreHero } from "../components/StoreHero";
import { StoreMap } from "../components/StoreMap";
import { EventCard } from "../components/EventCard";
import { InteriorGallery } from "../components/InteriorGallery";
import { storeHero, storeInfo, storeEvents } from "../services/store.service";

export function StorePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-20 py-8 lg:py-12">
        <StoreHero />

        {/* Store Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-light text-slate-900 dark:text-white mb-6">
              {storeHero.subtitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-light">
              {storeHero.description}
            </p>
          </div>
          <div className="lg:col-span-4 grid grid-cols-1 gap-6 pt-2">
            <div className="border-t border-primary/20 pt-4">
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Location
              </p>
              <p className="text-slate-800 dark:text-slate-200">{storeInfo.location}</p>
            </div>
            <div className="border-t border-primary/20 pt-4">
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">
                Hours
              </p>
              <div className="text-sm text-slate-800 dark:text-slate-200 space-y-1">
                {storeInfo.hours.map((hour, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{hour.days}</span>
                    <span>{hour.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <StoreMap />

        {/* Events Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-3 block">
                Cultural Calendar
              </span>
              <h2 className="text-4xl font-light">Community & Events</h2>
            </div>
            <a
              href="#"
              className="text-primary font-semibold border-b border-primary/40 hover:border-primary pb-1 transition-all text-sm"
            >
              View All Events
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        <InteriorGallery />
      </main>
      <Footer />
    </div>
  );
}
