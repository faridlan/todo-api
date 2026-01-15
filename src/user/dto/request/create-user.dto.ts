import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'faridlan@mail.com',
    required: true,
    minLength: 1,
    maxLength: 100,
  })
  @IsEmail()
  @Length(1, 100)
  email: string;

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
    example: 'securePassword123',
    required: true,
    minLength: 8,
    maxLength: 100,
  })
  @Length(8, 100)
  password: string;
}
