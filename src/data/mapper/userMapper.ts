import { User } from '@/data/entity';
import { UserDto } from '@/domain/dto';

export const mapUserDtoToUser = (dto: UserDto): User => ({
  id: dto.id,
  name: dto.name,
  username: dto.username,
});

export const mapUserToUserDto = (user: User): UserDto => ({
  id: user.id,
  name: user.name,
  username: user.username,
});