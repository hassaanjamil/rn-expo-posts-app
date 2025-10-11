import { PostRepository } from '@/domain/repository';
import { PostRemoteDataSource } from '@/data/source/remote/APIService';
import { PostLocalDataSource } from '@/data/source/local/PostLocalDataSource';
import { mapPostDtoToPost } from '@/data/mapper';
import { PostDto } from '@/data/dto';

export class PostRepositoryImpl implements PostRepository {
  constructor(
    private readonly remoteDataSource: PostRemoteDataSource,
    private readonly localDataSource: PostLocalDataSource
  ) { }

  async getPosts(): Promise<PostDto[]> {
    const cachedPosts = await this.localDataSource.getPosts();
    if (cachedPosts && cachedPosts.length > 0) {
      return cachedPosts.map(mapPostDtoToPost);
    }

    const remotePosts = await this.remoteDataSource.fetchPosts();
    await this.localDataSource.savePosts(remotePosts);
    return remotePosts.map(mapPostDtoToPost);
  }

  async getPostById(id: number): Promise<PostDto | null> {
    const cachedPost = await this.localDataSource.getPostById(id);
    if (cachedPost) {
      return mapPostDtoToPost(cachedPost);
    }

    const remotePost = await this.remoteDataSource.fetchPostById(id);
    await this.localDataSource.savePost(remotePost);
    return mapPostDtoToPost(remotePost);
  }
}
