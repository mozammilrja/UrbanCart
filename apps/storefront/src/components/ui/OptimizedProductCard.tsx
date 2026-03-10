'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, memo, useCallback, useRef, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart.store';

interface OptimizedProductCardProps {
  product: Product;
  className?: string;
  /** Load first image with priority for LCP */
  priority?: boolean;
  /** Index for staggered animation delay */
  index?: number;
}

/**
 * Premium ProductCard component for luxury fashion ecommerce.
 * Features image carousel, glassmorphism effects, and smooth animations.
 */
function ProductCardComponent({
  product,
  className,
  priority = false,
  index = 0,
}: OptimizedProductCardProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const addItem = useCartStore((state) => state.addItem);
  const productUrl = `/product/${product.slug || product._id}`;
  
  const images = product.images.length > 0 ? product.images : [];
  const hasMultipleImages = images.length > 1;
  
  // Navigate to product - used for card click
  const handleNavigate = useCallback(() => {
    router.push(productUrl);
  }, [router, productUrl]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handlePrevImage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleDotClick = useCallback((e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(idx);
  }, []);

  const handleWishlistClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  }, []);

  const handleColorSelect = useCallback((e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColorIndex(idx);
    
    // Change image based on color selection
    // If color has specific image, use it; otherwise map to image index
    const color = product.colors[idx];
    if (color?.image) {
      // Find image index that matches or just use color index
      const imgIdx = images.findIndex(img => img === color.image);
      setCurrentImageIndex(imgIdx >= 0 ? imgIdx : Math.min(idx, images.length - 1));
    } else if (images.length > 1) {
      // Map color index to image index (cycle through available images)
      setCurrentImageIndex(idx % images.length);
    }
  }, [product.colors, images]);

  const handleSizeSelect = useCallback((e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSizeIndex(idx);
  }, []);

  const handleQuickAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0] || 'One Size';
    const selectedColor = product.colors[selectedColorIndex] || product.colors[0] || { name: 'Default', hex: '#000000' };

    addItem(product, selectedSize, selectedColor, 1);
    setAddedToCart(true);

    timeoutRef.current = setTimeout(() => setAddedToCart(false), 2000);
  }, [product, addItem, selectedSizeIndex, selectedColorIndex]);

  const handleImageError = useCallback((idx: number) => {
    setImageError((prev) => ({ ...prev, [idx]: true }));
  }, []);

  // Placeholder when no image or error
  const renderPlaceholder = () => (
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
      aria-hidden="true"
    >
      <span className="text-neutral-400 text-sm font-medium tracking-widest uppercase">
        {product.category}
      </span>
    </div>
  );

  return (
    <article
      className={cn(
        'group relative flex flex-col cursor-pointer',
        'transition-all duration-500 ease-out',
        className
      )}
      onClick={handleNavigate}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
      style={{
        animationDelay: `${Math.min(index * 60, 300)}ms`,
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl bg-neutral-100 z-10">
        {/* Aspect ratio wrapper */}
        <div className="relative aspect-[3/4]">
          {/* Images */}
          {images.length > 0 ? (
            images.map((src, idx) => (
              <div
                key={idx}
                className={cn(
                  'absolute inset-0 transition-opacity duration-500 ease-out',
                  idx === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                )}
              >
                {imageError[idx] ? (
                  renderPlaceholder()
                ) : (
                  <Image
                    src={src}
                    alt={`${product.name} - Image ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={cn(
                      'object-cover transition-transform duration-700 ease-out',
                      isHovered && 'scale-105'
                    )}
                    priority={priority && idx === 0}
                    onError={() => handleImageError(idx)}
                  />
                )}
              </div>
            ))
          ) : (
            renderPlaceholder()
          )}

          {/* Subtle gradient overlay */}
          <div
            className={cn(
              'absolute inset-0 z-20 pointer-events-none transition-opacity duration-300',
              'bg-gradient-to-t from-black/20 via-transparent to-transparent',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className={cn(
                  'absolute left-2 top-1/2 -translate-y-1/2 z-30',
                  'flex h-9 w-9 items-center justify-center',
                  'rounded-full bg-white/90 backdrop-blur-sm shadow-lg',
                  'text-neutral-700 hover:bg-white hover:scale-105',
                  'transition-all duration-200 ease-out',
                  'opacity-0 group-hover:opacity-100',
                  'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
                )}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleNextImage}
                className={cn(
                  'absolute right-2 top-1/2 -translate-y-1/2 z-30',
                  'flex h-9 w-9 items-center justify-center',
                  'rounded-full bg-white/90 backdrop-blur-sm shadow-lg',
                  'text-neutral-700 hover:bg-white hover:scale-105',
                  'transition-all duration-200 ease-out',
                  'opacity-0 group-hover:opacity-100',
                  'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
                )}
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {hasMultipleImages && (
            <div
              className={cn(
                'absolute bottom-20 left-1/2 -translate-x-1/2 z-40',
                'flex items-center gap-1.5',
                'transition-opacity duration-300',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
              role="tablist"
              aria-label="Image gallery"
            >
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleDotClick(e, idx)}
                  role="tab"
                  aria-selected={idx === currentImageIndex}
                  aria-label={`View image ${idx + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    idx === currentImageIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/60 hover:bg-white/80'
                  )}
                />
              ))}
            </div>
          )}

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-30">
              <span
                className={cn(
                  'inline-block px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-md',
                  product.badge === 'NEW' && 'bg-black text-white',
                  product.badge === 'DROP' && 'bg-black text-white',
                  product.badge === 'LIMITED' && 'bg-amber-500 text-white',
                  product.badge === 'SOLD OUT' && 'bg-neutral-400 text-white'
                )}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist Button - Glassmorphism */}
          <button
            onClick={handleWishlistClick}
            className={cn(
              'absolute top-3 right-3 z-30',
              'flex h-10 w-10 items-center justify-center',
              'rounded-full backdrop-blur-md transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
              isWishlisted
                ? 'bg-red-50 shadow-lg scale-100'
                : 'bg-white/70 shadow-md opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110'
            )}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
          >
            <Heart
              className={cn(
                'h-5 w-5 transition-all duration-200',
                isWishlisted
                  ? 'fill-red-500 stroke-red-500'
                  : 'stroke-neutral-600'
              )}
              strokeWidth={1.5}
            />
          </button>

          {/* Quick Add Overlay */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 z-30 p-3',
              'transition-all duration-300 ease-out',
              isHovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none'
            )}
          >
            <button
              onClick={handleQuickAdd}
              disabled={addedToCart || product.badge === 'SOLD OUT'}
              className={cn(
                'w-full flex items-center justify-center gap-2',
                'px-4 py-2.5 rounded-full',
                'text-sm font-medium tracking-wide',
                'backdrop-blur-md transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
                addedToCart
                  ? 'bg-emerald-500 text-white'
                  : product.badge === 'SOLD OUT'
                  ? 'bg-neutral-400/90 text-white cursor-not-allowed'
                  : 'bg-white/90 text-neutral-900 hover:bg-white shadow-lg hover:shadow-xl'
              )}
            >
              {addedToCart ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={2} />
                  Added to Cart
                </>
              ) : product.badge === 'SOLD OUT' ? (
                'Sold Out'
              ) : (
                <>
                  <Plus className="h-4 w-4" strokeWidth={2} />
                  Quick Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-4 space-y-2">
        {/* Title */}
        <h3 className="text-[15px] font-medium text-neutral-900 leading-snug line-clamp-1 group-hover:text-neutral-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Price Row with Colors & Sizes */}
        <div className="flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-neutral-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-neutral-400 line-through">
                ₹{product.comparePrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Colors & Sizes - Interactive, no navigation */}
          <div className="flex items-center gap-3">
            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="flex items-center gap-2">
                {product.colors.slice(0, 4).map((color, i) => (
                  <button
                    key={i}
                    type="button"
                    className={cn(
                      'relative h-5 w-5 rounded-full cursor-pointer transition-all duration-200 flex-shrink-0',
                      'hover:scale-110 active:scale-95',
                      'focus:outline-none',
                      selectedColorIndex === i 
                        ? 'shadow-[0_0_0_2px_white,0_0_0_4px_#171717]' 
                        : 'shadow-[0_0_0_1px_rgba(0,0,0,0.1)]'
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.name} color`}
                    aria-pressed={selectedColorIndex === i}
                    onClick={(e) => handleColorSelect(e, i)}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] font-medium text-neutral-400 ml-0.5">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Divider */}
            {product.colors.length > 0 && product.sizes.length > 0 && (
              <span className="w-px h-4 bg-neutral-200" />
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="flex items-center gap-1.5">
                {product.sizes.slice(0, 4).map((size, i) => (
                  <button
                    key={i}
                    type="button"
                    className={cn(
                      'min-w-[26px] h-7 text-xs font-semibold px-2 rounded cursor-pointer',
                      'transition-all duration-200',
                      'hover:scale-105 active:scale-95',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900',
                      selectedSizeIndex === i
                        ? 'bg-neutral-900 text-white shadow-md scale-105'
                        : 'text-neutral-600 bg-neutral-100 hover:bg-neutral-200 hover:text-neutral-900'
                    )}
                    aria-label={`Select size ${size}`}
                    aria-pressed={selectedSizeIndex === i}
                    onClick={(e) => handleSizeSelect(e, i)}
                  >
                    {size}
                  </button>
                ))}
                {product.sizes.length > 4 && (
                  <span className="text-[10px] font-medium text-neutral-400 ml-0.5">
                    +{product.sizes.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export const OptimizedProductCard = memo(ProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product._id === nextProps.product._id &&
    prevProps.priority === nextProps.priority &&
    prevProps.index === nextProps.index
  );
});

export default OptimizedProductCard;
