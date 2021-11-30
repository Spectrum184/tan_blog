import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { Public } from '../auth/decorator';
import { ILoginRequest } from '../auth/interface';
import { UserPayload } from './payload';
import { UserService } from './service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Public()
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const users = await this.userService.findAllUser();

      if (!users) return res.status(HttpStatus.NOT_FOUND).send({ users: null });

      return res.status(HttpStatus.OK).send({
        users,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const user = await this.userService.findById(id);

      if (!user)
        return res.status(HttpStatus.NOT_FOUND).send({
          user: null,
        });

      return res.status(HttpStatus.OK).send({
        user,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get('find-by-name/:username')
  async findByUsername(
    @Param('username') username: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const user = await this.userService.findByUsername(username);

      if (!user)
        return res.status(HttpStatus.NOT_FOUND).send({
          user: null,
        });

      return res.status(HttpStatus.OK).send({
        ...user,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userPayload: UserPayload,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const user = await this.userService.updateUser(id, userPayload);

      if (!user)
        return res.status(HttpStatus.NOT_MODIFIED).send({
          user: null,
        });

      return res.status(HttpStatus.OK).send({
        user,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: ILoginRequest,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const isDeleted = await this.userService.deleteUser(id, req.user);

      if (!isDeleted)
        return res.status(HttpStatus.NOT_MODIFIED).send({
          isDeleted,
        });

      return res.status(HttpStatus.OK).send({
        isDeleted,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get('post-author')
  async findPostAuthor(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const authors = await this.userService.findPostAuthor();

      return res.status(HttpStatus.OK).send([...authors]);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
