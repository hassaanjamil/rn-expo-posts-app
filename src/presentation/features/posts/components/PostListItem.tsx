import React from 'react';
import { Post } from '@/domain/entity';
import { ThemedText, ThemedView } from '@/presentation/components/theme';
import { Pressable } from 'react-native';
import { moderateScale, responsiveHitSlop, useResponsiveValue } from '@/main/utils/PixelUtils';
import { postListItemStyles } from '../../posts/styles/postListItemStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { cardStyles } from '@/main/styles';

type PostListItemProps = {
  post: Post;
  onPress?: (id: number) => void;
  onToggleFavorite?: (post: Post) => void;
};

export const PostListItem: React.FC<PostListItemProps> =
  ({
    post,
    onPress,
    onToggleFavorite,
  }) => {
    const { colors } = useTheme();
    const maxBodyLines = useResponsiveValue({
      phone: 3,
      tablet: 5,
      desktop: 5,
    });

    const handleFavoritePress = () => {
      onToggleFavorite && onToggleFavorite(post);
    }

    return (
      <Pressable
        hitSlop={responsiveHitSlop()}
        onPress={() => {
          onPress && onPress(post.id)
        }}>
        <ThemedView style={cardStyles.container}>
          <ThemedText
            type="title"
            style={postListItemStyles.title}>
            {post.title}
          </ThemedText>
          <ThemedText
            numberOfLines={maxBodyLines}
            type="default"
            style={postListItemStyles.body}>
            {post.body}
          </ThemedText>
          <ThemedView style={postListItemStyles.toggleFavoriteContainer}>
            <Pressable
              onPress={() => {
                onToggleFavorite && onToggleFavorite(post);
              }}
              hitSlop={moderateScale(8)}>
              <MaterialIcons name={post.isFavorite ? "favorite" : "favorite-outline"} color={colors.text} size={moderateScale(22)} />
            </Pressable>
          </ThemedView>
        </ThemedView>
      </Pressable>
    );
  };
