import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemedText, ThemedView } from '@/presentation/components/theme';
import { LoaderComponent, ErrorComponent } from '@/presentation/components/common';
import { postDetailStyles } from '@/presentation/features/postDetail/styles/postDetailStyles';
import { usePostDetail } from '@/presentation/features/postDetail/hooks/usePostDetail';
import { postListItemStyles } from '../../posts/styles/postListItemStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import { CommentList } from '../components/CommentList';

export const PostDetailScreen: React.FC = () => {
  const { postId, userId } = useLocalSearchParams<{ postId?: string; userId?: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const numericPostId = useMemo(() => (postId ? Number(postId) : undefined), [postId]);
  const numericUserId = useMemo(() => (userId ? Number(userId) : undefined), [userId]);

  const { post, user, comments, isLoading, error } = usePostDetail(numericPostId, numericUserId);

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <LoaderComponent />}
      {error && <ErrorComponent message={error} />}
      {post && (
        <ThemedView style={postListItemStyles.container}>
          <ThemedText type="title" style={postDetailStyles.title}>
            {post.title}
          </ThemedText>
          <ThemedText style={postDetailStyles.body}>{post.body}</ThemedText>
        </ThemedView>
      )}
      {user && (
        <ThemedView style={[postListItemStyles.container, { marginVertical: 3 }]}>
          <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="person" size={16} color={colors.text} />
            <ThemedText style={postDetailStyles.userInfo}>
              {user.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}
      {comments && comments.length > 0 && (
        <CommentList comments={comments} />
      )}
    </View>
  );
};
