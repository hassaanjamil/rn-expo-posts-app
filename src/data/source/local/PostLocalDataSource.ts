import { PostDto } from '@/data/dto';

export class PostLocalDataSource {
  private readonly posts = new Map<number, PostDto>();

  async getPosts(): Promise<PostDto[] | null> {
    if (this.posts.size === 0) {
      return null;
    }
    return Array.from(this.posts.values());
  }

  async getPostById(id: number): Promise<PostDto | null> {
    return this.posts.get(id) ?? null;
  }

  async savePosts(posts: PostDto[]): Promise<void> {
    posts.forEach((post) => {
      this.posts.set(post.id, post);
    });
  }

  async savePost(post: PostDto): Promise<void> {
    this.posts.set(post.id, post);
  }
}
