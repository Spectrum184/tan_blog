import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Public } from '../auth/decorator';
import { TagService } from './service';

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
      const tags = this.tagService.findAll();

      if (!tags) return res.status(HttpStatus.OK).send({ tags: [] });

      return res.status(HttpStatus.OK).send({ tags });
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get(':tag')
  async findOne(
    @Param('tag') tag: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      return res.status(HttpStatus.OK).send({});
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }
}
