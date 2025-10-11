import { UserDto } from '@/domain/dto';

export interface UserRepository {
  getUserById(id: number): Promise<UserDto | null>;
}
