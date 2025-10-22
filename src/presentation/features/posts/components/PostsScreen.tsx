import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { LoaderComponent, ErrorComponent } from '@/presentation/components/common';
import { usePosts } from '@/presentation/features/posts/hooks/usePosts';
import { Post } from '@/presentation/features/posts/types';
import { PostList } from './PostList';
import { useFavoritePosts } from '@/presentation/features/favorite/hooks';

export const PostsScreen: React.FC = () => {
  const router = useRouter();
  const { favoritePosts, toggleFavoritePost } = useFavoritePosts();
  const { postsWithFavorites, isLoading, error } = usePosts(favoritePosts);

  const goToDetail = (postId: number, userId: number) => {
    router.push({ pathname: '/post-detail', params: { postId, userId } });
  };

  const handleToggleFavorite = useCallback((post: Post) => {
    (async () => {
      await toggleFavoritePost(post);
    })();
  }, [toggleFavoritePost]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <LoaderComponent />}
      {error && <ErrorComponent message={error} />}
      <PostList
        posts={postsWithFavorites}
        goToDetail={goToDetail}
        onToggleFavorite={handleToggleFavorite} />
    </View>
  );
};
