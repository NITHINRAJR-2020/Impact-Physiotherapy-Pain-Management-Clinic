import 'dotenv/config';
import app from './app';
import { env } from './config/env';
import { runMigrations } from './config/db';
import { logger } from './middleware/requestLogger';

async function bootstrap(): Promise<void> {
  // Run DB migrations before accepting traffic
  runMigrations();
  
  const PORT = Number(process.env.PORT) || 3001;

  const server = app.listen(PORT, () => {
    logger.info(`🚀 Impact Physio API running on http://localhost:${PORT}`);
    logger.info(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
    logger.info(`🏥 Health check: http://localhost:${PORT}/health`);
    logger.info(`   Environment: ${env.NODE_ENV}`);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    logger.info(`${signal} received. Shutting down gracefully...`);
    server.close(() => {
      logger.info('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
