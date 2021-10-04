import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountUpdateDto, IAcountDto } from './dto';
import { Account } from './entity';
import { mapAccountToAccountDto } from './mapper';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findById(id: string): Promise<IAcountDto | null> {
    try {
      const account = await this.accountRepository.findOne(id);

      if (!account) return null;

      return mapAccountToAccountDto(account);
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(id: string): Promise<boolean> {
    try {
      const result = await this.accountRepository.delete({ id });

      return result.affected !== null;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateData: AccountUpdateDto): Promise<IAcountDto> {
    try {
      const updatedAccount = await this.accountRepository.save({
        id,
        ...updateData,
      });

      return mapAccountToAccountDto(updatedAccount);
    } catch (error) {
      throw error;
    }
  }
}
