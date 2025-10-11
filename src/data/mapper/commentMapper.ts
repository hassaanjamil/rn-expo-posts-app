import { Comment } from '@/data/entity';
import { CommentDto } from '@/domain/dto';

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