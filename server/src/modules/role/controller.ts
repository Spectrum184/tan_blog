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
import { RoleDto } from './dto';
import { RoleService } from './service';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAll(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const roles = await this.roleService.getRoles();

      if (roles.length === 0)
        return res.status(HttpStatus.NOT_FOUND).send({
          roles: null,
        });

      return res.status(HttpStatus.OK).send({
        roles,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

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
      throw new InternalServerErrorException(error.message);
    }
  }
}
