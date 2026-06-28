import { NextFunction, Request, Response } from 'express';

import { AppError } from '../exceptions/app-error';
import { Logger } from '../utils/logger';

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  Logger.error(error.message, error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};