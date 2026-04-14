import 'dotenv/config';
import app from './app';
import { env } from './config/env';
import { runMigrations } from './config/db';
import { logger } from './middleware/requestLogger';

async function bootstrap(): Promise<void> {
  // Run DB migrations before accepting traffic
  // Note: Added await here to ensure migrations finish before the server starts
  await runMigrations(); 
  
  const PORT = Number(process.env.PORT) || 3001;
  const HOST = '0.0.0.0'; // Added this line

  // Pass HOST as the second argument to app.listen
  const server = app.listen(PORT, HOST, () => {
    logger.info(`🚀 Impact Physio API running on http://${HOST}:${PORT}`);
    logger.info(`📚 Swagger docs: http://${HOST}:${PORT}/api-docs`);
    logger.info(`🏥 Health check: http://${HOST}:${PORT}/health`);
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
