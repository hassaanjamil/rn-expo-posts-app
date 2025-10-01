import React from 'react';
import { ThemedView } from '../theme/ThemedView';
import { ThemedText } from '../theme/ThemedText';
import { ThemedButton } from '../theme/ThemedButton';
import { styles } from '@/style/postListItem';
import { PostListItemProps } from '@/types/postListItem';
import { useTranslation } from 'react-i18next';

export const PostListItem: React.FC<PostListItemProps> = ({ item, onPress }) => {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.pliContainer}>
      <ThemedText type="title" style={styles.pliTitle}>{item?.title}</ThemedText>
      <ThemedText style={styles.pliBody}>{item?.body}</ThemedText>
      <ThemedButton
        title={t('view-details')}
        type="primary"
        style={styles.pliButton}
        onPress={() => onPress(item?.id ?? -1)}
      />
    </ThemedView>
  )
};