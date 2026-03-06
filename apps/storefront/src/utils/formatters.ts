/**
 * Formatters Utility
 * Price, date, and other formatting functions
 */

import { CURRENCY_LOCALE, CURRENCY, CURRENCY_SYMBOL } from '@/config/constants';

/**
 * Format price in INR
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format price compact (without currency symbol formatting)
 */
export function formatPriceCompact(price: number): string {
  return `${CURRENCY_SYMBOL}${price.toLocaleString(CURRENCY_LOCALE)}`;
}

/**
 * Format large numbers (1K, 1M, etc.)
 */
export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercent(price: number, comparePrice: number): number {
  if (comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

/**
 * Format discount as string
 */
export function formatDiscount(price: number, comparePrice?: number): string | null {
  if (!comparePrice || comparePrice <= price) return null;
  const discount = calculateDiscountPercent(price, comparePrice);
  return `${discount}% off`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Slugify text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Title case
 */
export function titleCase(text: string): string {
  return text
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}
