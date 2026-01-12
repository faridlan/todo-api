export class CreateTodoCommand {
  title: string;
  description?: string;
}

export class UpdateTodoCommand {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}
