import { User } from '../user/entity';

export interface ITokenPayLoad {
  userId: string;
}

export interface ILoginRequest extends Request {
  user: User;
}
