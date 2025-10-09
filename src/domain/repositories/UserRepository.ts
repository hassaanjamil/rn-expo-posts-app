import { UserDto } from '@/domain/dto/UserDto';

export interface UserRepository {
  getUserById(id: number): Promise<UserDto | null>;
}
