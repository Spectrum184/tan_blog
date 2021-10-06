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

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: ILoginRequest,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { cookie, user } = await this.authService.login(req.user);

      res.header('Set-Cookie', cookie);

      return res.status(HttpStatus.OK).send({ user });
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('register')
  @Public()
  async register(
    @Body() registerPayLoad: RegisterDto,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { cookie, user } = await this.authService.register(registerPayLoad);

      res.header('Set-Cookie', cookie);

      return res.status(HttpStatus.OK).send({ user });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
