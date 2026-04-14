import { Router } from 'express';
import { appointmentController } from '../controllers/appointment.controller';
import { requireAdminKey } from '../middleware/rateLimiter';

const router = Router();

// Public route — submit appointment request
router.post('/', appointmentController.create);

// Admin-only routes
router.get('/', requireAdminKey, appointmentController.list);
router.get('/:id', requireAdminKey, appointmentController.getOne);

export default router;
