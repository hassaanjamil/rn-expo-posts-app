import { User } from "@/domain/entity";
import { ThemedText, ThemedView } from "@/presentation/components/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleProp, StyleSheet, ViewProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { spacingY } from "@/presentation/theme/spacing";
import { horizontalScale } from "@/main/utils/PixelUtils";
import { postListItemStyles } from "../../posts/styles/postListItemStyles";

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
    <ThemedView style={[postListItemStyles.container, styles.userCard, containerStyle]}>
      <ThemedView style={styles.userRow}>
        <MaterialIcons style={{ marginEnd: horizontalScale(5) }} name="person" size={horizontalScale(18)} color={colors.text} />
        <ThemedText type="default">
          {user.name}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  userCard: {
    marginVertical: spacingY.xs,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
