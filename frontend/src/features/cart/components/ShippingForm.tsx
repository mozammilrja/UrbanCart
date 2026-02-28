"use client";

export function ShippingForm() {
  return (
    <section className="pt-8 border-t border-primary/10">
      <h2 className="text-2xl font-bold mb-8">Shipping Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            First Name
          </label>
          <input
            type="text"
            placeholder="Jane"
            className="w-full rounded-lg border-primary/10 bg-white dark:bg-background-dark focus:ring-primary focus:border-primary p-3"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Doe"
            className="w-full rounded-lg border-primary/10 bg-white dark:bg-background-dark focus:ring-primary focus:border-primary p-3"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Address Line 1
          </label>
          <input
            type="text"
            placeholder="123 Minimalist Avenue"
            className="w-full rounded-lg border-primary/10 bg-white dark:bg-background-dark focus:ring-primary focus:border-primary p-3"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            City
          </label>
          <input
            type="text"
            placeholder="New York"
            className="w-full rounded-lg border-primary/10 bg-white dark:bg-background-dark focus:ring-primary focus:border-primary p-3"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Postcode
          </label>
          <input
            type="text"
            placeholder="10001"
            className="w-full rounded-lg border-primary/10 bg-white dark:bg-background-dark focus:ring-primary focus:border-primary p-3"
          />
        </div>
      </div>
    </section>
  );
}
