"use client";

import { useState } from "react";

export function PaymentForm() {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");

  return (
    <section className="pt-8 border-t border-primary/10">
      <h2 className="text-2xl font-bold mb-8">Payment Method</h2>
      <div className="space-y-4">
        <label
          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
            selectedPayment === "credit-card"
              ? "border-primary bg-primary/5"
              : "border-primary/10 bg-white dark:bg-background-dark/30 hover:bg-primary/5"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="credit-card"
            checked={selectedPayment === "credit-card"}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="text-primary focus:ring-primary"
          />
          <div className="flex-1">
            <p className="font-bold">Credit Card</p>
            <p className="text-sm text-slate-500 italic">Ending in 4421</p>
          </div>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-3xl">credit_card</span>
          </div>
        </label>
        <label
          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
            selectedPayment === "paypal"
              ? "border-2 border-primary bg-primary/5"
              : "border-primary/10 bg-white dark:bg-background-dark/30 hover:bg-primary/5"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={selectedPayment === "paypal"}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="text-primary focus:ring-primary"
          />
          <div className="flex-1">
            <p className="font-bold">PayPal</p>
            <p className="text-sm text-slate-500">One-click checkout</p>
          </div>
          <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
        </label>
      </div>
    </section>
  );
}
