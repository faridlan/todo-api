import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetail {
  @ApiProperty({ required: false })
  field?: string;
  @ApiProperty()
  message: string;
}

export class ErrorResponse {
  @ApiProperty({ type: [ErrorDetail] })
  errors: ErrorDetail[];
}
