import { PostRepository } from '@/domain/repository';
import { PostDto } from '../dto';

export class GetPostUseCase {
  constructor(private readonly postRepository: PostRepository) { }

  execute(id: number): Promise<PostDto | null> {
    return this.postRepository.getPostById(id);
  }
}
