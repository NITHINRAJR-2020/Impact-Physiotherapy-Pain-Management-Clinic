import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { env } from './env';
import { logger } from '../middleware/requestLogger';

const dbPath = path.resolve(process.cwd(), env.DB_PATH);
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(dbPath);

// Enable WAL mode for better concurrent read performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Run migrations on startup
export function runMigrations(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS appointments (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT NOT NULL,
      phone       TEXT NOT NULL,
      date        TEXT NOT NULL,
      message     TEXT,
      status      TEXT NOT NULL DEFAULT 'pending',
      ip_address  TEXT,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_appointments_status    ON appointments(status);
    CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_appointments_date       ON appointments(date);
  `);

  logger.info('Database migrations complete');
}
