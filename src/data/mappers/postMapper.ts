import { Post } from '@/domain/entities/Post';
import { PostDto } from '@/data/dto/PostDto';

export const mapPostDtoToEntity = (dto: PostDto): Post => ({
  id: dto.id,
  userId: dto.userId,
  title: dto.title,
  body: dto.body,
});
