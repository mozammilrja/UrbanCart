# Feature: Backend Foundation

The following plan should be complete, but it's important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils, types, and models. Import from the right files, etc.

## Feature Description

Build the complete Express.js backend foundation for UrbanCart. This includes TypeScript configuration, Express app setup, MongoDB connection with Mongoose models, Redis caching layer, structured logging, middleware architecture, and error handling. The foundation will support all subsequent features (auth, products, cart, checkout, orders, admin).

## User Story

As a backend engineer,
I want a solid, well-structured Express backend with database connectivity
So that I can rapidly implement features (auth, products, orders) with consistent patterns

## Problem Statement

UrbanCart currently has no backend infrastructure. Without a properly configured Express server, database models, and middleware architecture, feature implementation will be inconsistent and error-prone.

## Solution Statement

Implement Express.js with TypeScript, configure MongoDB (Mongoose ODM) for persistence, set up Redis for session/cache storage, establish middleware patterns for auth/logging/error handling, and create all database schemas with proper indexes. This foundation will standardize how all subsequent features are built.

## Feature Metadata

**Feature Type**: Infrastructure  
**Estimated Complexity**: Medium  
**Primary Systems Affected**: Backend API, Database, Caching  
**Dependencies**: `infra-foundation.md` completed, Express, TypeScript, MongoDB, Redis, Mongoose, Morgan, Pino (logging), dotenv, Zod

---

## CONTEXT REFERENCES

### Relevant Documentation - READ BEFORE IMPLEMENTING!

| Document | Lines | Why Read |
|----------|-------|----------|
| `infra-foundation.md` | 1-220 | Environment matrix, CI/CD, DB/cache provisioning prerequisites |
| `.claude/PRD.md` | 1-100 | Product vision, user personas, MVP scope |
| `.claude/PRD.md` | 600-800 | Data models and API specifications |
| `.claude/SYSTEM_DESIGN.md` | 800-1200 | Database schemas, capacity planning, failure modes |
| `.claude/SYSTEM_DESIGN.md` | 1200-1400 | Low-level design: MongoDB indexes, Redis strategy |
| `CLAUDE.md` | 1-120 | Backend code conventions, TypeScript patterns |
| `README.md` | 1-50 | Project setup, available commands |

### New Files to Create

```
backend/
├── src/
│   ├── index.ts                      # Express app entry point
│   ├── config/
│   │   ├── database.ts               # MongoDB connection
│   │   ├── redis.ts                  # Redis client setup
│   │   ├── logger.ts                 # Pino logging configuration
│   │   └── env.ts                    # Environment variable validation (Zod)
│   ├── middleware/
│   │   ├── error-handler.ts          # Global error handling
│   │   ├── request-logger.ts         # Request/response logging
│   │   ├── auth.ts                   # JWT verification middleware
│   │   ├── validation.ts             # Request body validation (Zod)
│   │   └── cors.ts                   # CORS configuration
│   ├── models/
│   │   ├── User.ts                   # User schema (password, email, role)
│   │   ├── Product.ts                # Product schema (with variants, images)
│   │   ├── Order.ts                  # Order schema (items, payment, shipping)
│   │   ├── Cart.ts                   # Cart schema (temporary, for guests)
│   │   ├── Collection.ts             # Collection schema
│   │   ├── Category.ts               # Category schema
│   │   └── index.ts                  # Barrel exports
│   ├── types/
│   │   ├── express.d.ts              # Augmented Express Request type (user property)
│   │   ├── models.ts                 # TypeScript interfaces for models
│   │   └── api.ts                    # API request/response types
│   ├── utils/
│   │   ├── hash.ts                   # Argon2id password hashing
│   │   ├── jwt.ts                    # JWT token generation/verification
│   │   └── errors.ts                 # Custom error classes
│   ├── routes/
│   │   └── index.ts                  # Route registration (empty for now)
│   └── constants/
│       └── index.ts                  # Constants (HTTP statuses, error messages)
├── .env.example                      # Example environment variables
├── package.json                      # Dependencies + scripts
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Backend setup instructions
```

### Patterns to Follow

**Environment Validation Pattern (from CLAUDE.md):**
```typescript
// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(8000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  MONGODB_URI: z.string().startsWith('mongodb'),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
});

export const env = envSchema.parse(process.env);
```

**Express App Setup Pattern:**
```typescript
// src/index.ts
import express from 'express';
import cors from 'cors';
import { logger } from './config/logger';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';

const app = express();

// Middleware stack
app.use(express.json());
app.use(cors());
app.use(requestLogger); // Log all requests

// Routes (will be added later)
app.use('/api/v1', router);

// Error handling (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
```

**Mongoose Schema Pattern (TypeScript):**
```typescript
// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, lowercase: true, required: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes for performance
UserSchema.index({ email: 1 }); // Unique query
UserSchema.index({ createdAt: -1 }); // List queries

export const User = mongoose.model<IUser>('User', UserSchema);
```

**Error Handling Pattern:**
```typescript
// src/utils/errors.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Usage
throw new AppError(400, 'Invalid email format', { field: 'email' });
```

**Logger Pattern (Pino):**
```typescript
// src/config/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

// Usage
logger.info({ userId: 123 }, 'User registered');
logger.error({ error: err }, 'Database connection failed');
```

---

## IMPLEMENTATION PLAN

### Phase 1: Project Setup & Configuration
Initialize Express project, install dependencies, set up TypeScript and environment validation.

### Phase 2: Database Configuration
Configure MongoDB connection with Mongoose, create all data models with indexes, set up Redis client.

### Phase 3: Middleware & Error Handling
Implement middleware stack (CORS, logging, auth, error handling) following Express best practices.

### Phase 4: Utilities & Helpers
Create password hashing, JWT token generation, and custom error classes.

### Phase 5: Validation
Run basic health checks: can connect to DB/Redis, can start server, TypeScript compiles.

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

---

### Task 1: CREATE `package.json` and install dependencies

Set up the Node.js project with all required dependencies.

**DEPENDENCIES TO ADD:**
- `express` (web framework)
- `typescript` (language)
- `mongoose` (MongoDB ODM)
- `redis` (Redis client)
- `dotenv` (env var loading)
- `zod` (validation)
- `pino` (structured logging)
- `pino-pretty` (dev logging)
- `cors` (CORS middleware)
- `argon2` (password hashing)
- `jsonwebtoken` (JWT tokens)

**DEV DEPENDENCIES:**
- `@types/node`, `@types/express`, `@types/jsonwebtoken`
- `ts-node` (TypeScript execution)
- `tsx` (faster TypeScript execution)
- `eslint`, `prettier` (code quality)

**SCRIPTS:**
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/"
  }
}
```

**GOTCHA:** Use exact versions from CLAUDE.md, don't use wildcards (*) for pinned dependencies  
**VALIDATE:** Run `npm install` successfully, no peer dependency warnings

---

### Task 2: CREATE `src/config/env.ts`

Centralize environment variable validation using Zod.

**REQUIREMENTS:**
- Define schema for all required env vars (NODE_ENV, PORT, MONGODB_URI, REDIS_URL, JWT secrets, etc.)
- Parse process.env against schema
- Export validated `env` object for use in other modules
- Set sensible defaults (PORT=8000, LOG_LEVEL=info)
- Fail fast if required vars are missing

**GOTCHA:** SECRET keys must be min 32 chars - validate this  
**VALIDATE:** Try to import and use `env` in another file, should have proper types

---

### Task 3: CREATE `.env.example`

Document all environment variables needed.

**FILE CONTENT:**
```
NODE_ENV=development
PORT=8000
LOG_LEVEL=info

# Database
MONGODB_URI=mongodb://localhost:27017/urbancart

# Cache
REDIS_URL=redis://localhost:6379

# Authentication
JWT_ACCESS_SECRET=your-secret-key-min-32-characters-here
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars

# Email (Resend)
RESEND_API_KEY=

# Payment (Razorpay)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Errors
SENTRY_DSN=
```

**VALIDATE:** Commit to git, add `backend/.env` to `.gitignore`

---

### Task 4: CREATE `tsconfig.json`

Configure TypeScript compiler for strict mode.

**REQUIRED SETTINGS:**
- `"strict": true` (catch errors at compile time)
- `"esModuleInterop": true` (CommonJS compatibility)
- `"resolveJsonModule": true` (import JSON files)
- `"outDir": "dist"` (compiled output directory)
- `"rootDir": "src"` (source directory)
- `"target": "ES2020"` (modern JavaScript)
- `"module": "commonjs"` (module format)

**VALIDATE:** Run `tsc --noEmit` successfully with no errors

---

### Task 5: CREATE `src/config/logger.ts`

Set up Pino structured logging.

**REQUIREMENTS:**
- Configure Pino with environment-based log level
- Use pino-pretty for dev (readable), JSON for prod
- Export logger singleton
- Include request ID support (future)

**PATTERN:**
```typescript
import pino from 'pino';
import { env } from './env';

export const logger = pino({
  level: env.LOG_LEVEL,
  transport: env.NODE_ENV === 'development' 
    ? { target: 'pino-pretty' }
    : undefined,
});
```

**VALIDATE:** Import and call `logger.info()`, should not throw

---

### Task 6: CREATE `src/config/database.ts`

Connect to MongoDB with Mongoose.

**REQUIREMENTS:**
- Load MONGODB_URI from env
- Set connection options (useNewUrlParser, useUnifiedTopology, etc.)
- Handle connection success/failure with logging
- Export mongoose instance for model creation
- Set up connection pooling

**PATTERN:**
```typescript
import mongoose from 'mongoose';
import { env } from './env';
import { logger } from './logger';

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error(error, 'MongoDB connection failed');
    process.exit(1);
  }
}
```

**GOTCHA:** MongoDB must be running locally or Atlas URI must be valid  
**VALIDATE:** Call `connectDB()`, should log "MongoDB connected"

---

### Task 7: CREATE `src/config/redis.ts`

Set up Redis client.

**REQUIREMENTS:**
- Load REDIS_URL from env
- Create Redis client instance
- Handle connection events (connect, error)
- Export client as singleton
- Set up connection pooling

**PATTERN:**
```typescript
import { createClient } from 'redis';
import { env } from './env';
import { logger } from './logger';

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (err) => logger.error(err));
redisClient.on('connect', () => logger.info('Redis connected'));

export async function connectRedis() {
  await redisClient.connect();
}
```

**GOTCHA:** Redis must be running or Upstash URL must be valid  
**VALIDATE:** Call `connectRedis()`, should log "Redis connected"

---

### Task 8: CREATE `src/types/express.d.ts`

Augment Express Request type with user property.

**REQUIREMENT:**
- Extend Express.Request to include `user` property (set by auth middleware)
- Include user id, email, role

**PATTERN:**
```typescript
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: 'customer' | 'admin';
      };
    }
  }
}
```

**VALIDATE:** TypeScript should recognize `req.user` in route handlers without errors

---

### Task 9: CREATE `src/utils/errors.ts`

Custom error classes for consistent error handling.

**REQUIREMENTS:**
- AppError class with statusCode, message, details properties
- Extend native Error for stack traces
- ValidationError subclass for input validation
- AuthenticationError subclass for auth failures
- AuthorizationError subclass for permission failures

**PATTERN:**
```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(400, message, details);
    this.name = 'ValidationError';
  }
}
```

**VALIDATE:** Import and throw errors in route handlers (will test in Task 12)

---

### Task 10: CREATE `src/utils/hash.ts`

Password hashing with Argon2id.

**REQUIREMENTS:**
- `hashPassword(password: string): Promise<string>` - Hash plain text password
- `verifyPassword(plain: string, hash: string): Promise<boolean>` - Verify password
- Use Argon2id algorithm (more secure than bcrypt)
- Time cost: 2 (recommend by OWASP)

**PATTERN:**
```typescript
import { hash, verify } from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    timeCost: 2,
    memoryCost: 65536, // 64 MB
  });
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return verify(hash, plain);
}
```

**VALIDATE:** Call both functions, verify hash is different from input

---

### Task 11: CREATE `src/utils/jwt.ts`

JWT token generation and verification.

**REQUIREMENTS:**
- `generateAccessToken(userId: string, email: string, role: string)` - Access token (15 min)
- `generateRefreshToken(userId: string)` - Refresh token (7 days)
- `verifyAccessToken(token: string)` - Verify and decode access token
- `verifyRefreshToken(token: string)` - Verify and decode refresh token
- Sign with RS256 (asymmetric) or HS256 (symmetric)

**FOR MVP:** Use HS256 (symmetric) with single secret for simplicity

**PATTERN:**
```typescript
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function generateAccessToken(userId: string, email: string, role: string) {
  return jwt.sign(
    { sub: userId, email, role },
    env.JWT_ACCESS_SECRET,
    { expiresIn: '15m', algorithm: 'HS256' }
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}
```

**VALIDATE:** Generate token, decode and verify it decodes correctly

---

### Task 12: CREATE `src/middleware/error-handler.ts`

Global error handling middleware.

**REQUIREMENTS:**
- Catch all errors from route handlers
- Format errors consistently: { error, message, statusCode, details }
- Log errors with logger
- Return appropriate HTTP status codes
- Hide sensitive info in production

**PATTERN:**
```typescript
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { AppError } from '../utils/errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err, `Error on ${req.method} ${req.path}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      details: err.details,
    });
  }

  // Default 500
  res.status(500).json({
    error: 'InternalServerError',
    message: 'Something went wrong',
  });
}
```

**VALIDATE:** Create test route that throws AppError, should return correct response

---

### Task 13: CREATE `src/middleware/request-logger.ts`

Log all incoming requests and responses.

**REQUIREMENTS:**
- Log method, path, status, response time
- Use Morgan or custom middleware with Pino
- Include request ID (optional for MVP)

**PATTERN:**
```typescript
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}
```

**VALIDATE:** Make HTTP request to Express server, check logs

---

### Task 14: CREATE `src/models/User.ts`

Mongoose User schema.

**FROM SYSTEM_DESIGN.md:** Implement full User schema with:
- `email` (unique, string)
- `passwordHash` (string)
- `firstName`, `lastName` (strings)
- `role` (enum: 'customer', 'admin')
- `emailVerified` (boolean, default false)
- `addresses` (array of sub-documents)
- `createdAt`, `updatedAt` (timestamps)

**INDEXES:**
- `email: 1` (unique)
- `createdAt: -1` (for listing)

**GOTCHA:** Don't expose passwordHash in API responses  
**VALIDATE:** Create model, import in tests

---

### Task 15: CREATE `src/models/Product.ts`

Mongoose Product schema.

**FROM SYSTEM_DESIGN.md:** Implement full Product schema with:
- `name`, `slug` (unique), `description`
- `price` (number in paise)
- `category` (ObjectId ref)
- `collection` (ObjectId ref)
- `variants` (array: size, color, sku, inventory)
- `images` (array: URL, alt text, order)
- `sizeGuide`, `materials`, `careInstructions`
- `status` (enum: draft, active, inactive)
- `createdAt`, `updatedAt`

**INDEXES:**
- `slug: 1` (unique)
- `category: 1, createdAt: -1` (category listing)
- `status: 1` (filter active products)

**VALIDATE:** Create model, check schema compiles

---

### Task 16: CREATE `src/models/Category.ts` and `src/models/Collection.ts`

Create Category and Collection schemas.

**REQUIREMENTS:**
- Category: name, slug (unique), parent (optional for hierarchy), order
- Collection: name, slug (unique), products array, description

**INDEXES:**
- Both: `slug: 1` (unique), `activeAt: -1` for listing

**VALIDATE:** Create models, verify imports work

---

### Task 17: CREATE `src/models/Order.ts`

Mongoose Order schema.

**FROM SYSTEM_DESIGN.md:** Implement Order schema with:
- `orderNumber` (unique: UC-YYYYMMDD-XXXX)
- `user` (ObjectId ref)
- `items` (array: product, variant, qty, price)
- `billing` (subtotal, tax breakdown, total)
- `shipping` (method, cost, address)
- `payment` (method, Razorpay IDs, status)
- `status` (enum: pending, confirmed, processing, shipped, delivered)
- `timeline` (array of status changes with timestamps)
- `invoice` (number, URL)
- `createdAt`, `updatedAt`

**INDEXES:**
- `orderNumber: 1` (unique)
- `user: 1, createdAt: -1` (user orders list)
- `status: 1` (filter by status)

**VALIDATE:** Create model, verify complex nesting works

---

### Task 18: CREATE `src/models/Cart.ts`

Mongoose Cart schema (for authenticated cart persistence).

**REQUIREMENTS:**
- `user` (ObjectId ref, unique for authenticated)
- `items` (array: product, variant, qty, price)
- `type` (enum: guest, authenticated)
- `expiresAt` (TTL for guest carts)
- `createdAt`, `updatedAt`

**INDEXES:**
- `user: 1` (unique, sparse for guests)
- `expiresAt: 1` (TTL index for auto-delete)

**VALIDATE:** Create model

---

### Task 19: CREATE `src/models/index.ts`

Barrel export all models.

**PATTERN:**
```typescript
export { User, type IUser } from './User';
export { Product, type IProduct } from './Product';
export { Category, type ICategory } from './Category';
export { Collection, type ICollection } from './Collection';
export { Order, type IOrder } from './Order';
export { Cart, type ICart } from './Cart';
```

**VALIDATE:** Import all models from barrel, no errors

---

### Task 20: CREATE `src/index.ts`

Express app entry point and server startup.

**REQUIREMENTS:**
- Import all config (env, logger, database, redis)
- Create Express app
- Apply middleware stack (CORS, JSON, logging, error handler)
- Call `connectDB()` and `connectRedis()` on startup
- Start server on PORT
- Graceful shutdown on SIGTERM (close DB, Redis, server)

**PATTERN:**
```typescript
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDB } from './config/database';
import { connectRedis } from './config/redis';
import { logger } from './config/logger';
import { errorHandler } from './middleware/error-handler';
import { requestLogger } from './middleware/request-logger';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);

// Health check (for now)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler (last)
app.use(errorHandler);

// Start server
async function start() {
  await connectDB();
  await connectRedis();
  
  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
  });
}

start().catch((err) => {
  logger.error(err);
  process.exit(1);
});
```

**VALIDATE:** Run `npm run dev`, server should start and respond to `/api/health`

---

### Task 21: TEST - Verify backend foundation

**TESTS:**

1. **TypeScript Compilation**
   ```bash
   npm run build
   # Should complete with no errors
   ```

2. **Server Startup**
   ```bash
   npm run dev
   # Should log: "MongoDB connected", "Redis connected", "Server running on port 8000"
   ```

3. **Health Endpoint**
   ```bash
   curl http://localhost:8000/api/health
   # Should return: {"status":"ok"}
   ```

4. **Error Handling**
   - Add test route that throws AppError
   - Should return proper error response with statusCode

5. **Logging**
   - Check console output for structured logs (requests, connections)

**GOTCHA:** MongoDB and Redis must be running locally or env vars must point to valid instances  
**VALIDATE:** All tests pass, no compilation errors, server starts cleanly

---

## COMPLETION CHECKLIST

- [ ] `package.json` created with all dependencies
- [ ] `.env.example` created
- [ ] `tsconfig.json` configured for strict mode
- [ ] All config files created (env, logger, database, redis)
- [ ] All models created (User, Product, Order, Cart, Category, Collection)
- [ ] All middleware created (error handler, request logger)
- [ ] Utility files created (errors, hash, jwt)
- [ ] `src/index.ts` entry point created
- [ ] Express server starts without errors
- [ ] MongoDB connection succeeds
- [ ] Redis connection succeeds
- [ ] Health endpoint returns 200 OK
- [ ] Logging output is structured and readable

---

**Next Feature:** After completing this, proceed to `authentication-system.md` to implement auth endpoints.

**Estimated Time:** 4-6 hours for experienced backend engineer  
**Team:** 1-2 Backend Engineers
