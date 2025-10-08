import { User } from '@/domain/entities/User';

export interface UserRepository {
  getUserById(id: number): Promise<User | null>;
}
