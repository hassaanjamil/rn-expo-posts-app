import { JsonPlaceholderRemoteDataSource } from '@/data/datasources/remote/JsonPlaceholderRemoteDataSource';
import { PostLocalDataSource } from '@/data/datasources/local/PostLocalDataSource';
import { UserLocalDataSource } from '@/data/datasources/local/UserLocalDataSource';
import { PostRepositoryImpl } from '@/data/repositories/PostRepositoryImpl';
import { UserRepositoryImpl } from '@/data/repositories/UserRepositoryImpl';
import { GetPostsUseCase } from '@/domain/usecases/GetPostsUseCase';
import { GetPostUseCase } from '@/domain/usecases/GetPostUseCase';
import { GetUserUseCase } from '@/domain/usecases/GetUserUseCase';

const remoteDataSource = new JsonPlaceholderRemoteDataSource();
const postLocalDataSource = new PostLocalDataSource();
const userLocalDataSource = new UserLocalDataSource();

const postRepository = new PostRepositoryImpl(remoteDataSource, postLocalDataSource);
const userRepository = new UserRepositoryImpl(remoteDataSource, userLocalDataSource);

export const useCases = {
  getPostsUseCase: new GetPostsUseCase(postRepository),
  getPostUseCase: new GetPostUseCase(postRepository),
  getUserUseCase: new GetUserUseCase(userRepository),
};
