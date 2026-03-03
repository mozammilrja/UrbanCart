import { http, HttpResponse, delay } from 'msw';
import {
  customers,
  getCustomerById,
  getCustomerByEmail,
  getCustomersBySegment,
} from '../data/customers';
import type { Customer } from '@apostle/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const customerHandlers = [
  // Get all customers with filtering and pagination
  http.get(`${BASE_URL}/customers`, async ({ request }) => {
    await delay(300);
    
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const segment = url.searchParams.get('segment') as Customer['segment'] | null;
    const search = url.searchParams.get('search');
    
    let filteredCustomers = [...customers];
    
    // Apply segment filter
    if (segment) {
      filteredCustomers = getCustomersBySegment(segment);
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower) ||
          c.phone?.includes(search)
      );
    }
    
    // Sort by newest first
    filteredCustomers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
    
    return HttpResponse.json({
      success: true,
      data: paginatedCustomers,
      pagination: {
        page,
        limit,
        total: filteredCustomers.length,
        totalPages: Math.ceil(filteredCustomers.length / limit),
        hasMore: endIndex < filteredCustomers.length,
      },
    });
  }),

  // Get single customer by ID
  http.get(`${BASE_URL}/customers/:id`, async ({ params }) => {
    await delay(200);
    
    const { id } = params;
    const customer = getCustomerById(id as string);
    
    if (!customer) {
      return HttpResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      data: customer,
    });
  }),

  // Update customer
  http.patch(`${BASE_URL}/customers/:id`, async ({ params, request }) => {
    await delay(300);
    
    const { id } = params;
    const body = await request.json() as Partial<Customer>;
    const customer = getCustomerById(id as string);
    
    if (!customer) {
      return HttpResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    const updatedCustomer = {
      ...customer,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json({
      success: true,
      data: updatedCustomer,
    });
  }),
];
