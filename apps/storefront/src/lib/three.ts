/**
 * Three.js Configuration and Utilities
 * GPU-optimized settings for cinematic experience
 */

import * as THREE from 'three';

export const threeConfig = {
  // Renderer settings
  renderer: {
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance' as const,
    stencil: false,
    depth: true,
  },
  
  // Performance settings
  performance: {
    maxPixelRatio: 2,
    shadowMapSize: 1024,
    maxAnisotropy: 4,
  },
  
  // Camera defaults
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
  },
  
  // Lighting presets
  lighting: {
    ambient: {
      color: 0x404040,
      intensity: 0.5,
    },
    directional: {
      color: 0xffffff,
      intensity: 1,
      position: [10, 10, 10],
    },
  },
};

/**
 * Create optimized WebGL renderer
 */
export function createRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    ...threeConfig.renderer,
  });
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, threeConfig.performance.maxPixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  
  return renderer;
}

/**
 * Create perspective camera with defaults
 */
export function createCamera(aspect: number): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    threeConfig.camera.fov,
    aspect,
    threeConfig.camera.near,
    threeConfig.camera.far
  );
  
  return camera;
}

/**
 * Create scene with fog for depth
 */
export function createScene(fogColor = 0x0a0a0a, fogNear = 10, fogFar = 100): THREE.Scene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(fogColor);
  scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
  
  return scene;
}

/**
 * Add standard lighting setup
 */
export function addLighting(scene: THREE.Scene): void {
  // Ambient light
  const ambient = new THREE.AmbientLight(
    threeConfig.lighting.ambient.color,
    threeConfig.lighting.ambient.intensity
  );
  scene.add(ambient);
  
  // Key light
  const keyLight = new THREE.DirectionalLight(
    threeConfig.lighting.directional.color,
    threeConfig.lighting.directional.intensity
  );
  keyLight.position.set(10, 10, 10);
  scene.add(keyLight);
  
  // Fill light
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
  fillLight.position.set(-10, 0, 10);
  scene.add(fillLight);
  
  // Rim light
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
  rimLight.position.set(0, 10, -10);
  scene.add(rimLight);
}

/**
 * Check for WebGL support
 */
export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Check if device is low-power (mobile/tablet)
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return true;
  
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  const isLowMemory = 'deviceMemory' in navigator && (navigator as 'deviceMemory' extends keyof Navigator ? Navigator : { deviceMemory: number }).deviceMemory < 4;
  
  return isMobile || isLowMemory;
}

/**
 * Dispose Three.js objects properly
 */
export function disposeObject(obj: THREE.Object3D): void {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
      } else if (child.material) {
        child.material.dispose();
      }
    }
  });
}
