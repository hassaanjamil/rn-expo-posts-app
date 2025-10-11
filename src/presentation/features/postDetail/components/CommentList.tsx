import { Comment } from "@/domain/entity";
import { StyleProp, FlatList, StyleSheet, View, ViewStyle } from "react-native";
import { CommentListItem } from "./CommentListItem";
import { ThemedView } from "@/presentation/components/theme";
import { postListItemStyles } from "../../posts/styles/postListItemStyles";
import { spacingY } from "@/presentation/theme/spacing";

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
    <ThemedView style={[postListItemStyles.container, containerStyle]}>
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

const commentListStyles = StyleSheet.create({
  contentContainer: {
    paddingVertical: spacingY.s,
  },
  separator: {
    height: spacingY.xs,
  },
});
