import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ required: false, maxLength: 50 })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  title?: string;

  @ApiProperty({ required: false, maxLength: 100 })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
