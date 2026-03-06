import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar, Footer } from '@/components/layout';

// Optimize Inter with specific weights and subsets
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// Load local brand font with next/font for optimal loading
const rustyAttack = localFont({
  src: [
    {
      path: '../../public/fonts/rusty-attack.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-brand',
  display: 'swap',
  preload: true,
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#111111',
};

export const metadata: Metadata = {
  title: {
    default: 'APOSTLE - Premium Indian Streetwear',
    template: '%s | APOSTLE',
  },
  description: 'Premium Indian streetwear crafted for those who dare to stand out. Quality materials, timeless designs, editorial aesthetic.',
  keywords: ['streetwear', 'fashion', 'india', 'premium', 'clothing', 'caps', 'hoodies', 't-shirts'],
  authors: [{ name: 'APOSTLE' }],
  openGraph: {
    title: 'APOSTLE - Premium Indian Streetwear',
    description: 'Premium Indian streetwear crafted for those who dare to stand out.',
    url: 'https://apostle.in',
    siteName: 'APOSTLE',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APOSTLE - Premium Indian Streetwear',
    description: 'Premium Indian streetwear crafted for those who dare to stand out.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${rustyAttack.variable}`}>
      <head>
        {/* Preconnect to external image domains for faster LCP */}
        <link rel="preconnect" href="https://bluorng.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://bluorng.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans antialiased bg-[#f7f7f7] text-[#111]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
