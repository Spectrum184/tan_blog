import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDto } from 'src/modules/user/dto';
import { LoginDto } from '../dto';
import { AuthService } from '../service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate({ param, password }: LoginDto): Promise<UserDto> {
    const user = await this.authService.validateUser(param, password);

    if (!user) throw new UnauthorizedException();

    return new UserDto(user);
  }
}