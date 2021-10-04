import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { Connection, Repository } from 'typeorm';
import { Account } from '../account/entity';
import { Role } from '../role/entity';
import { User } from '../user/entity';
import { RegisterDto } from './dto';
import { ITokenPayLoad } from './interface';
import { checkPassword, hashPassword } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly connection: Connection,
  ) {}

  async validateUser(param: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: [{ username: param }, { email: param }],
        relations: ['account'],
      });

      if (user && (await checkPassword(password, user.account.password)))
        return user;

      return null;
    } catch (error) {
      throw error;
    }
  }

  async validateJwtUser({ userId }: ITokenPayLoad): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        id: userId,
      });

      if (!user) return null;

      const { id, email, username, name } = user;

      return {
        id,
        email,
        username,
        name,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(user: User): Promise<{ user: User; cookie: string }> {
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
        where: { name: 'ADMIN' },
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

        return this.login(createdUser);
      });
    } catch (error) {
      throw error;
    }
  }

  async generateCookie(userId: string): Promise<string> {
    const payload: ITokenPayLoad = { userId };
    const token = this.jwtService.sign(payload);
    const {
      signOptions: { expireIn },
    } = configService.getJwtConfig();

    return `Authentication=Bearer ${token}; HttpOnly; Path:/; Max-Age:${expireIn}; SameSite:None; Secure`;
  }

  async generateEmptyCookie(): Promise<string> {
    return `Authentication=; HttpOnly; Path:/; Max-Age:0; SameSite:None; Secure`;
  }

  async checkExistedUser({ username, email }): Promise<void> {
    try {
      const existedEmail = this.userRepository.findOne({
        where: { email },
      });

      if (existedEmail) throw new Error('Email is existed!');

      const existedUsername = this.userRepository.findOne({
        where: { username },
      });

      if (existedUsername) throw new Error('Username is existed!');
    } catch (error) {
      throw error;
    }
  }
}
