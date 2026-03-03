import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
} from '@apostle/ui';
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    title: 'Total Revenue',
    value: '₹12,45,890',
    change: '+12.5%',
    trend: 'up',
    icon: IndianRupee,
    description: 'vs last month',
  },
  {
    title: 'Total Orders',
    value: '1,284',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
    description: 'vs last month',
  },
  {
    title: 'Active Customers',
    value: '3,456',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    description: 'vs last month',
  },
  {
    title: 'Products',
    value: '248',
    change: '-2.1%',
    trend: 'down',
    icon: Package,
    description: 'in stock',
  },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Rahul Sharma', amount: '₹4,599', status: 'Delivered', date: '2 hours ago' },
  { id: 'ORD-002', customer: 'Priya Patel', amount: '₹7,299', status: 'Processing', date: '4 hours ago' },
  { id: 'ORD-003', customer: 'Amit Kumar', amount: '₹2,999', status: 'Shipped', date: '6 hours ago' },
  { id: 'ORD-004', customer: 'Sneha Reddy', amount: '₹5,499', status: 'Pending', date: '8 hours ago' },
  { id: 'ORD-005', customer: 'Vikram Singh', amount: '₹8,999', status: 'Delivered', date: '12 hours ago' },
];

const topProducts = [
  { name: 'Urban Oversized Tee', sales: 245, revenue: '₹4,89,755' },
  { name: 'Street Drop Hoodie', sales: 189, revenue: '₹6,61,311' },
  { name: 'Classic Cargo Pants', sales: 156, revenue: '₹4,68,000' },
  { name: 'Limited Edition Cap', sales: 134, revenue: '₹1,33,866' },
  { name: 'Premium Sneakers', sales: 98, revenue: '₹5,87,902' },
];

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'secondary' | 'destructive'> = {
  Delivered: 'success',
  Processing: 'warning',
  Shipped: 'secondary',
  Pending: 'default',
  Cancelled: 'destructive',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === 'up' ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent orders */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your store</CardDescription>
            </div>
            <Link
              href="/orders"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{order.amount}</p>
                    <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top products */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling items this month</CardDescription>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
