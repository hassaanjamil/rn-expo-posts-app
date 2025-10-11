import { APIService } from '@/data/source/remote/APIService';
import { PostLocalDataSource, UserLocalDataSource, CommentLocalDataSource } from '@/data/source/local';
import { PostRepositoryImpl, UserRepositoryImpl, CommentRepositoryImpl } from '@/data/repository';
import { GetPostsUseCase, GetPostUseCase, GetUserUseCase, GetCommentUseCase } from '@/domain/usecase';

const remoteDataSource = new APIService();
const postLocalDataSource = new PostLocalDataSource();
const userLocalDataSource = new UserLocalDataSource();
const commentLocalDataSource = new CommentLocalDataSource();

const postRepository = new PostRepositoryImpl(remoteDataSource, postLocalDataSource);
const userRepository = new UserRepositoryImpl(remoteDataSource, userLocalDataSource);
const commentRepository = new CommentRepositoryImpl(remoteDataSource, commentLocalDataSource);

export const useCases = {
  getPostsUseCase: new GetPostsUseCase(postRepository),
  getPostUseCase: new GetPostUseCase(postRepository),
  getUserUseCase: new GetUserUseCase(userRepository),
  getCommentUseCase: new GetCommentUseCase(commentRepository),
};
