import { horizontalScale, moderateScale } from "@/main/utils/PixelUtils";
import { borderRadius, spacingX, spacingY } from "@/presentation/theme/spacing";
import { typography } from "@/presentation/theme/typography";
import { StyleSheet } from "react-native";

export const commentListStyles = StyleSheet.create({
  container: {
    marginVertical: spacingY.xs,
    marginHorizontal: spacingX.s,
    paddingHorizontal: spacingX.s,
    paddingVertical: spacingY.s,
    borderRadius: borderRadius.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(6, 0.4),
    shadowOffset: { width: 0, height: 2 },
  },
  contentContainer: {
    paddingVertical: spacingY.s,
  },
  separator: {
    height: spacingY.xs,
  },
  infoText: {
    ...typography.caption,
    marginBottom: spacingY.none,
    marginLeft: horizontalScale(4),
  },
});