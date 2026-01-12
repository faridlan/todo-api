import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiBadRequestResponseSwagger } from '../api-utils.swagger';
import { TodoResponseDto } from 'src/todo/dto/todo.response';

export function CreateTodoSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Todo',
      description: 'Create a new todo list',
    }),
    ApiResponse({
      status: 200,
      description: 'Todo created successfully',
      type: TodoResponseDto,
    }),
    ApiBadRequestResponseSwagger(),
  );
}
