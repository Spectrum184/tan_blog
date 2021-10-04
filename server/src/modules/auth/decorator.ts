import { SetMetadata } from '@nestjs/common';
import { Role } from '../role/entity';

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLE_KEY = 'roles';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
