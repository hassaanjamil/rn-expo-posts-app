import { UserRepository } from '@/domain/repositories/UserRepository';
import { User } from '@/domain/entities/User';
import { UserRemoteDataSource } from '@/data/datasources/remote/JsonPlaceholderRemoteDataSource';
import { UserLocalDataSource } from '@/data/datasources/local/UserLocalDataSource';
import { mapUserDtoToEntity } from '@/data/mappers/userMapper';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly remoteDataSource: UserRemoteDataSource,
    private readonly localDataSource: UserLocalDataSource
  ) {}

  async getUserById(id: number): Promise<User | null> {
    const cachedUser = await this.localDataSource.getUserById(id);
    if (cachedUser) {
      return mapUserDtoToEntity(cachedUser);
    }

    const remoteUser = await this.remoteDataSource.fetchUserById(id);
    await this.localDataSource.saveUser(remoteUser);
    return mapUserDtoToEntity(remoteUser);
  }
}
