'use client';

import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';
import { gsap, gsapConfig } from '@/lib/gsap';
import { cn } from '@urbancart/ui';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
  href?: string;
  onClick?: () => void;
}

/**
 * Magnetic hover effect button
 */
export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as: Component = 'button',
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  
  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (!ref.current || !contentRef.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: gsapConfig.duration.fast,
      ease: gsapConfig.ease.smooth,
    });
    
    gsap.to(contentRef.current, {
      x: x * strength * 0.5,
      y: y * strength * 0.5,
      duration: gsapConfig.duration.fast,
      ease: gsapConfig.ease.smooth,
    });
  }, [strength]);
  
  const handleMouseLeave = useCallback(() => {
    if (!ref.current || !contentRef.current) return;
    
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: gsapConfig.duration.normal,
      ease: gsapConfig.ease.elastic,
    });
    
    gsap.to(contentRef.current, {
      x: 0,
      y: 0,
      duration: gsapConfig.duration.normal,
      ease: gsapConfig.ease.elastic,
    });
  }, []);
  
  const props = {
    ref: ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>,
    className: cn('inline-block cursor-pointer', className),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(Component === 'a' ? { href } : {}),
  };
  
  return (
    <Component {...props}>
      <span ref={contentRef} className="inline-block">
        {children}
      </span>
    </Component>
  );
}

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

/**
 * Scale on hover effect
 */
export function HoverScale({
  children,
  className = '',
  scale = 1.05,
}: HoverScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseEnter = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale,
      duration: gsapConfig.duration.fast,
      ease: gsapConfig.ease.smooth,
    });
  }, [scale]);
  
  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      duration: gsapConfig.duration.fast,
      ease: gsapConfig.ease.smooth,
    });
  }, []);
  
  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
}

/**
 * Button with shimmer effect on hover
 */
export function ShimmerButton({
  children,
  className = '',
  shimmerColor = 'rgba(255, 255, 255, 0.2)',
}: ShimmerButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);
  
  const handleMouseEnter = useCallback(() => {
    if (!shimmerRef.current) return;
    gsap.fromTo(
      shimmerRef.current,
      { x: '-100%', opacity: 1 },
      { x: '200%', duration: 0.6, ease: gsapConfig.ease.smooth }
    );
  }, []);
  
  return (
    <button
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
    >
      <span
        ref={shimmerRef}
        className="pointer-events-none absolute inset-0 -translate-x-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * 3D tilt effect card
 */
export function TiltCard({
  children,
  className = '',
  maxTilt = 10,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(ref.current, {
      rotateY: x * maxTilt,
      rotateX: -y * maxTilt,
      duration: gsapConfig.duration.fast,
      ease: gsapConfig.ease.smooth,
    });
  }, [maxTilt]);
  
  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateY: 0,
      rotateX: 0,
      duration: gsapConfig.duration.normal,
      ease: gsapConfig.ease.smooth,
    });
  }, []);
  
  return (
    <div
      ref={ref}
      className={cn('transform-gpu', className)}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

interface PressEffectProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

/**
 * Tactile press effect
 */
export function PressEffect({
  children,
  className = '',
  scale = 0.97,
}: PressEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseDown = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale,
      duration: 0.15,
      ease: gsapConfig.ease.smooth,
    });
  }, [scale]);
  
  const handleMouseUp = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      duration: 0.3,
      ease: gsapConfig.ease.elastic,
    });
  }, []);
  
  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
}
