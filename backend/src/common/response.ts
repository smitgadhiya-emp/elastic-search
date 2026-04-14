import type { Response } from 'express';

export type SuccessOptions<T = unknown> = {
  statusCode?: number;
  message?: string;
  data?: T;
};

export function successResponse<T = unknown>(
  res: Response,
  options: SuccessOptions<T> = {}
): void {
  const statusCode = options.statusCode ?? 200;
  if (statusCode === 204) {
    res.status(204).send();
    return;
  }
  const payload: { success: true; message?: string; data?: T } = {
    success: true,
  };
  if (options.message !== undefined) {
    payload.message = options.message ?? 'Success';
  }
  if (options.data !== undefined) {
    payload.data = options.data;
  }
  res.status(statusCode).json(payload);
}

export type ErrorOptions = {
  statusCode: number;
  message: string;
  errors?: unknown;
};

export function errorResponse(res: Response, options: ErrorOptions): void {
  res.status(options.statusCode).json({
    success: false,
    message: options.message,
    ...(options.errors !== undefined ? { errors: options.errors } : {}),
  });
}
