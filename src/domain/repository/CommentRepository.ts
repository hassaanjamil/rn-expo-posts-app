import { CommentDto } from '@/domain/dto';

export interface CommentRepository {
  getCommentsByPostId(id: number): Promise<CommentDto[] | null>;
}
