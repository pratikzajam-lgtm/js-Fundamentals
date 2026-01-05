import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/rbac/rbac.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Query,DefaultValuePipe } from '@nestjs/common';


@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
@Roles('superadmin')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const result = await this.usersService.create(createUserDto);
        return {
            statusCode: 201,
            message: 'User created successfully',
            data: result,
        };
    }

    @Get()
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('name') name?: string,
        @Query('email') email?: string,
    ) {
        const result = await this.usersService.findAll({
            page,
            limit,
            name,
            email
        });

        return {
            statusCode: 200,
            message: 'Users fetched successfully',
            data: result,
        };
    }


    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const result = await this.usersService.findOne(id);
        return {
            statusCode: 200,
            message: 'User fetched successfully',
            data: result,
        };
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const result = await this.usersService.update(id, updateUserDto);
        return {
            statusCode: 200,
            message: 'User updated successfully',
            data: result,
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.usersService.remove(id);
        return {
            statusCode: 200,
            message: 'User deleted successfully',
            data: result,
        };
    }
}
