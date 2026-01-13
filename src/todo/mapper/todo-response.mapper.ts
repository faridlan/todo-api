/* eslint-disable @typescript-eslint/unbound-method */
import { TodoEntity } from '../domain/todo.entity';
import { TodoResponseDto } from '../dto/response/todo.response';

export class TodoResponseMapper {
  static toResponse(entity: TodoEntity): TodoResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description ?? undefined,
      completed: entity.completed,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toResponses(entities: TodoEntity[]): TodoResponseDto[] {
    return entities.map(this.toResponse);
  }
}
