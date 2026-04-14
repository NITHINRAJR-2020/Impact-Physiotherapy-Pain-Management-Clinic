import { z } from 'zod';

// Phone regex: accepts Indian mobile numbers with optional country code
const phoneRegex = /^(\+91[-\s]?)?[6-9]\d{9}$/;

export const createAppointmentSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),

  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .regex(phoneRegex, 'Please provide a valid Indian mobile number'),

  date: z
    .string({ required_error: 'Preferred date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine((d) => {
      const date = new Date(d);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, 'Preferred date cannot be in the past'),

  message: z
    .string()
    .trim()
    .max(1000, 'Message must be at most 1000 characters')
    .optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
