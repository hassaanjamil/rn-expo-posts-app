
import { PostRepository } from '@/domain/repository';
import { PostDto } from '@/data/dto';

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepository) { }

  execute(): Promise<PostDto[]> {
    return this.postRepository.getPosts();
  }
}
