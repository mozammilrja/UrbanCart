'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, CreditCard, Smartphone, Building2, Wallet, Check, Shield } from 'lucide-react';
import { useCartStore, selectCartItems, selectCartSubtotal, selectIsCartEmpty } from '@/stores/cart.store';
import { useOrderStore } from '@/stores/order.store';

const paymentMethods = [
  {
    id: 'upi',
    name: 'UPI',
    description: 'Pay using any UPI app',
    icon: Smartphone,
    popular: true,
  },
  {
    id: 'card',
    name: 'Credit / Debit Card',
    description: 'Visa, Mastercard, RuPay',
    icon: CreditCard,
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    description: 'All major banks supported',
    icon: Building2,
  },
  {
    id: 'wallet',
    name: 'Wallets',
    description: 'Paytm, PhonePe, Amazon Pay',
    icon: Wallet,
  },
];

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const cartItems = useCartStore(selectCartItems);
  const subtotal = useCartStore(selectCartSubtotal);
  const isEmpty = useCartStore(selectIsCartEmpty);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isLoading, setIsLoading] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
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

  const handleSubmit = async () => {
    setIsLoading(true);
    // TODO: Integrate with Razorpay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get shipping address from sessionStorage
    let shippingAddress = {
      name: 'Guest',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
    };
    try {
      const savedAddress = sessionStorage.getItem('checkoutShippingAddress');
      if (savedAddress) {
        shippingAddress = JSON.parse(savedAddress);
      }
    } catch (e) {
      console.error('Failed to parse shipping address', e);
    }
    
    // Create order items from cart items
    const orderItems = cartItems.map(item => ({
      id: item.id,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      price: item.product.price * item.quantity,
    }));
    
    // Create order in store
    const order = addOrder({
      items: orderItems,
      subtotal,
      shipping,
      total,
      paymentMethod: selectedMethod,
      shippingAddress,
    });
    
    // Store order info in sessionStorage for confirmation page
    sessionStorage.setItem('lastOrder', JSON.stringify({
      items: cartItems,
      subtotal,
      shipping,
      total,
      orderId: order.id,
      orderDate: order.createdAt,
    }));
    
    // Clear checkout data
    sessionStorage.removeItem('checkoutShippingAddress');
    clearCart();
    router.push('/checkout/confirmation');
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {['Shipping', 'Payment', 'Confirmation'].map((step, i) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= 1
                    ? i < 1 ? 'bg-green-500 text-white' : 'bg-[#111] text-white'
                    : 'bg-[#e5e5e5] text-[#999]'
                }`}>
                  {i < 1 ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`hidden sm:block text-sm ${i === 1 ? 'text-[#111] font-medium' : 'text-[#999]'}`}>
                  {step}
                </span>
              </div>
              {i < 2 && <ChevronRight className="w-4 h-4 text-[#ccc]" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-light tracking-tight">Payment Method</h1>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Shield className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 mb-6">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-[#111] bg-[#fafafa]'
                        : 'border-[#e5e5e5] hover:border-[#ccc]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedMethod === method.id
                          ? 'border-[#111] bg-[#111]'
                          : 'border-[#ccc]'
                      }`}>
                        {selectedMethod === method.id && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="w-10 h-10 bg-[#f5f5f5] rounded-lg flex items-center justify-center">
                        <method.icon className="w-5 h-5 text-[#333]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.name}</span>
                          {method.popular && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase tracking-wider rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#666]">{method.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* UPI Details */}
              {selectedMethod === 'upi' && (
                <div className="border-t border-[#e5e5e5] pt-6">
                  <label className="block text-sm font-medium text-[#333] mb-2">Enter UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:outline-none focus:border-[#333]"
                    placeholder="yourname@upi"
                  />
                  <p className="text-xs text-[#999] mt-2">
                    Or you can scan QR code on the next step
                  </p>
                </div>
              )}

              {/* Card Details */}
              {selectedMethod === 'card' && (
                <div className="border-t border-[#e5e5e5] pt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-2">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:outline-none focus:border-[#333]"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#333] mb-2">Expiry</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:outline-none focus:border-[#333]"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333] mb-2">CVV</label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:outline-none focus:border-[#333]"
                        placeholder="•••"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333] mb-2">Name on Card</label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl focus:outline-none focus:border-[#333]"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/checkout/shipping"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-[#e5e5e5] rounded-xl text-[#666] hover:bg-[#f9f9f9] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Link>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-[#111] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Pay ₹{total.toLocaleString()}
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#e5e5e5] p-6 sticky top-8">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              {!isMounted ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-16 h-20 bg-[#f5f5f5] rounded-lg" />
                      <div className="flex-1">
                        <div className="h-4 bg-[#f5f5f5] rounded w-2/3 mb-2" />
                        <div className="h-3 bg-[#f5f5f5] rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-20 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#111] text-white text-xs flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-[#666]">{item.color.name} / {item.size}</p>
                        <p className="text-sm mt-1">₹{item.product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-[#e5e5e5] pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#666]">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#666]">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-3 border-t border-[#e5e5e5]">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-[#e5e5e5]">
                <div className="flex items-center justify-center gap-4 text-[#999]">
                  <Image src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" width={80} height={20} className="opacity-50" />
                </div>
                <p className="text-xs text-center text-[#999] mt-3">
                  Your payment info is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
