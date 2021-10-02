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
    return this.userRepository.find();
  }

  async findOneUser(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async createUser(user: UserDto): Promise<User> {
    return this.userRepository.create(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne(id);

    if (!user) return false;

    await this.userRepository.remove(user);

    return true;
  }

  async updateUser(id: string, newUser: UserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);
    Object.assign(user, newUser);
    return await this.userRepository.save(user);
  }
}
