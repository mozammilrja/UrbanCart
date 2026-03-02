'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@urbancart/ui';
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle } from 'lucide-react';

const cartItems = [
  {
    id: '1',
    name: 'Urban Oversized Tee',
    price: 1999,
    size: 'M',
    color: 'Black',
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=125&fit=crop',
  },
  {
    id: '2',
    name: 'Street Drop Hoodie',
    price: 3499,
    size: 'L',
    color: 'Navy',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=125&fit=crop',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'complete'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep('complete');
  };

  if (step === 'complete') {
    return (
      <div className="container py-16 text-center">
        <div className="mx-auto max-w-md">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-6 text-2xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your order. We've sent a confirmation email to your inbox.
          </p>
          <div className="mt-6 rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-lg font-semibold">ORD-2024-{Math.random().toString().slice(2, 8)}</p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/account/orders">
              <Button variant="outline">View Order</Button>
            </Link>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Back link */}
      <Link href="/cart" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Checkout form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Street address" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" placeholder="400001" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upi">
                    <Wallet className="mr-2 h-4 w-4" />
                    UPI
                  </TabsTrigger>
                  <TabsTrigger value="card">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="netbanking">
                    <Building2 className="mr-2 h-4 w-4" />
                    Netbanking
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upi" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@upi" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You will receive a payment request on your UPI app
                  </p>
                </TabsContent>
                <TabsContent value="card" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" type="password" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="JOHN DOE" />
                  </div>
                </TabsContent>
                <TabsContent value="netbanking" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to your bank's website to complete the payment
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Order summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size} / {item.color} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                isLoading={isLoading}
              >
                Place Order
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By placing this order, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
