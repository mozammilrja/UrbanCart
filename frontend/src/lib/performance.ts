'use client';

/**
 * Performance monitoring utilities
 */

// Web Vitals reporting
export const reportWebVitals = (metric: {
  id: string;
  name: string;
  value: number;
  label: 'web-vital' | 'custom';
}) => {
  // Send to analytics
  if (process.env.NODE_ENV === 'production') {
    console.log('Web Vital:', metric);
    // Example: send to analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify(metric),
    // });
  }
};

// Measure component render time
export function measureRender(componentName: string) {
  const start = performance.now();
  
  return () => {
    const duration = performance.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName} rendered in ${duration.toFixed(2)}ms`);
    }
  };
}

// Debounced scroll handler for better performance
export function createScrollHandler(callback: () => void, delay = 100) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let ticking = false;

  return () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(callback, delay);
        ticking = false;
      });
      ticking = true;
    }
  };
}

// Intersection Observer factory
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }
  return new IntersectionObserver(callback, options);
}
