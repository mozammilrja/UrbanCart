'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

interface HeroBadgeProps {
  /** Custom icon/logo element to display inside the badge */
  icon?: React.ReactNode;
  /** Badge size in pixels */
  size?: number;
  /** Maximum translation in pixels */
  translationRange?: number;
  /** Animation smoothing duration in seconds */
  smoothingDuration?: number;
  /** Enable idle rotation animation */
  idleRotation?: boolean;
}

export function HeroBadge({
  icon,
  size = 90,
  translationRange = 30,
  smoothingDuration = 0.5,
  idleRotation = true,
}: HeroBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleAnimationRef = useRef<gsap.core.Tween | null>(null);
  const isHoveringRef = useRef(false);
  const currentRotationRef = useRef(0);

  // GSAP quickTo for performant animations
  const quickRotateRef = useRef<gsap.QuickToFunc | null>(null);
  const quickXRef = useRef<gsap.QuickToFunc | null>(null);
  const quickYRef = useRef<gsap.QuickToFunc | null>(null);
  const quickScaleRef = useRef<gsap.QuickToFunc | null>(null);

  // Initialize GSAP quickTo functions
  useEffect(() => {
    if (!badgeRef.current) return;

    const badge = badgeRef.current;

    // Create quickTo functions for smooth, performant animations
    quickRotateRef.current = gsap.quickTo(badge, 'rotation', {
      duration: smoothingDuration,
      ease: 'power3.out',
    });

    quickXRef.current = gsap.quickTo(badge, 'x', {
      duration: smoothingDuration,
      ease: 'power3.out',
    });

    quickYRef.current = gsap.quickTo(badge, 'y', {
      duration: smoothingDuration,
      ease: 'power3.out',
    });

    quickScaleRef.current = gsap.quickTo(badge, 'scale', {
      duration: 0.3,
      ease: 'power2.out',
    });

    // Set initial transform for GPU acceleration
    gsap.set(badge, {
      transformPerspective: 1000,
      transformOrigin: 'center center',
      force3D: true,
    });

    // Start idle rotation if enabled
    if (idleRotation) {
      idleAnimationRef.current = gsap.to(badge, {
        rotation: '+=360',
        duration: 20,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          if (badgeRef.current) {
            currentRotationRef.current = gsap.getProperty(badgeRef.current, 'rotation') as number;
          }
        },
      });
    }

    return () => {
      idleAnimationRef.current?.kill();
    };
  }, [smoothingDuration, idleRotation]);

  // Handle mouse move - 360 degree rotation based on angle from center
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || !badgeRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Get center of the container
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position relative to center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate angle in degrees (0-360, starting from top, clockwise)
      let angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
      if (angle < 0) angle += 360;

      // Calculate translation based on distance from center (normalized)
      const maxDistance = Math.min(rect.width, rect.height) / 2;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      const translateX = (deltaX / maxDistance) * translationRange;
      const translateY = (deltaY / maxDistance) * translationRange;

      // Stop idle animation when interacting
      if (idleAnimationRef.current && !idleAnimationRef.current.paused()) {
        // Get current rotation before pausing
        currentRotationRef.current = gsap.getProperty(badgeRef.current, 'rotation') as number;
        idleAnimationRef.current.pause();
      }

      // Apply 360 degree rotation based on mouse angle
      quickRotateRef.current?.(angle);
      quickXRef.current?.(translateX);
      quickYRef.current?.(translateY);
    },
    [translationRange]
  );

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    quickScaleRef.current?.(1.08);

    // Pause idle rotation
    if (idleAnimationRef.current) {
      currentRotationRef.current = gsap.getProperty(badgeRef.current, 'rotation') as number;
      idleAnimationRef.current.pause();
    }
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    quickScaleRef.current?.(1);

    // Reset position but keep current rotation
    quickXRef.current?.(0);
    quickYRef.current?.(0);

    // Resume idle rotation after delay
    if (idleRotation && idleAnimationRef.current) {
      gsap.delayedCall(0.5, () => {
        if (!isHoveringRef.current && idleAnimationRef.current) {
          idleAnimationRef.current.resume();
        }
      });
    }
  }, [idleRotation]);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Default icon - APOSTLE monogram
  const defaultIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-10 h-10 text-white/90"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer"
      style={{ zIndex: 10 }}
    >
      <div
        ref={badgeRef}
        className="relative flex items-center justify-center bg-black/60 backdrop-blur-lg border border-white/20 shadow-xl rounded-full"
        style={{
          width: size,
          height: size,
          willChange: 'transform',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Glass highlight overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 60%)',
          }}
        />

        {/* Icon container */}
        <div className="relative z-10">{icon || defaultIcon}</div>

        {/* Subtle ring */}
        <div
          className="absolute inset-1 rounded-full border border-white/10 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>
    </div>
  );
}

export default HeroBadge;
