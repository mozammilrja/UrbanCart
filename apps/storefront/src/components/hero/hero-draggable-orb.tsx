'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable, InertiaPlugin);
}

interface HeroDraggableOrbProps {
  /** Custom icon/logo element */
  icon?: React.ReactNode;
  /** Orb size in pixels */
  size?: number;
  /** Enable inertia/momentum */
  inertia?: boolean;
}

export function HeroDraggableOrb({
  icon,
  size = 80,
  inertia = true,
}: HeroDraggableOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

  // Initialize Draggable with rotation type
  useEffect(() => {
    if (!orbRef.current || !containerRef.current) return;

    const orb = orbRef.current;

    // Set initial transform for GPU acceleration
    gsap.set(orb, {
      transformOrigin: 'center center',
      force3D: true,
    });

    // Create Draggable instance with rotation type
    draggableRef.current = Draggable.create(orb, {
      type: 'rotation',
      inertia: inertia,
      cursor: 'grab',
      activeCursor: 'grabbing',
      
      onPress: function() {
        // Scale up slightly on press
        gsap.to(orb, {
          scale: 1.08,
          duration: 0.2,
          ease: 'power2.out',
        });
      },

      onRelease: function() {
        // Scale back to normal
        gsap.to(orb, {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        });
      },
    });

    // Cleanup
    return () => {
      draggableRef.current?.[0]?.kill();
    };
  }, [inertia]);

  // Default icon
  const defaultIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-8 h-8 text-white/90"
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
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 10 }}
    >
      <div
        ref={orbRef}
        className="flex items-center justify-center rounded-full select-none touch-none cursor-grab"
        style={{
          width: size,
          height: size,
          willChange: 'transform',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 10px 30px -5px rgba(0, 0, 0, 0.3),
            inset 0 1px 1px rgba(255, 255, 255, 0.15),
            0 0 40px rgba(255, 255, 255, 0.03)
          `,
        }}
      >
        {/* Glass highlight overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.2) 0%,
              rgba(255, 255, 255, 0.05) 40%,
              transparent 60%
            )`,
          }}
        />

        {/* Icon container */}
        <div className="relative z-10 pointer-events-none">
          {icon || defaultIcon}
        </div>

        {/* Inner ring */}
        <div
          className="absolute inset-1.5 rounded-full pointer-events-none"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.2)',
          }}
        />
      </div>
    </div>
  );
}

export default HeroDraggableOrb;
