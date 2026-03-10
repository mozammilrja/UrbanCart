'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

// Routes that have their own custom header/footer
const EXCLUDED_ROUTES = ['/checkout'];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current path should hide the main nav/footer
  const isExcluded = EXCLUDED_ROUTES.some(route => pathname?.startsWith(route));

  if (isExcluded) {
    // Checkout and similar pages handle their own layout
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
