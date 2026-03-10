'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  Sparkles,
  Package,
  Clock,
  Percent,
  Check,
  Lock,
  Zap
} from 'lucide-react';
import { formatPriceCompact, cn } from '@/lib/utils';
import { products } from '@/data/mock';
import { OptimizedProductCard } from '@/components/ui/OptimizedProductCard';
import { useCartStore, selectCartItems, selectCartItemCount, selectCartSubtotal } from '@/stores/cart.store';

// Recommended products
const recommendedProducts = products.slice(4, 8);

export default function CartPage() {
  const cartItems = useCartStore(selectCartItems);
  const totalItems = useCartStore(selectCartItemCount);
  const subtotal = useCartStore(selectCartSubtotal);
  const { updateQuantity, removeItem } = useCartStore();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + delta);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setRemovingItemId(itemId);
    setTimeout(() => {
      removeItem(itemId);
      setRemovingItemId(null);
    }, 300);
  };

  const moveToWishlist = (itemId: string) => {
    handleRemoveItem(itemId);
  };

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal - discount + shipping;
  const freeShippingThreshold = 1999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const savings = discount + (shipping === 0 ? 99 : 0);

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'apostle10') {
      setPromoApplied(true);
    }
  };

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#111] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen bg-[#fafafa]">
        {/* Empty State Hero */}
        <div className="relative bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#222] py-24 md:py-32 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-500/10 to-blue-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-lg mx-auto text-center px-4">
            {/* Animated Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-white/60" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Your Cart is Empty
            </h1>
            <p className="text-white/60 mb-10 leading-relaxed text-lg">
              Looks like you haven&apos;t added anything yet. Discover our latest drops and exclusive pieces.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 bg-white text-[#111] px-8 py-4 font-semibold tracking-wide hover:bg-white/90 transition-all rounded-full shadow-2xl hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Start Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white px-6 py-4 font-medium transition-colors"
              >
                <Heart className="w-4 h-4" />
                View Wishlist
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Popular Right Now</h2>
            <p className="text-[#777]">Items you might love</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts.map((product, index) => (
              <OptimizedProductCard 
                key={product._id}
                product={product}
                index={index}
                priority={index < 4}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-[#fafafa]">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#222] py-10 md:py-14 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-80 h-80 bg-gradient-to-r from-gray-500/5 to-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Title Section */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-white/10 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/50 text-sm font-medium tracking-widest uppercase">Your Cart</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                Shopping Cart
              </h1>
              <p className="text-white/60">
                {totalItems} item{totalItems !== 1 ? 's' : ''} ready for checkout
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-white/50 text-[10px] uppercase tracking-wider">Items</span>
                </div>
                <p className="text-2xl font-bold text-white">{totalItems}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-white/50 text-[10px] uppercase tracking-wider">Total</span>
                </div>
                <p className="text-2xl font-bold text-white">{formatPriceCompact(total)}</p>
              </div>
              {savings > 0 && (
                <div className="hidden md:block bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Percent className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400/70 text-[10px] uppercase tracking-wider">Savings</span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">{formatPriceCompact(savings)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Free Shipping Progress */}
        {amountToFreeShipping > 0 ? (
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/50 rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Truck className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-amber-900">
                    Add {formatPriceCompact(amountToFreeShipping)} more for FREE shipping!
                  </span>
                  <p className="text-xs text-amber-700/70">Free shipping on orders above ₹1,999</p>
                </div>
              </div>
              <Link 
                href="/shop" 
                className="hidden md:flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors"
              >
                Add Items
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-full bg-amber-200/50 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500 relative"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-orange-600 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <span className="text-sm font-semibold text-green-900 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  You&apos;ve unlocked FREE shipping!
                </span>
                <p className="text-xs text-green-700/70">Enjoy free delivery on this order</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "bg-white rounded-2xl shadow-sm border border-[#e5e5e5] p-5 md:p-6 transition-all duration-300",
                  removingItemId === item.id && "opacity-50 scale-95"
                )}
              >
                <div className="flex gap-5 md:gap-6">
                  {/* Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="relative w-28 h-36 md:w-36 md:h-44 bg-[#f5f5f5] flex-shrink-0 rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="144px"
                    />
                    {item.product.badge && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-[#111] text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                        {item.product.badge}
                      </span>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-lg md:text-xl font-semibold hover:text-[#555] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-[#999] mt-1 capitalize">{item.product.category}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="px-3 py-1.5 bg-[#f5f5f5] rounded-lg text-xs font-medium">
                            {item.color.name}
                          </span>
                          <span className="px-3 py-1.5 bg-[#f5f5f5] rounded-lg text-xs font-medium">
                            Size: {item.size}
                          </span>
                          {item.product.stock < 10 && (
                            <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Only {item.product.stock} left
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2.5 h-fit text-[#ccc] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4">
                      {/* Quantity & Actions */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-[#f5f5f5] rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="w-11 h-11 flex items-center justify-center hover:bg-[#e5e5e5] transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 h-11 flex items-center justify-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="w-11 h-11 flex items-center justify-center hover:bg-[#e5e5e5] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => moveToWishlist(item.id)}
                          className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#777] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Heart className="w-4 h-4" />
                          <span className="hidden sm:inline">Save for Later</span>
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xl font-bold">
                          {formatPriceCompact(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-xs text-[#999] mt-0.5">
                            {formatPriceCompact(item.product.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders ₹1,999+', color: 'text-blue-600', bg: 'bg-blue-50' },
                { icon: RefreshCw, label: 'Easy Returns', sub: '7-day policy', color: 'text-purple-600', bg: 'bg-purple-50' },
                { icon: Shield, label: 'Secure Payment', sub: '100% safe', color: 'text-green-600', bg: 'bg-green-50' },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-[#e5e5e5] hover:shadow-md transition-shadow">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", badge.bg)}>
                    <badge.icon className={cn("w-5 h-5", badge.color)} />
                  </div>
                  <span className="text-sm font-semibold">{badge.label}</span>
                  <span className="text-xs text-[#999]">{badge.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg border border-[#e5e5e5] overflow-hidden sticky top-24">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#111] to-[#222] px-6 py-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                {/* Promo Code */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-[#555] mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        disabled={promoApplied}
                        className="w-full h-12 pl-10 pr-4 border border-[#e5e5e5] rounded-xl text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black/5 transition-all disabled:bg-[#f5f5f5]"
                      />
                    </div>
                    <button
                      onClick={applyPromo}
                      disabled={promoApplied || !promoCode}
                      className="px-5 h-12 bg-[#111] text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {promoApplied ? <Check className="w-5 h-5" /> : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="flex items-center gap-2 mt-3 p-3 bg-green-50 rounded-xl">
                      <Gift className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">10% discount applied!</span>
                    </div>
                  )}
                  {!promoApplied && (
                    <p className="text-xs text-[#999] mt-2 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Try: <span className="font-mono font-medium">APOSTLE10</span>
                    </p>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 pb-5 border-b border-[#e5e5e5]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#777]">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">{formatPriceCompact(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5" />
                        Promo Discount
                      </span>
                      <span className="text-green-600 font-medium">-{formatPriceCompact(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#777] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      Shipping
                    </span>
                    <span className={cn("font-medium", shipping === 0 ? 'text-green-600' : '')}>
                      {shipping === 0 ? 'FREE' : formatPriceCompact(shipping)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-5">
                  <div>
                    <span className="text-sm text-[#777]">Total</span>
                    <p className="text-2xl font-bold">{formatPriceCompact(total)}</p>
                  </div>
                  {savings > 0 && (
                    <div className="px-3 py-1.5 bg-green-100 rounded-full">
                      <span className="text-sm font-semibold text-green-700">
                        Save {formatPriceCompact(savings)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <Link 
                  href="/checkout"
                  className="w-full bg-[#111] text-white h-14 text-sm font-bold tracking-wide uppercase hover:bg-black transition-all rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-100"
                >
                  <Lock className="w-4 h-4" />
                  Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Trust */}
                <div className="mt-5 flex items-center justify-center gap-2 text-[#999]">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">SSL encrypted • 100% secure payment</span>
                </div>

                {/* Payment Methods */}
                <div className="mt-5 pt-5 border-t border-[#e5e5e5]">
                  <p className="text-xs text-[#999] text-center mb-3">We accept</p>
                  <div className="flex items-center justify-center gap-3">
                    {[
                      { name: 'Visa', bg: 'bg-blue-600' },
                      { name: 'MC', bg: 'bg-orange-500' },
                      { name: 'UPI', bg: 'bg-green-600' },
                      { name: 'RuPay', bg: 'bg-[#111]' },
                    ].map((method) => (
                      <div 
                        key={method.name} 
                        className={cn("px-3 py-1.5 rounded-lg text-[10px] font-bold text-white", method.bg)}
                      >
                        {method.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Complete Your Look</h2>
              <p className="text-[#777] mt-1">Items that pair well with your cart</p>
            </div>
            <Link 
              href="/shop"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-[#555] hover:text-black transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts.map((product, index) => (
              <OptimizedProductCard 
                key={product._id}
                product={product}
                index={index}
                priority={index < 4}
              />
            ))}
          </div>
        </div>

        {/* Continue Shopping */}}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#111] text-[#111] font-semibold rounded-full hover:bg-[#111] hover:text-white transition-all"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
