import { User } from './entity';
import { IUser } from './interface';

export class UserDto implements IUser {
  constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
    this.avatar = user.avatar;
    this.name = user.name;
    this.about = user.about;
    this.id = user.id;
    this.createdAt = user.createdAt.toUTCString();
    this.roles = user.roles?.map((role) => role.name);
    this.isActivated = user.account?.isActivated;
  }

  readonly username: string;

  readonly email: string;

  readonly avatar: string;

  readonly name: string;

  readonly about: string;

  readonly createdAt: string;

  readonly id: string;

  readonly roles?: string[];

  readonly isActivated?: boolean;
}
