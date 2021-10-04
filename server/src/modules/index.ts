import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { AccountModule } from './account';
import { RoleModule } from './role';
import { UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    RoleModule,
    AccountModule,
    ConfigModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
