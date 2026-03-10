'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, MapPin, Plus, Check, Truck, Shield, Package } from 'lucide-react';
import Image from 'next/image';
import { useCartStore, selectCartItems, selectCartSubtotal, selectIsCartEmpty } from '@/stores/cart.store';
import { cn } from '@/lib/utils';

const savedAddresses = [
  {
    id: '1',
    name: 'John Doe',
    address: '123 Main Street, Apt 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 98765 43210',
    isDefault: true,
  },
];

export default function CheckoutShippingPage() {
  const router = useRouter();
  const cartItems = useCartStore(selectCartItems);
  const subtotal = useCartStore(selectCartSubtotal);
  const isEmpty = useCartStore(selectIsCartEmpty);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]?.id || '');
  const [showNewAddressForm, setShowNewAddressForm] = useState(savedAddresses.length === 0);
  const [isLoading, setIsLoading] = useState(false);
  
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Handle hydration
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsMounted(true);
  }, []);

  // Redirect to cart if empty
  useEffect(() => {
    if (isMounted && isEmpty) {
      router.push('/cart');
    }
  }, [isMounted, isEmpty, router]);

  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Determine the shipping address to use
    let shippingAddress;
    if (showNewAddressForm) {
      shippingAddress = newAddress;
    } else {
      const selected = savedAddresses.find(addr => addr.id === selectedAddress);
      if (selected) {
        shippingAddress = {
          name: selected.name,
          phone: selected.phone,
          address: selected.address,
          city: selected.city,
          state: selected.state,
          pincode: selected.pincode,
        };
      }
    }
    
    // Save to sessionStorage for payment page
    if (shippingAddress) {
      sessionStorage.setItem('checkoutShippingAddress', JSON.stringify(shippingAddress));
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/checkout/payment');
  };

  const steps = [
    { name: 'Shipping', completed: false, current: true },
    { name: 'Payment', completed: false, current: false },
    { name: 'Confirmation', completed: false, current: false },
  ];

  return (
    <div className="py-6 md:py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Progress Steps */}
        <nav aria-label="Progress" className="mb-10 md:mb-14">
          <ol className="flex items-center justify-center">
            {steps.map((step, i) => (
              <li key={step.name} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                    step.current
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-lg shadow-neutral-900/20'
                      : step.completed
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-neutral-200 bg-white text-neutral-400'
                  )}>
                    {step.completed ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{i + 1}</span>
                    )}
                    {step.current && (
                      <span className="absolute -inset-1 rounded-full border-2 border-neutral-900/20 animate-pulse" />
                    )}
                  </div>
                  <span className={cn(
                    'mt-2 text-xs font-medium tracking-wide',
                    step.current ? 'text-neutral-900' : 'text-neutral-400'
                  )}>
                    {step.name}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn(
                    'mx-4 md:mx-8 h-0.5 w-12 md:w-24 transition-colors duration-300',
                    step.completed ? 'bg-emerald-500' : 'bg-neutral-200'
                  )} />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-neutral-100 bg-gradient-to-r from-neutral-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-neutral-900">Shipping Address</h1>
                    <p className="text-sm text-neutral-500">Where should we deliver your order?</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Saved Addresses */}
                {savedAddresses.length > 0 && !showNewAddressForm && (
                  <div className="space-y-4 mb-6">
                    {savedAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={cn(
                          'block p-5 rounded-xl cursor-pointer transition-all duration-200',
                          'border-2 hover:shadow-md',
                          selectedAddress === addr.id
                            ? 'border-neutral-900 bg-neutral-50 shadow-md'
                            : 'border-neutral-100 bg-white hover:border-neutral-200'
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            'flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                            selectedAddress === addr.id
                              ? 'border-neutral-900 bg-neutral-900'
                              : 'border-neutral-300 bg-white'
                          )}>
                            {selectedAddress === addr.id && (
                              <Check className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <input
                              type="radio"
                              name="address"
                              value={addr.id}
                              checked={selectedAddress === addr.id}
                              onChange={(e) => setSelectedAddress(e.target.value)}
                              className="sr-only"
                            />
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-neutral-900">{addr.name}</span>
                              {addr.isDefault && (
                                <span className="px-2.5 py-0.5 bg-gradient-to-r from-neutral-900 to-neutral-700 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                              {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                            <p className="text-sm text-neutral-500 mt-1">{addr.phone}</p>
                          </div>
                        </div>
                      </label>
                    ))}

                    <button
                      onClick={() => setShowNewAddressForm(true)}
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors w-full justify-center border-2 border-dashed border-neutral-200 hover:border-neutral-300"
                    >
                      <Plus className="w-4 h-4" />
                      Add new address
                    </button>
                  </div>
                )}

              {/* New Address Form */}
              {showNewAddressForm && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                      placeholder="House number, street, landmark"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">City</label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                        placeholder="Mumbai"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">State</label>
                      <select
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all appearance-none"
                        required
                      >
                        <option value="">Select state</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Kerala">Kerala</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Pincode</label>
                      <input
                        type="text"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                        placeholder="400001"
                        required
                      />
                    </div>
                  </div>

                  {savedAddresses.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      ← Use saved address instead
                    </button>
                  )}
                </form>
              )}

              {/* Continue Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || (!selectedAddress && !showNewAddressForm)}
                className={cn(
                  'w-full mt-8 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300',
                  'bg-gradient-to-r from-neutral-900 to-neutral-800 text-white',
                  'hover:from-neutral-800 hover:to-neutral-700 hover:shadow-lg hover:shadow-neutral-900/20',
                  'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Continue to Payment
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Free Shipping', desc: 'Orders over ₹2,000' },
                { icon: Shield, label: '100% Secure', desc: 'Payment protection' },
                { icon: Package, label: 'Easy Returns', desc: '15 day return policy' },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="flex flex-col items-center text-center p-4 rounded-xl bg-white border border-neutral-100">
                    <Icon className="w-6 h-6 text-neutral-600 mb-2" />
                    <span className="text-xs font-semibold text-neutral-900">{badge.label}</span>
                    <span className="text-[10px] text-neutral-500">{badge.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden sticky top-6">
              {/* Header */}
              <div className="px-6 py-4 border-b border-neutral-100 bg-gradient-to-r from-neutral-50 to-white">
                <h2 className="text-lg font-semibold text-neutral-900">Order Summary</h2>
                <p className="text-sm text-neutral-500">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
              </div>
              
              <div className="p-6">
                {!isMounted ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-20 h-24 bg-neutral-100 rounded-lg" />
                        <div className="flex-1">
                          <div className="h-4 bg-neutral-100 rounded w-2/3 mb-2" />
                          <div className="h-3 bg-neutral-100 rounded w-1/3 mb-2" />
                          <div className="h-4 bg-neutral-100 rounded w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2 -mr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
                        <div className="relative w-20 h-24 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                          <p className="text-sm font-semibold text-neutral-900 truncate">{item.product.name}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{item.color.name} / {item.size}</p>
                          <p className="text-sm font-semibold text-neutral-900 mt-2">₹{item.product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo Code */}
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Promo code"
                      className="flex-1 px-4 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
                    />
                    <button className="px-5 py-3 text-sm font-medium bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Totals */}
                <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium text-neutral-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className={cn(
                      'font-medium',
                      shipping === 0 ? 'text-emerald-600' : 'text-neutral-900'
                    )}>
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-4 border-t border-neutral-200">
                    <span className="text-neutral-900">Total</span>
                    <span className="text-neutral-900">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Savings Banner */}
                {shipping === 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/50">
                    <p className="text-xs text-emerald-700 font-medium text-center">
                      🎉 You're saving ₹99 on shipping!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
