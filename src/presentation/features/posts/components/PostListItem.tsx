import React from 'react';
import { useTranslation } from 'react-i18next';
import { Post } from '@/data/entities';
import { ThemedButton, ThemedText, ThemedView } from '@/presentation/components/theme';
import { postListItemStyles } from '@/presentation/features/posts/styles/postListItemStyles';

type PostListItemProps = {
  item: Post;
  onPress: (id: number) => void;
};

export const PostListItem: React.FC<PostListItemProps> = ({ item, onPress }) => {
  const { t } = useTranslation();

  return (
    <ThemedView style={postListItemStyles.container}>
      <ThemedText type="title" style={postListItemStyles.title}>
        {item.title}
      </ThemedText>
      <ThemedText style={postListItemStyles.body}>{item.body}</ThemedText>
      <ThemedButton
        title={t('view-details')}
        type="primary"
        style={postListItemStyles.button}
        onPress={() => onPress(item.id)}
      />
    </ThemedView>
  );
};
