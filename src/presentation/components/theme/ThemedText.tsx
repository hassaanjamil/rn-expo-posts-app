import { StyleSheet, Text, type TextProps } from 'react-native';
import { useThemeColor } from '@/main/hooks/useThemeColor';
import { typography } from '@/presentation/theme/typography';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

const themedTextStyles = StyleSheet.create({
  default: {
    ...typography.body,
  },
  defaultSemiBold: {
    ...typography.body,
    fontFamily: typography.subtitle.fontFamily,
  },
  title: {
    ...typography.title,
  },
  subtitle: {
    ...typography.subtitle,
  },
  link: {
    ...typography.body,
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
});

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? themedTextStyles.default : undefined,
        type === 'title' ? themedTextStyles.title : undefined,
        type === 'defaultSemiBold' ? themedTextStyles.defaultSemiBold : undefined,
        type === 'subtitle' ? themedTextStyles.subtitle : undefined,
        type === 'link' ? themedTextStyles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}
