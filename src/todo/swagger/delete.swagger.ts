import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const DeleteTodoSwagger = () =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        example: { data: true },
      },
    }),
    ApiNotFoundResponse({ description: 'Todo not found' }),
  );
