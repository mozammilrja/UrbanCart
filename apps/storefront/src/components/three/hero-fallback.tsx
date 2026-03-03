'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CSS-based animated hero background
 * Avoids Three.js SSR issues while maintaining cinematic aesthetic
 */
export function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 opacity-50">
        <div 
          className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-radial from-purple-900/30 to-transparent animate-pulse-slow"
          style={{ animationDuration: '8s' }}
        />
        <div 
          className="absolute -right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-radial from-blue-900/20 to-transparent animate-pulse-slow"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-radial from-indigo-900/20 to-transparent animate-pulse-slow"
          style={{ animationDuration: '12s', animationDelay: '4s' }}
        />
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Center focal point */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute -inset-32 animate-spin-slow opacity-30" style={{ animationDuration: '30s' }}>
            <div className="h-full w-full rounded-full border border-white/10" />
          </div>
          {/* Middle ring */}
          <div className="absolute -inset-24 animate-spin-slow opacity-40" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
            <div className="h-full w-full rounded-full border border-white/10" />
          </div>
          {/* Inner ring */}
          <div className="absolute -inset-16 animate-spin-slow opacity-50" style={{ animationDuration: '20s' }}>
            <div className="h-full w-full rounded-full border border-white/10" />
          </div>
          {/* Core glow */}
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-xl" />
        </div>
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      
      {/* Film grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <div 
          className="h-full w-full animate-grain"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}

export default HeroCanvas;
