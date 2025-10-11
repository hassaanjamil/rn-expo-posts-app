import { Comment } from "@/domain/entity";
import { ThemedText, ThemedView } from "@/presentation/components/theme";
import { postDetailStyles } from "../styles/postDetailStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, ViewProps } from "react-native";
import { useTheme } from "@react-navigation/native";

type CommentListItemProps = {
  comment: Comment,
  containerStyle?: StyleProp<ViewProps>;
}
export const CommentListItem = ({
  comment,
  containerStyle,
}: CommentListItemProps) => {

  const { colors } = useTheme();

  if (!comment) {
    return;
  }

  return (
    <ThemedView
      style={[{ flexDirection: 'row', marginTop: 5 }, containerStyle]}>
      <MaterialIcons
        style={{ marginTop: 2 }}
        name="format-quote" size={16}
        color={colors.text} />
      <ThemedText
        type='default'
        style={postDetailStyles.userInfo}>
        {comment.body}
      </ThemedText>
    </ThemedView>
  );
}