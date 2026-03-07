'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Minus, 
  Plus, 
  X, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Shield, 
  Gift, 
  Tag,
  Heart,
  RefreshCw,
  CreditCard,
  Sparkles 
} from 'lucide-react';
import { formatPriceCompact, cn } from '@/lib/utils';
import { products } from '@/data/mock';

// Mock cart items for demo
const initialCartItems = [
  { product: products[0], quantity: 1, size: 'M', color: 'Black' },
  { product: products[1], quantity: 2, size: 'L', color: 'Washed Black' },
];

// Recommended products
const recommendedProducts = products.slice(4, 8);

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

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

  const moveToWishlist = (index: number) => {
    removeItem(index);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal - discount + shipping;
  const freeShippingThreshold = 1999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'apostle10') {
      setPromoApplied(true);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#f7f7f7]">
        <div className="text-center px-4 max-w-md">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
            Your cart is empty
          </h1>
          <p className="text-[#777] mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet. Explore our collection and find something you love.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-black/90 transition-all rounded-full shadow-lg hover:shadow-xl"
          >
            <Sparkles className="w-4 h-4" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-b from-white to-[#f7f7f7]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              Shopping Cart
            </h1>
            <p className="text-[#777] mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          <Link
            href="/collections"
            className="text-sm text-[#777] hover:text-black transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Free Shipping Progress */}
        {amountToFreeShipping > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium">
                Add {formatPriceCompact(amountToFreeShipping)} more for FREE shipping!
              </span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.product._id}-${item.size}-${item.color}`}
                  className={cn(
                    "flex gap-4 md:gap-6 p-6",
                    index !== cartItems.length - 1 && "border-b border-[#e5e5e5]"
                  )}
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="relative w-28 h-36 md:w-36 md:h-44 bg-[#f5f5f5] flex-shrink-0 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="144px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-lg font-medium hover:text-[#777] transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-[#777] mt-1">{item.product.category}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="px-3 py-1 bg-[#f5f5f5] rounded-full text-xs font-medium">
                            {item.color}
                          </span>
                          <span className="px-3 py-1 bg-[#f5f5f5] rounded-full text-xs font-medium">
                            Size: {item.size}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="p-2 h-fit text-[#999] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between pt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#f5f5f5] rounded-lg">
                          <button
                            onClick={() => updateQuantity(index, -1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-[#e5e5e5] rounded-l-lg transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-[#e5e5e5] rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => moveToWishlist(index)}
                          className="flex items-center gap-1.5 text-xs text-[#777] hover:text-red-500 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          Save
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-lg font-semibold">
                          {formatPriceCompact(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-xs text-[#999]">
                            {formatPriceCompact(item.product.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders above ₹1,999' },
                { icon: RefreshCw, label: 'Easy Returns', sub: '7-day return policy' },
                { icon: Shield, label: 'Secure Payment', sub: '100% protected' },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-[#e5e5e5]">
                  <badge.icon className="w-6 h-6 text-[#777] mb-2" />
                  <span className="text-sm font-medium">{badge.label}</span>
                  <span className="text-xs text-[#999]">{badge.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-6 md:p-8 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      disabled={promoApplied}
                      className="w-full h-12 pl-10 pr-4 border border-[#e5e5e5] rounded-lg text-sm focus:border-black focus:outline-none transition-colors disabled:bg-[#f5f5f5]"
                    />
                  </div>
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied || !promoCode}
                    className="px-4 h-12 bg-[#f5f5f5] text-sm font-medium rounded-lg hover:bg-[#e5e5e5] transition-colors disabled:opacity-50"
                  >
                    {promoApplied ? '✓' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    10% discount applied!
                  </p>
                )}
                <p className="text-xs text-[#999] mt-2">Try: APOSTLE10</p>
              </div>

              <div className="space-y-3 pb-6 border-b border-[#e5e5e5]">
                <div className="flex justify-between text-sm">
                  <span className="text-[#777]">Subtotal ({cartItems.length} items)</span>
                  <span>{formatPriceCompact(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatPriceCompact(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[#777]">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : formatPriceCompact(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-6 text-xl font-semibold">
                <span>Total</span>
                <span>{formatPriceCompact(total)}</span>
              </div>

              <button className="w-full bg-black text-white h-14 text-sm font-medium tracking-widest uppercase hover:bg-black/90 transition-all rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                <CreditCard className="w-5 h-5" />
                Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 mt-6">
                {['visa', 'mastercard', 'upi', 'paytm'].map((method) => (
                  <div key={method} className="w-10 h-6 bg-[#f5f5f5] rounded flex items-center justify-center text-[10px] font-medium text-[#999] uppercase">
                    {method}
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#777] text-center mt-4">
                Taxes calculated at checkout • Secure SSL encryption
              </p>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug}`}
                className="group"
              >
                <div className="relative aspect-square bg-[#f5f5f5] rounded-xl overflow-hidden mb-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                <p className="text-sm text-[#777]">{formatPriceCompact(product.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
