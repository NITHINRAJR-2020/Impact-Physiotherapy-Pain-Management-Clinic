/**
 * Appointment data types
 */

export interface Appointment {
  id: number;
  name: string;
  phone: string;
  date: string;
  message: string | null;
  status: AppointmentStatus;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface CreateAppointmentDto {
  name: string;
  phone: string;
  date: string;
  message?: string;
}

export interface AppointmentListQuery {
  page?: number;
  limit?: number;
  status?: AppointmentStatus;
}
