import React from 'react';
import { useTranslation } from 'react-i18next';
import { Post } from '@/domain/entity';
import { ThemedText, ThemedView } from '@/presentation/components/theme';
import { Pressable } from 'react-native';
import { responsiveHitSlop, useResponsiveValue } from '@/main/utils/PixelUtils';
import { postListItemStyles } from '../../posts/styles/postListItemStyles';

type PostListItemProps = {
  item: Post;
  onPress: (id: number) => void;
};

export const PostListItem: React.FC<PostListItemProps> = ({ item, onPress }) => {
  const { t } = useTranslation();
  const maxBodyLines = useResponsiveValue({
    phone: 3,
    tablet: 5,
    desktop: 5,
  });

  return (
    <Pressable hitSlop={responsiveHitSlop()} onPress={() => onPress(item.id)}>
      <ThemedView style={postListItemStyles.container}>
        <ThemedText
          type="title"
          style={postListItemStyles.title}>
          {item.title}
        </ThemedText>
        <ThemedText
          numberOfLines={maxBodyLines}
          type="default"
          style={postListItemStyles.body}>
          {item.body}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};
