import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar, Footer } from '@/components/layout';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-[#f7f7f7] text-[#111]`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
