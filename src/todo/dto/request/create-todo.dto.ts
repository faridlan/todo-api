import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Belanja Bulanan',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  title: string;

  @ApiProperty({
    example: 'Belanja Bulanan Bulan Januari 2026',
    required: false,
    minLength: 1,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  description?: string;
}
