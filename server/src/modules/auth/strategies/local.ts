import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from 'src/modules/user/entity';
import { AuthService } from '../service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(param: string, passport: string): Promise<User> {
    const user = await this.authService.validateUser(param, passport);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
