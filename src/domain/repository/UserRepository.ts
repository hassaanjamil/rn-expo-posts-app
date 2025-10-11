import { UserDto } from '@/data/dto';

export interface UserRepository {
  getUserById(id: number): Promise<UserDto | null>;
}
