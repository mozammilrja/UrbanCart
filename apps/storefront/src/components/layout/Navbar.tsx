'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  MapPin,
  Sparkles,
  Grid3X3,
  Shirt,
  Crown,
  Star,
  ChevronRight,
  Phone,
  Mail,
  Instagram,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart.store';

// Pages with fully light backgrounds that need dark navbar text
// These pages have NO dark hero section at the top
const lightBackgroundPages: string[] = [
  '/search',
  '/account',
  '/product',
  '/shop',
];

// Pages with dark hero sections - navbar should stay with white text initially
// Most pages have dark headers, so we use the default white text behavior

const ICON_SIZE = 25;

const leftNavLinks = [
  { label: 'New Drop', href: '/collections/new' },
  { label: 'Collections', href: '/collections' },
];

const mobileNavLinks = [
  { label: 'Chapter', href: '/chapter', icon: Star, badge: 'New' },
  { label: 'New Drop', href: '/collections/new', icon: Sparkles, badge: 'Hot' },
  { label: 'Collections', href: '/collections', icon: Grid3X3 },
  { label: 'T-Shirts', href: '/collections/t-shirts', icon: Shirt },
  { label: 'Hoodies', href: '/collections/hoodies', icon: Package },
  { label: 'Caps', href: '/collections/caps', icon: Crown },
];

const quickActions = [
  { label: 'My Account', href: '/account', icon: User },
  { label: 'Wishlist', href: '/wishlist', icon: Heart },
  { label: 'Track Order', href: '/account/orders', icon: Package },
  { label: 'Find Store', href: '/stores', icon: MapPin },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const pathname = usePathname();

  // Calculate cart count from items
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Rehydrate cart store on mount to prevent hydration mismatch
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsMounted(true);
  }, []);
  
  // Home page gets transparent navbar, all other pages get white background
  const isHomePage = pathname === '/';
  
  // Use dark text on non-home pages or when scrolled
  const useDarkText = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    
    // ESC key handler for accessibility
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed z-50 transition-all duration-300',
          isScrolled
            ? 'top-3 left-4 right-4 bg-white/95 backdrop-blur-md shadow-lg rounded-full'
            : isHomePage
              ? 'top-0 left-0 right-0 bg-transparent'
              : 'top-0 left-0 right-0 bg-white shadow-sm'
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
                    className={cn(
                      "text-xs font-normal hover:opacity-60 transition-all",
                      useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn("lg:hidden p-1 transition-colors", useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]")}
                aria-label="Open menu"
              >
                <Menu width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} color="currentColor" />
              </button>
            </div>

            {/* Logo - Responsive sizing for all devices */}
            <Link
              href="/"
              className={cn(
                "absolute left-1/2 -translate-x-1/2 text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] tracking-[0.15em] sm:tracking-[0.2em] leading-none font-brand transition-colors",
                useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              )}
              aria-label="APOSTLE - Go to homepage"
            >
              APOSTLE
            </Link>

            {/* Right Icons */}
            <div className="flex items-center justify-end gap-5 md:gap-6 flex-1">
              <Link
                href="/stores"
                className={cn(
                  "hidden md:flex hover:opacity-70 transition-opacity p-2",
                  useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                )}
                aria-label="Find a store near you"
              >
                <MapPin width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} color="currentColor" />
              </Link>

              <Link
                href="/search"
                className={cn(
                  "hover:opacity-70 transition-opacity p-2",
                  useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                )}
                aria-label="Search products"
              >
                <Search width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} color="currentColor" />
              </Link>

              <Link
                href="/account"
                className={cn(
                  "hidden sm:flex hover:opacity-70 transition-opacity p-2",
                  useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                )}
                aria-label="My account"
              >
                <User width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} color="currentColor" />
              </Link>

              <Link
                href="/wishlist"
                className={cn(
                  "hidden sm:flex hover:opacity-70 transition-opacity p-2",
                  useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                )}
                aria-label="View wishlist"
              >
                <Heart width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} color="currentColor" />
              </Link>

              <Link
                href="/cart"
                className={cn(
                  "relative hover:opacity-70 transition-opacity p-2",
                  useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                )}
                aria-label="Shopping cart"
              >
                <ShoppingBag width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} color="currentColor" />

                {isMounted && cartCount > 0 && (
                  <span className={cn(
                    "absolute -top-1 -right-1 w-[18px] h-[18px] text-[11px] flex items-center justify-center rounded-full",
                    useDarkText ? "bg-black text-white" : "bg-white text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  )}>
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  "hidden lg:flex hover:opacity-70 transition-opacity p-2",
                  useDarkText ? "text-[#111]" : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                )}
                aria-label="Open navigation menu"
              >
                <Menu width={ICON_SIZE} height={ICON_SIZE} strokeWidth={1.5} color="currentColor" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
          />

          {/* Slide Panel - Responsive width for all devices */}
          <div className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] sm:max-w-sm bg-white z-[70] shadow-2xl overflow-hidden animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#e5e5e5]">
                <span className="text-xl sm:text-2xl tracking-[0.15em] font-brand">APOSTLE</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 hover:bg-[#f5f5f5] rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X width={22} height={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-5 py-4 border-b border-[#e5e5e5]">
                <Link 
                  href="/search"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-3.5 bg-[#f5f5f5] rounded-xl text-[#777] hover:bg-[#eee] transition-colors"
                >
                  <Search className="w-5 h-5" />
                  <span className="text-sm">Search products...</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-3 overflow-y-auto">
                <div className="px-5 py-2">
                  <span className="text-[10px] font-bold text-[#999] uppercase tracking-wider">Shop</span>
                </div>
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-between px-5 py-4 hover:bg-[#f9f9f9] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#f5f5f5] rounded-xl flex items-center justify-center group-hover:bg-[#111] group-hover:text-white transition-all">
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[15px] font-medium">{link.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className="px-2 py-0.5 bg-[#111] text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                          {link.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-[#ccc] group-hover:text-[#111] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}

                {/* Divider */}
                <div className="my-4 mx-5 border-t border-[#e5e5e5]" />

                {/* Quick Actions */}
                <div className="px-5 py-2">
                  <span className="text-[10px] font-bold text-[#999] uppercase tracking-wider">Quick Links</span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-5 py-2">
                  {quickActions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center gap-2 p-4 bg-[#f9f9f9] rounded-2xl hover:bg-[#f5f5f5] transition-colors"
                    >
                      <action.icon className="w-5 h-5 text-[#555]" />
                      <span className="text-xs font-medium text-[#555]">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Footer CTA */}
              <div className="p-5 bg-gradient-to-t from-[#f9f9f9] to-white border-t border-[#e5e5e5]">
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-[#111] text-white rounded-2xl font-semibold hover:bg-black transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  View Cart
                  {isMounted && cartCount > 0 && (
                    <span className="px-2 py-0.5 bg-white text-[#111] text-xs font-bold rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Social & Contact */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-5">
                  <a href="https://instagram.com/apostle" className="p-3 text-[#999] hover:text-[#111] transition-colors" aria-label="Follow us on Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="tel:+919876543210" className="p-3 text-[#999] hover:text-[#111] transition-colors" aria-label="Call us">
                    <Phone className="w-5 h-5" />
                  </a>
                  <a href="mailto:hello@apostle.in" className="p-3 text-[#999] hover:text-[#111] transition-colors" aria-label="Email us">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                <p className="text-center text-[10px] text-[#999] mt-4 tracking-wider">
                  © 2026 APOSTLE. ALL RIGHTS RESERVED
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}