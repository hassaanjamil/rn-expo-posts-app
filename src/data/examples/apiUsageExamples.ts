import { del, get, post, put } from '@/data/source/remote/axiosClient';
import { PostDto } from '@/data/entity/PostDto';

const fetchPosts = async () => {
  try {
    const response = await get<PostDto[]>('/posts');
    console.log('GET Posts:', response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const createPost = async () => {
  try {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    const response = await post<PostDto>('/posts', newPost);
    console.log('POST Post:', response.data);
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

const updatePost = async () => {
  try {
    const updatedPost = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    const response = await put<PostDto>('/posts/1', updatedPost);
    console.log('PUT Post:', response.data);
  } catch (error) {
    console.error('Error updating post:', error);
  }
};

const deletePost = async () => {
  try {
    const response = await del<void>('/posts/1');
    console.log('DELETE Post:', response.status);
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

export const apiUsageExamples = {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
};
