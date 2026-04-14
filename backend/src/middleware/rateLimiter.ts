import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

/**
 * Rate limiter for the public appointment submission endpoint.
 * 10 requests per 15 minutes per IP by default (configurable via env).
 */
export const appointmentRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
  keyGenerator: (req) =>
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
    req.socket.remoteAddress ??
    'unknown',
});

/**
 * Middleware that verifies the admin API key from the x-admin-key header.
 */
export function requireAdminKey(req: Request, res: Response, next: NextFunction): void {
  const providedKey = req.headers['x-admin-key'];
  if (!providedKey || providedKey !== env.ADMIN_API_KEY) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: valid x-admin-key header required',
    });
    return;
  }
  next();
}
