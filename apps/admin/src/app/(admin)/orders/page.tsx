'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Input,
  Badge,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@apostle/ui';
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Printer,
  Download,
  RefreshCw,
} from 'lucide-react';

const orders = [
  {
    id: 'ORD-2024-001',
    customer: 'Rahul Sharma',
    email: 'rahul@example.com',
    items: 3,
    total: 7499,
    status: 'delivered',
    payment: 'paid',
    date: '2024-01-15T10:30:00',
  },
  {
    id: 'ORD-2024-002',
    customer: 'Priya Patel',
    email: 'priya@example.com',
    items: 2,
    total: 4999,
    status: 'processing',
    payment: 'paid',
    date: '2024-01-15T09:15:00',
  },
  {
    id: 'ORD-2024-003',
    customer: 'Amit Kumar',
    email: 'amit@example.com',
    items: 1,
    total: 2999,
    status: 'shipped',
    payment: 'paid',
    date: '2024-01-14T16:45:00',
  },
  {
    id: 'ORD-2024-004',
    customer: 'Sneha Reddy',
    email: 'sneha@example.com',
    items: 4,
    total: 12499,
    status: 'pending',
    payment: 'pending',
    date: '2024-01-14T14:20:00',
  },
  {
    id: 'ORD-2024-005',
    customer: 'Vikram Singh',
    email: 'vikram@example.com',
    items: 2,
    total: 5999,
    status: 'cancelled',
    payment: 'refunded',
    date: '2024-01-14T11:00:00',
  },
  {
    id: 'ORD-2024-006',
    customer: 'Anita Desai',
    email: 'anita@example.com',
    items: 1,
    total: 3499,
    status: 'delivered',
    payment: 'paid',
    date: '2024-01-13T18:30:00',
  },
];

const statusColors: Record<string, 'success' | 'secondary' | 'warning' | 'destructive' | 'default'> = {
  delivered: 'success',
  shipped: 'secondary',
  processing: 'warning',
  pending: 'default',
  cancelled: 'destructive',
};

const paymentColors: Record<string, 'success' | 'warning' | 'secondary'> = {
  paid: 'success',
  pending: 'warning',
  refunded: 'secondary',
};

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((o) => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            View and manage customer orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync
          </Button>
        </div>
      </div>

      {/* Filters and search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID or customer..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedOrders.length === orders.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Payment</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleSelect(order.id)}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order.id}`} className="font-medium hover:underline">
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{order.items}</TableCell>
                <TableCell className="font-medium">{formatPrice(order.total)}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[order.status]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={paymentColors[order.payment]}>
                    {order.payment.charAt(0).toUpperCase() + order.payment.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                  {formatDate(order.date)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1-6 of 1,284 orders
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
