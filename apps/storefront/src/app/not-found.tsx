'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[180px] md:text-[220px] font-bold text-[#f0f0f0] leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-[#111] to-[#333] rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <Package className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-[#666] text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-[#111] text-white rounded-full font-medium hover:bg-[#333] transition-all hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 px-8 py-4 border-2 border-[#111] text-[#111] rounded-full font-medium hover:bg-[#111] hover:text-white transition-all"
          >
            <Search className="w-5 h-5" />
            Search Products
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
          <p className="text-sm text-[#999] mb-4">Popular destinations</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['New Arrivals', 'Collections', 'T-Shirts', 'Hoodies'].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-full text-sm hover:border-[#111] hover:shadow-md transition-all"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
