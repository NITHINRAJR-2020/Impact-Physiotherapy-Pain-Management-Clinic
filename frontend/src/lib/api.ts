/**
 * Reusable API service layer for Impact Physiotherapy frontend.
 * All API calls should go through this module.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';
const API_V1 = `${API_BASE}/api/v1`;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AppointmentRequest {
  name: string;
  phone: string;
  date: string;
  message?: string;
}

export interface AppointmentResponse {
  id: number;
  name: string;
  phone: string;
  date: string;
  message: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

// ─── API Error class ──────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ─── Base fetch wrapper ───────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_V1}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  const json = await response.json();

  if (!response.ok) {
    const err = json as ApiErrorResponse;
    throw new ApiError(response.status, err.message, err.errors);
  }

  return json as T;
}

// ─── Appointment API ──────────────────────────────────────────────────────────

export const appointmentApi = {
  /**
   * Submit an appointment request.
   * Throws ApiError on validation or server errors.
   */
  submit(data: AppointmentRequest): Promise<ApiSuccessResponse<AppointmentResponse>> {
    return apiFetch<ApiSuccessResponse<AppointmentResponse>>('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
