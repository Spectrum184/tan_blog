import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controller';
import { Account } from './entity';
import { AccountService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, Logger],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
