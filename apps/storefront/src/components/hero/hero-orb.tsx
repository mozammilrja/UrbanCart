'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

interface HeroOrbProps {
  /** Background image URL for the orb */
  imageSrc?: string;
  /** Custom icon src (fallback if no image) */
  iconSrc?: string;
  /** Orb size in pixels */
  size?: number;
}

export function HeroOrb({ imageSrc, iconSrc, size = 180 }: HeroOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const autoRotationRef = useRef<gsap.core.Tween | null>(null);
  const floatTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

  useEffect(() => {
    const orb = orbRef.current;
    const container = containerRef.current;

    if (!orb || !container) return;

    // Get container dimensions for bounds
    const containerRect = container.getBoundingClientRect();
    const boundSize = Math.min(containerRect.width, containerRect.height) * 0.25;

    // Set initial transform with GPU acceleration
    gsap.set(orb, {
      transformOrigin: 'center center',
      force3D: true, // Force GPU acceleration
      willChange: 'transform',
      x: 0,
      y: 0,
    });

    // Organic floating animation using only transform properties (GPU accelerated)
    floatTimelineRef.current = gsap.timeline({ repeat: -1, yoyo: false });
    
    floatTimelineRef.current
      .to(orb, {
        x: 15,
        y: -12,
        duration: 3,
        ease: 'sine.inOut',
      })
      .to(orb, {
        x: -10,
        y: -8,
        duration: 2.5,
        ease: 'sine.inOut',
      })
      .to(orb, {
        x: -18,
        y: 10,
        duration: 3.2,
        ease: 'sine.inOut',
      })
      .to(orb, {
        x: 8,
        y: 15,
        duration: 2.8,
        ease: 'sine.inOut',
      })
      .to(orb, {
        x: 20,
        y: -5,
        duration: 3,
        ease: 'sine.inOut',
      })
      .to(orb, {
        x: 0,
        y: 0,
        duration: 2.5,
        ease: 'sine.inOut',
      });

    // Auto rotation - continuous spin (GPU accelerated)
    autoRotationRef.current = gsap.to(orb, {
      rotation: '+=360',
      duration: 20,
      repeat: -1,
      ease: 'none', // Linear for smooth rotation
    });

    // Create Draggable for position
    draggableRef.current = Draggable.create(orb, {
      type: 'x,y',
      inertia: true,
      cursor: 'grab',
      activeCursor: 'grabbing',
      bounds: {
        minX: -boundSize,
        maxX: boundSize,
        minY: -boundSize,
        maxY: boundSize,
      },
      edgeResistance: 0.85,

      onPress: function() {
        floatTimelineRef.current?.pause();
        gsap.to(orb, {
          scale: 1.08,
          duration: 0.2,
          ease: 'power2.out',
        });
      },

      onRelease: function() {
        gsap.to(orb, {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        });
      },

      onThrowComplete: function() {
        gsap.to(orb, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.8)',
          onComplete: () => {
            floatTimelineRef.current?.restart();
          }
        });
      },
    });

    // Handle window resize
    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      const newBoundSize = Math.min(newRect.width, newRect.height) * 0.25;
      draggableRef.current?.[0].applyBounds({
        minX: -newBoundSize,
        maxX: newBoundSize,
        minY: -newBoundSize,
        maxY: newBoundSize,
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      draggableRef.current?.[0]?.kill();
      autoRotationRef.current?.kill();
      floatTimelineRef.current?.kill();
    };
  }, []);

  // Default icon - Stylized geometric "A" monogram
  const defaultIcon = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className="w-full h-full"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" fill="#0f0f0f" />
      <path 
        d="M50 18 L78 78 L68 78 L60 58 L40 58 L32 78 L22 78 Z" 
        fill="none" 
        stroke="white" 
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line x1="36" y1="52" x2="64" y2="52" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 30 L58 48 L42 48 Z" fill="#0f0f0f" />
      <circle cx="50" cy="18" r="3" fill="white" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 10 }}
      role="presentation"
      aria-hidden="true"
    >
      <div
        ref={orbRef}
        className="rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none overflow-hidden will-change-transform pointer-events-auto"
        style={{
          width: size,
          height: size,
          background: imageSrc ? 'transparent' : 'radial-gradient(circle at 30% 30%, #444 0%, #1a1a1a 50%, #000 100%)',
          border: '3px solid rgba(255, 255, 255, 0.15)',
          boxShadow: `
            0 0 40px rgba(0, 0, 0, 0.5),
            0 0 80px rgba(0, 0, 0, 0.3),
            0 20px 50px -15px rgba(0, 0, 0, 0.7),
            inset 0 -5px 20px rgba(0, 0, 0, 0.4),
            inset 0 5px 15px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Background image if provided */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-full pointer-events-none"
            loading="lazy"
            aria-hidden="true"
          />
        )}

        {/* Glass highlight overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 30%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        {/* Icon container */}
        {!imageSrc && (
          <div className="absolute inset-2 z-10 pointer-events-none">
            {iconSrc ? (
              <img src={iconSrc} alt="" className="w-full h-full object-contain" aria-hidden="true" />
            ) : (
              defaultIcon
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroOrb;
