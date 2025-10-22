import { mapCommentDtoToComment, mapCommentToCommentDto } from '../commentMapper';

describe('commentMapper', () => {
  it('mapCommentDtoToComment maps each dto entry', () => {
    const dtos = [
      { id: 1, body: 100, postId: 2, userId: 3 },
      { id: 2, body: 200, postId: 2, userId: 4 },
    ];

    expect(mapCommentDtoToComment(dtos)).toEqual(dtos);
  });

  it('mapCommentToCommentDto maps comment models back to dto array', () => {
    const comments = [
      { id: 10, body: 500, postId: 7, userId: 8 },
    ];

    expect(mapCommentToCommentDto(comments)).toEqual(comments);
  });
});
