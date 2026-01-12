import { Todo } from '@prisma/client';
import { TodoEntity } from '../model/todo.entity';

export class TodoMapper {
  static fromPrisma(todo: Todo): TodoEntity {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description ?? undefined,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }
}
