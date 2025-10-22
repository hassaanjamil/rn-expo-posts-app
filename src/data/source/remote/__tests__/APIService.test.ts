import { APIService } from '../APIService';
import { get } from '../axiosClient';

jest.mock('../axiosClient', () => ({
  get: jest.fn(),
}));

const mockedGet = get as jest.MockedFunction<typeof get>;

describe('APIService', () => {
  let apiService: APIService;

  beforeEach(() => {
    apiService = new APIService();
    mockedGet.mockReset();
  });

  it('fetchPosts requests posts endpoint and returns payload', async () => {
    const payload = [
      { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
    ];
    mockedGet.mockResolvedValue({ data: payload, status: 200, statusText: 'OK' });

    const posts = await apiService.fetchPosts();

    expect(mockedGet).toHaveBeenCalledWith('/posts');
    expect(posts).toEqual(payload);
  });

  it('fetchPostById requests post detail endpoint', async () => {
    const payload = { id: 10, userId: 5, title: 'Post detail', body: 'Body detail' };
    mockedGet.mockResolvedValue({ data: payload, status: 200, statusText: 'OK' });

    const post = await apiService.fetchPostById(10);

    expect(mockedGet).toHaveBeenCalledWith('/posts/10');
    expect(post).toEqual(payload);
  });

  it('fetchUserById requests user endpoint', async () => {
    const payload = { id: 3, name: 'User 3', username: 'user3' };
    mockedGet.mockResolvedValue({ data: payload, status: 200, statusText: 'OK' });

    const user = await apiService.fetchUserById(3);

    expect(mockedGet).toHaveBeenCalledWith('/users/3');
    expect(user).toEqual(payload);
  });

  it('fetchCommentsByPostId requests comments endpoint', async () => {
    const payload = [
      { id: 1, body: 100, postId: 10, userId: 2 },
      { id: 2, body: 200, postId: 10, userId: 4 },
    ];
    mockedGet.mockResolvedValue({ data: payload, status: 200, statusText: 'OK' });

    const comments = await apiService.fetchCommentsByPostId(10);

    expect(mockedGet).toHaveBeenCalledWith('/comments/10');
    expect(comments).toEqual(payload);
  });
});
