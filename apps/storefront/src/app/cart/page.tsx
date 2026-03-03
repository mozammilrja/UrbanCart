'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPriceCompact, cn } from '@/lib/utils';
import { products } from '@/data/mock';

// Mock cart items for demo
const initialCartItems = [
  { product: products[0], quantity: 1, size: 'M', color: 'Black' },
  { product: products[1], quantity: 2, size: 'L', color: 'Washed Black' },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (index: number, delta: number) => {
    setCartItems((items) =>
      items.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (index: number) => {
    setCartItems((items) => items.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-[#999]" />
          <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            Your cart is empty
          </h1>
          <p className="text-[#777] mb-8">
            Looks like you havent added anything to your cart yet.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-black/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-8">
          Shopping Cart ({cartItems.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={`${item.product._id}-${item.size}-${item.color}`}
                className="flex gap-4 md:gap-6 pb-6 border-b border-[#e5e5e5]"
              >
                {/* Image */}
                <Link
                  href={`/product/${item.product.slug}`}
                  className="relative w-24 h-32 md:w-32 md:h-40 bg-[#f5f5f5] flex-shrink-0"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-base font-medium hover:text-[#777] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-[#777] mt-1">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1 hover:bg-[#f5f5f5] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-[#e5e5e5]">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-medium">
                      {formatPriceCompact(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#f7f7f7] p-6 md:p-8 sticky top-24">
              <h2 className="text-lg font-medium mb-6">Order Summary</h2>

              <div className="space-y-3 pb-6 border-b border-[#e5e5e5]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#777]">Subtotal</span>
                  <span>{formatPriceCompact(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#777]">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPriceCompact(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#777]">
                    Free shipping on orders above ₹1,999
                  </p>
                )}
              </div>

              <div className="flex justify-between py-6 text-lg font-medium">
                <span>Total</span>
                <span>{formatPriceCompact(total)}</span>
              </div>

              <button className="w-full bg-black text-white h-14 text-sm font-medium tracking-widest uppercase hover:bg-black/90 transition-colors flex items-center justify-center gap-2">
                Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-[#777] text-center mt-4">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
