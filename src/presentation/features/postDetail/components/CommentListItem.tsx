import { Comment } from "@/presentation/features/postDetail/types";
import { ThemedText, ThemedView } from "@/presentation/components/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, ViewProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { spacingX } from "@/presentation/theme/spacing";
import { horizontalScale } from "@/main/utils/PixelUtils";
import { commentListStyles } from "../styles/commentListStyles";

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
        style={{ marginRight: spacingX.xs }}
        name="format-quote" size={horizontalScale(22)}
        color={colors.text}
      />
      <ThemedText
        type="default"
        style={commentListStyles.infoText}>
        {comment.body}
      </ThemedText>
    </ThemedView>
  );
}
