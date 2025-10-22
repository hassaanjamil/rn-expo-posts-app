import { mapUserDtoToUser, mapUserToUserDto } from '../userMapper';

describe('userMapper', () => {
  it('mapUserDtoToUser converts dto to domain user', () => {
    const dto = { id: 3, name: 'Jane', username: 'jane' };

    expect(mapUserDtoToUser(dto)).toEqual(dto);
  });

  it('mapUserToUserDto converts domain user to dto', () => {
    const user = { id: 4, name: 'John', username: 'johnny' };

    expect(mapUserToUserDto(user)).toEqual(user);
  });
});
