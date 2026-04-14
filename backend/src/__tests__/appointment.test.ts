import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import path from 'path';
import fs from 'fs';

import app from '../app';
import { db, runMigrations } from '../config/db';

const testDbPath = path.resolve(process.cwd(), './data/test_impact_physio.db');

beforeAll(() => {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });
  runMigrations();
});

afterAll(() => {
  db.close();
  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
});

beforeEach(() => {
  db.exec('DELETE FROM appointments');
});

// ─── Health Check ──────────────────────────────────────────────────────────────

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.database).toBe('ok');
  });
});

// ─── POST /api/v1/appointments ────────────────────────────────────────────────

describe('POST /api/v1/appointments', () => {
  const validPayload = {
    name: 'Ramesh Kumar',
    phone: '9876543210',
    date: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().split('T')[0];
    })(),
    message: 'Lower back pain',
  };

  it('creates an appointment with valid data → 201', async () => {
    const res = await request(app)
      .post('/api/v1/appointments')
      .send(validPayload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe(validPayload.name);
    expect(res.body.data.status).toBe('pending');
  });

  it('rejects missing name → 422', async () => {
    const res = await request(app)
      .post('/api/v1/appointments')
      .send({ ...validPayload, name: undefined });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('rejects missing phone → 422', async () => {
    const res = await request(app)
      .post('/api/v1/appointments')
      .send({ ...validPayload, phone: undefined });

    expect(res.status).toBe(422);
  });

  it('rejects invalid phone format → 422', async () => {
    const res = await request(app)
      .post('/api/v1/appointments')
      .send({ ...validPayload, phone: '12345' });

    expect(res.status).toBe(422);
  });

  it('rejects a date in the past → 422', async () => {
    const res = await request(app)
      .post('/api/v1/appointments')
      .send({ ...validPayload, date: '2020-01-01' });

    expect(res.status).toBe(422);
  });

  it('accepts appointment without optional message → 201', async () => {
    const { message, ...payloadWithoutMessage } = validPayload;
    const res = await request(app)
      .post('/api/v1/appointments')
      .send(payloadWithoutMessage);

    expect(res.status).toBe(201);
    expect(res.body.data.message).toBeNull();
  });
});

// ─── GET /api/v1/appointments (admin) ─────────────────────────────────────────

describe('GET /api/v1/appointments', () => {
  it('returns 401 without admin key', async () => {
    const res = await request(app).get('/api/v1/appointments');
    expect(res.status).toBe(401);
  });

  it('returns 200 with valid admin key', async () => {
    const res = await request(app)
      .get('/api/v1/appointments')
      .set('x-admin-key', 'test-admin-key');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('returns paginated results', async () => {
    // Seed 3 records
    const futureDate = (() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().split('T')[0];
    })();
    for (let i = 0; i < 3; i++) {
      await request(app)
        .post('/api/v1/appointments')
        .send({ name: `Patient ${i}`, phone: '9876543210', date: futureDate });
    }

    const res = await request(app)
      .get('/api/v1/appointments?page=1&limit=2')
      .set('x-admin-key', 'test-admin-key');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.total).toBe(3);
    expect(res.body.totalPages).toBe(2);
  });
});

// ─── GET /api/v1/appointments/:id ─────────────────────────────────────────────

describe('GET /api/v1/appointments/:id', () => {
  it('returns 404 for non-existent ID', async () => {
    const res = await request(app)
      .get('/api/v1/appointments/99999')
      .set('x-admin-key', 'test-admin-key');

    expect(res.status).toBe(404);
  });

  it('returns 400 for invalid ID', async () => {
    const res = await request(app)
      .get('/api/v1/appointments/not-a-number')
      .set('x-admin-key', 'test-admin-key');

    expect(res.status).toBe(400);
  });
});
