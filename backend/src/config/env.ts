/**
 * Typed environment configuration.
 * Crashes on startup if required vars are missing.
 */

function requireEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required environment variable: ${name}`);
  return val;
}

function optionalEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const env = {
  PORT: parseInt(optionalEnv('PORT', '3001'), 10),
  NODE_ENV: optionalEnv('NODE_ENV', 'development'),
  CORS_ORIGINS: optionalEnv('CORS_ORIGINS', 'http://localhost:5173').split(',').map(s => s.trim()),
  ADMIN_API_KEY: requireEnv('ADMIN_API_KEY'),
  RATE_LIMIT_WINDOW_MS: parseInt(optionalEnv('RATE_LIMIT_WINDOW_MS', '900000'), 10),
  RATE_LIMIT_MAX_REQUESTS: parseInt(optionalEnv('RATE_LIMIT_MAX_REQUESTS', '10'), 10),
  DB_PATH: optionalEnv('DB_PATH', './data/impact_physio.db'),
} as const;
