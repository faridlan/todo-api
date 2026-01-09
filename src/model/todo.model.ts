export class CreateTodoRequest {
  title: string;
  description?: string;
}

export class UpdateTodoRequest {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

export class TodoResponse {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
