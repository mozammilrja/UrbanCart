import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { config } from '../config/index.js';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404, 'NOT_FOUND'));
};

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = err as AppError;

  // Mongoose CastError (invalid ObjectId, etc.)
  if ((err as any).name === 'CastError') {
    const castErr = err as any;
    error = new AppError(`Invalid ${castErr.path}: ${castErr.value}`, 400, 'INVALID_ID');
  }

  // Mongoose ValidationError
  if ((err as any).name === 'ValidationError') {
    const valErr = err as any;
    const messages = Object.values(valErr.errors).map((e: any) => e.message);
    error = new AppError(`Validation failed: ${messages.join(', ')}`, 400, 'VALIDATION_ERROR');
  }

  // MongoDB duplicate key (code 11000)
  if ((err as any).code === 11000) {
    const dupErr = err as any;
    const field = Object.keys(dupErr.keyValue || {})[0] || 'field';
    error = new AppError(`Duplicate value for ${field}. Please use another value.`, 409, 'DUPLICATE_KEY');
  }

  // JWT TokenExpiredError
  if ((err as any).name === 'TokenExpiredError') {
    error = new AppError('Your token has expired. Please log in again.', 401, 'TOKEN_EXPIRED');
  }

  // JWT JsonWebTokenError
  if ((err as any).name === 'JsonWebTokenError') {
    error = new AppError('Invalid token. Please log in again.', 401, 'INVALID_TOKEN');
  }

  if (!(error instanceof AppError)) {
    error = new AppError(err.message || 'Something went wrong', 500);
  }

  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  logger.error(`${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  if (config.env === 'development') {
    return res.status(error.statusCode).json({
      success: false,
      status: error.status,
      message: error.message,
      code: error.code,
      stack: error.stack,
      error,
    });
  }

  if (error.isOperational) {
    return res.status(error.statusCode).json({
      success: false,
      status: error.status,
      message: error.message,
      code: error.code,
    });
  }

  return res.status(500).json({
    success: false,
    status: 'error',
    message: 'Something went wrong',
    code: 'INTERNAL_ERROR',
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
