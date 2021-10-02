import BaseEntity from 'src/common/base-entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../user/entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
