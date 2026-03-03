'use client';

import { useRef, useEffect, useState, type ReactNode, type MouseEvent } from 'react';
import { gsap, gsapConfig } from '@/lib/gsap';
import { cn } from '@urbancart/ui';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  border?: boolean;
}

/**
 * Glassmorphism panel with backdrop blur
 */
export function GlassPanel({
  children,
  className = '',
  blur = 'md',
  opacity = 0.1,
  border = true,
}: GlassPanelProps) {
  const blurValues = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };
  
  return (
    <div
      className={cn(
        blurValues[blur],
        border && 'border border-white/10',
        className
      )}
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      {children}
    </div>
  );
}

interface CursorSpotlightProps {
  children: ReactNode;
  className?: string;
  spotlightSize?: number;
  spotlightColor?: string;
}

/**
 * Cursor-following spotlight effect on hover
 */
export function CursorSpotlight({
  children,
  className = '',
  spotlightSize = 300,
  spotlightColor = 'rgba(255, 255, 255, 0.06)',
}: CursorSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !spotlightRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gsap.to(spotlightRef.current, {
      x: x - spotlightSize / 2,
      y: y - spotlightSize / 2,
      opacity: 1,
      duration: gsapConfig.duration.fast,
      ease: gsapConfig.ease.smooth,
    });
  };
  
  const handleMouseLeave = () => {
    if (!spotlightRef.current) return;
    gsap.to(spotlightRef.current, {
      opacity: 0,
      duration: gsapConfig.duration.normal,
    });
  };
  
  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute rounded-full opacity-0"
        style={{
          width: spotlightSize,
          height: spotlightSize,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface GrainOverlayProps {
  opacity?: number;
  className?: string;
}

/**
 * Subtle film grain effect overlay
 */
export function GrainOverlay({ opacity = 0.03, className = '' }: GrainOverlayProps) {
  return (
    <div
      className={cn('pointer-events-none fixed inset-0 z-[9998]', className)}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  borderWidth?: number;
  rounded?: string;
}

/**
 * Animated gradient border
 */
export function GradientBorder({
  children,
  className = '',
  gradientFrom = '#ff6b6b',
  gradientVia = '#feca57',
  gradientTo = '#48dbfb',
  borderWidth = 1,
  rounded = 'rounded-lg',
}: GradientBorderProps) {
  return (
    <div
      className={cn('relative p-[1px]', rounded, className)}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
        padding: borderWidth,
      }}
    >
      <div className={cn('bg-black', rounded, 'relative z-10 h-full w-full')}>
        {children}
      </div>
    </div>
  );
}

interface ShineEffectProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Periodic shine sweep effect
 */
export function ShineEffect({ children, className = '', delay = 3000 }: ShineEffectProps) {
  const shineRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!shineRef.current) return;
    
    const animate = () => {
      gsap.fromTo(
        shineRef.current,
        { x: '-100%', opacity: 0.5 },
        {
          x: '200%',
          opacity: 0,
          duration: 1,
          ease: gsapConfig.ease.smooth,
        }
      );
    };
    
    animate();
    const interval = setInterval(animate, delay);
    
    return () => clearInterval(interval);
  }, [delay]);
  
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <span
        ref={shineRef}
        className="pointer-events-none absolute inset-0 -translate-x-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
      />
      {children}
    </div>
  );
}

interface GlowTextProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
}

/**
 * Glowing text effect
 */
export function GlowText({
  children,
  className = '',
  color = '#fff',
  intensity = 'medium',
}: GlowTextProps) {
  const glowValues = {
    low: `0 0 10px ${color}40`,
    medium: `0 0 20px ${color}60, 0 0 40px ${color}30`,
    high: `0 0 20px ${color}80, 0 0 40px ${color}50, 0 0 60px ${color}30`,
  };
  
  return (
    <span className={className} style={{ textShadow: glowValues[intensity] }}>
      {children}
    </span>
  );
}

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/**
 * Animated number counter
 */
export function AnimatedCounter({
  value,
  className = '',
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef({ value: 0 });
  
  useEffect(() => {
    gsap.to(counterRef.current, {
      value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(counterRef.current.value);
      },
    });
  }, [value, duration]);
  
  return (
    <span className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

/**
 * Infinite scrolling marquee
 */
export function InfiniteMarquee({
  children,
  speed = 50,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const marquee = marqueeRef.current;
    const firstChild = marquee.firstElementChild as HTMLElement;
    if (!firstChild) return;
    
    const width = firstChild.offsetWidth;
    
    gsap.set(marquee, { x: direction === 'left' ? 0 : -width });
    
    animationRef.current = gsap.to(marquee, {
      x: direction === 'left' ? -width : 0,
      duration: width / speed,
      ease: 'none',
      repeat: -1,
    });
    
    return () => {
      animationRef.current?.kill();
    };
  }, [speed, direction]);
  
  const handleMouseEnter = () => {
    if (pauseOnHover && animationRef.current) {
      animationRef.current.pause();
    }
  };
  
  const handleMouseLeave = () => {
    if (pauseOnHover && animationRef.current) {
      animationRef.current.resume();
    }
  };
  
  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        <div className="flex-shrink-0">{children}</div>
        <div className="flex-shrink-0">{children}</div>
      </div>
    </div>
  );
}
