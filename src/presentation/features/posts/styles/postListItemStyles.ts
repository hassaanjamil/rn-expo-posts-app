import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale } from '@/main/utils/PixelUtils';
import { borderRadius, spacingX, spacingY } from '@/presentation/theme/spacing';

export const postListItemStyles = StyleSheet.create({
  container: {
    marginVertical: spacingY.s,
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
  title: {
    marginBottom: spacingY.s,
  },
  body: {
    color: '#666',
    marginBottom: spacingY.m,
  },
  button: {
    alignSelf: 'flex-end',
    minWidth: horizontalScale(120),
  },
});
