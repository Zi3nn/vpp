import { ConflictException, ExceptionFilter, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import { ExecException } from 'node:child_process';

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
      throw new ConflictException('Name role existed');
    else
      return await this.prismaService.role.create(
        {
          data: {
            nameRole: createRoleDto.nameRole, // Tên field trong database : Giá trị từ DTO
          },
        }
      )
  }

  async findAll(): Promise<Role[]> {
    return await this.prismaService.role.findMany();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.prismaService.role.findFirst({
      where: {
        roleID: id
      }
    })
    if (!role) {
      throw new NotFoundException('Role id is not exist ');
    }

    return role
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | undefined> {
    const role = this.prismaService.role.findFirst({
      where: {
        roleID: id
      }
    })

    if (!role)
      throw new NotFoundException('Role id is not exist')
    try{
    const newRole = await this.prismaService.role.update({
      where: {
        roleID: id
      },
      data: {
        nameRole: updateRoleDto.nameRole
      }
    })
    return newRole
  }
  catch(err){
   
   if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
    throw new ConflictException('The role\'s name must be unique');

      }
    }
  }
    return undefined
  }

  async remove(id: string) {
    const role = await this.prismaService.role.findFirst({
      where :{
        roleID : id
      }
    })

    if (!role)
      throw new NotFoundException('Role id  is not exist');

    await this.prismaService.role.delete({
      where :{
        roleID :id
      }
    })
  }
}
