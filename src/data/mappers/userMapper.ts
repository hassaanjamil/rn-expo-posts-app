import { User } from '@/data/entities/User';
import { UserDto } from '@/domain/dto/UserDto';

export const mapUserDtoToUser = (dto: UserDto): User => ({
  id: dto.id,
  name: dto.name,
  username: dto.username,
  email: dto.email,
  address: dto.address,
  phone: dto.phone,
  website: dto.website,
  company: dto.company,
});

export const mapUserToUserDto = (user: User): UserDto => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  address: user.address,
  phone: user.phone,
  website: user.website,
  company: user.company,
});