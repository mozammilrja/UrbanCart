/**
 * Application Constants
 */

// App info
export const APP_NAME = 'APOSTLE';
export const APP_DESCRIPTION = 'Premium Indian Streetwear';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://apostle.in';

// API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_VERSION = 'v1';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// Cart
export const MAX_CART_ITEMS = 50;
export const MAX_QUANTITY_PER_ITEM = 10;

// Currency
export const CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';
export const CURRENCY_LOCALE = 'en-IN';

// Shipping
export const FREE_SHIPPING_THRESHOLD = 5000;
export const STANDARD_SHIPPING_COST = 199;
export const EXPRESS_SHIPPING_COST = 399;

// Tax
export const GST_RATE = 0.18; // 18%

// Images
export const PRODUCT_IMAGE_SIZES = {
  thumbnail: 150,
  small: 300,
  medium: 600,
  large: 900,
  full: 1200,
} as const;

// Timeouts
export const API_TIMEOUT = 30000; // 30 seconds
export const TOAST_DURATION = 5000; // 5 seconds
export const SEARCH_DEBOUNCE = 300; // 300ms

// Social links
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/apostle.in',
  twitter: 'https://twitter.com/apostle_in',
  youtube: 'https://youtube.com/@apostle.in',
  discord: 'https://discord.gg/apostle',
} as const;

// Contact
export const CONTACT_EMAIL = 'hello@apostle.in';
export const SUPPORT_EMAIL = 'support@apostle.in';
export const CONTACT_PHONE = '+91 1234567890';
