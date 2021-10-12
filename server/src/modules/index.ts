import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { AccountModule } from './account';
import { AuthModule } from './auth';
import { JwtAuthGuard } from './auth/guards/jwt';
import { CategoryModule } from './category';
import { RoleModule } from './role';
import { TagModule } from './tag';
import { UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    RoleModule,
    AccountModule,
    AuthModule,
    TagModule,
    CategoryModule,
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
