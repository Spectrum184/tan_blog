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

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await this.userRepository.delete({ id });

      return result.affected !== null;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, userDto: UserDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) return null;

      Object.assign(user, userDto);

      const newUser = await this.userRepository.save(user);

      return new UserDto(newUser);
    } catch (error) {
      throw error;
    }
  }
}
