import { http, HttpResponse, delay } from 'msw';
import {
  orders,
  getOrderById,
  getOrderByNumber,
  getOrdersByCustomerId,
  getOrdersByStatus,
} from '../data/orders';
import type { Order } from '@apostle/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const orderHandlers = [
  // Get all orders with filtering and pagination
  http.get(`${BASE_URL}/orders`, async ({ request }) => {
    await delay(300);
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const status = url.searchParams.get('status') as Order['status'] | null;
    const customerId = url.searchParams.get('customerId');
    const search = url.searchParams.get('search');
    
    let filteredOrders = [...orders];
    
    // Apply status filter
    if (status) {
      filteredOrders = getOrdersByStatus(status);
    }
    
    // Apply customer filter
    if (customerId) {
      filteredOrders = filteredOrders.filter((o) => o.customerId === customerId);
    }
    
    // Apply search filter (order number, customer name, or email)
    if (search) {
      const searchLower = search.toLowerCase();
      filteredOrders = filteredOrders.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchLower) ||
          `${o.customer.firstName} ${o.customer.lastName}`.toLowerCase().includes(searchLower) ||
          o.customer.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by newest first
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    return HttpResponse.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        page,
        limit,
        total: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / limit),
        hasMore: endIndex < filteredOrders.length,
      },
    });
  }),

  // Get single order by ID or order number
  http.get(`${BASE_URL}/orders/:id`, async ({ params }) => {
    await delay(200);
    
    const { id } = params;
    const order = getOrderById(id as string) || getOrderByNumber(id as string);
    
    if (!order) {
      return HttpResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      data: order,
    });
  }),

  // Get orders for a customer
  http.get(`${BASE_URL}/customers/:customerId/orders`, async ({ params }) => {
    await delay(250);
    
    const { customerId } = params;
    const customerOrders = getOrdersByCustomerId(customerId as string);
    
    return HttpResponse.json({
      success: true,
      data: customerOrders,
    });
  }),

  // Update order status
  http.patch(`${BASE_URL}/orders/:id/status`, async ({ params, request }) => {
    await delay(300);
    
    const { id } = params;
    const body = await request.json() as { status: Order['status'] };
    const order = getOrderById(id as string);
    
    if (!order) {
      return HttpResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // In real scenario, this would update the database
    const updatedOrder = {
      ...order,
      status: body.status,
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json({
      success: true,
      data: updatedOrder,
    });
  }),

  // Create new order
  http.post(`${BASE_URL}/orders`, async ({ request }) => {
    await delay(500);
    
    const body = await request.json() as Partial<Order>;
    
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
      customerId: body.customerId || 'guest',
      customer: body.customer || {
        id: 'guest',
        firstName: 'Guest',
        lastName: 'User',
        email: 'guest@example.com',
      },
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: body.paymentMethod || 'COD',
      items: body.items || [],
      subtotal: body.subtotal || 0,
      discount: body.discount || 0,
      shipping: body.shipping || 0,
      tax: body.tax || 0,
      total: body.total || 0,
      currency: 'INR',
      shippingAddress: body.shippingAddress!,
      billingAddress: body.billingAddress!,
      timeline: [
        { status: 'pending', timestamp: new Date().toISOString(), note: 'Order placed' },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json({
      success: true,
      data: newOrder,
    }, { status: 201 });
  }),
];
