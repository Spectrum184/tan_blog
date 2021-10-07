import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { Public } from './decorator';
import { RegisterDto } from './dto';
import { LocalAuthGuard } from './guards/local';
import { ILoginRequest } from './interface';
import { AuthService } from './service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: ILoginRequest,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { token, user } = await this.authService.login(req.user);

      res.setCookie('jwtToken', token, {
        httpOnly: true,
        path: 'api/jwt-token',
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      });

      return res.status(HttpStatus.OK).send({ user, jwtToken: token });
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Post('register')
  async register(
    @Body() registerPayLoad: RegisterDto,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { user, token } = await this.authService.register(registerPayLoad);

      res.setCookie('jwtToken', token, {
        httpOnly: true,
        path: 'api/jwt-token',
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      });

      return res.status(HttpStatus.OK).send({ user, jwtToken: token });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Post('logout')
  async logout(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      res.clearCookie('jwtToken', { path: 'api/jwt-token' });

      return res.status(HttpStatus.OK).send({
        message: 'Log out!',
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Post('refresh-token')
  async generateRefresh(
    @Req() req,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const user = req.user;

      const token = await this.authService.generateJwtToken(user.id);

      res.setCookie('jwtToken', token, {
        httpOnly: true,
        path: 'api/jwt-token',
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        sameSite: 'none',
      });

      return res.status(HttpStatus.OK).send({ user, jwtToken: token });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
