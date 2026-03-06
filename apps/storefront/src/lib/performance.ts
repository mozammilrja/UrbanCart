/**
 * Performance Monitoring Utilities
 */

/**
 * Performance marker for measuring execution time
 */
export function measurePerformance<T>(name: string, fn: () => T): T {
  if (typeof performance === 'undefined') {
    return fn();
  }

  const startMark = `${name}-start`;
  const endMark = `${name}-end`;

  performance.mark(startMark);
  const result = fn();
  performance.mark(endMark);

  performance.measure(name, startMark, endMark);

  if (process.env.NODE_ENV === 'development') {
    const measure = performance.getEntriesByName(name)[0];
    console.log(`[Perf] ${name}: ${measure?.duration.toFixed(2)}ms`);
  }

  // Cleanup
  performance.clearMarks(startMark);
  performance.clearMarks(endMark);
  performance.clearMeasures(name);

  return result;
}

/**
 * Async performance measurement
 */
export async function measurePerformanceAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  if (typeof performance === 'undefined') {
    return fn();
  }

  const startMark = `${name}-start`;
  const endMark = `${name}-end`;

  performance.mark(startMark);
  const result = await fn();
  performance.mark(endMark);

  performance.measure(name, startMark, endMark);

  if (process.env.NODE_ENV === 'development') {
    const measure = performance.getEntriesByName(name)[0];
    console.log(`[Perf] ${name}: ${measure?.duration.toFixed(2)}ms`);
  }

  // Cleanup
  performance.clearMarks(startMark);
  performance.clearMarks(endMark);
  performance.clearMeasures(name);

  return result;
}

/**
 * Web Vitals reporting setup
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: 'web-vital' | 'custom';
}): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metric.name}: ${metric.value.toFixed(2)}`);
  }

  // Send to analytics in production
  // analytics.track('web_vital', metric);
}

/**
 * FPS counter for debugging
 */
export function createFPSCounter(): () => void {
  let lastTime = performance.now();
  let frames = 0;
  let fps = 0;

  function loop() {
    const currentTime = performance.now();
    frames++;

    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frames * 1000) / (currentTime - lastTime));
      frames = 0;
      lastTime = currentTime;
      console.log(`[FPS] ${fps}`);
    }

    requestAnimationFrame(loop);
  }

  return () => requestAnimationFrame(loop);
}
