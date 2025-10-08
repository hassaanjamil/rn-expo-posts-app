import { Post } from '@/domain/entities/Post';
import { PostRepository } from '@/domain/repositories/PostRepository';

export class GetPostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  execute(id: number): Promise<Post | null> {
    return this.postRepository.getPostById(id);
  }
}
