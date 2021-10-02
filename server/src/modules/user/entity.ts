import BaseEntity from 'src/common/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/entity';
import { IAdmin, IMod, IUser } from './interface';

@Entity('admins')
class Admin implements IAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('User', 'admin')
  user: IUser;
}

@Entity('mods')
class Mod implements IMod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('User', 'mod')
  user: IUser;
}

@Entity('users')
class User extends BaseEntity implements IUser {
  @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, default: 'avatar.jpg' })
  avatar: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  about: string;

  @OneToOne('Admin', 'user')
  @JoinColumn()
  admin?: IAdmin;

  @OneToOne('Mod', 'user')
  @JoinColumn()
  mod?: IMod;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}

export { User, Admin, Mod };
