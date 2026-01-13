/* eslint-disable @typescript-eslint/unbound-method */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Logger } from 'winston';
import { CreateTodoDto } from '../dto/request/create-todo.dto';
import { TodoEntity } from '../domain/todo.entity';
import { TodoMapper } from '../mapper/todo.mapper';
import { UpdateTodoDto } from '../dto/request/update-todo.dto';
import { validate as isUuid } from 'uuid';

@Injectable()
export class TodoService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(dto: CreateTodoDto): Promise<TodoEntity> {
    this.logger.info('Creating a new todo', { dto });

    const todo = await this.prismaService.todo.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        completed: false,
      },
    });

    return TodoMapper.fromPrisma(todo);
  }

  async findAll(): Promise<TodoEntity[]> {
    this.logger.info('Fetching all todos');

    const todos = await this.prismaService.todo.findMany();

    return todos.map(TodoMapper.fromPrisma);
  }

  async update(dto: UpdateTodoDto): Promise<TodoEntity> {
    this.logger.info('Updatin todo', { dto });

    if (!isUuid(dto.id)) {
      throw new NotFoundException('Todo not found');
    }

    const existing = await this.prismaService.todo.findUnique({
      where: { id: dto.id },
    });

    if (!existing) {
      this.logger.warn(`Todo not found: ${dto.id}`);
      throw new NotFoundException('Todo not found');
    }

    const todo = await this.prismaService.todo.update({
      where: { id: dto.id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && {
          description: dto.description,
        }),
        ...(dto.completed !== undefined && { completed: dto.completed }),
      },
    });

    return TodoMapper.fromPrisma(todo);
  }

  async remove(id: string): Promise<boolean> {
    this.logger.info('Deleting todo', { id });

    if (!isUuid(id)) {
      throw new NotFoundException('Todo not found');
    }

    const exists = await this.prismaService.todo.findUnique({
      where: { id },
    });

    if (!exists) {
      this.logger.warn(`Todo not found: ${id}`);
      throw new NotFoundException('Todo not found');
    }

    await this.prismaService.todo.delete({
      where: { id },
    });

    return true;
  }
}
