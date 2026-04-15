import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '@prisma/client';
import { IResponse } from 'src/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { describe } from 'node:test';
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'Create Role successfull'
  })

  @ApiConflictResponse({
    description: 'Name role existed'
  })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<any> {
    console.log('Inide role.controller.create()')
    const result = await this.roleService.create(createRoleDto);
    return {
      statusCode: 201,
      message: 'Created successfully',
      data: result
    };
  }

  @Get()
  @ApiOkResponse(
    {
      description: 'Get all roles successfull'
    }
  )
  async findAll() {
    const roles = await this.roleService.findAll(); // Đổi users -> roles
    return {
      statusCode: 200,
      message: roles.length === 0 ? 'Hiện chưa có role nào' : 'Lấy danh sách role thành công',
      data: roles,
    };
  }

  @ApiOkResponse({
    description: 'Get role id  = ?? successfull'
  })

  @ApiNotFoundResponse({
    description: 'Role id is not exist'
  })

  @ApiBadRequestResponse({
    description: 'Validation failed (uuid is expected)'
  })

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {

    const role = await this.roleService.findOne(id);
    return {
      status: 200,
      message: `Get role  id = ${id} successfull`,
      data: role
    }
  }

  @ApiOkResponse({
    description: 'Update  role have id  = ?? successfull'
  })

  @ApiNotFoundResponse({
    description: 'Role id is not exist'
  })

  @ApiBadRequestResponse({
    description: 'Validation failed (uuid is expected)'
  })

  @ApiConflictResponse({
    description: 'The role\'s name must be unique'
  })
  @Patch(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateRoleDto: UpdateRoleDto) {

    const newRole = await this.roleService.update(id, updateRoleDto);
    return {
      statusCode: 300,
      message: `update role have id = ${id} successfull`,
      data: newRole
    }
  }

  @ApiOkResponse({
    description: 'Delete role have id  = ?? successfull'
  })

  @ApiNotFoundResponse({
    description: 'Role id is not exist'
  })

  @ApiBadRequestResponse({
    description: 'Validation failed (uuid is expected)'
  })
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.roleService.remove(id);
    return {
      statusCode: 300,
      message: `delete role have id = ${id} successfull`,
    }
  }
}
