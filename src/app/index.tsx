import { FlatList, View } from "react-native";
import { useRouter } from 'expo-router';
import { useGetPostsQuery } from "@/services/jsonPlaceholderApi";
import LoaderComponent from "@/components/ui/LoaderComponent";
import ErrorComponent from "@/components/ui/ErrorComponent";
import PostListItem from "@/components/PostListItem";
import { SafeAreaView } from "react-native-safe-area-context";

const Posts = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetPostsQuery();

  const goToDetail = (postId: number, userId: number) => {
    router.push({ pathname: '/PostDetail', params: { postId, userId } });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {isLoading && <LoaderComponent />}
        {error && <ErrorComponent message={JSON.stringify(error)} />}
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
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
      </View>
    </SafeAreaView>
  );
};

export default Posts;