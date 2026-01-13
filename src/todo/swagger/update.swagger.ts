import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiOkWebResponse } from 'src/common/swagger/api-response.swagger';
import { TodoResponseDto } from '../dto/response/todo.response';

export const UpdateTodoSwagger = () =>
  applyDecorators(
    ApiOkWebResponse(TodoResponseDto),
    ApiBadRequestResponse({ description: 'Invalid request' }),
    ApiNotFoundResponse({ description: 'Todo not found' }),
  );
