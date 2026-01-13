import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteTodo(): Promise<void> {
    await this.prismaService.todo.deleteMany({
      where: { title: 'New Todo' },
    });
  }

  async createTodo(): Promise<void> {
    await this.prismaService.todo.create({
      data: {
        title: 'New Todo',
        description: 'New Description',
      },
    });
  }

  async getTodo(): Promise<Todo | null> {
    return this.prismaService.todo.findFirst({
      where: { title: 'New Todo' },
    });
  }
}
