/**
 * Color Palette Configuration
 * Brand colors and design tokens
 */

export const colors = {
  // Brand colors
  brand: {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#E11D48', // Rose-600
  },

  // Neutral palette
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },

  // Semantic colors
  success: {
    light: '#D1FAE5',
    default: '#10B981',
    dark: '#065F46',
  },
  warning: {
    light: '#FEF3C7',
    default: '#F59E0B',
    dark: '#92400E',
  },
  error: {
    light: '#FEE2E2',
    default: '#EF4444',
    dark: '#991B1B',
  },
  info: {
    light: '#DBEAFE',
    default: '#3B82F6',
    dark: '#1E40AF',
  },

  // Badge colors
  badge: {
    new: '#22C55E', // Green
    drop: '#A855F7', // Purple
    limited: '#F97316', // Orange
    soldOut: '#71717A', // Gray
  },
} as const;

export type ColorKey = keyof typeof colors;
