import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b3380f",
        "background-light": "#f8f6f6",
        "background-dark": "#221510",
        "neutral-ivory": "#f3eae7",
        "neutral-charcoal": "#2d1d17",
        "warm-black": "#1a1513",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "Manrope", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "Noto Serif", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};
export default config;
