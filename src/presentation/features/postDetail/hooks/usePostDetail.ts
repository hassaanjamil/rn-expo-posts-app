import { useCallback, useEffect, useMemo, useState } from 'react';
import { Post, User, Comment } from '@/data/entity';
import { useCases } from '@/main/dependencies';

type UsePostDetailState = {
  post: Post | null;
  user: User | null;
  comments: Comment[] | null;
  isLoading: boolean;
  error: string | null;
};

export const usePostDetail = (postId?: number, userId?: number) => {
  const [state, setState] = useState<UsePostDetailState>({
    post: null,
    user: null,
    comments: null,
    isLoading: false,
    error: null,
  });

  const detailAvailable = useMemo(() => typeof postId === 'number' && !Number.isNaN(postId), [postId]);

  const loadDetail = useCallback(async () => {
    if (!detailAvailable) {
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const postPromise = useCases.getPostUseCase.execute(postId as number);
      const userPromise =
        typeof userId === 'number' && !Number.isNaN(userId)
          ? useCases.getUserUseCase.execute(userId)
          : Promise.resolve(null);
      const commentsPromise = useCases.getCommentUseCase.execute(postId as number);

      const [post, user, comments] = await Promise.all([postPromise, userPromise, commentsPromise]);

      setState({
        post,
        user,
        comments,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        post: null,
        user: null,
        comments: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load post details',
      });
    }
  }, [detailAvailable, postId, userId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  return {
    ...state,
    refresh: loadDetail,
  };
};
