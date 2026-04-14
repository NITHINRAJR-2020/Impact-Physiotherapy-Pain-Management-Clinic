import { appointmentRepository, type PaginatedResult } from '../repositories/appointment.repository';
import { createAppointmentSchema } from '../validators/appointment.validator';
import type { Appointment, CreateAppointmentDto, AppointmentListQuery } from '../models/appointment';
import { ZodError } from 'zod';

export class AppointmentService {
  async createAppointment(
    rawInput: unknown,
    ipAddress?: string
  ): Promise<Appointment> {
    // Validate — throws ZodError if invalid
    const dto: CreateAppointmentDto = createAppointmentSchema.parse(rawInput);
    return appointmentRepository.create(dto, ipAddress);
  }

  async listAppointments(
    query: AppointmentListQuery
  ): Promise<PaginatedResult<Appointment>> {
    return appointmentRepository.findAll(query);
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    return appointmentRepository.findById(id);
  }
}

export const appointmentService = new AppointmentService();
