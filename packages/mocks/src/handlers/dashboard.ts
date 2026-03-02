import { http, HttpResponse, delay } from 'msw';
import { orders } from '../data/orders';
import { customers } from '../data/customers';
import { products } from '../data/products';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const dashboardHandlers = [
  // Get dashboard stats
  http.get(`${BASE_URL}/admin/dashboard/stats`, async () => {
    await delay(300);
    
    const totalRevenue = orders
      .filter((o) => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.total, 0);
    
    const totalOrders = orders.length;
    const totalCustomers = customers.length;
    const totalProducts = products.length;
    
    // Calculate change percentages (mock data)
    const revenueChange = 12.5;
    const ordersChange = 8.2;
    const customersChange = 15.3;
    const productsChange = 3.1;
    
    return HttpResponse.json({
      success: true,
      data: {
        revenue: {
          value: totalRevenue,
          change: revenueChange,
          trend: 'up',
        },
        orders: {
          value: totalOrders,
          change: ordersChange,
          trend: 'up',
        },
        customers: {
          value: totalCustomers,
          change: customersChange,
          trend: 'up',
        },
        products: {
          value: totalProducts,
          change: productsChange,
          trend: 'up',
        },
      },
    });
  }),

  // Get recent orders for dashboard
  http.get(`${BASE_URL}/admin/dashboard/recent-orders`, async () => {
    await delay(250);
    
    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    return HttpResponse.json({
      success: true,
      data: recentOrders,
    });
  }),

  // Get top products
  http.get(`${BASE_URL}/admin/dashboard/top-products`, async () => {
    await delay(250);
    
    // Calculate product sales from orders
    const productSales = new Map<string, { product: typeof products[0]; quantity: number; revenue: number }>();
    
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const existing = productSales.get(item.productId);
        const product = products.find((p) => p.id === item.productId);
        
        if (product) {
          if (existing) {
            existing.quantity += item.quantity;
            existing.revenue += item.price * item.quantity;
          } else {
            productSales.set(item.productId, {
              product,
              quantity: item.quantity,
              revenue: item.price * item.quantity,
            });
          }
        }
      });
    });
    
    const topProducts = Array.from(productSales.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((item) => ({
        id: item.product.id,
        name: item.product.name,
        image: item.product.images[0]?.url,
        sold: item.quantity,
        revenue: item.revenue,
      }));
    
    return HttpResponse.json({
      success: true,
      data: topProducts,
    });
  }),

  // Get revenue chart data
  http.get(`${BASE_URL}/admin/dashboard/revenue-chart`, async ({ request }) => {
    await delay(300);
    
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '7d';
    
    // Generate mock chart data based on period
    const generateData = (days: number) => {
      const data = [];
      const now = new Date();
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        data.push({
          date: date.toISOString().split('T')[0],
          revenue: Math.floor(Math.random() * 50000) + 10000,
          orders: Math.floor(Math.random() * 20) + 5,
        });
      }
      
      return data;
    };
    
    const days = period === '30d' ? 30 : period === '7d' ? 7 : 90;
    
    return HttpResponse.json({
      success: true,
      data: generateData(days),
    });
  }),

  // Get order status breakdown
  http.get(`${BASE_URL}/admin/dashboard/order-status`, async () => {
    await delay(200);
    
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return HttpResponse.json({
      success: true,
      data: {
        pending: statusCounts.pending || 0,
        confirmed: statusCounts.confirmed || 0,
        processing: statusCounts.processing || 0,
        shipped: statusCounts.shipped || 0,
        delivered: statusCounts.delivered || 0,
        cancelled: statusCounts.cancelled || 0,
      },
    });
  }),
];
