import { IAcountDto } from './dto';
import { Account } from './entity';

export function mapAccountToAccountDto(account: Account): IAcountDto {
  const {
    createdAt,
    user: { username, email, roles, avatar, name, about },
  } = account;

  const userRoles = roles && roles.map((role) => role.name);

  return {
    username,
    email,
    avatar,
    about,
    name,
    createdAt: createdAt.toLocaleString(),
    roles: userRoles,
  };
}
