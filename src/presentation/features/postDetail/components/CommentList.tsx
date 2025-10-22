import { Comment } from "@/presentation/features/postDetail/types";
import { StyleProp, FlatList, View, ViewStyle } from "react-native";
import { CommentListItem } from "./CommentListItem";
import { ThemedView } from "@/presentation/components/theme";
import { commentListStyles } from "../styles/commentListStyles";
import { cardStyles } from "@/main/styles";

type CommentListProps = {
  comments: Comment[],
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
}
export const CommentList = ({
  comments = [],
  containerStyle,
  itemStyle
}: CommentListProps) => {

  if (comments.length <= 0) {
    return;
  }

  return (
    <ThemedView style={[cardStyles.container, containerStyle]}>
      <FlatList
        contentContainerStyle={commentListStyles.contentContainer}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={commentListStyles.separator} />}
        showsVerticalScrollIndicator={false}
        data={comments}
        renderItem={({ item }) => (
          <CommentListItem
            key={item.id}
            comment={item}
            containerStyle={itemStyle} />
        )}
      />
    </ThemedView>
  );
}
