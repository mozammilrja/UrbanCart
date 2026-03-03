'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { isLowPowerDevice, isWebGLSupported } from '@/lib/three';

interface ParticlesProps {
  count?: number;
  size?: number;
  color?: string;
}

function Particles({ count = 500, size = 0.02, color = '#ffffff' }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      opacities[i] = Math.random();
    }
    
    return { positions, opacities };
  }, [count]);
  
  useFrame((state) => {
    if (!points.current) return;
    
    // Gentle rotation
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface FloatingSphereProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  distort?: number;
}

function FloatingSphere({
  position,
  scale = 1,
  color = '#1a1a1a',
  speed = 1,
  distort = 0.3,
}: FloatingSphereProps) {
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere position={position} scale={scale} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

interface MouseLightProps {
  intensity?: number;
}

function MouseLight({ intensity = 1 }: MouseLightProps) {
  const light = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();
  
  useFrame(({ mouse }) => {
    if (!light.current) return;
    
    // Map mouse position to 3D space
    light.current.position.x = mouse.x * viewport.width * 0.5;
    light.current.position.y = mouse.y * viewport.height * 0.5;
    light.current.position.z = 5;
  });
  
  return (
    <pointLight
      ref={light}
      intensity={intensity}
      distance={15}
      decay={2}
      color="#ffffff"
    />
  );
}

interface HeroSceneContentProps {
  mouseIntensity?: number;
  particleCount?: number;
}

function HeroSceneContent({
  mouseIntensity = 1,
  particleCount = 300,
}: HeroSceneContentProps) {
  return (
    <>
      {/* Environment and lighting */}
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <MouseLight intensity={mouseIntensity} />
      
      {/* Floating spheres (product sculptures) */}
      <FloatingSphere position={[-3, 0, -2]} scale={1.5} color="#1a1a1a" speed={0.8} />
      <FloatingSphere position={[3, 1, -3]} scale={1} color="#2a2a2a" speed={1.2} />
      <FloatingSphere position={[0, -2, -4]} scale={0.8} color="#3a3a3a" speed={1} />
      <FloatingSphere position={[-4, 2, -5]} scale={0.6} color="#252525" speed={1.5} />
      <FloatingSphere position={[4, -1, -2]} scale={0.7} color="#333333" speed={0.9} />
      
      {/* Atmospheric particles */}
      <Particles count={particleCount} size={0.015} color="#ffffff" />
      
      {/* Fog effect through depth/atmosphere */}
      <fog attach="fog" args={['#0a0a0a', 5, 30]} />
    </>
  );
}

interface HeroCanvasProps {
  className?: string;
}

export function HeroCanvas({ className }: HeroCanvasProps) {
  const isLowPower = useRef(false);
  const webglSupported = useRef(true);
  
  useEffect(() => {
    isLowPower.current = isLowPowerDevice();
    webglSupported.current = isWebGLSupported();
  }, []);
  
  // Fallback for unsupported devices
  if (!webglSupported.current) {
    return (
      <div className={`bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 ${className}`} />
    );
  }
  
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#0a0a0a' }}
      >
        <HeroSceneContent
          mouseIntensity={isLowPower.current ? 0.5 : 1}
          particleCount={isLowPower.current ? 150 : 300}
        />
      </Canvas>
    </div>
  );
}

export default HeroCanvas;
