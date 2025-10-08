import { PostRepository } from '@/domain/repositories/PostRepository';
import { Post } from '@/domain/entities/Post';
import { PostRemoteDataSource } from '@/data/datasources/remote/JsonPlaceholderRemoteDataSource';
import { PostLocalDataSource } from '@/data/datasources/local/PostLocalDataSource';
import { mapPostDtoToEntity } from '@/data/mappers/postMapper';

export class PostRepositoryImpl implements PostRepository {
  constructor(
    private readonly remoteDataSource: PostRemoteDataSource,
    private readonly localDataSource: PostLocalDataSource
  ) {}

  async getPosts(): Promise<Post[]> {
    const cachedPosts = await this.localDataSource.getPosts();
    if (cachedPosts && cachedPosts.length > 0) {
      return cachedPosts.map(mapPostDtoToEntity);
    }

    const remotePosts = await this.remoteDataSource.fetchPosts();
    await this.localDataSource.savePosts(remotePosts);
    return remotePosts.map(mapPostDtoToEntity);
  }

  async getPostById(id: number): Promise<Post | null> {
    const cachedPost = await this.localDataSource.getPostById(id);
    if (cachedPost) {
      return mapPostDtoToEntity(cachedPost);
    }

    const remotePost = await this.remoteDataSource.fetchPostById(id);
    await this.localDataSource.savePost(remotePost);
    return mapPostDtoToEntity(remotePost);
  }
}
