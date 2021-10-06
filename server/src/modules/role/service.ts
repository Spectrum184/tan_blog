import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto';
import { Role } from './entity';

export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async getRoles(): Promise<RoleDto[]> {
    try {
      const roles = await this.roleRepository.find();
      if (roles.length === 0) return null;

      const rolesDto: Array<RoleDto> = roles.map((role) => new RoleDto(role));

      return rolesDto;
    } catch (error) {
      throw error;
    }
  }

  async createRole(roleDto: RoleDto): Promise<RoleDto> {
    try {
      const role = new Role();
      role.name = roleDto.name;
      role.createdBy = 'admin';

      return await this.roleRepository.save(role);
    } catch (error) {
      throw error;
    }
  }
}
