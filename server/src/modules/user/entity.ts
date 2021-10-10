import BaseEntity from 'src/common/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../account/entity';
import { Post } from '../post/entity';
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
  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true, default: 'avatar.jpg' })
  avatar: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true, default: '' })
  about: string;

  @OneToOne('Admin', 'user', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  admin?: IAdmin;

  @OneToOne('Mod', 'user', {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  mod?: IMod;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Account, (account) => account.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  account: Account;

  @OneToMany(() => Post, (post) => post.author, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
  })
  posts: Post[];

  @ManyToMany(() => Post, (post) => post.likedUsers, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinTable()
  likedPosts: Post[];
}

export { User, Admin, Mod };
