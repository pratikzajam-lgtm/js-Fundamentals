import { IsEmail, IsNotEmpty } from 'class-validator';

export class loginDto {

    @IsNotEmpty({ message: "Email Is Required" })
    email: string;

    @IsNotEmpty({ message: "password is required" })
    password: string;
}
