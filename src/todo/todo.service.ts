import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import { Logger } from 'winston';
import { TodoValidation } from './todo.validation';
import { Todo } from '@prisma/client';
import { validate as isUuid } from 'uuid';
import { CreateTodoCommand, UpdateTodoCommand } from './model/todo.command';
import { TodoMapper } from './mapper/todo.mapper';
import { TodoEntity } from './model/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(request: CreateTodoCommand): Promise<TodoEntity> {
    this.logger.info('Creating a new todo', { request });

    const createTodoRequest: CreateTodoCommand =
      this.validationService.validate(TodoValidation.CREATE, request);

    const todo = await this.prismaService.todo.create({
      data: createTodoRequest,
    });

    return TodoMapper.fromPrisma(todo);
  }

  async checkTodoMustExist(id: string): Promise<Todo> {
    if (!isUuid(id)) {
      this.logger.warn(`Invalid UUID format: ${id}`);
      throw new NotFoundException('Todo not found');
    }

    const todo = await this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      this.logger.warn(`Todo with id: ${id} not found`);
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async findAll(): Promise<TodoEntity[]> {
    this.logger.info('Fetching all todos');
    const todos = await this.prismaService.todo.findMany();

    return todos.map((todo) => TodoMapper.fromPrisma(todo));
  }

  async update(request: UpdateTodoCommand): Promise<TodoEntity> {
    this.logger.info(`Updating todo`, { request });

    const updateTodoRequest: UpdateTodoCommand =
      this.validationService.validate(TodoValidation.UPDATE, request);

    let todo = await this.checkTodoMustExist(updateTodoRequest.id);

    const { id, ...updateData } = updateTodoRequest;

    const cleanedData: Partial<UpdateTodoCommand> = Object.fromEntries(
      Object.entries(updateData).filter(([value]) => value !== undefined),
    );

    todo = await this.prismaService.todo.update({
      where: { id },
      data: cleanedData,
    });

    return TodoMapper.fromPrisma(todo);
  }

  async remove(id: string): Promise<boolean> {
    this.logger.info(`Deleting todo`, { id });

    await this.checkTodoMustExist(id);

    await this.prismaService.todo.delete({
      where: {
        id: id,
      },
    });

    return true;
  }
}
