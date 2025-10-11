import { PostDto } from '@/data/dto';

export interface PostRepository {
  getPosts(): Promise<PostDto[]>;
  getPostById(id: number): Promise<PostDto | null>;
}
