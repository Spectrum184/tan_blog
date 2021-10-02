import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto';
import { Role } from './entity';

export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async createRole(role: RoleDto): Promise<Role> {
    return await this.roleRepository.create(role);
  }
}
