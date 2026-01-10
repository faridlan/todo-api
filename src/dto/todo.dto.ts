import { ApiProperty } from '@nestjs/swagger';

export class TodoBaseResponse {
  @ApiProperty({
    example: '240251b0-7663-4f20-ba47-2fd9a841e2c7',
  })
  id: string;
  @ApiProperty({
    example: 'Belanja Bulanan',
  })
  title: string;
  @ApiProperty({
    example: 'Belanja Bulanan Bulan Januari 2026',
    nullable: true,
  })
  description?: string;
  @ApiProperty({
    example: false,
  })
  completed: boolean;
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

export class TodoCreateRequest {
  @ApiProperty({
    example: 'Belanja Bulanan',
    minLength: 1,
    maxLength: 50,
    required: true,
  })
  title: string;
  @ApiProperty({
    example: 'Belanja Bulanan Bulan Januari 2026',
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  description?: string;
}

export class TodoUpdateRequest {
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

export class TodoWebResponse {
  @ApiProperty({ type: TodoBaseResponse })
  data: TodoBaseResponse;
}

export class TodoWebResponses {
  @ApiProperty({ type: [TodoBaseResponse] })
  data: TodoBaseResponse[];
}
