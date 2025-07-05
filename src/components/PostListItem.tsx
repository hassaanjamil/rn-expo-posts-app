import React from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ThemedButton } from './ThemedButton';
import { styles } from '@/style/postListItem';
import { PostListItemProps } from '@/types/postListItem';
import { useTranslation } from 'react-i18next';

const PostListItem: React.FC<PostListItemProps> = ({ item, onPress }) => {
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

export default PostListItem;