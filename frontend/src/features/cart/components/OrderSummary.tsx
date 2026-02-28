"use client";

import { useCartStore } from "@/stores/cart.store";

export function OrderSummary() {
  const { getSubtotal, getTax, getTotal, items } = useCartStore();
  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const shipping: number = items.length > 0 ? 15 : 0;

  return (
    <div className="lg:col-span-4">
      <div className="sticky top-10 bg-white dark:bg-background-dark/50 border border-primary/10 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Shipping</span>
            <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Tax (Est.)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-primary/10 pt-4 flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Promo Code"
              className="w-full rounded-lg border-primary/10 bg-primary/5 focus:ring-primary focus:border-primary p-3 pr-20 text-sm"
            />
            <button className="absolute right-2 top-2 bottom-2 px-3 text-xs font-bold uppercase text-primary hover:bg-primary/10 rounded">
              Apply
            </button>
          </div>
          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            Complete Purchase
            <span className="material-symbols-outlined">lock</span>
          </button>
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="material-symbols-outlined text-primary">verified</span>
            <p>Secure SSL encrypted checkout</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="material-symbols-outlined text-primary">local_shipping</span>
            <p>Complimentary express delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
