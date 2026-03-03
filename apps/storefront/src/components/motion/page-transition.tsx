'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, gsapConfig } from '@/lib/gsap';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Page transition wrapper with fade and slide animation
 */
export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: gsapConfig.duration.normal,
          ease: gsapConfig.ease.smooth,
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [pathname]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
}

/**
 * Slide transition with direction
 */
export function SlideTransition({
  children,
  className = '',
  direction = 'up',
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const getInitialPosition = () => {
      switch (direction) {
        case 'left': return { x: -50, y: 0 };
        case 'right': return { x: 50, y: 0 };
        case 'up': return { x: 0, y: 50 };
        case 'down': return { x: 0, y: -50 };
      }
    };
    
    const initial = getInitialPosition();
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, ...initial },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: gsapConfig.duration.slow,
          ease: gsapConfig.ease.smooth,
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [pathname, direction]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface CurtainTransitionProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

/**
 * Curtain reveal transition
 */
export function CurtainTransition({
  children,
  className = '',
  color = '#0a0a0a',
}: CurtainTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (!containerRef.current || !curtainRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.set(curtainRef.current, { scaleY: 0, transformOrigin: 'bottom' })
        .set(containerRef.current, { opacity: 0 })
        .to(curtainRef.current, {
          scaleY: 1,
          duration: 0.4,
          ease: gsapConfig.ease.smooth,
        })
        .to(containerRef.current, { opacity: 1, duration: 0 })
        .to(curtainRef.current, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.4,
          ease: gsapConfig.ease.smooth,
        });
    }, containerRef);
    
    return () => ctx.revert();
  }, [pathname]);
  
  return (
    <div className={`relative ${className}`}>
      <div
        ref={curtainRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{ backgroundColor: color }}
      />
      <div ref={containerRef}>{children}</div>
    </div>
  );
}

interface StaggerChildrenTransitionProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * Stagger children on page load
 */
export function StaggerChildrenTransition({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerChildrenTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const children = containerRef.current.children;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: gsapConfig.duration.normal,
          stagger: staggerDelay,
          ease: gsapConfig.ease.smooth,
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [pathname, staggerDelay]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface FadeScaleTransitionProps {
  children: ReactNode;
  className?: string;
  initialScale?: number;
}

/**
 * Fade with scale transition
 */
export function FadeScaleTransition({
  children,
  className = '',
  initialScale = 0.95,
}: FadeScaleTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: initialScale },
        {
          opacity: 1,
          scale: 1,
          duration: gsapConfig.duration.normal,
          ease: gsapConfig.ease.smooth,
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [pathname, initialScale]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
