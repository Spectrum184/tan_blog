import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto';
import { Role } from './entity';

export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getRoles(): Promise<Role[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async createRole(role: RoleDto): Promise<Role> {
    try {
      return await this.roleRepository.create(role);
    } catch (error) {
      throw error;
    }
  }
}
