import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { PaginationQueryDto } from 'src/common/pagination';
import { Public, Roles } from '../auth/decorator';
import { ILoginRequest } from '../auth/interface';
import { RoleEnum } from '../role/enum';
import { CategoryPayload } from './payload';
import { CategoryService } from './service';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly logger: Logger,
  ) {}

  @Public()
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const categories = await this.categoryService.findAllCategories();

      return res.status(HttpStatus.OK).send([...categories]);
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get(':slug')
  async findBySlug(
    @Param('slug') slug: string,
    @Query() query: Partial<PaginationQueryDto>,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const result = await this.categoryService.findPostByCategorySlug(
        slug,
        query,
      );

      return res.status(HttpStatus.OK).send({
        ...result,
      });
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Roles(RoleEnum.Admin, RoleEnum.Mod)
  @Post()
  async create(
    @Body() categoryPayload: CategoryPayload,
    @Req() req: ILoginRequest,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const category = await this.categoryService.createdCategory(
        categoryPayload,
        req.user,
      );

      return res.status(HttpStatus.OK).send({
        category,
      });
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Roles(RoleEnum.Admin)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const isDeleted = await this.categoryService.deleteCategory(id);

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
