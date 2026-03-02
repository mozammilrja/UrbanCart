'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Badge, Card, CardContent } from '@urbancart/ui';
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react';

const initialWishlist = [
  {
    id: '1',
    name: 'Urban Oversized Tee',
    price: 1999,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    category: 'Tees',
    inStock: true,
  },
  {
    id: '2',
    name: 'Street Drop Hoodie',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    category: 'Hoodies',
    inStock: true,
  },
  {
    id: '3',
    name: 'Classic Cargo Pants',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
    category: 'Pants',
    inStock: false,
  },
  {
    id: '4',
    name: 'Limited Edition Cap',
    price: 999,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop',
    category: 'Accessories',
    inStock: true,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id: string) => {
    setWishlist((items) => items.filter((item) => item.id !== id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="container py-16 text-center">
        <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold">Your wishlist is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Save items you love to your wishlist and shop them later.
        </p>
        <Link href="/shop">
          <Button className="mt-6">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Wishlist</span>
      </nav>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="mt-1 text-muted-foreground">{wishlist.length} items saved</p>
        </div>
        <Button variant="outline" onClick={() => setWishlist([])}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((item) => (
          <Card key={item.id} className="group overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!item.inStock ? 'opacity-60' : ''}`}
              />
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
              {!item.inStock && (
                <Badge variant="secondary" className="absolute left-3 top-3">
                  Out of Stock
                </Badge>
              )}
              {item.originalPrice && item.inStock && (
                <Badge variant="destructive" className="absolute left-3 bottom-3">
                  -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{item.category}</p>
              <Link href={`/product/${item.id}`} className="font-medium hover:text-accent">
                {item.name}
              </Link>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-semibold">{formatPrice(item.price)}</span>
                {item.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
              </div>
              <Button
                className="mt-4 w-full"
                disabled={!item.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
