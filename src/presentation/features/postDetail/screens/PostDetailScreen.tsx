import React, { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemedButton, ThemedText, ThemedView } from '@/presentation/components/theme';
import { LoaderComponent, ErrorComponent } from '@/presentation/components/common';
import { postDetailStyles } from '@/presentation/features/postDetail/styles/postDetailStyles';
import { usePostDetail } from '@/presentation/features/postDetail/hooks/usePostDetail';

export const PostDetailScreen: React.FC = () => {
  const { postId, userId } = useLocalSearchParams<{ postId?: string; userId?: string }>();
  const router = useRouter();
  const { t } = useTranslation();

  const numericPostId = useMemo(() => (postId ? Number(postId) : undefined), [postId]);
  const numericUserId = useMemo(() => (userId ? Number(userId) : undefined), [userId]);

  const { post, user, isLoading, error } = usePostDetail(numericPostId, numericUserId);

  const goBackToPosts = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={postDetailStyles.container}>
        {isLoading && <LoaderComponent />}
        {error && <ErrorComponent message={error} />}
        {post && (
          <ThemedView style={postDetailStyles.card}>
            <ThemedText type="title" style={postDetailStyles.title}>
              {post.title}
            </ThemedText>
            <ThemedText style={postDetailStyles.body}>{post.body}</ThemedText>

            {user && (
              <ThemedView style={postDetailStyles.userCard}>
                <ThemedText type="subtitle" style={postDetailStyles.userTitle}>
                  {t('user-details')}
                </ThemedText>
                <ThemedText style={postDetailStyles.userInfo}>
                  Name: {user.name}
                </ThemedText>
                <ThemedText style={postDetailStyles.userInfo}>
                  Email: {user.email}
                </ThemedText>
                <ThemedText style={postDetailStyles.userInfo}>
                  Username: {user.username}
                </ThemedText>
              </ThemedView>
            )}

            <ThemedButton
              title={t('go-back')}
              type="primary"
              style={postDetailStyles.button}
              onPress={goBackToPosts}
            />
          </ThemedView>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};
