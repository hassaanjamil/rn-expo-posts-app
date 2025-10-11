import { CommentRepository } from '@/domain/repository';
import { CommentRemoteDataSource } from '@/data/source/remote/APIService';
import { CommentLocalDataSource } from '@/data/source/local';
import { CommentDto } from '@/domain/dto';
import { mapCommentDtoToComment, mapCommentToCommentDto } from '../mapper/commentMapper';

export class CommentRepositoryImpl implements CommentRepository {
  constructor(
    private readonly remoteDataSource: CommentRemoteDataSource,
    private readonly localDataSource: CommentLocalDataSource
  ) { }

  async getCommentsByPostId(id: number): Promise<CommentDto[] | null> {
    const cachedUser = await this.localDataSource.getCommentsByPostId(id);
    if (cachedUser) {
      return mapCommentDtoToComment(cachedUser);
    }

    const remoteUser = await this.remoteDataSource.fetchCommentsByPostId(id);
    await this.localDataSource.saveComments(remoteUser, id);
    return mapCommentToCommentDto(remoteUser);
  }
}
