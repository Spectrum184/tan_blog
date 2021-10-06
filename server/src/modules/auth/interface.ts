import { UserDto } from '../user/dto';

export interface ITokenPayLoad {
  userId: string;
}

export interface ILoginRequest extends Request {
  user: UserDto;
}
