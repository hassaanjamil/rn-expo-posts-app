import React from 'react';
import { Post } from '@/presentation/features/posts/types';
import { FlatList } from 'react-native';
import { PostListItem } from './PostListItem';

type PostListProps = {
  posts: Post[];
  goToDetail?: (postId: number, userId: number) => void;
  onToggleFavorite?: (post: Post) => void;
};

export const PostList: React.FC<PostListProps> =
  ({
    posts,
    goToDetail,
    onToggleFavorite,
  }) => {
    return (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostListItem
            post={item}
            onPress={() => {
              goToDetail && goToDetail(item.id, item.userId)
            }}
            onToggleFavorite={() => {
              onToggleFavorite && onToggleFavorite(item)
            }}
          />
        )}
      />
    );
  };
