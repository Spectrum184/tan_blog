import {
  Body,
  Controller,
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
import { FastifyReply, FastifyRequest } from 'fastify';
import { PaginationQueryDto } from 'src/common/pagination';
import { Public, Roles } from '../auth/decorator';
import { ILoginRequest } from '../auth/interface';
import { RoleEnum } from '../role/enum';
import { PostPayload } from './payload';
import { PostService } from './service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly logger: Logger,
  ) {}

  @Roles(RoleEnum.Admin, RoleEnum.Mod)
  @Post()
  async create(
    @Body() postPayload: PostPayload,
    @Req() req: ILoginRequest,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const slug = await this.postService.createPost(postPayload, req.user);

      return res.status(HttpStatus.OK).send({
        slug,
      });
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get()
  async get(
    @Query() query: PaginationQueryDto,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const result = await this.postService.findPosts(query);

      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get(':slug')
  async getBySlug(
    @Req() req: FastifyRequest,
    @Param('slug') slug: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const post = await this.postService.getPostBySlug(slug, req.ip);

      if (!post) return res.status(HttpStatus.NOT_FOUND).send({ post: null });

      return res.status(HttpStatus.OK).send(post);
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get('get-random-post')
  async getRandomPosts(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const posts = await this.postService.findRandomPosts();

      return res.status(HttpStatus.OK).send(posts);
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get('get-latest-post')
  async getLatestPosts(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const posts = await this.postService.findPostByCondition('time');

      return res.status(HttpStatus.OK).send(posts);
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get('get-top-view-post')
  async getTopViewPosts(@Res() res: FastifyReply): Promise<FastifyReply> {
    try {
      const posts = await this.postService.findPostByCondition('view');

      return res.status(HttpStatus.OK).send(posts);
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException(error);
    }
  }
}
