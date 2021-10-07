import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { AccountModule } from '../account';
import { Account } from '../account/entity';
import { Role } from '../role/entity';
import { UserModule } from '../user';
import { User } from '../user/entity';
import { AuthController } from './controller';
import { RoleGuard } from './guards/role';
import { AuthService } from './service';
import { JwtStrategy } from './strategies/jwt';
import { LocalStrategy } from './strategies/local';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Account]),
    AccountModule,
    PassportModule,
    UserModule,
    JwtModule.register(configService.getJwtConfig()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    Logger,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
