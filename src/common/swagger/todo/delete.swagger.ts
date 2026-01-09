import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiNotFoundResponseSwagger } from '../api-utils.swagger';

export function DeleteTodoSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete Todo',
      description: 'Delete an todo by its ID.',
    }),
    ApiResponse({
      status: 200,
      description: 'Todo deleted successfully',
      example: { data: 'True' },
    }),
    ApiNotFoundResponseSwagger(),
  );
}
