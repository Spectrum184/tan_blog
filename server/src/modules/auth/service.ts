import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { Connection, Repository } from 'typeorm';
import { Account } from '../account/entity';
import { Role } from '../role/entity';
import { UserDto } from '../user/dto';
import { Admin, User } from '../user/entity';
import { RegisterDto } from './dto';
import { ITokenPayLoad } from './interface';
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

  async login(user: UserDto): Promise<{ user: UserDto; cookie: string }> {
    const { id } = user;

    const cookie = await this.generateCookie(id);

    return { user, cookie };
  }

  async register({
    username,
    email,
    name,
    about,
    password,
  }: RegisterDto): Promise<any> {
    try {
      const hashedPassword = await hashPassword(password);

      const adminRole = await this.roleRepository.findOne({
        name: 'ADMIN',
      });

      await this.checkExistedUser({ username, email });

      await this.connection.transaction(async (manager) => {
        const newAccount = new Account();
        newAccount.password = hashedPassword;

        await manager.save(newAccount);

        const newUser = new User();

        newUser.username = username;
        newUser.email = email;
        newUser.name = name;
        newUser.about = about;
        newUser.roles = [adminRole];
        newUser.account = newAccount;

        const createdUser = await manager.save(newUser);

        const newAdmin = new Admin();
        newAdmin.user = newUser;

        await manager.save(newAdmin);

        return this.login(new UserDto(createdUser));
      });
    } catch (error) {
      throw error;
    }
  }

  async generateCookie(userId: string): Promise<string> {
    const payload: ITokenPayLoad = { userId };
    const { expiresIn } = configService.getJwtConfig().signOptions;
    const token = this.jwtService.sign(payload, {
      expiresIn,
    });

    return `Authentication=Bearer ${token}; HttpOnly; Path:/; Max-Age:${expiresIn}; SameSite:None; Secure`;
  }

  async generateEmptyCookie(): Promise<string> {
    return `Authentication=; HttpOnly; Path:/; Max-Age:0; SameSite:None; Secure`;
  }

  async checkExistedUser({ username, email }): Promise<void> {
    try {
      const existedEmail = await this.userRepository.findOne({
        email,
      });

      if (existedEmail) throw new Error('Email is existed!');

      const existedUsername = await this.userRepository.findOne({
        username,
      });

      if (existedUsername) throw new Error('Username is existed!');
    } catch (error) {
      throw error;
    }
  }
}
