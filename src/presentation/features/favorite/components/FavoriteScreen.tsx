import React, { useCallback } from 'react';
import { ThemedText, ThemedView } from '@/presentation/components/theme';
import { useFavoritePosts } from '@/presentation/features/favorite/hooks';
import { useRouter } from 'expo-router';
import { Post } from '@/presentation/features/posts/types';
import { PostList } from '../../posts/components/PostList';
import { View } from 'react-native';

export const FavoriteScreen: React.FC = () => {
  const { favoritePosts, toggleFavoritePost } = useFavoritePosts();

  const router = useRouter();

  const goToDetail = (postId: number, userId: number) => {
    router.push({ pathname: '/post-detail', params: { postId, userId } });
  };

  const handleToggleFavorite = useCallback((post: Post) => {
    (async () => {
      await toggleFavoritePost(post);
    })();
  }, [toggleFavoritePost]);

  if (favoritePosts.length <= 0) {
    return (
      <ThemedView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ThemedText type='subtitle'>No Posts!</ThemedText>
      </ThemedView>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <PostList
        posts={favoritePosts}
        goToDetail={goToDetail}
        onToggleFavorite={handleToggleFavorite}
      />
    </View>
  );
}
