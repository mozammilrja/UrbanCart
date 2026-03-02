import { http, HttpResponse, delay } from 'msw';
import { getCustomerByEmail } from '../data/customers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Simple token store (in real app this would be more secure)
const tokens = new Map<string, { userId: string; expiresAt: number }>();

const generateToken = () => {
  return `uc_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

export const authHandlers = [
  // Login
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    await delay(500);
    
    const body = await request.json() as { email: string; password: string };
    const customer = getCustomerByEmail(body.email);
    
    // Demo credentials check
    if (body.email === 'demo@urbancart.com' && body.password === 'demo123') {
      const token = generateToken();
      tokens.set(token, {
        userId: 'cust_001',
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
      
      return HttpResponse.json({
        success: true,
        data: {
          user: {
            id: 'cust_001',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@urbancart.com',
            role: 'customer',
          },
          accessToken: token,
          refreshToken: generateToken(),
          expiresIn: 86400,
        },
      });
    }
    
    // Check if customer exists (simplified - any password works for demo)
    if (customer) {
      const token = generateToken();
      tokens.set(token, {
        userId: customer.id,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });
      
      return HttpResponse.json({
        success: true,
        data: {
          user: {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            avatar: customer.avatar,
            role: 'customer',
          },
          accessToken: token,
          refreshToken: generateToken(),
          expiresIn: 86400,
        },
      });
    }
    
    return HttpResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    );
  }),

  // Register
  http.post(`${BASE_URL}/auth/register`, async ({ request }) => {
    await delay(600);
    
    const body = await request.json() as {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string;
    };
    
    // Check if email already exists
    const existingCustomer = getCustomerByEmail(body.email);
    if (existingCustomer) {
      return HttpResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    const newUserId = `cust_${Date.now()}`;
    const token = generateToken();
    tokens.set(token, {
      userId: newUserId,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: newUserId,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          role: 'customer',
        },
        accessToken: token,
        refreshToken: generateToken(),
        expiresIn: 86400,
      },
    }, { status: 201 });
  }),

  // Logout
  http.post(`${BASE_URL}/auth/logout`, async ({ request }) => {
    await delay(200);
    
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      tokens.delete(token);
    }
    
    return HttpResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  }),

  // Get current user
  http.get(`${BASE_URL}/auth/me`, async ({ request }) => {
    await delay(200);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const token = authHeader.replace('Bearer ', '');
    const session = tokens.get(token);
    
    if (!session || session.expiresAt < Date.now()) {
      tokens.delete(token);
      return HttpResponse.json(
        { success: false, error: 'Session expired' },
        { status: 401 }
      );
    }
    
    // Return demo user for simplicity
    return HttpResponse.json({
      success: true,
      data: {
        id: session.userId,
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@urbancart.com',
        role: 'customer',
      },
    });
  }),

  // Refresh token
  http.post(`${BASE_URL}/auth/refresh`, async ({ request }) => {
    await delay(300);
    
    const body = await request.json() as { refreshToken: string };
    
    // In real app, validate refresh token
    const newToken = generateToken();
    tokens.set(newToken, {
      userId: 'cust_001',
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    
    return HttpResponse.json({
      success: true,
      data: {
        accessToken: newToken,
        expiresIn: 86400,
      },
    });
  }),

  // Admin login
  http.post(`${BASE_URL}/admin/auth/login`, async ({ request }) => {
    await delay(500);
    
    const body = await request.json() as { email: string; password: string };
    
    // Demo admin credentials
    if (body.email === 'admin@urbancart.com' && body.password === 'admin123') {
      const token = generateToken();
      tokens.set(token, {
        userId: 'admin_001',
        expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 hours for admin
      });
      
      return HttpResponse.json({
        success: true,
        data: {
          user: {
            id: 'admin_001',
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@urbancart.com',
            role: 'admin',
          },
          accessToken: token,
          refreshToken: generateToken(),
          expiresIn: 28800,
        },
      });
    }
    
    return HttpResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  }),
];
