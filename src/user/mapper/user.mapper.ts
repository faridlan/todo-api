import { User } from '@prisma/client';
import { UserEntity } from '../domain/user.entity';

export class UserMapper {
  static fromPrisma(user: User): UserEntity {
    return new UserEntity(
      user.id,
      user.email,
      user.name,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }
}
