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
import { TodoResponse } from 'src/model/todo.model';
import { WebResponse } from 'src/model/web.model';
import { CreateTodoSwagger } from 'src/common/swagger/todo/create.swagger';
import { ListTodoSwagger } from 'src/common/swagger/todo/list.swagger';
import { UpdateTodoSwagger } from 'src/common/swagger/todo/update.swagger';
import { DeleteTodoSwagger } from 'src/common/swagger/todo/delete.swagger';
import { TodoCreateRequest, TodoUpdateRequest } from 'src/dto/todo.dto';

@Controller('/api/todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @CreateTodoSwagger()
  @HttpCode(200)
  async create(
    @Body() request: TodoCreateRequest,
  ): Promise<WebResponse<TodoResponse>> {
    const result = await this.todoService.create(request);

    return {
      data: result,
    };
  }

  @Get()
  @ListTodoSwagger()
  @HttpCode(200)
  async findAll(): Promise<WebResponse<TodoResponse[]>> {
    const result = await this.todoService.findAll();
    return {
      data: result,
    };
  }

  @Patch('/:todoId')
  @UpdateTodoSwagger()
  @HttpCode(200)
  async update(
    @Body() request: TodoUpdateRequest,
    @Param('todoId') todoId: string,
  ): Promise<WebResponse<TodoResponse>> {
    request.id = todoId;
    const result = await this.todoService.update(request);

    return {
      data: result,
    };
  }

  @Delete('/:todoId')
  @DeleteTodoSwagger()
  @HttpCode(200)
  async remove(@Param('todoId') todoId: string): Promise<WebResponse<boolean>> {
    await this.todoService.remove(todoId);

    return {
      data: true,
    };
  }
}
