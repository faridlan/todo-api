import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({
    example: 'faridlan@mail.com',
    required: false,
    minLength: 1,
    maxLength: 100,
  })
  @IsEmail()
  @Length(1, 100)
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: 'Nul Hakim',
    required: false,
    minLength: 1,
    maxLength: 50,
  })
  @Length(1, 50)
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'currentPassword123',
    required: false,
    minLength: 8,
    maxLength: 100,
  })
  @Length(8, 100)
  @IsOptional()
  oldPassword?: string;

  @ApiProperty({
    example: 'newSecurePassword123',
    required: false,
    minLength: 8,
    maxLength: 100,
  })
  @Length(8, 100)
  @IsOptional()
  password?: string;
}
