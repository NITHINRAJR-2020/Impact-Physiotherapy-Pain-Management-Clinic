import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // Load .env so dotenv/config import in app.ts works during tests
    setupFiles: ['./src/__tests__/setup.ts'],
    // Run tests serially (SQLite doesn't support concurrent writes well)
    pool: 'forks',
    poolOptions: {
      forks: { singleFork: true },
    },
  },
});
