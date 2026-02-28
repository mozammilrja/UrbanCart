"use client";

import Image from "next/image";
import { useCartStore } from "@/stores/cart.store";

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-primary font-medium">0 Items</p>
        </div>
        <div className="py-12 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
            shopping_bag
          </span>
          <p className="text-slate-500">Your cart is empty</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        <p className="text-primary font-medium">{items.length} Items</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-primary/10">
              <th className="py-4 font-semibold text-sm uppercase tracking-wider text-slate-500">
                Product
              </th>
              <th className="py-4 font-semibold text-sm uppercase tracking-wider text-slate-500">
                Quantity
              </th>
              <th className="py-4 font-semibold text-sm uppercase tracking-wider text-slate-500 text-right">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/5">
            {items.map((item) => (
              <tr key={item.product.id}>
                <td className="py-6">
                  <div className="flex gap-4 items-center">
                    <div className="h-24 w-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.product.name}</h3>
                      <p className="text-sm text-slate-500">
                        {item.size && `${item.size}`}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="mt-2 text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:opacity-80"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span> Remove
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-6">
                  <div className="flex items-center gap-3 border border-primary/10 w-fit rounded-lg px-2 py-1 bg-white dark:bg-background-dark/50">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-lg">remove</span>
                    </button>
                    <span className="font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-lg">add</span>
                    </button>
                  </div>
                </td>
                <td className="py-6 text-right font-bold text-lg">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
