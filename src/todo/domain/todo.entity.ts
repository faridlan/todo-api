export class TodoEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public completed: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  complete() {
    this.completed = true;
  }

  rename(title: string) {
    this.title = title;
  }
}
