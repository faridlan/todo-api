import { applyDecorators } from '@nestjs/common';
import { ApiOkWebArrayResponse } from 'src/common/swagger/api-response.swagger';
import { TodoResponseDto } from '../dto/response/todo.response';

export const ListTodoSwagger = () =>
  applyDecorators(ApiOkWebArrayResponse(TodoResponseDto));
