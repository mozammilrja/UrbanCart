'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

interface BluorngHeroSectionProps {
  backgroundImage: string;
  mobileBackgroundImage?: string;
  ctaText?: string;
  ctaHref?: string;
  orbIcon?: React.ReactNode | string;
  orbSize?: number;
  enableParallax?: boolean;
  parallaxRange?: number;
  maxTilt?: number;
  magneticRadius?: number;
  magneticStrength?: number;
}

export function BluorngHeroSection({
  backgroundImage,
  mobileBackgroundImage,
  ctaText = 'Shop now',
  ctaHref = '/collections/all-products',
  orbIcon,
  orbSize = 90,
  enableParallax = true,
  parallaxRange = 10,
  maxTilt = 10,
  magneticRadius = 150,
  magneticStrength = 0.3,
}: BluorngHeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const orbInnerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<gsap.core.Tween | null>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const orbPosition = useRef({ x: 0, y: 0 });
  const orbTilt = useRef({ rotateX: 0, rotateY: 0 });
  const bgOffset = useRef({ x: 0, y: 0 });
  
  const targetOrbPosition = useRef({ x: 0, y: 0 });
  const targetOrbTilt = useRef({ rotateX: 0, rotateY: 0 });
  const targetMagneticPull = useRef({ x: 0, y: 0 });
  const targetBgOffset = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);

  const getDistance = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }, []);

  useEffect(() => {
    const orb = orbRef.current;
    const orbInner = orbInnerRef.current;
    const background = backgroundRef.current;
    const hero = heroRef.current;
    
    if (!orb || !orbInner || !hero) return;

    gsap.set(orb, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      force3D: true,
    });

    gsap.set(orbInner, {
      rotateX: 0,
      rotateY: 0,
      force3D: true,
      transformPerspective: 800,
    });

    rotationRef.current = gsap.to(orbInner, {
      rotation: '+=360',
      duration: 12,
      repeat: -1,
      ease: 'none',
    });

    const animationLoop = () => {
      const mouseLerp = 0.1;
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * mouseLerp;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * mouseLerp;

      const positionLerp = 0.06;
      orbPosition.current.x += (targetOrbPosition.current.x + targetMagneticPull.current.x - orbPosition.current.x) * positionLerp;
      orbPosition.current.y += (targetOrbPosition.current.y + targetMagneticPull.current.y - orbPosition.current.y) * positionLerp;

      const tiltLerp = 0.05;
      orbTilt.current.rotateX += (targetOrbTilt.current.rotateX - orbTilt.current.rotateX) * tiltLerp;
      orbTilt.current.rotateY += (targetOrbTilt.current.rotateY - orbTilt.current.rotateY) * tiltLerp;

      const bgLerp = 0.04;
      bgOffset.current.x += (targetBgOffset.current.x - bgOffset.current.x) * bgLerp;
      bgOffset.current.y += (targetBgOffset.current.y - bgOffset.current.y) * bgLerp;

      gsap.set(orb, {
        x: orbPosition.current.x,
        y: orbPosition.current.y,
      });

      gsap.set(orbInner, {
        rotateX: orbTilt.current.rotateX,
        rotateY: orbTilt.current.rotateY,
      });

      if (background && enableParallax) {
        gsap.set(background, {
          x: bgOffset.current.x,
          y: bgOffset.current.y,
        });
      }
    };

    gsap.ticker.add(animationLoop);

    return () => {
      gsap.ticker.remove(animationLoop);
      rotationRef.current?.kill();
    };
  }, [enableParallax]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const hero = heroRef.current;
    
    if (!hero) return;

    const heroRect = hero.getBoundingClientRect();
    const centerX = heroRect.width / 2;
    const centerY = heroRect.height / 2;
    const mouseX = e.clientX - heroRect.left;
    const mouseY = e.clientY - heroRect.top;
    
    mouse.current.x = mouseX;
    mouse.current.y = mouseY;

    const normalizedX = (mouseX - centerX) / centerX;
    const normalizedY = (mouseY - centerY) / centerY;

    const followStrength = 0.15;
    const maxFollow = Math.min(heroRect.width, heroRect.height) * 0.2;
    
    targetOrbPosition.current.x = normalizedX * maxFollow * followStrength;
    targetOrbPosition.current.y = normalizedY * maxFollow * followStrength;

    targetOrbTilt.current.rotateX = normalizedY * maxTilt;
    targetOrbTilt.current.rotateY = normalizedX * maxTilt;

    const orbCenterX = centerX + orbPosition.current.x;
    const orbCenterY = centerY + orbPosition.current.y;
    const distanceToOrb = getDistance(mouseX, mouseY, orbCenterX, orbCenterY);

    if (distanceToOrb < magneticRadius) {
      const pullFactor = (1 - distanceToOrb / magneticRadius) * magneticStrength;
      const dirX = mouseX - orbCenterX;
      const dirY = mouseY - orbCenterY;
      
      targetMagneticPull.current.x = dirX * pullFactor;
      targetMagneticPull.current.y = dirY * pullFactor;
    } else {
      targetMagneticPull.current.x = 0;
      targetMagneticPull.current.y = 0;
    }

    if (enableParallax) {
      targetBgOffset.current.x = -normalizedX * parallaxRange;
      targetBgOffset.current.y = -normalizedY * parallaxRange;
    }
  }, [maxTilt, magneticRadius, magneticStrength, enableParallax, parallaxRange, getDistance]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    
    gsap.to(targetOrbPosition.current, { x: 0, y: 0, duration: 0.6, ease: 'expo.out' });
    gsap.to(targetOrbTilt.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'expo.out' });
    gsap.to(targetMagneticPull.current, { x: 0, y: 0, duration: 0.4, ease: 'expo.out' });
    gsap.to(targetBgOffset.current, { x: 0, y: 0, duration: 0.8, ease: 'expo.out' });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const renderIcon = () => {
    if (!orbIcon) {
      return (
        <svg width={orbSize * 0.4} height={orbSize * 0.4} viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M12 2L2 22H7L9 18H15L17 22H22L12 2ZM12 8L15 14H9L12 8Z" fill="currentColor"/>
        </svg>
      );
    }
    
    if (typeof orbIcon === 'string') {
      return <img src={orbIcon} alt="Brand icon" className="w-2/5 h-2/5 object-contain" draggable={false}/>;
    }
    
    return orbIcon;
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div ref={backgroundRef} className="absolute inset-[-20px] will-change-transform">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          priority
          unoptimized
          className="hidden md:block object-cover object-center"
          sizes="110vw"
          draggable={false}
        />
        <Image
          src={mobileBackgroundImage || backgroundImage}
          alt="Hero background mobile"
          fill
          priority
          unoptimized
          className="block md:hidden object-cover object-center"
          sizes="110vw"
          draggable={false}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      <div
        ref={orbRef}
        className="absolute left-1/2 top-1/2 z-10 will-change-transform cursor-pointer select-none"
        style={{ width: orbSize, height: orbSize }}
      >
        <div
          ref={orbInnerRef}
          className={`w-full h-full rounded-full flex items-center justify-center backdrop-blur-xl bg-black/50 border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.15),0_0_100px_rgba(255,255,255,0.05)] transition-shadow duration-500 ${isHovering ? 'hover:shadow-[0_0_80px_rgba(255,255,255,0.25),0_0_120px_rgba(255,255,255,0.1)]' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-60" />
          <div className="absolute inset-[2px] rounded-full border border-white/10" />
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rotate-45 opacity-30" />
          </div>
          <div className="relative z-10 flex items-center justify-center">
            {renderIcon()}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <Link
          href={ctaHref}
          className="text-white text-base font-normal tracking-wide border-b border-white/80 pb-1 hover:border-white transition-colors duration-300 hover:text-white/90"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  );
}

export default BluorngHeroSection;
