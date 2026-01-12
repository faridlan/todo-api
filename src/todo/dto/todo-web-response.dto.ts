import { ApiProperty } from '@nestjs/swagger';
import { TodoResponseDto } from './todo.response';

export class TodoWebResponseDto {
  @ApiProperty({ type: TodoWebResponseDto })
  data: TodoResponseDto;
}

export class TodoWebResponsesDto {
  @ApiProperty({ type: [TodoWebResponsesDto] })
  data: TodoResponseDto[];
}
