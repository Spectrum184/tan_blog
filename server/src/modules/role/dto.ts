import { Role } from './entity';

export class RoleDto {
  constructor(role: Role) {
    this.name = role.name;
    this.createdBy = role.createdBy;
    this.id = role.id;
  }

  readonly name: string;

  readonly createdBy: string;

  readonly id: string;
}
