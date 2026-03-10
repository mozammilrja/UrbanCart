'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Textarea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@apostle/ui';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Heart,
  CreditCard,
  Star,
  Tag,
  Send,
  Clock,
  Package,
  TrendingUp,
  Edit,
  MoreHorizontal,
} from 'lucide-react';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  segment: 'vip' | 'loyal' | 'regular' | 'new';
  status: 'active' | 'inactive';
  joinDate: string;
  lastOrderDate?: string;
  stats: {
    totalOrders: number;
    totalSpent: number;
    avgOrderValue: number;
    wishlistItems: number;
  };
  addresses: Address[];
  recentOrders: Order[];
  tags: string[];
  notes?: string;
  activity: {
    date: string;
    action: string;
    details: string;
  }[];
}

const mockCustomer: Customer = {
  id: '1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  segment: 'vip',
  status: 'active',
  joinDate: '2023-06-15',
  lastOrderDate: '2024-01-15',
  stats: {
    totalOrders: 12,
    totalSpent: 45999,
    avgOrderValue: 3833,
    wishlistItems: 8,
  },
  addresses: [
    {
      id: '1',
      type: 'home',
      line1: '42, Lotus Heights, 3rd Floor',
      line2: 'Near City Mall, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      line1: 'Tech Park, Building A, Floor 5',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      isDefault: false,
    },
  ],
  recentOrders: [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 7499,
      items: 3,
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-02',
      status: 'delivered',
      total: 4999,
      items: 2,
    },
    {
      id: 'ORD-2023-158',
      date: '2023-12-20',
      status: 'delivered',
      total: 12499,
      items: 4,
    },
    {
      id: 'ORD-2023-142',
      date: '2023-12-05',
      status: 'cancelled',
      total: 2999,
      items: 1,
    },
  ],
  tags: ['VIP', 'Early Adopter', 'Streetwear Enthusiast'],
  notes: 'Prefers oversized fits. Usually orders during sales. Has requested notification for limited edition drops.',
  activity: [
    {
      date: '2024-01-15T14:30:00',
      action: 'Order Delivered',
      details: 'ORD-2024-001 was delivered successfully',
    },
    {
      date: '2024-01-15T10:30:00',
      action: 'Order Placed',
      details: 'Placed order ORD-2024-001 worth ₹7,499',
    },
    {
      date: '2024-01-10T16:45:00',
      action: 'Added to Wishlist',
      details: 'Added "Limited Edition Bomber Jacket" to wishlist',
    },
    {
      date: '2024-01-02T11:20:00',
      action: 'Order Delivered',
      details: 'ORD-2024-002 was delivered successfully',
    },
  ],
};

const segmentColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  vip: 'default',
  loyal: 'default',
  regular: 'secondary',
  new: 'outline',
};

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  processing: 'outline',
  shipped: 'default',
  delivered: 'default',
  cancelled: 'destructive',
};

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCustomer(mockCustomer);
      setIsLoading(false);
    };
    fetchCustomer();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
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

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold">Customer not found</h2>
        <Link href="/customers">
          <Button className="mt-4">Back to Customers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/customers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Avatar className="h-16 w-16">
            <AvatarImage src={customer.avatar} alt={customer.name} />
            <AvatarFallback className="text-lg">
              {customer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
              <Badge variant={segmentColors[customer.segment]} className="uppercase">
                {customer.segment}
              </Badge>
            </div>
            <p className="text-muted-foreground">Customer since {formatDate(customer.joinDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customer.stats.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(customer.stats.totalSpent)}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(customer.stats.avgOrderValue)}</p>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customer.stats.wishlistItems}</p>
                <p className="text-sm text-muted-foreground">Wishlist Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>View and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>{formatCurrency(order.total)}</TableCell>
                          <TableCell>
                            <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Link href={`/orders/${order.id}`}>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-center">
                    <Link href={`/orders?customer=${customer.id}`}>
                      <Button variant="outline" size="sm">
                        View All Orders
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>Recent customer activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-6">
                    {customer.activity.map((event, index) => (
                      <div key={index} className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <Clock className="h-4 w-4" />
                          </div>
                          {index < customer.activity.length - 1 && (
                            <div className="h-full w-px bg-border" />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className="font-medium">{event.action}</p>
                          <p className="text-sm text-muted-foreground">{event.details}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDateTime(event.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Customer shipping addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {customer.addresses.map((address) => (
                      <div key={address.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Badge variant="outline" className="capitalize">
                            {address.type}
                          </Badge>
                          {address.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <div className="text-sm">
                          <p>{address.line1}</p>
                          {address.line2 && <p>{address.line2}</p>}
                          <p>
                            {address.city}, {address.state} {address.pincode}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              {customer.lastOrderDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Last order: {formatDate(customer.lastOrderDate)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-3 h-8 text-xs">
                + Add Tag
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customer.notes && (
                <div className="rounded-md bg-muted p-3 text-sm">{customer.notes}</div>
              )}
              <Textarea
                placeholder="Add a note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[80px]"
              />
              <Button variant="outline" size="sm" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Save Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
