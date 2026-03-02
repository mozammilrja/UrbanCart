import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Truck, RotateCcw, Shield, Heart, Star, Sparkles } from 'lucide-react';
import { Button, Badge } from '@urbancart/ui';

const featuredProducts = [
  {
    id: '1',
    name: 'Urban Oversized Tee',
    brand: 'UrbanCart',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Street Drop Hoodie',
    brand: 'UrbanCart',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    badge: 'New Drop',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Classic Cargo Pants',
    brand: 'UrbanCart',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 56,
  },
  {
    id: '4',
    name: 'Limited Edition Cap',
    brand: 'UrbanCart',
    price: 999,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop',
    badge: 'Limited',
    rating: 4.6,
    reviews: 34,
  },
];

const categories = [
  {
    name: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
    href: '/shop?category=hoodies',
    count: 24,
  },
  {
    name: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
    href: '/shop?category=tshirts',
    count: 48,
  },
  {
    name: 'Jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
    href: '/shop?category=jackets',
    count: 18,
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop',
    href: '/shop?category=accessories',
    count: 32,
  },
];

const collections = [
  {
    name: 'Winter Collection \'26',
    description: 'Bold layers for the cold',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop&q=80',
    href: '/collections/winter-2026',
  },
  {
    name: 'Streetwear Essentials',
    description: 'Core pieces you need',
    image: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800&h=600&fit=crop&q=80',
    href: '/collections/essentials',
  },
  {
    name: 'Limited Drops',
    description: 'Exclusive limited edition pieces',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&q=80',
    href: '/collections/limited',
  },
];

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'Orders above ₹999' },
  { icon: RotateCcw, title: 'Easy Returns', description: '30-day policy' },
  { icon: Shield, title: 'Secure Payments', description: 'UPI, Cards, Wallets' },
  { icon: Sparkles, title: 'Premium Quality', description: 'Crafted in India' },
];

const announcements = [
  'FREE SHIPPING ON ₹999+',
  'NEW DROP EVERY FRIDAY',
  'PREMIUM QUALITY GUARANTEED',
  'USE CODE URBAN20 FOR 20% OFF',
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section - Bold Typography */}
      <section className="relative min-h-[70vh] overflow-hidden bg-neutral-900 sm:min-h-[80vh]">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&q=80"
          alt="Urban streetwear boutique"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/20 to-neutral-900/80" />
        
        <div className="container relative flex h-full min-h-[70vh] flex-col items-center justify-center py-16 text-center sm:min-h-[80vh] sm:py-20">
          <Badge className="mb-4 border-brand-accent/50 bg-brand-accent/10 px-3 py-1 text-brand-accent hover:bg-brand-accent/20 sm:mb-6">
            <Sparkles className="mr-1.5 h-3 w-3" />
            New Drop Available
          </Badge>
          
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            STREETWEAR
            <br />
            <span className="text-brand-accent">REDEFINED</span>
          </h1>
          
          <p className="mx-auto mt-4 max-w-lg text-sm text-neutral-300 sm:mt-6 sm:max-w-2xl sm:text-base lg:text-lg">
            Premium Indian streetwear for the culture-forward generation.
            <span className="hidden sm:inline"> Exclusive drops. Limited editions. Unapologetic style.</span>
          </p>
          
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link href="/shop">
              <Button size="lg" className="h-12 min-w-[160px] bg-brand-accent font-semibold text-white hover:bg-brand-accent-dark sm:h-14 sm:min-w-[200px] sm:text-lg">
                Shop the Drop
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Link href="/collections">
              <Button size="lg" variant="outline" className="h-12 min-w-[160px] border-white/30 bg-transparent text-white hover:bg-white/10 sm:h-14 sm:min-w-[200px] sm:text-lg">
                Explore Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcement Marquee */}
      <section className="overflow-hidden border-y border-neutral-800 bg-neutral-900 py-2.5 sm:py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...announcements, ...announcements, ...announcements].map((text, i) => (
            <span key={i} className="mx-4 text-xs font-medium tracking-wide text-white sm:mx-8 sm:text-sm">
              {text}
              <span className="mx-4 text-brand-accent sm:mx-8">•</span>
            </span>
          ))}

        </div>
      </section>

      {/* Brand Values / Features */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="container py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-white sm:h-12 sm:w-12 lg:h-14 lg:w-14 lg:rounded-2xl">
                  <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-neutral-900 sm:text-sm">{feature.title}</h3>
                  <p className="text-[10px] text-neutral-500 sm:text-xs lg:text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Latest Drop</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-neutral-900 sm:text-4xl">Featured Products</h2>
            </div>
            <Link href="/shop" className="group hidden items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-brand-accent sm:flex">
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="overflow-hidden rounded-xl bg-white transition-shadow duration-300 hover:shadow-elevation-3 lg:rounded-2xl">
                  <div className="relative aspect-square overflow-hidden bg-neutral-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge className="absolute left-2 top-2 bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-neutral-800 sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
                        {product.badge}
                      </Badge>
                    )}
                    <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-500 opacity-0 shadow-md transition-all duration-300 hover:text-red-500 group-hover:opacity-100 sm:right-3 sm:top-3 sm:h-10 sm:w-10">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                  <div className="p-3 sm:p-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 sm:text-xs">{product.brand}</p>
                    <h3 className="mt-1 line-clamp-1 text-sm font-medium text-neutral-900 transition-colors group-hover:text-brand-accent sm:text-base">{product.name}</h3>
                    <div className="mt-1.5 flex items-center gap-1 sm:mt-2">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-3.5 sm:w-3.5" />
                      <span className="text-xs font-medium text-neutral-700 sm:text-sm">{product.rating}</span>
                      <span className="text-xs text-neutral-400 sm:text-sm">({product.reviews})</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2 sm:mt-3">
                      <span className="text-base font-bold text-neutral-900 sm:text-lg">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through sm:text-sm">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop">
              <Button variant="outline" className="border-neutral-900 font-semibold text-neutral-900">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-neutral-100 py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">Categories</span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-neutral-900 sm:text-4xl">Shop by Style</h2>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <h3 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">{category.name}</h3>
                    <p className="mt-0.5 text-xs text-white/70 sm:text-sm">{category.count} Products</p>
                    <span className="mt-2 inline-flex items-center text-xs font-medium text-white group-hover:underline sm:mt-3 sm:text-sm">
                      Shop Now
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:ml-2 sm:h-4 sm:w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Banner */}
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container">
          <Link href={collections[0].href} className="group block">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-200 sm:aspect-[21/9] sm:rounded-2xl lg:rounded-3xl">
              <Image
                src={collections[0].image}
                alt={collections[0].name}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-4 sm:px-8 lg:px-12">
                  <Badge className="bg-brand-accent/20 text-brand-accent">Featured Collection</Badge>
                  <h2 className="mt-3 font-heading text-2xl font-bold text-white sm:mt-4 sm:text-4xl lg:text-5xl">{collections[0].name}</h2>
                  <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base lg:text-lg">{collections[0].description}</p>
                  <Button className="mt-4 bg-white text-neutral-900 hover:bg-neutral-100 sm:mt-6" size="lg">
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Two Column Collections */}
      <section className="pb-8 sm:pb-10 lg:pb-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {collections.slice(1, 3).map((collection) => (
              <Link key={collection.name} href={collection.href} className="group">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-neutral-200 sm:rounded-2xl">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6">
                    <h3 className="text-lg font-bold sm:text-xl lg:text-2xl">{collection.name}</h3>
                    <p className="mt-1 text-xs text-white/80 sm:text-sm">{collection.description}</p>
                    <span className="mt-2 inline-flex items-center text-xs font-medium group-hover:underline sm:mt-3 sm:text-sm">
                      Shop Collection
                      <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
