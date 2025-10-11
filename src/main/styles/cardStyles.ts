import { borderRadius, spacingX, spacingY } from "@/presentation/theme/spacing";
import { StyleSheet } from "react-native";
import { moderateScale } from "../utils/PixelUtils";

export const cardStyles = StyleSheet.create({
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
});