'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@urbancart/ui';
import { useCartStore, type CartItem } from '@urbancart/hooks';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Building2,
  CheckCircle,
  Shield,
  Lock,
  ChevronDown,
} from 'lucide-react';
import {
  Section,
  Container,
  GrainOverlay,
} from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { PageTransition } from '@/components/motion/page-transition';
import { MagneticButton } from '@/components/motion/magnetic-button';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const initialFormData: CheckoutFormData = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
};

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Wallet, description: 'GPay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
  { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

// Mock cart items for design preview
const mockCartItems: CartItem[] = [
  {
    id: 'mock-1',
    productId: 'prod-1',
    variantId: 'var-1',
    name: 'Urban Oversized Tee',
    price: 1999,
    quantity: 2,
    size: 'M',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=125&fit=crop',
  },
  {
    id: 'mock-2',
    productId: 'prod-2',
    variantId: 'var-2',
    name: 'Street Drop Hoodie',
    price: 3499,
    quantity: 1,
    size: 'L',
    color: 'Navy',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=125&fit=crop',
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Use mock items if cart is empty
  const displayItems = isHydrated && items.length === 0 ? mockCartItems : items;
  const isUsingMockData = isHydrated && items.length === 0;
  
  const subtotal = displayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };
  
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and show success
    if (!isUsingMockData) {
      clearCart();
    }
    setStep('success');
    setIsProcessing(false);
  };
  
  // Success state
  if (step === 'success') {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black">
          <GrainOverlay opacity={0.03} />
          
          <Section className="flex min-h-[80vh] items-center justify-center">
            <Container>
              <FadeIn>
                <div className="mx-auto max-w-lg text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle className="h-12 w-12 text-green-400" />
                  </div>
                  <h1 className="mt-8 text-3xl font-light text-white">Order Confirmed!</h1>
                  <p className="mt-4 text-white/60">
                    Thank you for your purchase. Your order #UC{Math.random().toString().slice(2, 10)} has been placed successfully.
                  </p>
                  <p className="mt-2 text-sm text-white/40">
                    You will receive an email confirmation shortly.
                  </p>
                  
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <MagneticButton strength={0.3}>
                      <Link
                        href="/account/orders"
                        className="inline-flex items-center justify-center bg-white px-8 py-4 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-neutral-200"
                      >
                        View Orders
                      </Link>
                    </MagneticButton>
                    <Link
                      href="/shop"
                      className="inline-flex items-center justify-center border border-white/30 px-8 py-4 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/5"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </Container>
          </Section>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        <GrainOverlay opacity={0.03} />
        
        {/* Header */}
        <Section className="pt-28 pb-4 border-b border-white/10">
          <Container>
            <div className="flex items-center justify-between">
              <Link
                href="/cart"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Link>
              
              {/* Checkout steps */}
              <div className="hidden items-center gap-4 text-sm sm:flex">
                <span className={cn(
                  'flex items-center gap-2',
                  step === 'shipping' ? 'text-white' : 'text-white/40'
                )}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-black">
                    1
                  </span>
                  Shipping
                </span>
                <div className="h-px w-8 bg-white/20" />
                <span className={cn(
                  'flex items-center gap-2',
                  step === 'payment' ? 'text-white' : 'text-white/40'
                )}>
                  <span className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-xs',
                    step === 'payment' ? 'bg-white text-black' : 'border border-white/30 text-white/40'
                  )}>
                    2
                  </span>
                  Payment
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/30">
                <Lock className="h-3 w-3" />
                Secure Checkout
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Main Content */}
        <Section className="py-8">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
              {/* Left Column - Form */}
              <div>
                <FadeIn>
                  {step === 'shipping' && (
                    <form onSubmit={handleContinueToPayment}>
                      <h2 className="text-xl font-light text-white">Shipping Information</h2>
                      
                      {/* Contact */}
                      <div className="mt-8">
                        <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/50">
                          Contact
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                            required
                            className="col-span-2 border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone number"
                            required
                            className="col-span-2 border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none sm:col-span-1"
                          />
                        </div>
                      </div>
                      
                      {/* Shipping Address */}
                      <div className="mt-8">
                        <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-white/50">
                          Shipping Address
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First name"
                            required
                            className="border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                          />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last name"
                            required
                            className="border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                          />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            required
                            className="col-span-2 border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                          />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            required
                            className="border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                          />
                          <div className="relative">
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                              className="w-full appearance-none border border-white/20 bg-transparent px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                            >
                              <option value="" className="bg-black">Select State</option>
                              {indianStates.map(state => (
                                <option key={state} value={state} className="bg-black">{state}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                          </div>
                          <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="PIN Code"
                            required
                            pattern="[0-9]{6}"
                            className="border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
                          />
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            disabled
                            className="border border-white/10 bg-white/5 px-4 py-3 text-white/50"
                          />
                        </div>
                      </div>
                      
                      <MagneticButton strength={0.3} className="mt-8">
                        <button
                          type="submit"
                          className="w-full bg-white py-4 text-sm font-medium uppercase tracking-wider text-black transition-colors hover:bg-neutral-200 sm:w-auto sm:px-12"
                        >
                          Continue to Payment
                        </button>
                      </MagneticButton>
                    </form>
                  )}
                  
                  {step === 'payment' && (
                    <div>
                      <h2 className="text-xl font-light text-white">Payment Method</h2>
                      
                      {/* Payment options */}
                      <div className="mt-8 space-y-3">
                        {paymentMethods.map(method => (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={cn(
                              'flex w-full items-center gap-4 border p-4 transition-all',
                              paymentMethod === method.id
                                ? 'border-white bg-white/5'
                                : 'border-white/20 hover:border-white/40'
                            )}
                          >
                            <div className={cn(
                              'flex h-10 w-10 items-center justify-center rounded-full',
                              paymentMethod === method.id ? 'bg-white text-black' : 'bg-white/10 text-white/50'
                            )}>
                              <method.icon className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium text-white">{method.name}</p>
                              <p className="text-sm text-white/50">{method.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <button
                          onClick={() => setStep('shipping')}
                          className="border border-white/20 px-8 py-4 text-sm font-medium uppercase tracking-wider text-white/70 transition-colors hover:border-white/40"
                        >
                          Back
                        </button>
                        <MagneticButton strength={0.3}>
                          <button
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className={cn(
                              'flex items-center justify-center gap-2 px-12 py-4 text-sm font-medium uppercase tracking-wider transition-colors',
                              isProcessing
                                ? 'bg-white/50 text-black/50'
                                : 'bg-white text-black hover:bg-neutral-200'
                            )}
                          >
                            {isProcessing ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                                Processing...
                              </>
                            ) : (
                              `Pay ${formatPrice(total)}`
                            )}
                          </button>
                        </MagneticButton>
                      </div>
                    </div>
                  )}
                </FadeIn>
              </div>
              
              {/* Right Column - Order Summary */}
              <div>
                <FadeIn delay={0.1}>
                  <div className="sticky top-32 border border-white/10 bg-neutral-950 p-6">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-white/50">
                      Order Summary
                    </h3>
                    
                    {/* Items */}
                    <div className="mt-6 space-y-4">
                      {displayItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden bg-neutral-900">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center bg-white text-[10px] font-medium text-black">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">{item.name}</p>
                            <p className="text-xs text-white/40">{item.color} / {item.size}</p>
                          </div>
                          <p className="text-sm text-white">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Totals */}
                    <div className="mt-6 border-t border-white/10 pt-6 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/50">Subtotal</span>
                        <span className="text-white">{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Shipping</span>
                        <span className="text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between border-t border-white/10 pt-4">
                      <span className="text-lg font-medium text-white">Total</span>
                      <span className="text-xl font-light text-white">{formatPrice(total)}</span>
                    </div>
                    
                    {/* Trust badges */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-white/30">
                      <Shield className="h-3 w-3" />
                      100% Secure Payment
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </PageTransition>
  );
}
