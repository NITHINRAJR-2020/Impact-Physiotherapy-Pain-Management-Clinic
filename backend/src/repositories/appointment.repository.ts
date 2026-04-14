import db  from '../config/db';
import type { Appointment, CreateAppointmentDto, AppointmentListQuery } from '../models/appointment';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const appointmentRepository = {
  create(dto: CreateAppointmentDto, ipAddress?: string): Appointment {
    const stmt = db.prepare(`
      INSERT INTO appointments (name, phone, date, message, ip_address)
      VALUES (@name, @phone, @date, @message, @ip_address)
    `);

    const result = stmt.run({
      name: dto.name,
      phone: dto.phone,
      date: dto.date,
      message: dto.message ?? null,
      ip_address: ipAddress ?? null,
    });

    return this.findById(result.lastInsertRowid as number)!;
  },

  findById(id: number): Appointment | undefined {
    return db
      .prepare('SELECT * FROM appointments WHERE id = ?')
      .get(id) as Appointment | undefined;
  },

  findAll(query: AppointmentListQuery): PaginatedResult<Appointment> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 20));
    const offset = (page - 1) * limit;

    const conditions: string[] = [];
    const params: Record<string, unknown> = { limit, offset };

    if (query.status) {
      conditions.push('status = @status');
      params['status'] = query.status;
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const total = (
      db
        .prepare(`SELECT COUNT(*) as count FROM appointments ${where}`)
        .get(params) as { count: number }
    ).count;

    const data = db
      .prepare(
        `SELECT * FROM appointments ${where} ORDER BY created_at DESC LIMIT @limit OFFSET @offset`
      )
      .all(params) as Appointment[];

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
};
