export class UserEntity {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string | null,
    public password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  changeName(name: string) {
    this.name = name;
  }

  changeEmail(email: string) {
    this.email = email;
  }

  changePassword(password: string) {
    this.password = password;
  }
}
