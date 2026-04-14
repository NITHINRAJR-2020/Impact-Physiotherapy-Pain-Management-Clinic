/**
 * Test setup: set env vars before any module is imported.
 * This runs before app.ts loads, so dotenv/config import is fine.
 */

// Set env vars before loading any module
process.env['ADMIN_API_KEY'] = 'test-admin-key';
process.env['DB_PATH'] = './data/test_impact_physio.db';
process.env['NODE_ENV'] = 'test';
process.env['CORS_ORIGINS'] = 'http://localhost:5173';
process.env['PORT'] = '3001';
process.env['RATE_LIMIT_WINDOW_MS'] = '900000';
process.env['RATE_LIMIT_MAX_REQUESTS'] = '100'; // High limit so tests don't get rate-limited
