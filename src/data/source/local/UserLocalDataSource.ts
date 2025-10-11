import { UserDto } from '@/data/entity/UserDto';

export class UserLocalDataSource {
  private readonly users = new Map<number, UserDto>();

  async getUserById(id: number): Promise<UserDto | null> {
    return this.users.get(id) ?? null;
  }

  async saveUser(user: UserDto): Promise<void> {
    this.users.set(user.id, user);
  }
}
