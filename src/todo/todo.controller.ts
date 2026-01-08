import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import {
  CreateTodoRequest,
  TodoResponse,
  UpdateTodoRequest,
} from 'src/model/todo.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Body() request: CreateTodoRequest,
  ): Promise<WebResponse<TodoResponse>> {
    const result = await this.todoService.create(request);

    return {
      data: result,
    };
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<WebResponse<TodoResponse[]>> {
    const result = await this.todoService.findAll();
    return {
      data: result,
    };
  }

  @Patch('/:todoId')
  @HttpCode(200)
  async update(
    @Body() request: UpdateTodoRequest,
    @Param('todoId') todoId: string,
  ): Promise<WebResponse<TodoResponse>> {
    request.id = todoId;
    const result = await this.todoService.update(request);

    return {
      data: result,
    };
  }

  @Delete('/:todoId')
  @HttpCode(200)
  async remove(@Param('todoId') todoId: string): Promise<WebResponse<boolean>> {
    await this.todoService.remove(todoId);

    return {
      data: true,
    };
  }
}
