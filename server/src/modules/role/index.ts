import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './controller';
import { Role } from './entity';
import { RoleService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, Logger],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
