import { CreateTodoRequest, UpdateTodoRequest } from 'src/model/todo.model';
import z, { ZodType } from 'zod';

export class TodoValidation {
  static readonly CREATE: ZodType<CreateTodoRequest> = z.object({
    title: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType<UpdateTodoRequest> = z.object({
    id: z.string().min(1),
    title: z.string().min(1).max(100).optional(),
    completed: z.boolean().optional(),
  });
}
