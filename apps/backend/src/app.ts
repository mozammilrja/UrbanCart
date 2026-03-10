import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { config } from './config/index.js';
import { httpStream } from './utils/logger.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';
import {
  authRoutes,
  productsRoutes,
  cartRoutes,
  ordersRoutes,
  categoriesRoutes,
  collectionsRoutes,
  usersRoutes,
  addressesRoutes,
  wishlistRoutes,
  reviewsRoutes,
  paymentsRoutes,
  adminRoutes,
} from './routes/index.js';

const app: Application = express();

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 auth attempts per 15 min
  message: { success: false, message: 'Too many login attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/v1', limiter);
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);

// Body parsing - raw body for webhook signature verification
app.use('/api/v1/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Compression
app.use(compression());

// Logging
if (config.env !== 'test') {
  app.use(morgan('combined', { stream: httpStream }));
}

// Health check
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes (v1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/collections', collectionsRoutes);
app.use('/api/v1/user', usersRoutes);
app.use('/api/v1/user/addresses', addressesRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/products/:productId/reviews', reviewsRoutes);
app.use('/api/v1/reviews', reviewsRoutes);
app.use('/api/v1/payments', paymentsRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
