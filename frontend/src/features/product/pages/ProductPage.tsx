import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "../components/ProductGallery";
import { ProductInfo } from "../components/ProductInfo";
import { RelatedProducts } from "../components/RelatedProducts";

export function ProductPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Header />
      <main className="mx-auto max-w-7xl w-full flex flex-col lg:flex-row flex-1">
        <ProductGallery />
        <ProductInfo />
      </main>
      <RelatedProducts />
      <Footer />
    </div>
  );
}
