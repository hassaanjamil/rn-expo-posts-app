import { User } from "@/domain/entity";
import { ThemedText, ThemedView } from "@/presentation/components/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, ViewProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { horizontalScale } from "@/main/utils/PixelUtils";
import { cardStyles } from "@/main/styles/cardStyles";
import { postDetailStyles } from "../styles/postDetailStyles";

type CommentListItemProps = {
  user: User,
  containerStyle?: StyleProp<ViewProps>;
}
export const UserRowItem = ({
  user,
  containerStyle,
}: CommentListItemProps) => {

  const { colors } = useTheme();

  if (!user) {
    return;
  }

  return (
    <ThemedView style={[cardStyles.container, postDetailStyles.userCard, containerStyle]}>
      <ThemedView style={postDetailStyles.userRow}>
        <MaterialIcons style={{ marginEnd: horizontalScale(5) }} name="person" size={horizontalScale(18)} color={colors.text} />
        <ThemedText type="default">
          {user.name}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
