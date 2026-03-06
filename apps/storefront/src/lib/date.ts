/**
 * Date/Time Utilities with dayjs
 */

import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

/**
 * Format date for display
 */
export function formatDate(date: string | Date, formatStr: string = 'MMM d, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return format(dateObj, formatStr);
}

/**
 * Format date as relative time
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Format date for orders
 */
export function formatOrderDate(date: string | Date): string {
  return formatDate(date, 'dd MMM yyyy, hh:mm a');
}

/**
 * Format date for arrival estimates
 */
export function formatDeliveryDate(date: string | Date): string {
  return formatDate(date, 'EEEE, MMMM d');
}

/**
 * Check if date is today
 */
export function isToday(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}
