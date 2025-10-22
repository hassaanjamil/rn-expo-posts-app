import { useCallback, useEffect, useMemo, useState } from 'react';
import { Post } from '@/presentation/features/posts/types';
import { useCases } from '@/main/dependencies';

export const usePosts = (favoritePosts: Post[]) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedPosts = await useCases.getPostsUseCase.execute();
      setPosts(fetchedPosts);
    } catch (err) {
      setPosts([]);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const favoritePostIds = useMemo(
    () => new Set(favoritePosts.map((favoritePost) => favoritePost.id)),
    [favoritePosts],
  );

  const postsWithFavorites = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        isFavorite: favoritePostIds.has(post.id),
      })),
    [posts, favoritePostIds],
  );

  return {
    postsWithFavorites,
    isLoading,
    error,
    refresh: loadPosts,
    favoritePosts,
  };
};
