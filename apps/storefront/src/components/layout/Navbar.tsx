'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, X, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICON_SIZE = 30;
const MOBILE_ICON_SIZE = 24;

const leftNavLinks = [
  { label: 'New Drop', href: '/collections/new' },
  { label: 'Collections', href: '/collections' },
];

const mobileNavLinks = [
  { label: 'Chapter', href: '/chapter' },
  { label: 'New Drop', href: '/collections/new' },
  { label: 'Collections', href: '/collections' },
  { label: 'Caps', href: '/caps' },
  { label: 'Hoodies', href: '/hoodies' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed z-50 transition-all duration-300',
          isScrolled
            ? 'top-3 left-4 right-4 bg-white/95 backdrop-blur-md shadow-lg rounded-full'
            : 'top-0 left-0 right-0 bg-transparent'
        )}
      >
        <nav
          className={cn(
            'w-full transition-all duration-300',
            isScrolled ? 'px-6 md:px-8' : 'px-4 sm:px-6 lg:px-10'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-between transition-all duration-300',
              isScrolled ? 'h-16 md:h-18' : 'h-20 md:h-24'
            )}
          >
            {/* Left */}
            <div className="flex items-center gap-6 flex-1">
              <div className="hidden lg:flex items-center gap-6">
                {leftNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xl font-normal text-[#111] hover:opacity-60 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1 text-[#111]"
                aria-label="Open menu"
              >
                <Menu width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} />
              </button>
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-[45px] tracking-[0.2em] text-[#111] leading-none font-brand"
            >
              APOSTLE
            </Link>

            {/* Right Icons */}
            <div className="flex items-center justify-end gap-5 md:gap-6 flex-1 text-[#111]">
              <Link
                href="/stores"
                className="hidden md:flex hover:text-[#777] transition-colors p-1"
              >
                <MapPin width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} />
              </Link>

              <Link
                href="/search"
                className="hover:text-[#777] transition-colors p-1"
              >
                <Search width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} />
              </Link>

              <Link
                href="/account"
                className="hidden sm:flex hover:text-[#777] transition-colors p-1"
              >
                <User width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} />
              </Link>

              <Link
                href="/wishlist"
                className="hidden sm:flex hover:text-[#777] transition-colors p-1"
              >
                <Heart width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} />
              </Link>

              <Link
                href="/cart"
                className="relative hover:text-[#777] transition-colors p-1"
              >
                <ShoppingBag width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] text-[11px] flex items-center justify-center rounded-full bg-black text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="hidden lg:flex hover:text-[#777] transition-colors p-1"
              >
                <Menu width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-50"
          />

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#e7e5e4] z-50">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4">
                <span className="text-lg tracking-[0.15em] font-brand">APOSTLE</span>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                >
                  <X width={MOBILE_ICON_SIZE} height={MOBILE_ICON_SIZE} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex-1 py-4 overflow-y-auto">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-4 text-lg hover:bg-[#f7f7f7]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}