import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/collections' },
    { label: 'Caps', href: '/caps' },
    { label: 'Hoodies', href: '/hoodies' },
    { label: 'T-Shirts', href: '/collections/t-shirts' },
    { label: 'New Arrivals', href: '/collections/new' },
  ],
  support: [
    { label: 'Track Order', href: '/track-order' },
    { label: 'Shipping & Delivery', href: '/shipping' },
    { label: 'Returns & Exchange', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Contact Us', href: '/contact' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Stores', href: '/stores' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/apostle', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/apostle', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/apostle', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/apostle', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block text-2xl font-semibold tracking-[0.2em]">
              APOSTLE
            </Link>
            <p className="text-sm text-[#999] leading-relaxed max-w-xs">
              Premium Indian streetwear crafted for those who dare to stand out. 
              Quality materials, timeless designs.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#333] hover:border-white hover:bg-white hover:text-black transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#999] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#999] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#999] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-[#222]">
          <div className="max-w-md">
            <h4 className="text-xs font-medium tracking-widest uppercase mb-4">Newsletter</h4>
            <p className="text-sm text-[#999] mb-4">
              Subscribe for exclusive drops and early access.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-[#333] px-4 py-3 text-sm focus:border-white focus:outline-none transition-colors placeholder:text-[#666]"
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 text-sm font-medium tracking-wide hover:bg-[#ededed] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#222]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666]">
            <p>&copy; {new Date().getFullYear()} APOSTLE. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Made in India 🇮🇳</span>
              <span>INR ₹</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
