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
  Res,
} from '@nestjs/common';
import { FastifyReply } from '@nestjs/platform-fastify/node_modules/fastify';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto';
import { UserService } from './service';

@ApiTags('users')
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
      if (users.length === 0)
        return res.status(HttpStatus.NOT_FOUND).send({ users: null });

      return res.status(HttpStatus.OK).send({
        users,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

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
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
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
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete()
  async delete(
    @Param('id') id: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const isDeleted = await this.userService.deleteUser(id);

      if (!isDeleted)
        return res.status(HttpStatus.NOT_MODIFIED).send({
          isDeleted,
        });

      return res.status(HttpStatus.OK).send({
        isDeleted,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
