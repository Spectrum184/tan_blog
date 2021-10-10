import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGuard } from '../auth/guards/role';
import { RoleController } from './controller';
import { Role } from './entity';
import { RoleService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, Logger, { provide: APP_GUARD, useClass: RoleGuard }],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
