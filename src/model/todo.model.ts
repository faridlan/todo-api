export class CreateTodoRequest {
  title: string;
}

export class UpdateTodoRequest {
  id: string;
  title?: string;
  completed?: boolean;
}

export class TodoResponse {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
