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

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UserPayload,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const user = await this.userService.updateUser(id, userDto);

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
}
