/**
 * Navigation Configuration
 * Header and footer navigation links
 */

import { ROUTES } from './routes';

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

// Main navigation links
export const mainNavigation: NavItem[] = [
  {
    label: 'Shop',
    href: ROUTES.SHOP,
    children: [
      { label: 'All Products', href: ROUTES.SHOP },
      { label: 'T-Shirts', href: ROUTES.CATEGORY('t-shirts') },
      { label: 'Hoodies', href: ROUTES.CATEGORY('hoodies') },
      { label: 'Caps', href: ROUTES.CATEGORY('caps') },
      { label: 'Accessories', href: ROUTES.CATEGORY('accessories') },
    ],
  },
  {
    label: 'Collections',
    href: ROUTES.COLLECTIONS,
    children: [
      { label: 'View All', href: ROUTES.COLLECTIONS },
      { label: 'Summer Drop', href: ROUTES.COLLECTION('summer-drop'), badge: 'NEW' },
      { label: 'Essentials', href: ROUTES.COLLECTION('essentials') },
      { label: 'Limited Edition', href: ROUTES.COLLECTION('limited-edition') },
    ],
  },
  {
    label: 'Journal',
    href: ROUTES.JOURNAL,
  },
  {
    label: 'About',
    href: ROUTES.ABOUT,
  },
  {
    label: 'Stores',
    href: ROUTES.STORES,
  },
];

// Footer navigation
export const footerNavigation = {
  shop: {
    title: 'Shop',
    links: [
      { label: 'All Products', href: ROUTES.SHOP },
      { label: 'T-Shirts', href: ROUTES.CATEGORY('t-shirts') },
      { label: 'Hoodies', href: ROUTES.CATEGORY('hoodies') },
      { label: 'Caps', href: ROUTES.CATEGORY('caps') },
      { label: 'Accessories', href: ROUTES.CATEGORY('accessories') },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: ROUTES.ABOUT },
      { label: 'Journal', href: ROUTES.JOURNAL },
      { label: 'Stores', href: ROUTES.STORES },
      { label: 'Contact', href: ROUTES.CONTACT },
      { label: 'FAQ', href: ROUTES.FAQ },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Shipping Info', href: ROUTES.SHIPPING_INFO },
      { label: 'Returns & Exchanges', href: ROUTES.RETURN_POLICY },
      { label: 'Size Guide', href: '#size-guide' },
      { label: 'Track Order', href: ROUTES.ORDERS },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY },
      { label: 'Terms of Service', href: ROUTES.TERMS_OF_SERVICE },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
};

// Account dropdown navigation
export const accountNavigation: NavItem[] = [
  { label: 'My Profile', href: ROUTES.PROFILE },
  { label: 'Orders', href: ROUTES.ORDERS },
  { label: 'Addresses', href: ROUTES.ADDRESSES },
  { label: 'Wishlist', href: ROUTES.WISHLIST },
];
