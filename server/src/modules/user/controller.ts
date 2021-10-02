import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto';
import { User } from './entity';
import { UserService } from './service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAllUser();
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.findOneUser(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    try {
      return await this.userService.createUser(userDto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<User> {
    try {
      return await this.userService.updateUser(id, userDto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Delete()
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.userService.deleteUser(id);
  }
}
