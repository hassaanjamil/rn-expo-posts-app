import { styles } from "@/style/posts";
import { FlatList } from "react-native";
import { useRouter } from 'expo-router';
import { useGetPostsQuery } from "@/services/jsonPlaceholderApi";
import LoaderComponent from "@/components/ui/LoaderComponent";
import ErrorComponent from "@/components/ui/ErrorComponent";
import PostListItem from "@/components/PostListItem";

const Posts = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetPostsQuery();

  const goToDetail = (postId: number, userId: number) => {
    router.push({ pathname: '/PostDetail', params: { postId, userId } });
  };

  return (
    <FlatList
      style={{ height: '100%' }}
      data={data}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.postsListContainer}
      renderItem={({ item }) => (
        <PostListItem
          item={item}
          onPress={() => {
            goToDetail(item?.id, item?.userId);
          }}
        />
      )}
    // For lazy loading/pagination, add these props:
    // onEndReached={() => { /* fetch more data here */ }}
    // onEndReachedThreshold={0.5}
    />
  );
};

export default Posts;