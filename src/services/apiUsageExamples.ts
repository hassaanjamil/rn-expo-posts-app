import { get, post, put, del } from './api';
import { PostDto } from '@/types/post';

// Example of how to use the get function
const fetchPosts = async () => {
  try {
    const response = await get<PostDto[]>('/posts');
    console.log('GET Posts:', response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

// Example of how to use the post function
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

// Example of how to use the put function
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

// Example of how to use the del function
const deletePost = async () => {
  try {
    const response = await del<void>('/posts/1');
    console.log('DELETE Post:', response.status);
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

// You can call these functions in your components like this:
// fetchPosts();
// createPost();
// updatePost();
// deletePost();
