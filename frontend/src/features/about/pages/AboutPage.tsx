import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EditorialPortrait } from "../components/EditorialPortrait";
import { PhilosophyGrid } from "../components/PhilosophyGrid";
import { StudioSpotlight } from "../components/StudioSpotlight";
import { SignatureQuote } from "../components/SignatureQuote";
import { aboutHero } from "../services/about.service";

export function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Header />
      <main className="flex-1">
        {/* Hero Section: Editorial Header */}
        <section className="px-6 lg:px-20 py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <h1 className="text-6xl lg:text-9xl font-extrabold leading-[0.9] tracking-tighter text-slate-900 dark:text-slate-100">
                {aboutHero.title} <br />
                <span className="text-primary italic font-light">
                  {aboutHero.titleAccent}
                </span>
              </h1>
            </div>
            <div className="lg:col-span-5 pb-4">
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-md">
                {aboutHero.description}
              </p>
            </div>
          </div>
        </section>

        <EditorialPortrait />
        <PhilosophyGrid />
        <StudioSpotlight />
        <SignatureQuote />
      </main>
      <Footer />
    </div>
  );
}
