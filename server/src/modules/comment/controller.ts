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
import { FastifyReply } from 'fastify';
import { PaginationQueryDto } from 'src/common/pagination';
import { Public } from '../auth/decorator';
import { ILoginRequest } from '../auth/interface';
import { CommentPayload } from './payload';
import { CommentService } from './service';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async createComment(
    @Body() commentPayload: CommentPayload,
    @Req() req: ILoginRequest,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const result = await this.commentService.createComment(
        commentPayload,
        req.user.id,
      );

      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @Get('/post/:postId/search')
  async getCommentByPost(
    @Query() query: PaginationQueryDto,
    @Param('postId') postId: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const result = await this.commentService.findCommentsByPost(
        query,
        postId,
      );

      return res.status(HttpStatus.OK).send(result);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
