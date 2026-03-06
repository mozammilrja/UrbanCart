'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Threshold for intersection observer */
  threshold?: number;
  /** Fallback while loading */
  fallback?: ReactNode;
  /** Min height to prevent layout shift */
  minHeight?: string;
  /** Section ID for accessibility */
  id?: string;
  /** Additional class names */
  className?: string;
}

/**
 * Wrapper component for lazy loading sections below the fold.
 * Uses IntersectionObserver for efficient loading.
 */
export function LazySection({
  children,
  rootMargin = '200px',
  threshold = 0.1,
  fallback,
  minHeight = '400px',
  id,
  className = '',
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      setHasLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasLoaded(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{ minHeight: hasLoaded ? 'auto' : minHeight }}
    >
      {isVisible ? (
        children
      ) : (
        fallback || (
          <div 
            className="w-full animate-pulse bg-gray-100" 
            style={{ minHeight }}
            aria-hidden="true"
          />
        )
      )}
    </div>
  );
}

export default LazySection;
