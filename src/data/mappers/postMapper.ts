import { Post } from '@/data/entities';
import { PostDto } from '@/domain/dto/PostDto';

export const mapPostDtoToPost = (dto: PostDto): Post => ({
  id: dto.id,
  userId: dto.userId,
  title: dto.title,
  body: dto.body,
});

export const mapPostToPostDto = (post: Post): PostDto => ({
  id: post.id,
  userId: post.userId,
  title: post.title,
  body: post.body,
});
