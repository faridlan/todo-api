import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { TodoResponseDto } from 'src/todo/dto/response/todo.response';
import { ApiOkWebResponse } from 'src/common/swagger/api-response.swagger';

export const CreateTodoSwagger = () =>
  applyDecorators(
    ApiCreatedResponse({ description: 'Todo created' }),
    ApiOkWebResponse(TodoResponseDto),
    ApiBadRequestResponse({ description: 'Invalid request' }),
  );
