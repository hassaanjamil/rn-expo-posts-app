import { get } from '@/data/source/remote/axiosClient';
import { CommentDto, PostDto, UserDto } from '@/domain/dto';

export interface PostRemoteDataSource {
  fetchPosts(): Promise<PostDto[]>;
  fetchPostById(id: number): Promise<PostDto>;
}

export interface UserRemoteDataSource {
  fetchUserById(id: number): Promise<UserDto>;
}

export interface CommentRemoteDataSource {
  fetchCommentsByPostId(id: number): Promise<CommentDto[]>;
}

export class APIService implements PostRemoteDataSource, UserRemoteDataSource {
  async fetchPosts(): Promise<PostDto[]> {
    const response = await get<PostDto[]>('/posts');
    return response.data;
  }

  async fetchPostById(id: number): Promise<PostDto> {
    const response = await get<PostDto>(`/posts/${id}`);
    return response.data;
  }

  async fetchUserById(id: number): Promise<UserDto> {
    const response = await get<UserDto>(`/users/${id}`);
    return response.data;
  }

  async fetchCommentsByPostId(id: number): Promise<CommentDto[]> {
    const response = await get<CommentDto[]>(`/comments/${id}`);
    return response.data;
  }
}
