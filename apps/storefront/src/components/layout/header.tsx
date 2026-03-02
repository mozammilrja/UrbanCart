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
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <div className="bg-neutral-900">
        <div className="container flex h-9 items-center justify-center px-2 text-[10px] font-medium tracking-wide text-white sm:h-10 sm:px-4 sm:text-xs md:text-sm">
          <span className="truncate">
            <span className="hidden sm:inline">FREE SHIPPING ON ORDERS ABOVE ₹999 • </span>
            <span className="sm:hidden">FREE SHIPPING ₹999+ • </span>
            USE CODE <span className="font-bold text-brand-accent">URBAN20</span> FOR 20% OFF
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-neutral-200 bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-14 items-center justify-between sm:h-16 lg:h-20">
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
            <span className="font-heading text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">URBANCART</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative py-1 text-sm font-medium transition-colors hover:text-neutral-900',
                  pathname.startsWith(item.href)
                    ? 'text-neutral-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-brand-accent'
                    : 'text-neutral-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {isSearchOpen ? (
              <div className="relative hidden sm:block">
                <Input
                  placeholder="Search products..."
                  className="w-56 border-neutral-200 bg-neutral-50 pr-8 focus:bg-white"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="text-neutral-600 hover:text-neutral-900">
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Link href="/wishlist" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-neutral-900">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-neutral-900">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-neutral-900">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-b border-neutral-200 bg-white lg:hidden">
          <nav className="container flex flex-col py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'py-3 text-lg font-medium transition-colors',
                  pathname.startsWith(item.href) ? 'text-brand-accent' : 'text-neutral-600'
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 flex gap-4 border-t border-neutral-100 pt-4">
              <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="border-neutral-200">
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
              </Link>
              <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="border-neutral-200">
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
