import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Truck, RotateCcw, Shield, Clock } from 'lucide-react';
import { Button, Badge, Card, CardContent } from '@urbancart/ui';

const featuredProducts = [
  {
    id: '1',
    name: 'Urban Oversized Tee',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    badge: 'Bestseller',
  },
  {
    id: '2',
    name: 'Street Drop Hoodie',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    badge: 'New',
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
    badge: 'Limited',
  },
];

const collections = [
  {
    name: 'Summer Drop 2024',
    description: 'Fresh styles for the season',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop',
    href: '/collections/summer-drop-2024',
  },
  {
    name: 'Streetwear Essentials',
    description: 'Core pieces you need',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',
    href: '/collections/essentials',
  },
];

const features = [
  { icon: Truck, title: 'Free Shipping', description: 'On orders above ₹2,999' },
  { icon: RotateCcw, title: 'Easy Returns', description: '15-day return policy' },
  { icon: Shield, title: 'Secure Payments', description: 'UPI, Cards, Wallets' },
  { icon: Clock, title: 'Fast Delivery', description: '2-5 business days' },
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
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-primary">
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&h=1080&fit=crop"
          alt="Hero"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="container relative flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <Badge variant="secondary" className="mb-4">
            New Drop Available
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            DEFINE YOUR
            <br />
            URBAN STYLE
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
            Premium Indian streetwear for the bold and unapologetic. Exclusive drops, limited editions.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/shop">
              <Button size="lg" variant="secondary">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/collections">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                View Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b bg-muted/50">
        <div className="container py-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="mt-2 text-muted-foreground">Our most popular pieces</p>
            </div>
            <Link href="/shop">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <Card className="overflow-hidden border-0 shadow-none">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge className="absolute left-3 top-3" variant="secondary">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="px-0 pt-4">
                    <h3 className="font-medium group-hover:text-accent">{product.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-semibold">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Shop by Collection</h2>
            <p className="mt-2 text-muted-foreground">Curated collections for every vibe</p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {collections.map((collection) => (
              <Link key={collection.name} href={collection.href} className="group">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{collection.name}</h3>
                    <p className="mt-1 text-white/80">{collection.description}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium group-hover:underline">
                      Shop Collection
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Join the Urban Movement</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Be the first to know about exclusive drops, new arrivals, and special offers.
            Join over 50,000+ urbanists who trust UrbanCart.
          </p>
          <div className="mt-8">
            <Link href="/shop">
              <Button size="lg" variant="secondary">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
