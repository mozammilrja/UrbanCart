'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import {
  Button,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  Card,
  CardContent,
} from '@urbancart/ui';
import {
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

// Mock product data
const product = {
  id: '1',
  name: 'Urban Oversized Tee',
  price: 1999,
  originalPrice: 2499,
  description:
    'Premium cotton oversized tee designed for the urban trendsetter. Features a relaxed fit with dropped shoulders and a subtle UrbanCart logo on the chest. Perfect for layering or wearing solo.',
  images: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Grey', value: '#6B7280' },
  ],
  category: 'T-Shirts',
  badge: 'Bestseller',
  material: '100% Premium Cotton',
  fit: 'Oversized',
  care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Iron on low heat'],
  reviews: {
    average: 4.8,
    count: 124,
  },
};

const relatedProducts = [
  {
    id: '2',
    name: 'Street Drop Hoodie',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
  },
  {
    id: '3',
    name: 'Classic Cargo Pants',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
  },
  {
    id: '4',
    name: 'Limited Edition Cap',
    price: 999,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop',
  },
  {
    id: '5',
    name: 'Graphic Print Tee',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.badge && (
              <Badge className="absolute left-4 top-4" variant="secondary">
                {product.badge}
              </Badge>
            )}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((i) => (i === 0 ? product.images.length - 1 : i - 1))}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((i) => (i === product.images.length - 1 ? 0 : i + 1))}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                  currentImageIndex === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.reviews.average)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.reviews.average} ({product.reviews.count} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <Badge variant="destructive">{discount}% OFF</Badge>
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <Separator />

          {/* Color selection */}
          <div>
            <h3 className="mb-3 font-medium">
              Color: <span className="font-normal">{selectedColor.name}</span>
            </h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    selectedColor.name === color.name ? 'border-primary' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-medium">Size</h3>
              <button className="text-sm text-muted-foreground underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-10 w-12 items-center justify-center rounded border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="mb-3 font-medium">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button size="lg" className="flex-1" disabled={!selectedSize}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Free Shipping</p>
                <p className="text-muted-foreground">Above ₹2,999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Easy Returns</p>
                <p className="text-muted-foreground">15 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Secure Payment</p>
                <p className="text-muted-foreground">All methods</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.count})</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-medium">Material</h4>
                <p className="text-muted-foreground">{product.material}</p>
              </div>
              <div>
                <h4 className="font-medium">Fit</h4>
                <p className="text-muted-foreground">{product.fit}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="care" className="mt-6">
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              {product.care.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <p className="text-muted-foreground">Customer reviews coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`} className="group">
              <Card className="overflow-hidden border-0 shadow-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="px-0 pt-4">
                  <h3 className="font-medium group-hover:text-accent">{item.name}</h3>
                  <p className="font-semibold">{formatPrice(item.price)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
