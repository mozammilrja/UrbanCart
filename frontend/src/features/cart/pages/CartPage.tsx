import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartItems } from "../components/CartItems";
import { ShippingForm } from "../components/ShippingForm";
import { PaymentForm } from "../components/PaymentForm";
import { OrderSummary } from "../components/OrderSummary";

export function CartPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">Cart & Checkout</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Cart & Shipping Form */}
          <div className="lg:col-span-8 space-y-12">
            <CartItems />
            <ShippingForm />
            <PaymentForm />
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <OrderSummary />
        </div>
      </main>
      <Footer />
    </div>
  );
}
