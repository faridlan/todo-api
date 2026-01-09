import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiBadRequestResponseSwagger } from '../api-utils.swagger';
import { TodoWebResponse } from 'src/dto/todo.dto';

export function CreateTodoSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Todo',
      description: 'Create a new todo list',
    }),
    ApiResponse({
      status: 200,
      description: 'Todo created successfully',
      type: TodoWebResponse,
    }),
    ApiBadRequestResponseSwagger(),
  );
}
