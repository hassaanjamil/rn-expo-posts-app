import React from 'react';
import { render } from '@testing-library/react-native';
import { FavoriteScreen } from '../FavoriteScreen';
import type { Post } from '@/presentation/features/posts/types';

jest.mock('@/presentation/features/favorite/hooks', () => ({
  useFavoritePosts: jest.fn(),
}));

const { useFavoritePosts } = jest.requireMock('@/presentation/features/favorite/hooks') as {
  useFavoritePosts: jest.Mock;
};

const mockPostList = jest.fn((_props: unknown) => null);
jest.mock('@/presentation/features/posts/components/PostList', () => ({
  PostList: (props: unknown) => {
    mockPostList(props);
    return null;
  },
}));

describe('FavoriteScreen', () => {
  beforeEach(() => {
    useFavoritePosts.mockReset();
    mockPostList.mockClear();
  });

  it('renders empty state message when there are no favorites', () => {
    useFavoritePosts.mockReturnValue({
      favoritePosts: [],
      toggleFavoritePost: jest.fn(),
    });

    const { getByText } = render(<FavoriteScreen />);

    expect(getByText('No Posts!')).toBeTruthy();
    expect(mockPostList).not.toHaveBeenCalled();
  });

  it('renders list when favorites exist', () => {
    const favoritePosts: Post[] = [
      { id: 1, userId: 2, title: 'Favorite', body: 'Favorite body', isFavorite: true },
    ];
    const toggleFavoritePost = jest.fn();
    useFavoritePosts.mockReturnValue({
      favoritePosts,
      toggleFavoritePost,
    });

    const { queryByText } = render(<FavoriteScreen />);

    expect(queryByText('No Posts!')).toBeNull();
    expect(mockPostList).toHaveBeenCalledTimes(1);
    // ensure mockPostList is treated as a jest.Mock so .mock.calls is correctly typed
    const props = (mockPostList as jest.Mock).mock.calls[0][0] as unknown as {
      posts: Post[];
      onToggleFavorite: (post: Post) => void;
    };
    expect(props.posts).toEqual(favoritePosts);

    props.onToggleFavorite(favoritePosts[0]);
    expect(toggleFavoritePost).toHaveBeenCalledWith(favoritePosts[0]);
  });
});
