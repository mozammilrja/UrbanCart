'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@urbancart/ui';
import { useWishlistStore, useCartStore, type WishlistItem, type CartItem } from '@urbancart/hooks';
import {
  Heart,
  ShoppingCart,
  Trash2,
  X,
  Share2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  Section,
  Container,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn, StaggerReveal } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { MagneticButton } from '@/components/motion/magnetic-button';

// Mock wishlist items for preview when empty
const mockWishlistItems: (WishlistItem & { originalPrice?: number; inStock: boolean; category: string })[] = [
  {
    id: 'mock-1',
    productId: 'prod-1',
    name: 'Urban Oversized Tee',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    addedAt: new Date().toISOString(),
    inStock: true,
    category: 'Tees',
  },
  {
    id: 'mock-2',
    productId: 'prod-2',
    name: 'Street Drop Hoodie',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
    addedAt: new Date().toISOString(),
    inStock: true,
    category: 'Hoodies',
  },
  {
    id: 'mock-3',
    productId: 'prod-3',
    name: 'Classic Cargo Pants',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop',
    addedAt: new Date().toISOString(),
    inStock: false,
    category: 'Pants',
  },
  {
    id: 'mock-4',
    productId: 'prod-4',
    name: 'Limited Edition Cap',
    price: 999,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop',
    addedAt: new Date().toISOString(),
    inStock: true,
    category: 'Accessories',
  },
  {
    id: 'mock-5',
    productId: 'prod-5',
    name: 'Graphic Print Tee',
    price: 1499,
    originalPrice: 1999,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop',
    addedAt: new Date().toISOString(),
    inStock: true,
    category: 'Tees',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

interface WishlistItemWithExtras extends WishlistItem {
  originalPrice?: number;
  inStock: boolean;
  category: string;
}

function WishlistCard({
  item,
  onRemove,
  onAddToCart,
}: {
  item: WishlistItemWithExtras;
  onRemove: (productId: string) => void;
  onAddToCart: (item: WishlistItemWithExtras) => void;
}) {
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL'];
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const discountPercent = hasDiscount && item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative">
      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.productId)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-black/60 text-white/60 opacity-0 backdrop-blur-sm transition-all hover:text-white group-hover:opacity-100"
        aria-label="Remove from wishlist"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Image */}
      <Link href={`/product/${item.productId}`} className="block">
        <div className={cn(
          'relative aspect-[3/4] overflow-hidden bg-neutral-900',
          !item.inStock && 'opacity-60'
        )}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Overlays */}
          {!item.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="border border-white/50 bg-black/80 px-4 py-2 text-xs uppercase tracking-widest text-white">
                Out of Stock
              </span>
            </div>
          )}
          
          {hasDiscount && item.inStock && (
            <div className="absolute left-0 top-4 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-black">
              {discountPercent}% Off
            </div>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <span className="translate-y-4 border border-white px-6 py-2 text-xs uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Quick View
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/40">
            {item.category}
          </p>
          <Link
            href={`/product/${item.productId}`}
            className="mt-1 block text-sm text-white transition-colors hover:text-white/80"
          >
            {item.name}
          </Link>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-white">{formatPrice(item.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-white/40 line-through">
              {formatPrice(item.originalPrice!)}
            </span>
          )}
        </div>

        {/* Size Selection & Add to Cart */}
        {item.inStock ? (
          <div className="space-y-3">
            <div className="flex gap-1">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center border text-xs transition-colors',
                    selectedSize === size
                      ? 'border-white bg-white text-black'
                      : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={() => onAddToCart(item)}
              className="flex w-full items-center justify-center gap-2 border border-white bg-transparent px-4 py-2.5 text-xs uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              <ShoppingCart className="h-3 w-3" />
              Add to Cart
            </button>
          </div>
        ) : (
          <button
            className="flex w-full items-center justify-center gap-2 border border-white/20 bg-transparent px-4 py-2.5 text-xs uppercase tracking-widest text-white/40"
          >
            Notify When Available
          </button>
        )}
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { items: wishlistItems, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [filter, setFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Use mock data if wishlist is empty or not hydrated
  const displayItems: WishlistItemWithExtras[] = isHydrated && wishlistItems.length > 0
    ? wishlistItems.map(item => ({
        ...item,
        inStock: true, // Assume in stock for real items
        category: 'Streetwear',
      }))
    : mockWishlistItems;

  // Filter items
  const filteredItems = displayItems.filter((item) => {
    if (filter === 'inStock') return item.inStock;
    if (filter === 'outOfStock') return !item.inStock;
    return true;
  });

  const inStockCount = displayItems.filter(i => i.inStock).length;
  const outOfStockCount = displayItems.filter(i => !i.inStock).length;

  const handleRemove = (productId: string) => {
    if (isHydrated && wishlistItems.length > 0) {
      removeItem(productId);
      showToastMessage('Item removed from wishlist');
    }
  };

  const handleAddToCart = (item: WishlistItemWithExtras) => {
    const cartItem: Omit<CartItem, 'id'> = {
      productId: item.productId,
      variantId: `${item.productId}-var`,
      name: item.name,
      price: item.price,
      quantity: 1,
      size: 'M',
      color: 'Default',
      image: item.image,
    };
    addToCart(cartItem);
    showToastMessage('Added to cart');
  };

  const handleClearAll = () => {
    if (isHydrated && wishlistItems.length > 0) {
      clearWishlist();
      showToastMessage('Wishlist cleared');
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Empty state
  if (isHydrated && wishlistItems.length === 0 && !mockWishlistItems.length) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black">
          <GrainOverlay opacity={0.03} />
          
          <Section className="flex min-h-screen items-center justify-center pt-32">
            <Container>
              <FadeIn>
                <div className="mx-auto max-w-lg text-center">
                  <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/10">
                    <Heart className="h-12 w-12 text-white/30" />
                  </div>
                  <h1 className="text-3xl font-extralight tracking-tight text-white">
                    Your wishlist is <span className="font-medium">empty</span>
                  </h1>
                  <p className="mt-4 text-white/50">
                    Save items you love to your wishlist and shop them later.
                  </p>
                  <MagneticButton className="mt-8 inline-block">
                    <Link
                      href="/shop"
                      className="group inline-flex items-center gap-3 border border-white bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-white"
                    >
                      Explore Products
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
        
        {/* Toast */}
        <div
          className={cn(
            'fixed bottom-8 left-1/2 z-50 -translate-x-1/2 border border-white/20 bg-black px-6 py-3 text-sm text-white transition-all duration-300',
            showToast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
          )}
        >
          {toastMessage}
        </div>

        {/* Page Header */}
        <Section className="pt-32 pb-8">
          <Container>
            <FadeIn>
              {/* Breadcrumb */}
              <nav className="mb-8 text-sm">
                <Link href="/" className="text-white/40 transition-colors hover:text-white">
                  Home
                </Link>
                <span className="mx-3 text-white/20">/</span>
                <Link href="/account" className="text-white/40 transition-colors hover:text-white">
                  My Account
                </Link>
                <span className="mx-3 text-white/20">/</span>
                <span className="text-white">Wishlist</span>
              </nav>
              
              {/* Title & Actions */}
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Saved Items
                  </p>
                  <h1 className="mt-2 text-3xl font-extralight tracking-tight text-white md:text-4xl lg:text-5xl">
                    My <span className="font-medium">Wishlist</span>
                  </h1>
                  <p className="mt-2 text-white/50">
                    {displayItems.length} {displayItems.length === 1 ? 'item' : 'items'} saved
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button
                    className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:border-white/40 hover:text-white"
                  >
                    <Share2 className="h-3 w-3" />
                    Share
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-2 border border-white/20 px-4 py-2 text-xs uppercase tracking-widest text-white/60 transition-colors hover:border-red-500/50 hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear All
                  </button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Filters */}
        <Section className="py-0">
          <Container>
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-4 border-y border-white/10 py-4">
                <Filter className="h-4 w-4 text-white/40" />
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={cn(
                      'px-4 py-2 text-xs uppercase tracking-widest transition-colors',
                      filter === 'all'
                        ? 'bg-white text-black'
                        : 'border border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                    )}
                  >
                    All ({displayItems.length})
                  </button>
                  <button
                    onClick={() => setFilter('inStock')}
                    className={cn(
                      'px-4 py-2 text-xs uppercase tracking-widest transition-colors',
                      filter === 'inStock'
                        ? 'bg-white text-black'
                        : 'border border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                    )}
                  >
                    In Stock ({inStockCount})
                  </button>
                  <button
                    onClick={() => setFilter('outOfStock')}
                    className={cn(
                      'px-4 py-2 text-xs uppercase tracking-widest transition-colors',
                      filter === 'outOfStock'
                        ? 'bg-white text-black'
                        : 'border border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                    )}
                  >
                    Out of Stock ({outOfStockCount})
                  </button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>

        {/* Wishlist Grid */}
        <Section>
          <Container>
            <StaggerReveal stagger={0.05}>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {filteredItems.map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </StaggerReveal>

            {/* Empty Filter State */}
            {filteredItems.length === 0 && (
              <FadeIn>
                <div className="py-16 text-center">
                  <p className="text-white/50">
                    No items match this filter.
                  </p>
                  <button
                    onClick={() => setFilter('all')}
                    className="mt-4 text-sm text-white/70 underline hover:text-white"
                  >
                    Show all items
                  </button>
                </div>
              </FadeIn>
            )}
          </Container>
        </Section>

        {/* Continue Shopping CTA */}
        <Section className="border-t border-white/10">
          <Container>
            <FadeIn>
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="text-lg font-light text-white">Looking for more?</h3>
                  <p className="mt-1 text-white/50">
                    Explore our latest drops and collections.
                  </p>
                </div>
                <MagneticButton>
                  <Link
                    href="/shop"
                    className="group inline-flex items-center gap-3 border border-white bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Continue Shopping
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
