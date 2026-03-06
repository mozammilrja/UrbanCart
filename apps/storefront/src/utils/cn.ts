/**
 * Class Name Utility
 * Combines clsx and tailwind-merge for conditional class names
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS intelligence
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
