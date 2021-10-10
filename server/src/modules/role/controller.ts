import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { FastifyReply } from '@nestjs/platform-fastify/node_modules/fastify';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator';
import { RoleDto } from './dto';
import { RoleEnum } from './enum';
import { RoleService } from './service';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly logger: Logger,
  ) {}

  @Roles(RoleEnum.Admin)
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const roles = await this.roleService.getRoles();

      if (!roles)
        return res.status(HttpStatus.NOT_FOUND).send({
          roles: null,
        });

      return res.status(HttpStatus.OK).send({
        roles,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Roles(RoleEnum.Admin)
  @Post()
  async create(
    @Body() roleDto: RoleDto,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const role = await this.roleService.createRole(roleDto);

      if (!role)
        return res.status(HttpStatus.NOT_MODIFIED).send({
          role: null,
        });

      return res.status(HttpStatus.OK).send({
        role,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
