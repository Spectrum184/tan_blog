import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { RoleModule } from './role';
import { UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    RoleModule,
    ConfigModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
