import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "../components/HeroSection";
import { FeaturedCollections } from "../components/FeaturedCollections";
import { ManifestoSection } from "../components/ManifestoSection";
import { EditorialSection } from "../components/EditorialSection";

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCollections />
        <ManifestoSection />
        <EditorialSection />
      </main>
      <Footer />
    </div>
  );
}
