'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';

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

function DraggableBag() {
  const bagRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastPosition = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef<number | null>(null);

  // Auto rotation
  useEffect(() => {
    if (!autoRotate || isDragging) {
      if (autoRotateRef.current) {
        cancelAnimationFrame(autoRotateRef.current);
      }
      return;
    }

    let angle = rotation.y;
    const animate = () => {
      angle += 0.5;
      setRotation(prev => ({ ...prev, y: angle }));
      autoRotateRef.current = requestAnimationFrame(animate);
    };
    autoRotateRef.current = requestAnimationFrame(animate);

    return () => {
      if (autoRotateRef.current) {
        cancelAnimationFrame(autoRotateRef.current);
      }
    };
  }, [autoRotate, isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastPosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPosition.current.x;
    const deltaY = e.clientY - lastPosition.current.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));
    
    lastPosition.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Resume auto-rotate after 2 seconds
    setTimeout(() => setAutoRotate(true), 2000);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    const touch = e.touches[0];
    lastPosition.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastPosition.current.x;
    const deltaY = touch.clientY - lastPosition.current.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));
    
    lastPosition.current = { x: touch.clientX, y: touch.clientY };
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 2000);
  }, []);

  // Keyboard support for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const rotateAmount = 15;
    switch (e.key) {
      case 'ArrowLeft':
        setRotation(prev => ({ ...prev, y: prev.y - rotateAmount }));
        setAutoRotate(false);
        setTimeout(() => setAutoRotate(true), 2000);
        break;
      case 'ArrowRight':
        setRotation(prev => ({ ...prev, y: prev.y + rotateAmount }));
        setAutoRotate(false);
        setTimeout(() => setAutoRotate(true), 2000);
        break;
      case 'ArrowUp':
        setRotation(prev => ({ ...prev, x: prev.x - rotateAmount }));
        setAutoRotate(false);
        setTimeout(() => setAutoRotate(true), 2000);
        break;
      case 'ArrowDown':
        setRotation(prev => ({ ...prev, x: prev.x + rotateAmount }));
        setAutoRotate(false);
        setTimeout(() => setAutoRotate(true), 2000);
        break;
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="relative w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-44 lg:w-36 lg:h-48 xl:w-40 xl:h-52 [perspective:1000px]">
      <div 
        ref={bagRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="absolute inset-0 bg-white rounded-sm shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none [transform-style:preserve-3d] transition-shadow hover:shadow-xl focus:outline-none"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        role="img"
        aria-label="Interactive 3D shopping bag. Use arrow keys to rotate."
      >
        {/* Die-cut handle - front (cutout style) */}
        <div className="absolute top-2 sm:top-3 inset-x-0 mx-auto w-8 sm:w-10 h-4 sm:h-5 rounded-b-full bg-[#f5f5f5] [transform:translateZ(2px)]" />
        {/* Die-cut handle - back */}
        <div className="absolute top-2 sm:top-3 inset-x-0 mx-auto w-8 sm:w-10 h-4 sm:h-5 rounded-b-full bg-[#f5f5f5] [transform:rotateY(180deg)_translateZ(2px)]" />
        {/* Brand text on bag - front */}
        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-widest text-[#333] [transform:translateZ(1px)]">APOSTLE</span>
        {/* Back face */}
        <div className="absolute inset-0 bg-white rounded-sm flex items-center justify-center [transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden]">
          {/* Die-cut handle on back */}
          <div className="absolute top-2 sm:top-3 inset-x-0 mx-auto w-8 sm:w-10 h-4 sm:h-5 rounded-b-full bg-[#f5f5f5]" />
          <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-widest text-[#333]">APOSTLE</span>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#f5f5f5]" role="contentinfo" aria-label="Site footer">
      {/* Main Footer - Responsive padding for all screen sizes */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-28 py-8 md:py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
          {/* Links Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 xl:gap-20 2xl:gap-32 flex-1">
            {/* Connect with us */}
            <nav aria-label="Connect with us">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#111] mb-4 md:mb-6">Connect with us</h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base md:text-lg text-[#666] hover:text-[#111] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Order Support */}
            <nav aria-label="Order support">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#111] mb-4 md:mb-6">Order Support</h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base md:text-lg text-[#666] hover:text-[#111] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* We are APOSTLE */}
            <nav aria-label="About APOSTLE">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#111] mb-4 md:mb-6">We are APOSTLE</h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base md:text-lg text-[#666] hover:text-[#111] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Brand Logo and Bag */}
          <div className="flex items-center justify-center lg:justify-end gap-4 sm:gap-6 lg:gap-10 mt-4 lg:mt-0">
            {/* Script Logo - Responsive sizing */}
            <span 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif italic text-[#333]" 
              style={{ fontFamily: 'Georgia, Times, serif' }}
              aria-hidden="true"
            >
              Apostle
            </span>
            
            {/* Shopping Bag - Draggable 360 Rotation */}
            <DraggableBag />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-28 pb-4 md:pb-6">
        <div className="flex justify-center lg:justify-end">
          <p className="text-[10px] sm:text-xs text-[#999] tracking-wider uppercase text-center lg:text-right">
            © 2026 APOSTLE RETAIL PRIVATE LIMITED, ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
