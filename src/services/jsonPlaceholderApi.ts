import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import type { PostDto } from '@/types/post';
import { UserDto } from '@/types/user';

export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), // or use logic for env
  endpoints: (builder) => ({
    getPosts: builder.query<PostDto[], void>({
      query: () => '/posts',
    }),
    getPost: builder.query<PostDto, number>({
      query: (id) => `/posts/${id}`,
      keepUnusedDataFor: 120,
    }),
    getUser: builder.query<UserDto, number>({
      query: (id) => `/users/${id}`,
      keepUnusedDataFor: 120,
    }),
  }),
});

export const {
  useLazyGetPostQuery,
  useLazyGetPostsQuery,
  useLazyGetUserQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useGetUserQuery,
} = jsonPlaceholderApi;