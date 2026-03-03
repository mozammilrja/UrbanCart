/**
 * UrbanCart Cart & Checkout Mock Data
 */

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
  slug: string;
  maxQuantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  appliedCoupon: string | null;
}

export const initialCartItems: CartItem[] = [
  {
    id: 'cart_001',
    productId: 'prod_001',
    variantId: 'var_001_m_blk',
    name: 'Urban Oversized Tee',
    price: 1999,
    originalPrice: 2499,
    size: 'M',
    color: 'Black',
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop',
    slug: 'urban-oversized-tee-1',
    maxQuantity: 10,
  },
  {
    id: 'cart_002',
    productId: 'prod_002',
    variantId: 'var_002_l_nav',
    name: 'Street Drop Hoodie',
    price: 3499,
    size: 'L',
    color: 'Navy',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=250&fit=crop',
    slug: 'street-drop-hoodie-2',
    maxQuantity: 5,
  },
  {
    id: 'cart_003',
    productId: 'prod_004',
    variantId: 'var_004_os_blk',
    name: 'Limited Edition Cap',
    price: 999,
    size: 'One Size',
    color: 'Black',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=250&fit=crop',
    slug: 'limited-edition-cap-4',
    maxQuantity: 3,
  },
];

export const availableCoupons = [
  { code: 'URBAN20', discount: 20, type: 'percentage' as const, minOrder: 1999 },
  { code: 'FIRST500', discount: 500, type: 'fixed' as const, minOrder: 2500 },
  { code: 'FREESHIP', discount: 0, type: 'shipping' as const, minOrder: 0 },
];

export function calculateCartTotals(items: CartItem[], couponCode?: string | null): Omit<CartState, 'items' | 'appliedCoupon'> {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  let discount = 0;
  if (couponCode) {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon && subtotal >= coupon.minOrder) {
      if (coupon.type === 'percentage') {
        discount = Math.floor(subtotal * (coupon.discount / 100));
      } else if (coupon.type === 'fixed') {
        discount = coupon.discount;
      }
    }
  }
  
  const shipping = subtotal >= 2999 ? 0 : 149;
  const total = subtotal - discount + shipping;
  
  return { subtotal, discount, shipping, total, itemCount };
}

export interface ShippingAddress {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export const savedAddresses: ShippingAddress[] = [
  {
    id: 'addr_001',
    firstName: 'Rahul',
    lastName: 'Sharma',
    phone: '+91 98765 43210',
    email: 'rahul@email.com',
    address: '123 Urban Street, Bandra West',
    apartment: 'Apt 404',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    isDefault: true,
  },
  {
    id: 'addr_002',
    firstName: 'Rahul',
    lastName: 'Sharma',
    phone: '+91 98765 43210',
    email: 'rahul@email.com',
    address: '456 Fashion Avenue',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    isDefault: false,
  },
];

export interface PaymentMethod {
  id: string;
  type: 'upi' | 'card' | 'wallet' | 'netbanking' | 'cod';
  name: string;
  icon: string;
  description?: string;
}

export const paymentMethods: PaymentMethod[] = [
  { id: 'pm_upi', type: 'upi', name: 'UPI', icon: 'smartphone', description: 'Pay with any UPI app' },
  { id: 'pm_card', type: 'card', name: 'Credit/Debit Card', icon: 'credit-card', description: 'Visa, Mastercard, Rupay' },
  { id: 'pm_wallet', type: 'wallet', name: 'Wallets', icon: 'wallet', description: 'Paytm, PhonePe, Amazon Pay' },
  { id: 'pm_netbanking', type: 'netbanking', name: 'Net Banking', icon: 'building-2', description: 'All major banks' },
  { id: 'pm_cod', type: 'cod', name: 'Cash on Delivery', icon: 'banknote', description: '₹50 extra charges' },
];
