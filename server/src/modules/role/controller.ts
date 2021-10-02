import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleDto } from './dto';
import { Role } from './entity';
import { RoleService } from './service';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAll(): Promise<Role[]> {
    try {
      return await this.roleService.getRoles();
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post()
  async create(@Body() roleDto: RoleDto): Promise<Role> {
    try {
      return await this.roleService.createRole(roleDto);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
