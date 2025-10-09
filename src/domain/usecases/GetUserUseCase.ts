import { UserRepository } from '@/domain/repositories/UserRepository';
import { UserDto } from '../dto/UserDto';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  execute(id: number): Promise<UserDto | null> {
    return this.userRepository.getUserById(id);
  }
}
