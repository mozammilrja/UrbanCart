'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@urbancart/ui';
import { useCartStore, type CartItem } from '@urbancart/hooks';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react';
import {
  Section,
  Container,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn, StaggerReveal } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { MagneticButton } from '@/components/motion/magnetic-button';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

// Mock cart items for design preview
const mockCartItems: CartItem[] = [
  {
    id: 'mock-1',
    productId: 'prod-1',
    variantId: 'var-1',
    name: 'Urban Oversized Tee',
    price: 1999,
    quantity: 2,
    size: 'M',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop',
  },
  {
    id: 'mock-2',
    productId: 'prod-2',
    variantId: 'var-2',
    name: 'Street Drop Hoodie',
    price: 3499,
    quantity: 1,
    size: 'L',
    color: 'Navy',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=250&fit=crop',
  },
  {
    id: 'mock-3',
    productId: 'prod-3',
    variantId: 'var-3',
    name: 'Limited Edition Cap',
    price: 999,
    quantity: 1,
    size: 'One Size',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=250&fit=crop',
  },
];

function CartItemCard({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex gap-6 border-b border-white/10 py-6">
      {/* Image */}
      <Link 
        href={`/product/${item.productId}`}
        className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-neutral-900"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="96px"
        />
      </Link>
      
      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link 
            href={`/product/${item.productId}`}
            className="text-lg font-light text-white hover:text-white/80"
          >
            {item.name}
          </Link>
          <p className="mt-1 text-sm text-white/50">
            {item.color} / {item.size}
          </p>
        </div>
        
        <div className="flex items-end justify-between">
          {/* Quantity */}
          <div className="flex items-center border border-white/20">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="flex h-8 w-8 items-center justify-center text-white/60 transition-colors hover:text-white"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex h-8 w-10 items-center justify-center text-sm text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-white/60 transition-colors hover:text-white"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          
          {/* Price */}
          <p className="text-lg font-light text-white">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
      
      {/* Remove button */}
      <button
        onClick={() => onRemove(item.id)}
        className="self-start p-2 text-white/40 transition-colors hover:text-red-400"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Use mock items if cart is empty (for design preview)
  const displayItems = isHydrated && items.length === 0 ? mockCartItems : items;
  const isUsingMockData = isHydrated && items.length === 0;
  
  const subtotal = displayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discount + shipping;
  
  const handleApplyCoupon = () => {
    // Mock coupon logic
    if (couponCode.toUpperCase() === 'URBAN20') {
      setAppliedCoupon('URBAN20');
      setDiscount(Math.round(subtotal * 0.2));
    } else if (couponCode.toUpperCase() === 'FIRST10') {
      setAppliedCoupon('FIRST10');
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };
  
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode('');
  };
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (!isUsingMockData) {
      updateQuantity(id, quantity);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    if (!isUsingMockData) {
      removeItem(id);
    }
  };

  // Empty cart state
  if (isHydrated && items.length === 0 && !isUsingMockData) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black">
          <GrainOverlay opacity={0.03} />
          
          <Section className="flex min-h-[70vh] items-center justify-center">
            <Container>
              <FadeIn>
                <div className="mx-auto max-w-md text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
                    <ShoppingBag className="h-10 w-10 text-white/40" />
                  </div>
                  <h1 className="mt-8 text-3xl font-light text-white">Your cart is empty</h1>
                  <p className="mt-4 text-white/60">
                    Looks like you haven't added anything yet. Start shopping to fill it up.
                  </p>
                  <MagneticButton strength={0.3} className="mt-8">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-neutral-200"
                    >
                      Start Shopping
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </MagneticButton>
                </div>
              </FadeIn>
            </Container>
          </Section>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        {/* Page Header */}
        <Section className="pt-32 pb-8">
          <Container>
            <FadeIn>
              <div className="text-center">
                <h1 className="text-4xl font-extralight tracking-tight text-white md:text-5xl">
                  Shopping Cart
                </h1>
                <p className="mt-4 text-white/50">
                  {displayItems.length} {displayItems.length === 1 ? 'item' : 'items'}
                </p>
                {isUsingMockData && (
                  <p className="mt-2 text-xs text-yellow-500/70">
                    Preview mode - add items to see your real cart
                  </p>
                )}
              </div>
            </FadeIn>
          </Container>
        </Section>
        
        {/* Cart Content */}
        <Section className="py-8">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
              {/* Cart Items */}
              <div>
                <FadeIn>
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="text-sm font-medium uppercase tracking-wider text-white/50">
                      Products
                    </h2>
                    {!isUsingMockData && (
                      <button
                        onClick={clearCart}
                        className="text-sm text-white/40 hover:text-red-400"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  
                  <StaggerReveal stagger={0.05}>
                    <div>
                      {displayItems.map((item) => (
                        <CartItemCard
                          key={item.id}
                          item={item}
                          onUpdateQuantity={handleUpdateQuantity}
                          onRemove={handleRemoveItem}
                        />
                      ))}
                    </div>
                  </StaggerReveal>
                </FadeIn>
                
                {/* Continue Shopping */}
                <FadeIn delay={0.2}>
                  <Link
                    href="/shop"
                    className="mt-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </FadeIn>
              </div>
              
              {/* Order Summary */}
              <div>
                <FadeIn delay={0.1}>
                  <div className="sticky top-32 border border-white/10 bg-neutral-950 p-8">
                    <h2 className="text-lg font-medium text-white">Order Summary</h2>
                    
                    {/* Coupon */}
                    <div className="mt-6 border-b border-white/10 pb-6">
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between bg-green-500/10 px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-green-400" />
                            <span className="text-sm font-medium text-green-400">
                              {appliedCoupon}
                            </span>
                            <span className="text-sm text-green-400/70">
                              (-{formatPrice(discount)})
                            </span>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-green-400/70 hover:text-green-400"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Coupon code"
                            className="flex-1 border border-white/20 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white"
                          >
                            Apply
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Totals */}
                    <div className="mt-6 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Subtotal</span>
                        <span className="text-white">{formatPrice(subtotal)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-green-400">Discount</span>
                          <span className="text-green-400">-{formatPrice(discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-white/50">Shipping</span>
                        <span className="text-white">
                          {shipping === 0 ? 'Free' : formatPrice(shipping)}
                        </span>
                      </div>
                      {shipping > 0 && (
                        <p className="text-xs text-white/40">
                          Free shipping on orders above ₹999
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between border-t border-white/10 pt-6">
                      <span className="text-lg font-medium text-white">Total</span>
                      <span className="text-2xl font-light text-white">{formatPrice(total)}</span>
                    </div>
                    
                    {/* Checkout Button */}
                    <MagneticButton strength={0.3} className="mt-8 w-full">
                      <Link
                        href="/checkout"
                        className="flex w-full items-center justify-center gap-3 bg-white py-4 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-neutral-200"
                      >
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </MagneticButton>
                    
                    {/* Trust badges */}
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] uppercase tracking-wider text-white/30">
                      <span>Secure Checkout</span>
                      <span>•</span>
                      <span>UPI & Cards</span>
                      <span>•</span>
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
}
