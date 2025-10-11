import { UserRepository } from '@/domain/repository/UserRepository';
import { UserRemoteDataSource } from '@/data/source/remote/APIService';
import { UserLocalDataSource } from '@/data/source/local';
import { mapUserDtoToUser } from '@/data/mapper/userMapper';
import { UserDto } from '@/data/dto';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly remoteDataSource: UserRemoteDataSource,
    private readonly localDataSource: UserLocalDataSource
  ) { }

  async getUserById(id: number): Promise<UserDto | null> {
    const cachedUser = await this.localDataSource.getUserById(id);
    if (cachedUser) {
      return mapUserDtoToUser(cachedUser);
    }

    const remoteUser = await this.remoteDataSource.fetchUserById(id);
    await this.localDataSource.saveUser(remoteUser);
    return mapUserDtoToUser(remoteUser);
  }
}
