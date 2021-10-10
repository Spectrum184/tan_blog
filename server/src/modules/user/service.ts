import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserDto } from './dto';
import { User } from './entity';
import { UserPayload } from './payload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllUser(): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.find();

      if (users.length === 0) return null;

      const userDto = users.map((user) => new UserDto(user));

      return userDto;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne(id);

      return new UserDto(user);
    } catch (error) {
      throw error;
    }
  }

  async createUser(userDto: UserDto): Promise<UserDto> {
    try {
      const user = new User();

      user.username = userDto.username;
      user.email = userDto.email;
      user.avatar = userDto.avatar;
      user.name = userDto.name;
      user.about = userDto.about;

      const newUser = await this.userRepository.save(user);

      return new UserDto(newUser);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string, userDto: UserDto): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne(id);

      if (
        user.id !== userDto.id ||
        !userDto.roles.includes('ADMIN') ||
        !userDto.roles.includes('MOD')
      )
        throw new Error(`You can't delete this account`);

      const result = await this.userRepository.delete({ id });

      return result.affected !== null;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, userPayload: UserPayload): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) return null;

      if (id !== user.id) throw new Error(`You can't modify this account`);

      Object.assign(user, userPayload);

      const newUser = await this.userRepository.save(user);

      return new UserDto(newUser);
    } catch (error) {
      throw error;
    }
  }

  async findUserByNameOrEmail(param: string): Promise<UserDto> {
    try {
      let user = null;

      if (param.includes('@')) {
        user = await this.userRepository.findOne({
          email: Like(`%${param}%`),
        });
      } else {
        user = await this.userRepository.findOne({
          username: Like(`%${param}%`),
        });
      }

      if (!user) return null;

      return new UserDto(user);
    } catch (error) {
      throw error;
    }
  }
}
