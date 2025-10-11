import { Comment } from "@/domain/entity";
import { ThemedText, ThemedView } from "@/presentation/components/theme";
import { postDetailStyles } from "../styles/postDetailStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, ViewProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { spacingX, spacingY } from "@/presentation/theme/spacing";
import { horizontalScale } from "@/main/utils/PixelUtils";

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
      style={[{ flexDirection: 'row' }, containerStyle]}>
      <MaterialIcons
        style={{ marginTop: spacingY.xxs, marginRight: spacingX.xs, }}
        name="format-quote" size={horizontalScale(16)}
        color={colors.text}
      />
      <ThemedText
        type="default"
        style={postDetailStyles.userInfo}>
        {comment.body}
      </ThemedText>
    </ThemedView>
  );
}
