import * as redisStore from 'cache-manager-redis-store';

import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';

import { AccountModule } from './account';
import { AuthModule } from './auth';
import { JwtAuthGuard } from './auth/guards/jwt';
import { CategoryModule } from './category';
import { PostModule } from './post';
import { RoleModule } from './role';
import { TagModule } from './tag';
import { UserModule } from './user';
import { CommentModule } from './comment';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    RoleModule,
    AccountModule,
    AuthModule,
    TagModule,
    CategoryModule,
    PostModule,
    CommentModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      host: configService.getRedisConfig().host,
      port: configService.getRedisConfig().port,
      ttl: configService.getRedisConfig().ttl,
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
