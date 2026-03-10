'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Textarea,
} from '@apostle/ui';
import {
  ArrowLeft,
  Package,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Printer,
  Download,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Send,
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  variant: string;
  sku: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  billingAddress: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  timeline: {
    status: string;
    timestamp: string;
    description: string;
  }[];
}

const mockOrder: Order = {
  id: 'ORD-2024-001',
  customer: {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
  },
  shippingAddress: {
    line1: '42, Lotus Heights, 3rd Floor',
    line2: 'Near City Mall, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
  },
  billingAddress: {
    line1: '42, Lotus Heights, 3rd Floor',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
  },
  items: [
    {
      id: '1',
      name: 'Urban Oversized Tee',
      variant: 'Black / M',
      sku: 'TEE-BLK-M',
      quantity: 2,
      price: 1999,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
    },
    {
      id: '2',
      name: 'Streetwear Hoodie',
      variant: 'Gray / L',
      sku: 'HOOD-GRY-L',
      quantity: 1,
      price: 3499,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop',
    },
  ],
  subtotal: 7497,
  shipping: 0,
  discount: 500,
  tax: 502,
  total: 7499,
  status: 'shipped',
  paymentStatus: 'paid',
  paymentMethod: 'Razorpay (UPI)',
  trackingNumber: 'DELHIVERY123456789',
  carrier: 'Delhivery',
  notes: 'Customer requested gift wrapping.',
  createdAt: '2024-01-15T10:30:00',
  updatedAt: '2024-01-16T14:20:00',
  timeline: [
    {
      status: 'Order Placed',
      timestamp: '2024-01-15T10:30:00',
      description: 'Order was placed by customer',
    },
    {
      status: 'Payment Confirmed',
      timestamp: '2024-01-15T10:32:00',
      description: 'Payment of ₹7,499 received via UPI',
    },
    {
      status: 'Processing',
      timestamp: '2024-01-15T11:00:00',
      description: 'Order is being prepared',
    },
    {
      status: 'Shipped',
      timestamp: '2024-01-16T14:20:00',
      description: 'Package handed over to Delhivery',
    },
  ],
};

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  processing: 'outline',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
};

const paymentColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  paid: 'default',
  failed: 'destructive',
  refunded: 'outline',
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [internalNote, setInternalNote] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrder(mockOrder);
      setNewStatus(mockOrder.status);
      setTrackingNumber(mockOrder.trackingNumber || '');
      setIsLoading(false);
    };
    fetchOrder();
  }, [params.id]);

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (order) {
      setOrder({
        ...order,
        status: newStatus as Order['status'],
        trackingNumber: trackingNumber || order.trackingNumber,
      });
    }
    setIsUpdating(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <Link href="/orders">
          <Button className="mt-4">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{order.id}</h1>
              <Badge variant={statusColors[order.status]}>{order.status}</Badge>
              <Badge variant={paymentColors[order.paymentStatus]}>{order.paymentStatus}</Badge>
            </div>
            <p className="text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.variant} • SKU: {item.sku}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (GST)</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-6">
                {order.timeline.map((event, index) => (
                  <div key={index} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="h-full w-px bg-border" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(event.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          {order.trackingNumber && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Carrier</p>
                    <p>{order.carrier}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tracking Number</p>
                    <p className="font-mono">{order.trackingNumber}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  Track Package
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update Status */}
          <Card>
            <CardHeader>
              <CardTitle>Update Order</CardTitle>
              <CardDescription>Change status or add tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Order Status</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tracking Number</label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleStatusUpdate} disabled={isUpdating}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
                {isUpdating ? 'Updating...' : 'Update Order'}
              </Button>
            </CardContent>
          </Card>

          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {order.customer.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customer.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.pincode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={paymentColors[order.paymentStatus]}>{order.paymentStatus}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{formatCurrency(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Internal Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.notes && (
                <div className="rounded-md bg-muted p-3 text-sm">{order.notes}</div>
              )}
              <Textarea
                placeholder="Add internal note..."
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                className="min-h-[80px]"
              />
              <Button variant="outline" size="sm" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
