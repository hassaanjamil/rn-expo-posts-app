import { mapPostDtoToPost, mapPostToPostDto } from '../postMapper';

describe('postMapper', () => {
  it('mapPostDtoToPost converts DTO to domain model', () => {
    const dto = { id: 1, userId: 2, title: 'title', body: 'body' };

    expect(mapPostDtoToPost(dto)).toEqual(dto);
  });

  it('mapPostToPostDto converts domain model to DTO', () => {
    const post = { id: 5, userId: 9, title: 'Hello', body: 'World' };

    expect(mapPostToPostDto(post)).toEqual(post);
  });
});
