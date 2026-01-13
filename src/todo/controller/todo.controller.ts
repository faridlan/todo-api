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
import { TodoService } from '../service/todo.service';
import { CreateTodoDto } from '../dto/request/create-todo.dto';
import { CreateTodoSwagger } from '../swagger/create.swagger';
import { WebResponse } from 'src/common/response/web-response.dto';
import { TodoResponseDto } from '../dto/response/todo.response';
import { TodoResponseMapper } from '../mapper/todo-response.mapper';
import { ListTodoSwagger } from '../swagger/list.swagger';
import { UpdateTodoSwagger } from '../swagger/update.swagger';
import { UpdateTodoDto } from '../dto/request/update-todo.dto';
import { DeleteTodoSwagger } from '../swagger/delete.swagger';
import { ApiCommonErrors } from 'src/common/swagger/api-error.swagger';

@Controller('/api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @CreateTodoSwagger()
  @ApiCommonErrors()
  @HttpCode(200)
  async create(
    @Body() dto: CreateTodoDto,
  ): Promise<WebResponse<TodoResponseDto>> {
    const todo = await this.todoService.create(dto);

    return {
      data: TodoResponseMapper.toResponse(todo),
    };
  }

  @Get()
  @ListTodoSwagger()
  @HttpCode(200)
  async findAll(): Promise<WebResponse<TodoResponseDto[]>> {
    const todos = await this.todoService.findAll();

    return {
      data: TodoResponseMapper.toResponses(todos),
    };
  }

  @Patch('/:todoId')
  @UpdateTodoSwagger()
  @ApiCommonErrors()
  @HttpCode(200)
  async update(
    @Param('todoId') todoId: string,
    @Body() dto: UpdateTodoDto,
  ): Promise<WebResponse<TodoResponseDto>> {
    const todo = await this.todoService.update({
      ...dto,
      id: todoId,
    });

    return {
      data: TodoResponseMapper.toResponse(todo),
    };
  }

  @Delete('/:todoId')
  @DeleteTodoSwagger()
  @ApiCommonErrors()
  @HttpCode(200)
  async remove(@Param('todoId') todoId: string): Promise<WebResponse<boolean>> {
    await this.todoService.remove(todoId);

    return {
      data: true,
    };
  }
}
