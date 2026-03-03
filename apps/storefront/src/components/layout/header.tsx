'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { cn } from '@urbancart/ui';
import { MagneticButton } from '@/components/motion/magnetic-button';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mock cart count
  const cartCount = 3;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className={cn(
      'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
      isScrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'
    )}>
      {/* Announcement bar */}
      <div className={cn(
        'overflow-hidden transition-all duration-300',
        isScrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'
      )}>
        <div className="flex h-9 items-center justify-center border-b border-white/5 bg-neutral-950 px-4 text-[10px] font-medium uppercase tracking-widest text-white/60 sm:text-xs">
          Free Shipping on Orders Above ₹999 • Use Code <span className="ml-1 text-white">URBAN20</span>
        </div>
      </div>

      {/* Main header */}
      <div className={cn(
        'border-b transition-all duration-300',
        isScrolled ? 'border-white/5' : 'border-transparent'
      )}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
          {/* Mobile menu button */}
          <button
            className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-display text-xl font-light tracking-[0.2em] text-white sm:text-2xl">
              URBANCART
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-12">
            {navigation.map((item) => (
              <MagneticButton key={item.name} strength={0.2}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative py-1 text-xs font-medium uppercase tracking-widest transition-colors',
                    pathname.startsWith(item.href)
                      ? 'text-white'
                      : 'text-white/50 hover:text-white'
                  )}
                >
                  {item.name}
                  {pathname.startsWith(item.href) && (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-white" />
                  )}
                </Link>
              </MagneticButton>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white sm:flex"
            >
              <Heart className="h-5 w-5" />
            </Link>
            
            {/* Account */}
            <Link
              href="/account"
              className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white"
            >
              <User className="h-5 w-5" />
            </Link>
            
            {/* Cart */}
            <Link href="/cart" className="relative">
              <div className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-medium text-black">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl px-4 py-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products, collections, drops..."
                className="h-14 w-full border border-white/10 bg-transparent pl-12 pr-12 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-white/40">Trending:</span>
              {['Hoodies', 'Oversized Tees', 'Limited Edition', 'New Arrivals'].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="text-xs text-white/60 hover:text-white"
                  onClick={() => setIsSearchOpen(false)}
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-black/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col px-4 py-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'py-3 text-lg font-light uppercase tracking-widest transition-colors',
                  pathname.startsWith(item.href) ? 'text-white' : 'text-white/50'
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-6 flex gap-4 border-t border-white/10 pt-6">
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}