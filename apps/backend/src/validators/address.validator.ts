import { z } from 'zod';

export const createAddressSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  phone: z.string().min(10, 'Valid phone number required').max(15),
  addressLine1: z.string().min(1, 'Address is required').max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  pincode: z.string().regex(/^\d{6}$/, 'Pincode must be 6 digits'),
  landmark: z.string().max(200).optional(),
  type: z.enum(['home', 'work', 'other']).default('home'),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
