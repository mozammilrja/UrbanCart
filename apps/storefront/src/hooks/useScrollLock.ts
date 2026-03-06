'use client';

/**
 * useScrollLock Hook
 * Lock body scroll for modals
 */

import { useEffect, useRef } from 'react';

export function useScrollLock(lock: boolean = true): void {
  const scrollY = useRef(0);

  useEffect(() => {
    if (!lock) return;

    // Store current scroll position
    scrollY.current = window.scrollY;

    // Lock scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY.current}px`;
    document.body.style.width = '100%';

    return () => {
      // Restore scroll
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY.current);
    };
  }, [lock]);
}

/**
 * Hook to manage scroll position
 */
export function useScrollPosition(): number {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY.current;
}

/**
 * Hook to scroll to top
 */
export function useScrollToTop(): () => void {
  return () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
