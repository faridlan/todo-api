// common/swagger/todo/delete.swagger.ts
import { ApiOkResponse } from '@nestjs/swagger';

export const DeleteTodoSwagger = () =>
  ApiOkResponse({
    schema: {
      example: {
        data: true,
      },
    },
  });
