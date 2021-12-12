import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { ILoginRequest } from '../auth/interface';
import { ReplyPayload } from './payload';
import { ReplyService } from './service';

@Controller('reply')
@ApiTags('reply')
export class ReplyController {
  constructor(
    private readonly replyService: ReplyService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async createReply(
    @Body() replyPayload: ReplyPayload,
    @Req() req: ILoginRequest,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const reply = await this.replyService.createReply(
        replyPayload,
        req.user.id,
      );

      return res.status(HttpStatus.OK).send(reply);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
