import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PostListItem } from '@/presentation/features/posts/components';
import { LoaderComponent, ErrorComponent } from '@/presentation/components/common';
import { usePosts } from '@/presentation/features/posts/hooks/usePosts';

export const PostsScreen: React.FC = () => {
  const router = useRouter();
  const { posts, isLoading, error } = usePosts();

  const goToDetail = (postId: number, userId: number) => {
    router.push({ pathname: '/PostDetail', params: { postId, userId } });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {isLoading && <LoaderComponent />}
        {error && <ErrorComponent message={error} />}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PostListItem
              item={item}
              onPress={() => goToDetail(item.id, item.userId)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
