'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, gsapConfig } from '@/lib/gsap';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Scroll-triggered reveal animation component
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 50,
  stagger = 0,
  once = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const elements = stagger > 0 
        ? containerRef.current!.children 
        : containerRef.current;
      
      gsap.from(elements, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : 0,
        ease: gsapConfig.ease.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [delay, duration, y, stagger, once]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

/**
 * Simple fade in animation (not scroll-triggered)
 */
export function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const directionMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
      none: { x: 0, y: 0 },
    };
    
    const { x, y } = directionMap[direction];
    
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        x,
        y,
        opacity: 0,
        duration,
        delay,
        ease: gsapConfig.ease.smooth,
      });
    }, ref);
    
    return () => ctx.revert();
  }, [delay, duration, direction, distance]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
}

/**
 * Staggered reveal for lists/grids with scroll trigger
 */
export function StaggerReveal({
  children,
  className = '',
  stagger = 0.1,
  delay = 0,
  y = 40,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        y,
        opacity: 0,
        duration: gsapConfig.duration.normal,
        delay,
        stagger,
        ease: gsapConfig.ease.smooth,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, ref);
    
    return () => ctx.revert();
  }, [stagger, delay, y]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

/**
 * Parallax scroll effect
 */
export function Parallax({
  children,
  className = '',
  speed = 0.3,
  direction = 'up',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const yPercent = direction === 'up' ? speed * 100 : -speed * 100;
    
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref);
    
    return () => ctx.revert();
  }, [speed, direction]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * Character-by-character text reveal
 */
export function TextReveal({
  children,
  className = '',
  delay = 0,
  tag: Tag = 'span',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      const chars = ref.current!.querySelectorAll('.char');
      
      gsap.from(chars, {
        y: '100%',
        opacity: 0,
        duration: 0.8,
        delay,
        stagger: 0.02,
        ease: gsapConfig.ease.expo,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, ref);
    
    return () => ctx.revert();
  }, [delay]);
  
  // Split text into characters
  const chars = children.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ overflow: 'hidden' }}>
      <span className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
    </span>
  ));
  
  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>} className={`overflow-hidden ${className}`}>
      {chars}
    </Tag>
  );
}
