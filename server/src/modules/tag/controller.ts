import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { PaginationQueryDto } from 'src/common/pagination';
import { Public } from '../auth/decorator';
import { TagService } from './service';

@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly logger: Logger,
  ) {}

  @Public()
  @Get()
  async findAll(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const { tags } = await this.tagService.findAll();

      if (!tags) return res.status(HttpStatus.OK).send([]);

      return res.status(HttpStatus.OK).send([...tags]);
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get(':name')
  async findOne(
    @Param('name') name: string,
    @Query() query: PaginationQueryDto,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const result = await this.tagService.findPostByTag(name, query);

      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }
}
