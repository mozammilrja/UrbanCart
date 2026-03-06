// APOSTLE Design System
// Premium streetwear aesthetic - Editorial, fashion-forward, minimal

export const theme = {
  colors: {
    primary: '#000000',
    background: '#F7F7F7',
    surface: '#FFFFFF',
    textDark: '#111111',
    textMuted: '#777777',
    textLight: '#999999',
    accent: '#EDEDED',
    border: '#E5E5E5',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  spacing: {
    section: 'py-20 md:py-24 lg:py-32',
    container: 'max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8',
    gap: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    },
  },
  
  typography: {
    hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight',
    heading1: 'text-3xl sm:text-4xl md:text-5xl font-light tracking-tight',
    heading2: 'text-2xl sm:text-3xl md:text-4xl font-light tracking-tight',
    heading3: 'text-xl sm:text-2xl font-light tracking-tight',
    body: 'text-base font-normal tracking-wide',
    bodySmall: 'text-sm font-normal tracking-wide',
    caption: 'text-xs font-normal tracking-widest uppercase',
    price: 'text-sm font-medium tracking-wide',
  },
  
  animation: {
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.5,
    },
    easing: [0.25, 0.1, 0.25, 1],
    hover: {
      scale: 1.03,
      y: -4,
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',     
    xl: '1280px',
    '2xl': '1440px',
  },
} as const;

// Framer Motion variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
  },
};
