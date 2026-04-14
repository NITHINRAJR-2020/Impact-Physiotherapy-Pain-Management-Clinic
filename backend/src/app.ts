import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { httpLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { appointmentRateLimiter } from './middleware/rateLimiter';
import appointmentRoutes from './routes/appointment.routes';
import healthRoutes from './routes/health.routes';
import { swaggerSpec } from './docs/swagger';

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────

app.set('trust proxy', 1); // Required for correct IP behind proxies / Docker

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, server-to-server)
      if (!origin || env.CORS_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-admin-key'],
    credentials: true,
  })
);

app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(httpLogger);

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/health', healthRoutes);
app.use(
  '/api/v1/appointments',
  appointmentRateLimiter,
  appointmentRoutes
);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (_req, res) => res.json(swaggerSpec));

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
