import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '240251b0-7663-4f20-ba47-2fd9a841e2c7',
  })
  id: string;
  @ApiProperty({
    example: 'faridlan@mail.com',
  })
  email: string;
  @ApiProperty({
    example: 'Nul Hakim',
    nullable: true,
  })
  name?: string;
  @ApiProperty({
    example: '2026-01-09T03:57:03.923Z',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    example: '2026-01-09T03:57:03.923Z',
    format: 'date-time',
  })
  updatedAt: Date;
}
