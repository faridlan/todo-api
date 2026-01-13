import { Todo } from '@prisma/client';
import { TodoEntity } from '../domain/todo.entity';

export class TodoMapper {
  static fromPrisma(todo: Todo): TodoEntity {
    return new TodoEntity(
      todo.id,
      todo.title,
      todo.description,
      todo.completed,
      todo.createdAt,
      todo.updatedAt,
    );
  }
}
