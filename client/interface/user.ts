export interface IUser {
  username: string;
  email: string;
  avatar: string;
  name: string;
  about: string;
  id: string;
  createdAt: string;
  roles: Array<string>;
  isActivated: boolean;
  jwtToken: string;
}

export enum RoleEnum {
  User = "USER",
  Admin = "ADMIN",
  Mod = "MOD",
}

export interface IAuthor {
  readonly id: string;
  readonly username: string;
  readonly avatar: string;
  readonly isAdmin: boolean;
  readonly posts: number;
}
