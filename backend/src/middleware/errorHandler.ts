import type { Request, Response, NextFunction } from 'express';
import { MongoServerError } from 'mongodb';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { errorResponse } from '../common/response';

export interface ApiError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof MongoServerError && err.code === 11000) {
    errorResponse(res, {
      statusCode: 409,
      message: 'A record with this unique field already exists',
    });
    return;
  }

  if (err instanceof ZodError) {
    errorResponse(res, {
      statusCode: 400,
      message: 'Validation failed',
      errors: err.flatten().fieldErrors,
    });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    errorResponse(res, {
      statusCode: 400,
      message: err.message,
    });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    errorResponse(res, {
      statusCode: 400,
      message: 'Invalid identifier',
    });
    return;
  }

  const statusCode = err.statusCode ?? 500;
  const message =
    statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message || 'Internal server error';

  errorResponse(res, {
    statusCode,
    message,
  });
}
