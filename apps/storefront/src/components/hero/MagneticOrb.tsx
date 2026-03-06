'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface MagneticOrbProps {
  size?: number;
  icon?: React.ReactNode | string;
  className?: string;
}

export function MagneticOrb({ size = 90, icon, className = '' }: MagneticOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);
  const orbInnerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<gsap.core.Tween | null>(null);
  
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentRotateX = useRef(0);
  const currentRotateY = useRef(0);
  const targetRotateX = useRef(0);
  const targetRotateY = useRef(0);
  const magneticPullX = useRef(0);
  const magneticPullY = useRef(0);

  useEffect(() => {
    const orb = orbRef.current;
    const orbInner = orbInnerRef.current;
    
    if (!orb || !orbInner) return;

    gsap.set(orb, { xPercent: -50, yPercent: -50, x: 0, y: 0, force3D: true });
    gsap.set(orbInner, { rotateX: 0, rotateY: 0, force3D: true, transformPerspective: 800 });

    rotationRef.current = gsap.to(orbInner, { rotation: '+=360', duration: 12, repeat: -1, ease: 'none' });

    const ticker = gsap.ticker.add(() => {
      const lerpFactor = 0.08;
      currentX.current += (targetX.current + magneticPullX.current - currentX.current) * lerpFactor;
      currentY.current += (targetY.current + magneticPullY.current - currentY.current) * lerpFactor;
      
      const tiltLerpFactor = 0.06;
      currentRotateX.current += (targetRotateX.current - currentRotateX.current) * tiltLerpFactor;
      currentRotateY.current += (targetRotateY.current - currentRotateY.current) * tiltLerpFactor;

      gsap.set(orb, { x: currentX.current, y: currentY.current });
      gsap.set(orbInner, { rotateX: currentRotateX.current, rotateY: currentRotateY.current });
    });

    return () => {
      gsap.ticker.remove(ticker);
      rotationRef.current?.kill();
    };
  }, []);

  const updatePosition = useCallback((x: number, y: number, rotateX: number, rotateY: number, pullX: number, pullY: number) => {
    targetX.current = x;
    targetY.current = y;
    targetRotateX.current = rotateX;
    targetRotateY.current = rotateY;
    magneticPullX.current = pullX;
    magneticPullY.current = pullY;
  }, []);

  useEffect(() => {
    const orb = orbRef.current;
    if (orb) (orb as any).__updatePosition = updatePosition;
  }, [updatePosition]);

  const renderIcon = () => {
    if (!icon) {
      return (
        <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M12 2L2 22H7L9 18H15L17 22H22L12 2ZM12 8L15 14H9L12 8Z" fill="currentColor"/>
        </svg>
      );
    }
    if (typeof icon === 'string') return <img src={icon} alt="Brand icon" className="w-2/5 h-2/5 object-contain"/>;
    return icon;
  };

  return (
    <div ref={orbRef} className={`absolute left-1/2 top-1/2 pointer-events-auto cursor-pointer ${className}`} style={{ width: size, height: size }}>
      <div
        ref={orbInnerRef}
        className="w-full h-full rounded-full flex items-center justify-center backdrop-blur-xl bg-black/50 border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.15),0_0_100px_rgba(255,255,255,0.05)] transition-shadow duration-300 hover:shadow-[0_0_80px_rgba(255,255,255,0.25),0_0_120px_rgba(255,255,255,0.1)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-50" />
        <div className="absolute inset-[2px] rounded-full border border-white/10" />
        <div className="relative z-10 flex items-center justify-center">{renderIcon()}</div>
      </div>
    </div>
  );
}

export default MagneticOrb;
