import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export function ApiBadRequestResponseSwagger() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'Validation error',
      example: { errors: 'Validation error' },
    }),
  );
}

export function ApiNotFoundResponseSwagger() {
  return applyDecorators(
    ApiNotFoundResponse({
      description: 'Not Found',
      example: { errors: 'Not Found' },
    }),
  );
}
