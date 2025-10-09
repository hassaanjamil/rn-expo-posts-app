
import { PostRepository } from '@/domain/repositories/PostRepository';
import { PostDto } from '../dto/PostDto';

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) { }

  execute(): Promise<PostDto[]> {
    return this.postRepository.getPosts();
  }
}
