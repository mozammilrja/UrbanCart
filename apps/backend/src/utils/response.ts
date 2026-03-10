import { Response } from 'express';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Send a success response with data
 */
export function sendSuccess(res: Response, data: unknown, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

/**
 * Send a success response with a message only
 */
export function sendMessage(res: Response, message: string, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
  });
}

/**
 * Send a paginated response
 */
export function sendPaginated(res: Response, data: unknown, pagination: PaginationMeta) {
  return res.json({
    success: true,
    data,
    pagination,
  });
}

/**
 * Build pagination meta from query parameters and total count
 */
export function buildPagination(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * Parse pagination query params with defaults and bounds
 */
export function parsePagination(query: { page?: string; limit?: string }): { page: number; limit: number; skip: number } {
  const page = Math.max(1, parseInt(query.page || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(query.limit || '12')));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
