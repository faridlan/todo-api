import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();

      return response.status(status).json({
        errors: errorResponse,
      });
    }

    // ZodError
    if (exception instanceof ZodError) {
      // Destructure tipe aman
      const issues = exception.issues;

      return response.status(400).json({
        errors: issues,
      });
    }

    // Unkown error
    const message =
      exception instanceof Error ? exception.message : 'Internal Server Error';

    return response.status(500).json({
      errors: message,
    });
  }
}
