export const colors = {
  // Primary
  primary: {
    50: '#f8f5f2',
    100: '#f0ebe4',
    200: '#e0d5c8',
    300: '#cdbaa5',
    400: '#b89c7f',
    500: '#a78264',
    600: '#9a7057',
    700: '#805b49',
    800: '#6a4c40',
    900: '#584037',
    950: '#2f201b',
  },
  
  // Neutral
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
};

export const typography = {
  fontFamily: {
    sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    serif: ['var(--font-playfair)', 'Georgia', 'serif'],
    mono: ['var(--font-mono)', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
};

export const spacing = {
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const theme = {
  colors,
  typography,
  spacing,
};

export default theme;
