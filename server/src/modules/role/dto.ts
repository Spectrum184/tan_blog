import { Role } from './entity';

export class RoleDto {
  constructor(role: Role) {
    this.name = role.name;
    this.id = role.id;
  }

  readonly name: string;

  readonly id: string;
}
