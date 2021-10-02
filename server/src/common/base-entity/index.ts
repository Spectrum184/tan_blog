import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiPropertyOptional()
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMPS',
  })
  createdAt: Date;

  @Column({ type: 'varchar', length: 300, default: 'admin' })
  createdBy: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMPS',
  })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 300, default: 'admin' })
  updatedBy: string;
}
