import { PostRepositoryImpl } from '../PostRepositoryImpl';
import type { PostRemoteDataSource } from '@/data/source/remote/APIService';
import type { PostLocalDataSource } from '@/data/source/local/PostLocalDataSource';

const createPost = (id: number) => ({
  id,
  userId: 7,
  title: `Title ${id}`,
  body: `Body ${id}`,
});

describe('PostRepositoryImpl', () => {
  let remote: jest.Mocked<PostRemoteDataSource>;
  let local: jest.Mocked<PostLocalDataSource>;
  let repository: PostRepositoryImpl;

  beforeEach(() => {
    remote = {
      fetchPosts: jest.fn(),
      fetchPostById: jest.fn(),
    } as unknown as jest.Mocked<PostRemoteDataSource>;

    local = {
      getPosts: jest.fn(),
      getPostById: jest.fn(),
      savePosts: jest.fn(),
      savePost: jest.fn(),
    } as unknown as jest.Mocked<PostLocalDataSource>;

    repository = new PostRepositoryImpl(remote, local);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns cached posts when local storage has data', async () => {
    const cached = [createPost(1), createPost(2)];
    local.getPosts.mockResolvedValue(cached);

    const result = await repository.getPosts();

    expect(remote.fetchPosts).not.toHaveBeenCalled();
    expect(result).toEqual(cached);
  });

  it('fetches and caches posts when local storage is empty', async () => {
    local.getPosts.mockResolvedValue(null);
    const remotePosts = [createPost(3)];
    remote.fetchPosts.mockResolvedValue(remotePosts);

    const result = await repository.getPosts();

    expect(remote.fetchPosts).toHaveBeenCalledTimes(1);
    expect(local.savePosts).toHaveBeenCalledWith(remotePosts);
    expect(result).toEqual(remotePosts);
  });

  it('returns cached post detail when present', async () => {
    const cached = createPost(11);
    local.getPostById.mockResolvedValue(cached);

    const result = await repository.getPostById(11);

    expect(remote.fetchPostById).not.toHaveBeenCalled();
    expect(result).toEqual(cached);
  });

  it('fetches post detail remotely and saves it when cache miss occurs', async () => {
    local.getPostById.mockResolvedValue(null);
    const remotePost = createPost(20);
    remote.fetchPostById.mockResolvedValue(remotePost);

    const result = await repository.getPostById(20);

    expect(remote.fetchPostById).toHaveBeenCalledWith(20);
    expect(local.savePost).toHaveBeenCalledWith(remotePost);
    expect(result).toEqual(remotePost);
  });
});
