import { Router, Request, Response } from 'express';
import  db from '../config/db';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Server is healthy
 */
router.get('/', (_req: Request, res: Response) => {
  // Quick DB connectivity check
  let dbStatus = 'ok';
  try {
    db.prepare('SELECT 1').get();
  } catch {
    dbStatus = 'error';
  }

  res.status(200).json({
    status: 'ok',
    service: 'impact-physio-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: dbStatus,
  });
});

export default router;
