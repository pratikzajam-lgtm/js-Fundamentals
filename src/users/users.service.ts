import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User, UserRole } from 'src/entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { Like } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<{ id: number }> {
        try {
            const { name, email, password, role, isActive } = createUserDto;

            const isUserExists = await this.userRepository.exists({ where: { email } });

            if (isUserExists) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'User already exists',
                    data: null,
                });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const user = this.userRepository.create({
                name,
                email,
                password: hashedPassword,
                role: role || UserRole.STAFF,
                isActive: isActive !== undefined ? isActive : true,
            });

            const savedUser = await this.userRepository.save(user);

            if (!savedUser.id) {
                throw new InternalServerErrorException({
                    statusCode: 500,
                    message: 'Something went wrong while creating the user',
                    data: null,
                });
            }

            return { id: savedUser.id };
        } catch (error) {

            throw new InternalServerErrorException({
                statusCode: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async findAll(filters?: {
        page?: number;
        limit?: number;
        name?: string;
        email?: string;
        role?: UserRole;
    }) {
        try {
            const page = filters?.page ?? 1;
            const limit = filters?.limit ?? 10;
            const { name, email, role } = filters || {};

            const skip = (page - 1) * limit;


            const where: any = {
                role: Not(UserRole.SUPERADMIN),
            };


            if (name) {
                where.name = Like(`%${name}%`);
            }

            if (email) {
                where.email = Like(`%${email}%`);
            }

            if (role) {
                where.role = role;
            }

            const [users, total] =
                await this.userRepository.findAndCount({
                    where,
                    skip,
                    take: limit,
                    order: { timeStamp: 'DESC' },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        timeStamp: true,
                    },
                });

            if (users.length < 1) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'No users found',
                    data: null,
                });
            }

            return {
                users,
                metaData: {
                    totalRecords: total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    limit,
                },
            };
        } catch (error) {
            throw new BadRequestException({
                statusCode: 500,
                message: error.message,
                data: null,
            });
        }
    }


    async findOne(id: number) {
        try {
            if (!id) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'Id not found',
                    data: null,
                });
            }

            const user = await this.userRepository.findOne({
                where: { id, role: Not(UserRole.SUPERADMIN) },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    isActive: true,
                    timeStamp: true,
                },
            });

            if (!user) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'User not found',
                    data: null,
                });
            }

            return { user };
        } catch (error) {

            throw new BadRequestException({
                statusCode: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            if (!id) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'Id not found',
                    data: null,
                });
            }

            const user = await this.userRepository.findOne({
                where: { id },
            });

            if (!user) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'User not found',
                    data: null,
                });
            }

            if (updateUserDto.email && updateUserDto.email !== user.email) {
                const emailExists = await this.userRepository.exists({
                    where: { email: updateUserDto.email },
                });

                if (emailExists) {
                    throw new BadRequestException({
                        statusCode: 400,
                        message: 'Email already exists',
                        data: null,
                    });
                }
            }

            if (updateUserDto.password) {
                const salt = bcrypt.genSaltSync(10);
                updateUserDto.password = bcrypt.hashSync(updateUserDto.password, salt);
            }

            Object.assign(user, updateUserDto);

            const updatedUser = await this.userRepository.save(user);

            return { id: updatedUser.id };
        } catch (error) {
         
            throw new BadRequestException({
                statusCode: 500,
                message: error.message,
                data: null,
            });
        }
    }

    async remove(id: number) {
        try {
            if (!id) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'Id not found',
                    data: null,
                });
            }

            const user = await this.userRepository.findOne({
                where: { id },
            });

            if (!user) {
                throw new NotFoundException({
                    statusCode: 404,
                    message: 'User not found',
                    data: null,
                });
            }

            const result = await this.userRepository.delete(id);

            if (result.affected === 0) {
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'Something went wrong while deleting the user',
                    data: null,
                });
            }

            return { success: true };
        } catch (error) {

            throw new BadRequestException({
                statusCode: 500,
                message: error.message,
                data: null,
            });
        }
    }
}
