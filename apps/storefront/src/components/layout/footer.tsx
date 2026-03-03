import Link from 'next/link';
import { Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'New Arrivals', href: '/shop?sort=newest' },
    { name: 'Best Sellers', href: '/shop?sort=bestselling' },
    { name: 'Sale', href: '/shop?sale=true' },
  ],
  collections: [
    { name: 'Winter Collection', href: '/collections/winter' },
    { name: 'Streetwear Essentials', href: '/collections/essentials' },
    { name: 'Limited Edition', href: '/collections/limited' },
    { name: 'Collaborations', href: '/collections/collabs' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Sustainability', href: '/sustainability' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-6 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-2xl font-light tracking-[0.2em] text-white">
              URBANCART
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
              Premium Indian streetwear for the urban trendsetter. Authentic, exclusive, unapologetically bold.
            </p>
            <div className="mt-8 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/30">Shop</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/30">Collections</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/30">Support</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-white/30">Company</h4>
            <ul className="mt-6 space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-8">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} UrbanCart. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs">
            <Link href="/privacy" className="text-white/40 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
