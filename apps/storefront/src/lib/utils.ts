import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `RS. ${price.toLocaleString('en-IN')}`;
}

export function formatPriceCompact(price: number): string {
  return `RS. ${price.toLocaleString('en-IN')}`;
}
