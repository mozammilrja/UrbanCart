'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, Check, ChevronRight } from 'lucide-react';
import { products, getProductBySlug } from '@/data/mock';
import { formatPriceCompact, cn } from '@/lib/utils';
import { ProductGridSection } from '@/components/sections';

interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }: { product: NonNullable<ReturnType<typeof getProductBySlug>> }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const relatedProducts = products.filter(
    (p) => p.categorySlug === product.categorySlug && p._id !== product._id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Show size selection required
      return;
    }
    // Add to cart logic
    console.log('Add to cart:', { product, selectedSize, selectedColor, quantity });
  };

  return (
    <div className="pt-16 md:pt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#777] mb-8">
          <Link href="/" className="hover:text-[#111] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/collections" className="hover:text-[#111] transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href={`/collections/${product.categorySlug}`} 
            className="hover:text-[#111] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#111]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-medium tracking-widest uppercase px-3 py-1.5">
                  {product.badge}
                </span>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-24 flex-shrink-0 bg-[#f5f5f5] overflow-hidden transition-all',
                      selectedImage === index 
                        ? 'ring-2 ring-black' 
                        : 'ring-1 ring-transparent hover:ring-[#e5e5e5]'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4">
            <div className="sticky top-24">
              {/* Title & Price */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-light tracking-tight text-[#111] mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-medium text-[#111]">
                    {formatPriceCompact(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-base text-[#999] line-through">
                      {formatPriceCompact(product.comparePrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-[#777] leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium tracking-widest uppercase">Color</span>
                    <span className="text-sm text-[#777]">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          'w-8 h-8 rounded-full border-2 transition-all',
                          selectedColor === color.name 
                            ? 'border-[#111] scale-110' 
                            : 'border-[#e5e5e5] hover:border-[#999]'
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium tracking-widest uppercase">Size</span>
                  <button className="text-xs text-[#777] underline hover:text-[#111] transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-[48px] h-12 px-4 border text-sm font-medium transition-all',
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-[#111] border-[#e5e5e5] hover:border-[#111]'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-[#777] mt-2">Please select a size</p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <span className="text-xs font-medium tracking-widest uppercase block mb-3">Quantity</span>
                <div className="flex items-center border border-[#e5e5e5] w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-[#f5f5f5] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className={cn(
                    'flex-1 h-14 text-sm font-medium tracking-widest uppercase transition-all',
                    selectedSize
                      ? 'bg-black text-white hover:bg-black/90'
                      : 'bg-[#e5e5e5] text-[#999] cursor-not-allowed'
                  )}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-14 h-14 border border-[#e5e5e5] flex items-center justify-center hover:border-[#111] transition-colors"
                >
                  <Heart
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isWishlisted ? 'fill-black stroke-black' : 'stroke-[#111]'
                    )}
                  />
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-[#e5e5e5] pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Free shipping on orders above ₹1,999</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Easy 7-day returns & exchanges</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>100% authentic products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductGridSection
          title="You May Also Like"
          products={relatedProducts}
          columns={4}
          viewAllHref={`/collections/${product.categorySlug}`}
          bgColor="gray"
        />
      )}
    </div>
  );
}
