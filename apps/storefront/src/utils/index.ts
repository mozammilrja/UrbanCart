/**
 * Utils Module Index
 */

// Class name utility
export { cn } from './cn';

// Storage
export { getStorageItem, setStorageItem, removeStorageItem, clearStorage, STORAGE_KEYS } from './storage';

// Validation
export {
  emailSchema,
  passwordSchema,
  phoneSchema,
  nameSchema,
  loginSchema,
  registerSchema,
  addressSchema,
  contactSchema,
  newsletterSchema,
  reviewSchema,
} from './validation';
export type {
  LoginFormData,
  RegisterFormData,
  AddressFormData,
  ContactFormData,
  NewsletterFormData,
  ReviewFormData,
} from './validation';

// Formatters
export {
  formatPrice,
  formatPriceCompact,
  formatCompactNumber,
  formatPercentage,
  calculateDiscountPercent,
  formatDiscount,
  truncateText,
  formatPhoneNumber,
  slugify,
  capitalize,
  titleCase,
} from './formatters';
