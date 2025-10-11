import { CommentDto } from '@/domain/dto';

export class CommentLocalDataSource {
  private readonly comments = new Map<number, CommentDto[]>();

  async getCommentsByPostId(id: number): Promise<CommentDto[] | null> {
    return this.comments.get(id) ?? null;
  }

  async saveComments(comments: CommentDto[], postId: number): Promise<void> {
    this.comments.set(postId, comments);
  }
}
