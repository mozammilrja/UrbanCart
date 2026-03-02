import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Input, Button, Separator } from '@urbancart/ui';

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
    { name: 'Returns & Exchanges', href: '/returns' },
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
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      {/* Newsletter section */}
      <div className="bg-neutral-900">
        <div className="container py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-heading text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              Join the <span className="text-brand-accent">Urban Movement</span>
            </h3>
            <p className="mt-2 text-sm text-neutral-400 sm:mt-3 sm:text-base">
              Subscribe for early access to drops, exclusive offers, and 10% off your first order.
            </p>
            <form className="mx-auto mt-6 sm:mt-8">
              <div className="flex max-w-lg flex-col gap-3 sm:flex-row sm:gap-0">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 w-full border-0 bg-neutral-800 px-4 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-brand-accent sm:rounded-r-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="h-12 shrink-0 bg-brand-accent px-8 font-semibold text-white hover:bg-brand-accent-dark sm:rounded-l-none"
                >
                  Subscribe
                </Button>
              </div>
            </form>
            <p className="mt-4 text-xs text-neutral-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-10 sm:py-12 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-6 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-neutral-900">
              URBANCART
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">
              Premium Indian streetwear for the urban trendsetter. Authentic, exclusive, unapologetically bold.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-semibold text-neutral-900">Shop</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-brand-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900">Collections</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-brand-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900">Support</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-brand-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900">Company</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 transition-colors hover:text-brand-accent"
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
      <div className="border-t border-neutral-200">
        <div className="container py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} UrbanCart. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-neutral-500 hover:text-neutral-900">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-500 hover:text-neutral-900">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-neutral-500 hover:text-neutral-900">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
