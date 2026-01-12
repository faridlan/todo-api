import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoResponseDto } from 'src/todo/dto/todo.response';

export function ListTodoSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'List Todo',
      description: 'Retrieve a list of all todo in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'Todo retrieved successfully',
      type: TodoResponseDto,
    }),
  );
}
