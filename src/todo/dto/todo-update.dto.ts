import { ApiProperty } from '@nestjs/swagger';

export class TodoUpdateDto {
  id: string;
  @ApiProperty({
    example: 'Belanja Bulanan',
    minLength: 1,
    maxLength: 50,
    required: false,
  })
  title: string;
  @ApiProperty({
    example: 'Belanja Bulanan Bulan Januari 2026',
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  description?: string;
  @ApiProperty({
    example: true,
    required: false,
  })
  completed: boolean;
}
