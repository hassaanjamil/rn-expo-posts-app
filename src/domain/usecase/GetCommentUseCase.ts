import { CommentDto } from '@/data/dto';
import { CommentRepository } from '@/domain/repository';

export class GetCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) { }

  execute(id: number): Promise<CommentDto[] | null> {
    return this.commentRepository.getCommentsByPostId(id);
  }
}
