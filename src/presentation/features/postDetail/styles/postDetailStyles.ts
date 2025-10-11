import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale } from '@/main/utils/PixelUtils';
import { borderRadius, spacingX, spacingY } from '@/presentation/theme/spacing';
import { typography } from '@/presentation/theme/typography';

export const postDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: spacingY.s,
    paddingHorizontal: spacingX.l,
    paddingVertical: spacingY.s,
    borderRadius: borderRadius.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(6, 0.4),
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    marginBottom: spacingY.s,
  },
  body: {
    marginBottom: spacingY.none,
  },
  userCard: {
    borderRadius: borderRadius.m,
    paddingHorizontal: spacingX.l,
    paddingVertical: spacingY.m,
    marginBottom: spacingY.m,
    borderWidth: StyleSheet.hairlineWidth,
  },
  userTitle: {
    ...typography.subtitle,
    marginBottom: spacingY.xs,
  },
  userInfo: {
    ...typography.caption,
    marginBottom: spacingY.none,
    marginLeft: horizontalScale(4),
  },
  button: {
    alignSelf: 'center',
    minWidth: horizontalScale(120),
  },
});
