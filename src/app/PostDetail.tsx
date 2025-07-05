import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import ErrorComponent from "@/components/ui/ErrorComponent";
import LoaderComponent from "@/components/ui/LoaderComponent";
import { useLazyGetPostQuery, useLazyGetUserQuery } from "@/services/jsonPlaceholderApi";
import { styles } from "@/style/postDetail";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "@/components/ThemedView";

const PostDetail = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { postId, userId } = useLocalSearchParams();
  const router = useRouter();

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
    <ThemedView style={styles.postDetailContainer}>
      {isPostLoading || isUserLoading && <LoaderComponent />}
      {((postError || userError) && (
        <ErrorComponent message={postError ? JSON.stringify(postError) : JSON.stringify(userError)} />
      ))}
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
                User Details
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
            title="Go Back"
            type="primary"
            style={styles.button}
            onPress={goBackToPosts}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default PostDetail;