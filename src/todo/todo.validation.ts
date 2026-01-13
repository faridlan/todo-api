import z, { ZodType } from 'zod';
import { CreateTodoCommand, UpdateTodoCommand } from './model/todo.command';

export class TodoValidation {
  static readonly CREATE: ZodType<CreateTodoCommand> = z.object({
    title: z.string().min(1).max(50),
    description: z.string().min(1).max(100).optional(),
  });

  static readonly UPDATE: ZodType<UpdateTodoCommand> = z.object({
    id: z.string().min(1),
    title: z.string().min(1).max(50).optional(),
    description: z.string().min(1).max(100).optional(),
    completed: z.boolean().optional(),
  });
}
