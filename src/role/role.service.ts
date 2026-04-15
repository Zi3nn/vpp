import { ConflictException,Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) { }
  async create(createRoleDto: CreateRoleDto): Promise<any> {
    console.log('Inide role.service.create()')

    const role = await this.prismaService.role.findUnique({
      where: {
        nameRole: createRoleDto.nameRole, // Tìm role có tên giống trong DTO
      },
    })

    if (role)
     throw new ConflictException('Role này đã tồn tại trong hệ thống');
    else
      return await this.prismaService.role.create(
        {
          data: {
            nameRole: createRoleDto.nameRole, // Tên field trong database : Giá trị từ DTO
          },
        }
      )
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
