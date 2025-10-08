import { Post } from '@/domain/entities/Post';
import { PostRepository } from '@/domain/repositories/PostRepository';

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  execute(): Promise<Post[]> {
    return this.postRepository.getPosts();
  }
}
