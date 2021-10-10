import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Res,
} from '@nestjs/common';
import { FastifyReply } from '@nestjs/platform-fastify/node_modules/fastify';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './service';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly logger: Logger,
  ) {}

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const account = await this.accountService.findById(id);

      if (!account)
        return res.status(HttpStatus.NOT_FOUND).send({ account: null });

      return res.status(HttpStatus.OK).send({ account });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const result = await this.accountService.deleteAccount(id);

      if (!result)
        return res.status(HttpStatus.NOT_MODIFIED).send({
          result,
        });

      return res.status(HttpStatus.OK).send({
        result,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
