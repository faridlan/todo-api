import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import {
  CreateTodoRequest,
  TodoResponse,
  UpdateTodoRequest,
} from 'src/model/todo.model';
import { Logger } from 'winston';
import { TodoValidation } from './todo.validation';
import { Todo } from '@prisma/client';
import { validate as isUuid } from 'uuid';

@Injectable()
export class TodoService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  toTodoResponse(todo: Todo): TodoResponse {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description ?? undefined,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  async create(request: CreateTodoRequest): Promise<TodoResponse> {
    this.logger.info('Creating a new todo', { request });

    const createTodoRequest: CreateTodoRequest =
      this.validationService.validate(TodoValidation.CREATE, request);

    const todo = await this.prismaService.todo.create({
      data: createTodoRequest,
    });

    return this.toTodoResponse(todo);
  }

  async checkTodoMustExist(id: string): Promise<Todo> {
    if (!isUuid(id)) {
      this.logger.warn(`Invalid UUID format: ${id}`);
      throw new HttpException('Todo not found', 404);
    }

    const todo = await this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      this.logger.warn(`Todo with id: ${id} not found`);
      throw new HttpException('Todo not found', 404);
    }

    return todo;
  }

  async findAll(): Promise<TodoResponse[]> {
    this.logger.info('Fetching all todos');
    const todos = await this.prismaService.todo.findMany();

    return todos.map((todo) => this.toTodoResponse(todo));
  }

  async update(request: UpdateTodoRequest): Promise<TodoResponse> {
    this.logger.info(`Updating todo`, { request });

    const updateTodoRequest: UpdateTodoRequest =
      this.validationService.validate(TodoValidation.UPDATE, request);

    let todo = await this.checkTodoMustExist(updateTodoRequest.id);

    const { id, ...updateData } = updateTodoRequest;

    const cleanedData = Object.fromEntries(
      Object.entries(updateData).filter(([value]) => value !== undefined),
    );

    todo = await this.prismaService.todo.update({
      where: { id },
      data: cleanedData,
    });

    return this.toTodoResponse(todo);
  }

  async remove(id: string): Promise<TodoResponse> {
    this.logger.info(`Deleting todo`, { id });

    await this.checkTodoMustExist(id);

    const todo = await this.prismaService.todo.delete({
      where: {
        id: id,
      },
    });

    return this.toTodoResponse(todo);
  }
}
