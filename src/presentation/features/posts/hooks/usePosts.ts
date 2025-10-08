import { useCallback, useEffect, useState } from 'react';
import { Post } from '@/domain/entities/Post';
import { useCases } from '@/main/dependencies';

type UsePostsState = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
};

export const usePosts = () => {
  const [state, setState] = useState<UsePostsState>({
    posts: [],
    isLoading: true,
    error: null,
  });

  const loadPosts = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const posts = await useCases.getPostsUseCase.execute();
      setState({ posts, isLoading: false, error: null });
    } catch (error) {
      setState({
        posts: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load posts',
      });
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return {
    ...state,
    refresh: loadPosts,
  };
};
