import { PostDto } from '@/domain/dto';

export interface PostRepository {
  getPosts(): Promise<PostDto[]>;
  getPostById(id: number): Promise<PostDto | null>;
}
