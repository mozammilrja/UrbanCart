'use client';

/**
 * useIntersectionObserver Hook
 * For lazy loading and scroll-triggered animations
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface IntersectionResult {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T>, IntersectionResult] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  const elementRef = useRef<T>(null);
  const [result, setResult] = useState<IntersectionResult>({
    isIntersecting: false,
  });

  const frozen = result.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || frozen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setResult({
          isIntersecting: entry.isIntersecting,
          entry,
        });
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, frozen]);

  return [elementRef, result];
}

/**
 * Hook for checking if element is in viewport
 */
export function useIsVisible<T extends Element>(
  options?: UseIntersectionObserverOptions
): [React.RefObject<T>, boolean] {
  const [ref, { isIntersecting }] = useIntersectionObserver<T>({
    freezeOnceVisible: true,
    ...options,
  });
  return [ref, isIntersecting];
}
