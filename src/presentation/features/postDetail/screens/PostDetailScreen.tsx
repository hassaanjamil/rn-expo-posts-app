import React, { useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText, ThemedView } from '@/presentation/components/theme';
import { LoaderComponent, ErrorComponent } from '@/presentation/components/common';
import { postDetailStyles } from '@/presentation/features/postDetail/styles/postDetailStyles';
import { usePostDetail } from '@/presentation/features/postDetail/hooks/usePostDetail';
import { StyleSheet, View } from 'react-native';
import { CommentList } from '../components/CommentList';
import { spacingY } from '@/presentation/theme/spacing';
import { UserRowItem } from '../components/UserListItem';

export const PostDetailScreen: React.FC = () => {
  const { postId, userId } = useLocalSearchParams<{ postId?: string; userId?: string }>();

  const numericPostId = useMemo(() => (postId ? Number(postId) : undefined), [postId]);
  const numericUserId = useMemo(() => (userId ? Number(userId) : undefined), [userId]);

  const { post, user, comments, isLoading, error } = usePostDetail(numericPostId, numericUserId);

  return (
    <View style={screenStyles.screen}>
      {isLoading && <LoaderComponent />}
      {error && <ErrorComponent message={error} />}
      {post && (
        <ThemedView style={postDetailStyles.container}>
          <ThemedText type="title" style={screenStyles.title}>
            {post.title}
          </ThemedText>
          <ThemedText style={postDetailStyles.body}>{post.body}</ThemedText>
        </ThemedView>
      )}
      {user && (
        <UserRowItem user={user} />
      )}
      {comments &&
        <CommentList
          comments={comments}
        />
      }
    </View>
  );
};

const screenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: spacingY.s,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCard: {
    marginVertical: spacingY.xs,
  },
  title: {
    marginBottom: spacingY.s,
  },
});
