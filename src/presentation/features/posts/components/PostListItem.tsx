import React from 'react';
import { useTranslation } from 'react-i18next';
import { Post } from '@/data/entity';
import { ThemedText, ThemedView } from '@/presentation/components/theme';
import { postListItemStyles } from '@/presentation/features/posts/styles/postListItemStyles';
import { Pressable } from 'react-native';

type PostListItemProps = {
  item: Post;
  onPress: (id: number) => void;
};

export const PostListItem: React.FC<PostListItemProps> = ({ item, onPress }) => {
  const { t } = useTranslation();

  return (
    <Pressable onPress={() => onPress(item.id)}>
      <ThemedView style={postListItemStyles.container}>
        <ThemedText type="title" style={postListItemStyles.title}>
          {item.title}
        </ThemedText>
        <ThemedText style={postListItemStyles.body}>{item.body}</ThemedText>
      </ThemedView>
    </Pressable>
  );
};
