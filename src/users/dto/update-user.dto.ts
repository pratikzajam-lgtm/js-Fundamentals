import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsEmail, IsEnum, IsBoolean } from 'class-validator';
import { UserRole } from 'src/entities/user.entities';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEmail({}, { message: 'Please enter valid email address' })
    email?: string;

    @IsOptional()
    name?: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    @IsEnum(UserRole, { message: 'Role must be one of: superadmin, admin, manager, staff' })
    role?: UserRole;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
