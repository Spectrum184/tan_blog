import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
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
      const tags = await this.tagService.findAll();

      if (!tags) return res.status(HttpStatus.OK).send({ tags: [] });

      return res.status(HttpStatus.OK).send({ ...tags });
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get(':tag')
  async findOne(
    @Param('tag') tagName: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const tag = await this.tagService.findPostByTag(tagName);

      return res.status(HttpStatus.OK).send({ tag });
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }
}
