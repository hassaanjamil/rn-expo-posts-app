import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post } from '@/domain/entity';
import { FAVORITE_POSTS_KEY } from '@/main/constants/constants';

type FavoriteListener = (posts: Post[]) => void;

const favoriteListeners = new Set<FavoriteListener>();

let favoritePostsCache: Post[] = [];

const withFavoriteFlag = (posts: Post[]) =>
  posts.map((post) => ({
    ...post,
    isFavorite: true,
  }));

const notifyListeners = (posts: Post[]) => {
  favoritePostsCache = withFavoriteFlag(posts);
  favoriteListeners.forEach((listener) => listener(favoritePostsCache));
};

const readFavoritesFromStorage = async (): Promise<Post[]> => {
  const stored = await AsyncStorage.getItem(FAVORITE_POSTS_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Post[];
  } catch (error) {
    console.warn('Failed to parse favorite posts', error);
    return [];
  }
};

export const useFavoritePosts = () => {
  const [favoritePosts, setFavoritePosts] = useState<Post[]>(favoritePostsCache);

  const loadFavorites = useCallback(async () => {
    const posts = await readFavoritesFromStorage();
    notifyListeners(posts);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const listener: FavoriteListener = (posts) => {
      if (isSubscribed) {
        setFavoritePosts(posts);
      }
    };

    favoriteListeners.add(listener);

    if (favoritePostsCache.length) {
      setFavoritePosts(favoritePostsCache);
    } else {
      loadFavorites();
    }

    return () => {
      isSubscribed = false;
      favoriteListeners.delete(listener);
    };
  }, [loadFavorites]);

  const persistFavorites = useCallback(async (posts: Post[]) => {
    notifyListeners(posts);
    await AsyncStorage.setItem(FAVORITE_POSTS_KEY, JSON.stringify(posts));
  }, []);

  const addFavoritePost = useCallback(
    async (post: Post) => {
      if (favoritePostsCache.some((item) => item.id === post.id)) {
        return;
      }

      const updatedPosts = [...favoritePostsCache, { ...post, isFavorite: true }];
      await persistFavorites(updatedPosts);
    },
    [persistFavorites],
  );

  const deleteFavoritePostById = useCallback(
    async (id: number) => {
      const updatedPosts = favoritePostsCache.filter((post) => post.id !== id);
      if (updatedPosts.length === favoritePostsCache.length) {
        return;
      }

      await persistFavorites(updatedPosts);
    },
    [persistFavorites],
  );

  const toggleFavoritePost = useCallback(
    async (post: Post) => {
      const isFavorite = favoritePostsCache.some((favorite) => favorite.id === post.id);

      if (isFavorite) {
        await deleteFavoritePostById(post.id);
      } else {
        await addFavoritePost(post);
      }
    },
    [addFavoritePost, deleteFavoritePostById],
  );

  return {
    favoritePosts,
    addFavoritePost,
    deleteFavoritePostById,
    toggleFavoritePost,
  };
};
