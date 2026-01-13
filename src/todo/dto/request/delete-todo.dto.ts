import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteTodoDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  id: string;
}
