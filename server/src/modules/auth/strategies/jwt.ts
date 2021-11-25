import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configService } from 'src/config/config.service';
import { UserDto } from 'src/modules/user/dto';
import { ITokenPayLoad } from '../interface';
import { AuthService } from '../service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const token = request.cookies.jwtToken
            ? request.cookies.jwtToken
            : request.headers.authorization;

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtConfig().secret,
    });
  }

  async validate(payload: ITokenPayLoad): Promise<UserDto> {
    const user = await this.authService.validateJwtUser(payload);

    if (!user) throw new UnauthorizedException('Tài khoản này không tồn tại!');

    return new UserDto(user);
  }
}
