import { UserRepository } from '@/domain/repository';
import { UserDto } from '@/data/dto';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  execute(id: number): Promise<UserDto | null> {
    return this.userRepository.getUserById(id);
  }
}
