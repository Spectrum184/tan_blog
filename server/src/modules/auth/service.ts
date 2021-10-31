import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { Connection, Repository } from 'typeorm';
import { Account } from '../account/entity';
import { Role } from '../role/entity';
import { RoleEnum } from '../role/enum';
import { UserDto } from '../user/dto';
import { User } from '../user/entity';
import { ITokenPayLoad } from './interface';
import { RegisterPayload } from './payload';
import { checkPassword, hashPassword } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly connection: Connection,
  ) {}

  async validateUser(param: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ username: param }, { email: param }],
        relations: ['account', 'roles'],
      });

      if (user && !user.account.isActivated)
        throw new InternalServerErrorException('Tài khoản của bạn đã bị khoá!');

      if (user && (await checkPassword(password, user.account.password)))
        return user;

      return null;
    } catch (error) {
      throw error;
    }
  }

  async validateJwtUser({ userId }: ITokenPayLoad): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['roles'],
      });

      if (!user) return null;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(user: UserDto): Promise<{ user: UserDto; token: string }> {
    const { id } = user;

    const token = await this.generateJwtToken(id);

    return { user, token };
  }

  async register({
    username,
    email,
    name,
    password,
  }: RegisterPayload): Promise<{ user: UserDto; token: string }> {
    try {
      const hashedPassword = await hashPassword(password);

      const userRole = await this.roleRepository.findOne({
        name: RoleEnum.User,
      });

      await this.checkExistedUser({ username, email });

      return await this.connection.transaction(async (manager) => {
        const newAccount = new Account();
        newAccount.password = hashedPassword;

        await manager.save(newAccount);

        const newUser = new User();

        newUser.username = username;
        newUser.email = email;
        newUser.name = name;
        newUser.roles = [userRole];
        newUser.account = newAccount;

        const createdUser = await manager.save(newUser);

        const token = await this.generateJwtToken(createdUser.id);

        return { user: new UserDto(createdUser), token };
      });
    } catch (error) {
      throw error;
    }
  }

  async generateJwtToken(userId: string): Promise<string> {
    const payload: ITokenPayLoad = { userId };
    const { expiresIn } = configService.getJwtConfig().signOptions;
    const token = this.jwtService.sign(payload, {
      expiresIn,
    });

    return token;
  }

  async checkExistedUser({ username, email }): Promise<void> {
    try {
      const existedEmail = await this.userRepository.findOne({
        email,
      });

      if (existedEmail) throw new Error('Email đã tồn tại!');

      const existedUsername = await this.userRepository.findOne({
        username,
      });

      if (existedUsername) throw new Error('Tên đăng nhập đã tồn tại!');
    } catch (error) {
      throw error;
    }
  }
}
