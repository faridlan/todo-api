import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface ValidationErrorResponse {
  errors?: { message: string }[];
  message?: string | string[];
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse() as ValidationErrorResponse;

      // 1️⃣ ValidationPipe (errors[])
      if (typeof res === 'object' && res.errors) {
        response.status(status).json({
          errors: res.errors,
        });
        return;
      }

      // 2️⃣ Default Nest exception
      const messages =
        typeof res === 'string'
          ? [{ message: res }]
          : Array.isArray(res.message)
            ? res.message.map((m) => ({ message: m }))
            : [{ message: res.message ?? 'Unexpected error' }];

      response.status(status).json({
        errors: messages,
      });
      return;
    }

    // 3️⃣ Unknown error
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      errors: [{ message: 'Unexpected error' }],
    });
  }
}
