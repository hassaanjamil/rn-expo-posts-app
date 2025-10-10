import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemedText, ThemedView } from '@/presentation/components/theme';
import { LoaderComponent, ErrorComponent } from '@/presentation/components/common';
import { postDetailStyles } from '@/presentation/features/postDetail/styles/postDetailStyles';
import { usePostDetail } from '@/presentation/features/postDetail/hooks/usePostDetail';
import { postListItemStyles } from '../../posts/styles/postListItemStyles';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export const PostDetailScreen: React.FC = () => {
  const { postId, userId } = useLocalSearchParams<{ postId?: string; userId?: string }>();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const numericPostId = useMemo(() => (postId ? Number(postId) : undefined), [postId]);
  const numericUserId = useMemo(() => (userId ? Number(userId) : undefined), [userId]);

  const { post, user, isLoading, error } = usePostDetail(numericPostId, numericUserId);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <Ionicons name="person" size={16} color={colors.text} />
            <ThemedText style={postDetailStyles.userInfo}>
              {user.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}
      {/* COMMENTS */}
      {/* {user && (
        <ThemedView style={[postListItemStyles.container, { marginVertical: 3 }]}>
          <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="person" size={16} color={colors.text} />
            <ThemedText style={postDetailStyles.userInfo}>
              {user.name}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )} */}
    </SafeAreaView>
  );
};
