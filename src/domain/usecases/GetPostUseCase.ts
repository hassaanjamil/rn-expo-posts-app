import { PostRepository } from '@/domain/repositories/PostRepository';
import { PostDto } from '../dto/PostDto';

export class GetPostUseCase {
  constructor(private readonly postRepository: PostRepository) { }

  execute(id: number): Promise<PostDto | null> {
    return this.postRepository.getPostById(id);
  }
}
