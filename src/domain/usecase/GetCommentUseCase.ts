import { CommentDto } from '../dto';
import { CommentRepository } from '../repository';

export class GetCommentUseCase {
  constructor(private readonly commentRepository: CommentRepository) { }

  execute(id: number): Promise<CommentDto[] | null> {
    return this.commentRepository.getCommentsByPostId(id);
  }
}
