'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useCartStore, useWishlistStore } from '@urbancart/hooks';
import { cn } from '@urbancart/ui';
import type { Product, ProductImage, ProductVariant } from '@urbancart/types';
import { productService } from '@/services/product.service';
import { ProductCard } from '@/components/ui/product-card';

// Helper to extract category string from Category object or string
const getCategoryString = (category: unknown): string => {
  if (typeof category === 'string') return category;
  if (category && typeof category === 'object' && 'slug' in category) {
    return (category as { slug: string }).slug;
  }
  if (category && typeof category === 'object' && 'name' in category) {
    return (category as { name: string }).name.toLowerCase();
  }
  return 'all';
};

const getCategoryName = (category: unknown): string => {
  if (typeof category === 'string') return category;
  if (category && typeof category === 'object' && 'name' in category) {
    return (category as { name: string }).name;
  }
  return 'Category';
};

// Helper to extract image URLs from Product
const getImageUrls = (product: Product): string[] => {
  if (!product.images || product.images.length === 0) {
    return ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop'];
  }
  // Handle both string[] and ProductImage[] formats
  return product.images.map((img: string | ProductImage) => 
    typeof img === 'string' ? img : img.url
  );
};

// Helper to extract unique sizes from variants
const getSizes = (product: Product): string[] => {
  if (!product.variants || product.variants.length === 0) {
    return ['S', 'M', 'L', 'XL']; // Default sizes
  }
  const sizeList = product.variants
    .map((v: ProductVariant) => v.size)
    .filter((s): s is string => !!s);
  return Array.from(new Set(sizeList));
};

// Helper to extract unique colors from variants
const getColors = (product: Product): Array<{ name: string; hex: string }> => {
  if (!product.variants || product.variants.length === 0) {
    return [{ name: 'Black', hex: '#000000' }]; // Default color
  }
  const colorMap = new Map<string, string>();
  product.variants.forEach((v: ProductVariant) => {
    if (v.color && v.colorCode) {
      colorMap.set(v.color, v.colorCode);
    }
  });
  return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
};

// Helper to get stock/inventory
const getStock = (product: Product): number => {
  if (product.inventory?.quantity !== undefined) {
    return product.inventory.quantity;
  }
  if (product.variants && product.variants.length > 0) {
    return product.variants.reduce((sum: number, v: ProductVariant) => sum + (v.inventory || 0), 0);
  }
  return 100; // Default stock
};

// Helper to get compare price
const getComparePrice = (product: Product): number | undefined => {
  return product.compareAtPrice;
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore();
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await productService.getBySlug(slug);
        if (!productData) {
          setLoading(false);
          return;
        }
        setProduct(productData);
        
        // Fetch related products
        const related = await productService.getAll({ 
          category: getCategoryString(productData.category), 
          limit: 5 
        });
        setRelatedProducts(
          related.data
            .filter(p => p.id !== productData.id)
            .slice(0, 4)
        );
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);
  
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }
  
  if (!product) {
    notFound();
  }
  
  // Computed values using helper functions
  const images = getImageUrls(product);
  const sizes = getSizes(product);
  const colors = getColors(product);
  const stock = getStock(product);
  const comparePrice = getComparePrice(product);
  
  const isInWishlist = wishlistItems.some(item => item.productId === product.id);
  const discount = comparePrice 
    ? Math.round(((comparePrice - product.price) / comparePrice) * 100) 
    : 0;
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addItem({
      productId: product.id,
      variantId: `${product.id}-${selectedSize}-${selectedColor || colors[0]?.name || 'default'}`,
      name: product.name,
      price: product.price,
      image: images[0],
      quantity,
      size: selectedSize,
      color: selectedColor || colors[0]?.name || 'default',
    });
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: images[0],
      });
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Breadcrumb */}
      <nav className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <ol className="flex items-center gap-2 text-sm text-white/50">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
            <li>/</li>
            <li><Link href={`/collections/${getCategoryString(product.category)}`} className="hover:text-white transition-colors capitalize">{getCategoryName(product.category)}</Link></li>
            <li>/</li>
            <li className="text-white">{product.name}</li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden group">
              <Image
                src={images[selectedImage] || images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-wider">
                    New
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                    -{discount}%
                  </span>
                )}
              </div>
              
              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill={isInWishlist ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all',
                      selectedImage === index 
                        ? 'border-white' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <p className="text-sm text-white/50 uppercase tracking-[0.2em]">
                {getCategoryName(product.category)}
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight">
                {product.name}
              </h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          'w-4 h-4',
                          i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-white/20'
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-white/50">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}
              
              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-light">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {comparePrice && (
                  <span className="text-xl text-white/40 line-through">
                    ₹{comparePrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {colors && colors.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-wider">
                  Color: <span className="text-white/70 normal-case">{selectedColor || colors[0]?.name}</span>
                </p>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all',
                        selectedColor === color.name || (!selectedColor && color.name === colors[0]?.name)
                          ? 'border-white scale-110'
                          : 'border-white/20 hover:border-white/50'
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium uppercase tracking-wider">
                  Size: <span className="text-white/70 normal-case">{selectedSize || 'Select size'}</span>
                </p>
                <button className="text-sm text-white/50 underline hover:text-white transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'w-14 h-12 border text-sm font-medium uppercase transition-all',
                      selectedSize === size
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 hover:border-white'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-wider">Quantity</p>
              <div className="flex items-center border border-white/20 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className={cn(
                  'flex-1 py-4 px-8 text-sm font-bold uppercase tracking-[0.2em] transition-all',
                  stock === 0
                    ? 'bg-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-white/90'
                )}
              >
                {stock === 0 ? 'Sold Out' : 'Add to Cart'}
              </button>
              
              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className={cn(
                  'py-4 px-8 text-sm font-bold uppercase tracking-[0.2em] border border-white transition-all',
                  stock === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-white hover:text-black'
                )}
              >
                Buy Now
              </button>
            </div>

            {/* Stock Status */}
            {stock > 0 && stock <= 5 && (
              <p className="text-amber-500 text-sm">
                Only {stock} left in stock - order soon!
              </p>
            )}

            {/* Features */}
            <div className="border-t border-white/10 pt-8 space-y-4">
              <div className="flex items-center gap-4 text-sm text-white/70">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free shipping on orders above ₹1,999</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Easy 30-day returns and exchanges</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% authentic products</span>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="border-t border-white/10 pt-8">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/shop?tag=${tag}`}
                      className="px-4 py-2 border border-white/20 text-xs uppercase tracking-wider text-white/70 hover:border-white hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light tracking-tight">You May Also Like</h2>
              <Link 
                href={`/collections/${getCategoryString(product.category)}`}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p as any} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
