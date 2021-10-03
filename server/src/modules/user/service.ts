import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto';
import { User } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllUser(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async createUser(user: UserDto): Promise<User> {
    try {
      return this.userRepository.create(user);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await this.userRepository.delete({ id });

      return result.affected !== null;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, newUser: UserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);
      Object.assign(user, newUser);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async findUser(param: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where(`user.email=${param} OR user.username=${param}`)
        .innerJoinAndSelect('user.account', 'account')
        .getOne();

      return user;
    } catch (error) {
      throw error;
    }
  }
}
