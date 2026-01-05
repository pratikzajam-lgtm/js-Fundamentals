import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create.user.dto';
import axios from 'axios'
import bcrypt from "bcryptjs";
import { User } from 'src/entities/user.entities';
import { loginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';




// https://api.ValidEmail.net/?email=EMAIL&token=114b7f3bd369491dabe39951c6bddb37

type Response<T> = {
    statusCode: number,
    message: string,
    data: T
}

@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async isUserExists(email: string): Promise<boolean> {
        return this.userRepository.exists({ where: { email: email } });
    }

    async fetchUserDetails(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email: email } })
    }



    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(password, hashedPassword);

    }

    async createUser(user: object): Promise<User> {
        const saveUser = this.userRepository.create(user);
        return await this.userRepository.save(saveUser);
    }



    async validateEmail(email: string): Promise<boolean> {
        const response = await axios.get(`https://api.ValidEmail.net/?email=${email}&token=114b7f3bd369491dabe39951c6bddb37`);

        if (response.data.IsValid) {
            return true
        }

        return false
    }





    async signUp(createUserDto: CreateUserDto): Promise<{ id: number }> {


        try {

            const { name, email, password, confirmPassword, role } = createUserDto;

            if (password != confirmPassword) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'password and confirm password does not match',
                    data: null
                });
            }

            console.log("code reached till here");

            const isUserExists = await this.isUserExists(email)

            if (isUserExists) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'User Allready Exists',
                    data: null
                });
            }




            // let isEmailValid = await this.validateEmail(email);

            // if (!isEmailValid) {
            //     throw new BadRequestException({
            //         statusCode: 409,
            //         message: 'Please Enter Appropriate Email Address',
            //         data: null
            //     });
            // }


            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            let user = { name: name, email: email, password: hashedPassword, role: role }



            let saveUser = await this.createUser(user);

            if (!saveUser.id) {
                throw new InternalServerErrorException("Something went wrong")
            }


            return { id: saveUser.id };

        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: error.message,
                data: null

            })
        }


    }




    async login(loginDto: loginDto): Promise<{ token: string }> {
        try {

            const { email, password } = loginDto;

            let isAccountExists = await this.isUserExists(email);

            if (!isAccountExists) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'Account Does Not Exists',
                    data: null
                });
            }

            let userDetails = await this.fetchUserDetails(email);


            if (!userDetails) {
                throw new InternalServerErrorException({
                    statusCode: 500,
                    message: 'something went wrong',
                    data: null
                });
            }

            if (!userDetails.password) {
                throw new InternalServerErrorException({
                    statusCode: 500,
                    message: 'SOmething  Went Wrong',
                    data: null
                });
            }


            let hashedPassword = userDetails.password;



            let isPasswordMatch = await this.doesPasswordMatch(password, hashedPassword);


            if (!isPasswordMatch) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'Password Does Not match',
                    data: null
                });


            }


            let userId = userDetails.id;
            let userEmail = userDetails.email;
            let userName = userDetails.name;
            let userRole = userDetails.role;
            let isActive = userDetails.isActive

            console.log(process.env.JWT_SECRET);

            debugger;


            let token = jwt.sign(
                { id: userId, name: userName, email: userEmail, role: userRole, isActive: isActive }
                , process.env.JWT_SECRET!, { expiresIn: '1h' });


            return { token: token };

        } catch (error) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: error.message,
                data: null
            });
        }
    }



}
