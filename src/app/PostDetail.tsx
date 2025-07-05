import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import ErrorComponent from "@/components/ui/ErrorComponent";
import LoaderComponent from "@/components/ui/LoaderComponent";
import { useLazyGetPostQuery, useLazyGetUserQuery } from "@/services/jsonPlaceholderApi";
import { styles } from "@/style/postDetail";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const PostDetail = () => {
  const { postId, userId } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const [triggerPost, { data: postData, isLoading: isPostLoading, error: postError }] = useLazyGetPostQuery();
  const [triggerUser, { data: userData, isLoading: isUserLoading, error: userError }] = useLazyGetUserQuery();

  const goBackToPosts = () => {
    router.back();
  };

  useEffect(() => {
    if (postId) {
      triggerPost(Number(postId));
    }
    if (userId) {
      triggerUser(Number(userId));
    }
  }, [triggerUser, postId, userId, triggerPost]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.postDetailContainer}>
        {(isPostLoading || isUserLoading) && <LoaderComponent />}
        {(postError || userError) && (
          <ErrorComponent message={postError ? JSON.stringify(postError)
            : userError ? JSON.stringify(userError)
              : ''} />
        )}
        {postData && (
          <ThemedView style={styles.card}>
            <ThemedText type="title" style={styles.title}>
              {postData.title}
            </ThemedText>
            <ThemedText style={styles.body}>
              {postData.body}
            </ThemedText>
            {userData && (
              <ThemedView style={styles.userCard}>
                <ThemedText type="subtitle" style={styles.userTitle}>
                  {t('user-details')}
                </ThemedText>
                <ThemedText style={styles.userInfo}>
                  Name: {userData.name}
                </ThemedText>
                <ThemedText style={styles.userInfo}>
                  Email: {userData.email}
                </ThemedText>
                <ThemedText style={styles.userInfo}>
                  Username: {userData.username}
                </ThemedText>
              </ThemedView>
            )}
            <ThemedButton
              title={t('go-back')}
              type="primary"
              style={styles.button}
              onPress={goBackToPosts}
            />
          </ThemedView>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};

export default PostDetail;