import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../response/error-response.dto';

export const ApiCommonErrors = () =>
  applyDecorators(
    ApiBadRequestResponse({ type: ErrorResponse }),
    ApiNotFoundResponse({ type: ErrorResponse }),
    ApiInternalServerErrorResponse({ type: ErrorResponse }),
  );
