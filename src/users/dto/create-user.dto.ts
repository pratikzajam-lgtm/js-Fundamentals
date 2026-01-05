import { IsEmail, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/entities/user.entities';

export class CreateUserDto {
    @IsNotEmpty({ message: "Name is required" })
    name: string;

    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: 'Please enter valid email address' })
    email: string;

    @IsNotEmpty({ message: "Password is required" })
    password: string;

    @IsNotEmpty({ message: "Role is required" })
    @IsEnum(UserRole, { message: 'Role must be one of: superadmin, admin, manager, staff' })
    role: UserRole;

    @IsOptional()
    isActive?: boolean;
}
