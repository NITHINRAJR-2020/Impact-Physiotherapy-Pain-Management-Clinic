import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from './requestLogger';

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  // Express 5 requires 4-argument error handlers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  // Zod validation error → 422 Unprocessable Entity
  if (err instanceof ZodError) {
    res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Known status code errors
  const status = err.status ?? 500;
  const message = status < 500 ? err.message : 'An internal server error occurred';

  if (status >= 500) {
    logger.error(`[${req.method} ${req.path}] ${err.message}`, {
      stack: err.stack,
      body: req.body,
    });
  }

  res.status(status).json({
    success: false,
    message,
    ...(process.env['NODE_ENV'] === 'development' && status >= 500
      ? { stack: err.stack }
      : {}),
  });
}
