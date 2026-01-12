// common/response/web-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class WebResponse<T> {
  @ApiProperty()
  data: T;
}
