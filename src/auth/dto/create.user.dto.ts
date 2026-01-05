import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty({ message: "Name Is Required" })
    name: string;


    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: 'Please enter valid email address' })
    email: string;

    @IsNotEmpty({ message: "Password is required" })
    password: string;

    @IsNotEmpty({ message: "ConfirmPassword is required" })
    confirmPassword: string;

    @IsNotEmpty({ message: "Role is required" })
    role: string
}
