import { ROUTES } from './routes';

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const mainNavigation: NavigationItem[] = [
  { label: 'Shop', href: ROUTES.SHOP },
  { label: 'Collections', href: ROUTES.COLLECTIONS },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Journal', href: ROUTES.JOURNAL },
  { label: 'Store', href: ROUTES.STORE },
];

export const footerNavigation = {
  shop: [
    { label: 'All Products', href: ROUTES.SHOP },
    { label: 'Collections', href: ROUTES.COLLECTIONS },
    { label: 'New Arrivals', href: `${ROUTES.SHOP}?filter=new` },
    { label: 'Sale', href: `${ROUTES.SHOP}?filter=sale` },
  ],
  company: [
    { label: 'About Us', href: ROUTES.ABOUT },
    { label: 'Journal', href: ROUTES.JOURNAL },
    { label: 'Store Locations', href: ROUTES.STORE },
    { label: 'Careers', href: '/careers' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Size Guide', href: '/size-guide' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

export const accountNavigation: NavigationItem[] = [
  { label: 'My Account', href: ROUTES.ACCOUNT },
  { label: 'Orders', href: ROUTES.ORDERS },
  { label: 'Settings', href: ROUTES.SETTINGS },
];
