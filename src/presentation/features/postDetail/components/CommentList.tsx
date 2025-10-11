import { Comment } from "@/domain/entity";
import { StyleProp, ViewProps, FlatList } from "react-native";
import { CommentListItem } from "./CommentListItem";

type CommentListProps = {
  comments: Comment[],
  containerStyle?: StyleProp<ViewProps>;
  itemStyle?: StyleProp<ViewProps>;
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
    <FlatList
      style={containerStyle}
      keyExtractor={(item) => item.id.toString()}
      data={comments}
      renderItem={({ item }) => (
        <CommentListItem
          key={item.id}
          comment={item}
          containerStyle={itemStyle} />
      )}
    />
  );
}
