import type { Config } from 'tailwindcss';
import sharedConfig from '@urbancart/config/tailwind.config';

const config: Config = {
  presets: [sharedConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 10s ease-in-out infinite',
        'grain': 'grain 0.5s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(0) translateX(20px)' },
          '75%': { transform: 'translateY(20px) translateX(10px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, -5%)' },
          '30%': { transform: 'translate(-5%, -15%)' },
          '40%': { transform: 'translate(-15%, -5%)' },
          '50%': { transform: 'translate(-5%, 10%)' },
          '60%': { transform: 'translate(-15%, 0%)' },
          '70%': { transform: 'translate(0%, -15%)' },
          '80%': { transform: 'translate(-15%, -5%)' },
          '90%': { transform: 'translate(-10%, -15%)' },
        },
      },
    },
  },
};

export default config;
