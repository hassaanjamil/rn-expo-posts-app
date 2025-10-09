import { PostDto } from '@/domain/dto/PostDto';

export interface PostRepository {
  getPosts(): Promise<PostDto[]>;
  getPostById(id: number): Promise<PostDto | null>;
}
