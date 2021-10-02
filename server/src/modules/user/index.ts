import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';
import { Admin, Mod, User } from './entity';
import { UserService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin, Mod])],
  providers: [UserService, Logger],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
