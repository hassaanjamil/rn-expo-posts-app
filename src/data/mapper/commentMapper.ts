import { Comment } from '@/domain/entity';
import { CommentDto } from '@/data/dto';

export const mapCommentDtoToComment = (dtos: CommentDto[]): Comment[] =>
  dtos.map(dto => ({
    id: dto.id,
    body: dto.body,
    postId: dto.postId,
    userId: dto.userId,
  }));

export const mapCommentToCommentDto = (comments: Comment[]): CommentDto[] =>
  comments.map(c => ({
    id: c.id,
    body: c.body,
    postId: c.postId,
    userId: c.userId,
  }));