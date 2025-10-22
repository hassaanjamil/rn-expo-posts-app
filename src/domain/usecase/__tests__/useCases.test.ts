import { GetPostsUseCase } from '../GetPostsUseCase';
import { GetPostUseCase } from '../GetPostUseCase';
import { GetUserUseCase } from '../GetUserUseCase';
import { GetCommentUseCase } from '../GetCommentUseCase';
import type { PostRepository } from '@/domain/repository/PostRepository';
import type { UserRepository } from '@/domain/repository/UserRepository';
import type { CommentRepository } from '@/domain/repository/CommentRepository';

const createPost = (id: number) => ({
  id,
  userId: 2,
  title: `Post ${id}`,
  body: `Body ${id}`,
});

describe('Domain use cases', () => {
  it('GetPostsUseCase delegates to repository', async () => {
    const posts = [createPost(1)];
    const repository = {
      getPosts: jest.fn().mockResolvedValue(posts),
    } as unknown as jest.Mocked<PostRepository>;
    const useCase = new GetPostsUseCase(repository);

    const result = await useCase.execute();

    expect(repository.getPosts).toHaveBeenCalledTimes(1);
    expect(result).toEqual(posts);
  });

  it('GetPostUseCase retrieves post by id', async () => {
    const post = createPost(4);
    const repository = {
      getPostById: jest.fn().mockResolvedValue(post),
    } as unknown as jest.Mocked<PostRepository>;
    const useCase = new GetPostUseCase(repository);

    const result = await useCase.execute(4);

    expect(repository.getPostById).toHaveBeenCalledWith(4);
    expect(result).toEqual(post);
  });

  it('GetUserUseCase retrieves user information', async () => {
    const user = { id: 10, name: 'User', username: 'user' };
    const repository = {
      getUserById: jest.fn().mockResolvedValue(user),
    } as unknown as jest.Mocked<UserRepository>;
    const useCase = new GetUserUseCase(repository);

    const result = await useCase.execute(10);

    expect(repository.getUserById).toHaveBeenCalledWith(10);
    expect(result).toEqual(user);
  });

  it('GetCommentUseCase retrieves comments for a post', async () => {
    const comments = [
      { id: 1, body: 100, postId: 3, userId: 2 },
      { id: 2, body: 200, postId: 3, userId: 4 },
    ];
    const repository = {
      getCommentsByPostId: jest.fn().mockResolvedValue(comments),
    } as unknown as jest.Mocked<CommentRepository>;
    const useCase = new GetCommentUseCase(repository);

    const result = await useCase.execute(3);

    expect(repository.getCommentsByPostId).toHaveBeenCalledWith(3);
    expect(result).toEqual(comments);
  });
});
