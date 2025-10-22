import { renderHook, waitFor } from '@testing-library/react-native';
import { usePosts } from '../usePosts';
import type { Post } from '@/presentation/features/posts/types';

jest.mock('@/main/dependencies', () => ({
  useCases: {
    getPostsUseCase: { execute: jest.fn() },
  },
}));

const { useCases } = jest.requireMock('@/main/dependencies') as {
  useCases: {
    getPostsUseCase: { execute: jest.Mock };
  };
};

describe('usePosts', () => {
  const samplePosts: Post[] = [
    { id: 1, userId: 2, title: 'First', body: 'First body' },
    { id: 2, userId: 3, title: 'Second', body: 'Second body' },
  ];

  beforeEach(() => {
    useCases.getPostsUseCase.execute.mockReset();
  });

  it('loads posts and merges favorite flags', async () => {
    useCases.getPostsUseCase.execute.mockResolvedValue(samplePosts);
    const favoritePosts: Post[] = [{ ...samplePosts[0], isFavorite: true }];

    const { result } = renderHook(() => usePosts(favoritePosts));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.postsWithFavorites).toEqual([
      { ...samplePosts[0], isFavorite: true },
      { ...samplePosts[1], isFavorite: false },
    ]);
  });

  it('captures errors when loading posts fails', async () => {
    useCases.getPostsUseCase.execute.mockRejectedValue(new Error('Network failure'));

    const { result } = renderHook(() => usePosts([]));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.postsWithFavorites).toEqual([]);
    expect(result.current.error).toBe('Network failure');
  });
});
