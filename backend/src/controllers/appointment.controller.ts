import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { appointmentService } from '../services/appointment.service';
import { logger } from '../middleware/requestLogger';

export const appointmentController = {
  /**
   * @openapi
   * /api/v1/appointments:
   *   post:
   *     summary: Submit an appointment request
   *     tags: [Appointments]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAppointmentDto'
   *     responses:
   *       201:
   *         description: Appointment created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AppointmentResponse'
   *       422:
   *         description: Validation error
   *       429:
   *         description: Too many requests
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ipAddress =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
        req.socket.remoteAddress;

      const appointment = await appointmentService.createAppointment(req.body, ipAddress);

      logger.info(`New appointment request: ${appointment.id} — ${appointment.name}`);

      res.status(201).json({
        success: true,
        message:
          "Appointment request received! We'll confirm within 2 hours.",
        data: appointment,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * @openapi
   * /api/v1/appointments:
   *   get:
   *     summary: List all appointments (admin only)
   *     tags: [Appointments]
   *     security:
   *       - adminKey: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema: { type: integer, default: 1 }
   *       - in: query
   *         name: limit
   *         schema: { type: integer, default: 20 }
   *       - in: query
   *         name: status
   *         schema: { type: string, enum: [pending, confirmed, cancelled] }
   *     responses:
   *       200:
   *         description: Paginated list of appointments
   *       401:
   *         description: Unauthorized
   */
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query['page'] as string) || 1;
      const limit = parseInt(req.query['limit'] as string) || 20;
      const status = req.query['status'] as 'pending' | 'confirmed' | 'cancelled' | undefined;

      const result = await appointmentService.listAppointments({ page, limit, status });

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * @openapi
   * /api/v1/appointments/{id}:
   *   get:
   *     summary: Get a single appointment (admin only)
   *     tags: [Appointments]
   *     security:
   *       - adminKey: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: integer }
   *     responses:
   *       200:
   *         description: Appointment found
   *       404:
   *         description: Not found
   *       401:
   *         description: Unauthorized
   */
  async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params['id'] ?? '');
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: 'Invalid appointment ID' });
        return;
      }

      const appointment = await appointmentService.getAppointment(id);
      if (!appointment) {
        res.status(404).json({ success: false, message: 'Appointment not found' });
        return;
      }

      res.status(200).json({ success: true, data: appointment });
    } catch (err) {
      next(err);
    }
  },
};
