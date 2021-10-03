import BaseEntity from 'src/common/base-entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { User } from '../user/entity';

@Entity('accounts')
export class Account extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActivated: boolean;

  @Column({ type: 'integer', default: 0 })
  loginAttempt: number;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}
