import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/UserRepository';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: number): Promise<User | null> {
    return this.userRepository.getUserById(id);
  }
}
