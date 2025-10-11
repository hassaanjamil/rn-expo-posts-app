import { CommentDto } from '@/data/dto';

export interface CommentRepository {
  getCommentsByPostId(id: number): Promise<CommentDto[] | null>;
}
