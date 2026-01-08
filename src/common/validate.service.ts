import { ZodType } from 'zod';

export class ValidationService {
  validate<T>(schema: ZodType<T>, data: unknown): T {
    return schema.parse(data);
  }
}
