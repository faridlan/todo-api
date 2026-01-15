/* eslint-disable @typescript-eslint/unbound-method */
import { UserEntity } from '../domain/user.entity';
import { UserResponseDto } from '../dto/response/user.response';

export class UserResponseMapper {
  static toResponse(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name ?? undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toResponses(entities: UserEntity[]): UserResponseDto[] {
    return entities.map(this.toResponse);
  }
}
