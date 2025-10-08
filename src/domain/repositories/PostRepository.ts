import { Post } from '@/domain/entities/Post';

export interface PostRepository {
  getPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | null>;
}
