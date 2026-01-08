import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteTodo() {
    await this.prismaService.todo.deleteMany({
      where: {
        title: 'New Todo',
      },
    });
  }

  async createTodo() {
    await this.prismaService.todo.create({
      data: {
        title: 'New Todo',
      },
    });
  }

  async getTodo(): Promise<Todo | null> {
    return this.prismaService.todo.findFirst({
      where: {
        title: 'New Todo',
      },
    });
  }
}
