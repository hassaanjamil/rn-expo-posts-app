import { get } from '@/data/datasources/remote/axiosClient';
import { PostDto } from '@/domain/dto/PostDto';
import { UserDto } from '@/domain/dto/UserDto';

export interface PostRemoteDataSource {
  fetchPosts(): Promise<PostDto[]>;
  fetchPostById(id: number): Promise<PostDto>;
}

export interface UserRemoteDataSource {
  fetchUserById(id: number): Promise<UserDto>;
}

export class JsonPlaceholderRemoteDataSource implements PostRemoteDataSource, UserRemoteDataSource {
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
}
