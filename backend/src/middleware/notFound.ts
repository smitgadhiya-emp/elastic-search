import type { Request, Response } from 'express';
import { errorResponse } from '../common/response';

export function notFoundHandler(_req: Request, res: Response): void {
  errorResponse(res, {
    statusCode: 404,
    message: 'Route not found',
  });
}
