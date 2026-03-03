/**
 * GSAP Configuration and Utilities
 * Centralized motion orchestration
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP default configuration
 */
export const gsapConfig = {
  // Default ease for luxury feel
  ease: {
    smooth: 'power2.out',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'power3.out',
    expo: 'expo.out',
    sharp: 'power4.inOut',
  },
  
  // Duration presets (in seconds)
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
    reveal: 1.2,
  },
  
  // Stagger presets
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
  
  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
};

/**
 * Initialize GSAP with global defaults
 */
export function initGSAP(): void {
  gsap.defaults({
    ease: gsapConfig.ease.smooth,
    duration: gsapConfig.duration.normal,
  });
  
  // Configure ScrollTrigger
  ScrollTrigger.defaults({
    markers: process.env.NODE_ENV === 'development' ? false : false,
  });
}

/**
 * Fade in animation with Y offset
 */
export function fadeInUp(
  element: gsap.TweenTarget,
  options: { delay?: number; duration?: number; y?: number; stagger?: number } = {}
): gsap.core.Tween {
  return gsap.from(element, {
    y: options.y ?? 40,
    opacity: 0,
    duration: options.duration ?? gsapConfig.duration.normal,
    delay: options.delay ?? 0,
    stagger: options.stagger ?? 0,
    ease: gsapConfig.ease.smooth,
  });
}

/**
 * Staggered reveal animation
 */
export function staggerReveal(
  elements: gsap.TweenTarget,
  options: { delay?: number; stagger?: number; y?: number } = {}
): gsap.core.Tween {
  return gsap.from(elements, {
    y: options.y ?? 30,
    opacity: 0,
    duration: gsapConfig.duration.normal,
    delay: options.delay ?? 0,
    stagger: options.stagger ?? gsapConfig.stagger.normal,
    ease: gsapConfig.ease.smooth,
  });
}

/**
 * Text reveal animation (line by line)
 */
export function textReveal(
  element: HTMLElement,
  options: { delay?: number; duration?: number } = {}
): gsap.core.Tween {
  return gsap.from(element, {
    y: '100%',
    opacity: 0,
    duration: options.duration ?? gsapConfig.duration.reveal,
    delay: options.delay ?? 0,
    ease: gsapConfig.ease.expo,
  });
}

/**
 * Scale reveal animation
 */
export function scaleReveal(
  element: gsap.TweenTarget,
  options: { delay?: number; scale?: number } = {}
): gsap.core.Tween {
  return gsap.from(element, {
    scale: options.scale ?? 0.9,
    opacity: 0,
    duration: gsapConfig.duration.normal,
    delay: options.delay ?? 0,
    ease: gsapConfig.ease.smooth,
  });
}

/**
 * Create scroll-triggered animation
 */
export function scrollReveal(
  element: gsap.TweenTarget,
  trigger: string | Element,
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
): gsap.core.Tween {
  return gsap.from(element, {
    y: options.y ?? 50,
    opacity: options.opacity ?? 0,
    duration: options.duration ?? gsapConfig.duration.normal,
    ease: gsapConfig.ease.smooth,
    scrollTrigger: {
      trigger,
      start: options.start ?? gsapConfig.scrollTrigger.start,
      end: options.end ?? gsapConfig.scrollTrigger.end,
      scrub: options.scrub ?? false,
      toggleActions: gsapConfig.scrollTrigger.toggleActions,
    },
  });
}

/**
 * Magnetic hover effect
 */
export function magneticHover(
  element: HTMLElement,
  strength: number = 0.3
): { onMouseMove: (e: MouseEvent) => void; onMouseLeave: () => void } {
  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: gsapConfig.duration.fast,
      ease: gsapConfig.ease.smooth,
    });
  };
  
  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: gsapConfig.duration.normal,
      ease: gsapConfig.ease.elastic,
    });
  };
  
  return { onMouseMove, onMouseLeave };
}

/**
 * Parallax effect on scroll
 */
export function parallax(
  element: gsap.TweenTarget,
  trigger: string | Element,
  speed: number = 0.5
): gsap.core.Tween {
  return gsap.to(element, {
    y: `${speed * 100}%`,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Horizontal scroll section
 */
export function horizontalScroll(
  container: HTMLElement,
  panels: HTMLElement[]
): gsap.core.Tween {
  const totalWidth = panels.reduce((acc, panel) => acc + panel.offsetWidth, 0);
  
  return gsap.to(panels, {
    x: () => -(totalWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${totalWidth}`,
    },
  });
}

/**
 * Kill all ScrollTrigger instances (cleanup)
 */
export function cleanupScrollTrigger(): void {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
}

/**
 * Refresh ScrollTrigger (after DOM changes)
 */
export function refreshScrollTrigger(): void {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
