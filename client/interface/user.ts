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
