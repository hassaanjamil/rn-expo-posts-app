import { User } from '@/domain/entities/User';
import { UserDto } from '@/data/dto/UserDto';

export const mapUserDtoToEntity = (dto: UserDto): User => ({
  id: dto.id,
  name: dto.name,
  username: dto.username,
  email: dto.email,
  address: dto.address,
  phone: dto.phone,
  website: dto.website,
  company: dto.company,
});
