import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Minimal Header */}
      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl tracking-[0.2em] font-brand">
              APOSTLE
            </Link>
            <div className="flex items-center gap-2 text-sm text-[#666]">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-[#e5e5e5] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-[#999]">
              <Link href="/shipping" className="hover:text-[#333]">Shipping Policy</Link>
              <Link href="/returns" className="hover:text-[#333]">Returns</Link>
              <Link href="/privacy" className="hover:text-[#333]">Privacy</Link>
            </div>
            <p className="text-xs text-[#999]">© 2026 APOSTLE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
