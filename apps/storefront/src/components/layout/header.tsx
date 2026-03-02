'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { Button, cn, Input } from '@urbancart/ui';

const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'Collections', href: '/collections' },
  { name: 'Drops', href: '/drops' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mock cart count
  const cartCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex h-8 items-center justify-center text-xs sm:text-sm">
          <span>Free shipping on orders above ₹2,999 | Use code URBAN20 for 20% off</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight sm:text-2xl">URBANCART</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                pathname.startsWith(item.href) ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative hidden sm:block">
              <Input
                placeholder="Search..."
                className="w-48 pr-8"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Link href="/wishlist" className="hidden sm:block">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t lg:hidden">
          <nav className="container flex flex-col py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'py-3 text-lg font-medium',
                  pathname.startsWith(item.href) ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex gap-4 border-t pt-4">
              <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
              </Link>
              <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
