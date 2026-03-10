import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Express middleware that validates request data against a Zod schema.
 * Validates body, query, or params based on the `source` parameter.
 */
export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[source]);
      req[source] = data; // Replace with parsed (and coerced) data
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        return next({
          statusCode: 400,
          status: 'fail',
          isOperational: true,
          message: `Validation failed: ${messages}`,
          code: 'VALIDATION_ERROR',
        });
      }
      next(error);
    }
  };
}
