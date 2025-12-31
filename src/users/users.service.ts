import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import bcrypt from 'node_modules/bcryptjs';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async isEmailExists(email: string): Promise<boolean> {
        return await this.userRepository.exists({
            where: { email: email }
        })
    }

    async fetchAllUsers(): Promise<User[]> {
        return await this.userRepository.find({
            select: ['name', 'email'],
        });
    }


    async getUsersById(id: number): Promise<User | null> {
        let response = await this.userRepository.findOneBy({ id: id });
        return response
    }


    async deleteUser(id: number): Promise<boolean> {
        let result = await this.userRepository.delete(id);

        return result.affected == 1
    }




    async addUser(req: any) {

        const { name, email, password, confirmPassword } = req


        if (!name || !email || !password || !confirmPassword) {
            throw new NotFoundException({
                status: 400,
                message: 'All Fields Are Required',
                data: null,
            });
        }


        if (password != confirmPassword) {
            throw new ConflictException({
                status: 409,
                message: 'Password And Confirm Password Does Not Match',
                data: null
            });
        }


        const isEmailExists = await this.isEmailExists(email);

        console.log(isEmailExists)

        if (isEmailExists) {
            throw new NotFoundException({
                status: 404,
                message: 'Your Account Allreday Exists',
                data: null,
            });
        }





        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(hashedPassword)

        const user = this.userRepository.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        let savedUser = await this.userRepository.save(user);


        if (savedUser.id) {
            return {
                status: 201,
                message: "user added sucessfully",
                data: null
            }
        }

    }


    async getUsers() {


        let getAllUsers = await this.fetchAllUsers();

        if (getAllUsers.length < 1) {

            throw new NotFoundException({
                status: 404,
                message: 'No Users Found',
                data: null,
            });
        }


        return {
            status: 200,
            message: "Users Data Fetched Sucessfully",
            data: getAllUsers
        }


    }

    async deleteUsers(id: number) {

        if (!id) {
            throw new NotFoundException({
                status: 404,
                message: "Id Not Found",
                data: null
            })
        }

        let deleteUser = await this.deleteUser(id)


        if (deleteUser) {

            return {
                status: 201,
                message: "User Deleted Sucessfully",
                data: null
            }

        } else {
            return {
                status: 500,
                message: "Something went wrong while deleting the user",
                data: null
            }
        }



    }


    async updateUsers(body:any,id:number) {

        const { name, email } = body;

        const user = await this.getUsersById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        console.log(user)

        debugger;


        if (name !== undefined) {
            user.name = name;
        }

        if (email !== undefined) {
            user.email = email;

        }
        const savedUser = await this.userRepository.save(user);

        return {
            status: 200,
            message: "User Updated Successfully",
            data: savedUser,
        };


    }

}

