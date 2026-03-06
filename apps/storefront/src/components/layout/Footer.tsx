'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const footerLinks = {
  connect: [
    { label: 'Call', href: '/contact' },
    { label: 'Text (WhatsApp)', href: 'https://wa.me/919876543210' },
    { label: 'Instagram', href: 'https://instagram.com/apostle' },
    { label: 'YouTube', href: 'https://youtube.com/apostle' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/apostle' },
  ],
  support: [
    { label: 'Make a return/Exchange', href: '/returns' },
    { label: 'Refund/Exchange policy', href: '/refund-policy' },
    { label: 'Track your order', href: '/track-order' },
    { label: 'Shipping policy', href: '/shipping' },
    { label: "FAQ's", href: '/faq' },
    { label: 'Terms', href: '/terms' },
  ],
  company: [
    { label: 'Our story', href: '/about' },
    { label: 'Walk-in Stores', href: '/stores' },
    { label: 'Collaborations', href: '/collaborations' },
    { label: 'Careers', href: '/careers' },
    { label: 'Media', href: '/media' },
    { label: 'Blogs', href: '/blog' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#f5f5f5]">
      {/* Main Footer */}
      <div className="w-full px-8 sm:px-12 lg:px-20 xl:px-28 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Links Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-20 xl:gap-32 flex-1">
            {/* Connect with us */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-[#111] mb-6">Connect with us</h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base md:text-lg text-[#666] hover:text-[#111] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Support */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-[#111] mb-6">Order Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base md:text-lg text-[#666] hover:text-[#111] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* We are APOSTLE */}
            <div>
              <h4 className="text-lg md:text-xl font-semibold text-[#111] mb-6">We are APOSTLE</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base md:text-lg text-[#666] hover:text-[#111] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Brand Logo and Bag */}
          <div className="flex items-center gap-6 lg:gap-10">
            {/* Script Logo */}
            <span className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-[#333]" style={{ fontFamily: 'Georgia, Times, serif' }}>
              Apostle
            </span>
            
            {/* Shopping Bag - Static version */}
            <div className="relative w-32 h-44 md:w-36 md:h-48 lg:w-40 lg:h-52">
              <div 
                className="absolute inset-0 bg-white rounded-sm shadow-sm flex items-center justify-center border border-gray-200"
              >
                {/* Bag handle */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6 border-2 border-gray-300 rounded-t-full bg-transparent" />
                {/* Brand text on bag */}
                <span className="text-sm md:text-base lg:text-lg font-bold tracking-widest text-[#333]">APOSTLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-8 sm:px-12 lg:px-20 xl:px-28 pb-6">
        <div className="flex justify-end">
          <p className="text-xs text-[#999] tracking-wider uppercase">
            © 2026 APOSTLE RETAIL PRIVATE LIMITED, ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
