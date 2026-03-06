'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, Menu, X, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [cartCount] = useState(2); // Mock cart count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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
        <nav className={cn(
          "w-full transition-all duration-300",
          isScrolled ? "px-6 md:px-8" : "px-4 sm:px-6 lg:px-10"
        )}>
          <div className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-16 md:h-18" : "h-20 md:h-24"
          )}>
            {/* Left: Nav Links (Desktop) */}
            <div className="flex items-center gap-6 flex-1">
              <div className="hidden lg:flex items-center gap-6">
                {leftNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-normal text-[#111] hover:opacity-60 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1 text-[#111]"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Center: Logo */}
            <Link 
              href="/" 
              className="absolute left-1/2 -translate-x-1/2 text-[45px] tracking-[0.2em] text-[#111] leading-none font-brand focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label="APOSTLE - Home"
            >
              APOSTLE
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center justify-end gap-4 md:gap-5 flex-1 text-[#111]" role="navigation" aria-label="Quick actions">
              {/* Store Locator */}
              <Link
                href="/stores"
                className="hidden md:flex hover:text-[#777] transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded"
                aria-label="Find our stores"
              >
                <MapPin className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </Link>
              
              {/* Search */}
              <Link
                href="/search"
                className="hover:text-[#777] transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded"
                aria-label="Search products"
              >
                <Search className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </Link>
              
              {/* Account */}
              <Link
                href="/account"
                className="hidden sm:flex hover:text-[#777] transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded"
                aria-label="My account"
              >
                <User className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </Link>
              
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden sm:flex hover:text-[#777] transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded"
                aria-label="My wishlist"
              >
                <Heart className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </Link>
              
              {/* Cart */}
              <Link
                href="/cart"
                className="relative hover:text-[#777] transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded"
                aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              >
                <ShoppingBag className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
                {cartCount > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 w-4 h-4 text-[10px] font-medium flex items-center justify-center rounded-full bg-black text-white"
                    aria-hidden="true"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="hidden lg:flex hover:text-[#777] transition-colors focus:outline-none focus:ring-2 focus:ring-black rounded"
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile/Desktop Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-50"
            />

            {/* Menu Panel - Slide from Right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#e7e5e4] z-50"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                  <span className="text-lg tracking-[0.15em] font-brand">APOSTLE</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-4 overflow-y-auto">
                  {mobileNavLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-6 py-4 text-lg font-normal text-[#111] hover:bg-[#f7f7f7] transition-colors border-b border-[#e7e5e4]"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Footer Actions */}
                <div className="border-t border-[#e7e5e4] p-6 space-y-4">
                  <Link
                    href="/search"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Search className="w-5 h-5" strokeWidth={1.5} />
                    Search
                  </Link>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-sm"
                  >
                    <User className="w-5 h-5" strokeWidth={1.5} />
                    Account
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
