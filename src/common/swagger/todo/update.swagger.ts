import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ApiBadRequestResponseSwagger,
  ApiNotFoundResponseSwagger,
} from '../api-utils.swagger';
import { TodoWebResponse } from 'src/dto/todo.dto';

export function UpdateTodoSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update Todo',
      description: 'Update an existing todo in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'Todo updated successfully',
      type: TodoWebResponse,
    }),
    ApiBadRequestResponseSwagger(),
    ApiNotFoundResponseSwagger(),
  );
}
