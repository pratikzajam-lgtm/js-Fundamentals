import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/entities/user.entities';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CronjobService implements OnModuleInit {
    private readonly logger = new Logger(CronjobService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async onModuleInit() {
        this.logger.log('Checking for superuser on startup...');
        await this.checkAndCreateSuperuser();
    }

    async checkAndCreateSuperuser() {
        try {
            const superuserEmail = 'superuser@gmail.com';
            
            
            const superuserExists = await this.userRepository.findOne({
                where: { 
                    email: superuserEmail,
                    role: UserRole.SUPERADMIN 
                },
            });

            if (superuserExists) {
                this.logger.log('Superuser already exists in the database.');
                return;
            }

            
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync('superuser', salt);

            const superuser = this.userRepository.create({
                name: 'superuser',
                email: superuserEmail,
                password: hashedPassword,
                role: UserRole.SUPERADMIN,
                isActive: true,
            });

            const savedUser = await this.userRepository.save(superuser);

            if (savedUser.id) {
                this.logger.log(`Superuser created successfully with ID: ${savedUser.id}`);
                this.logger.log(`Email: ${superuserEmail}`);
                this.logger.log(`Password: superuser`);
            } else {
                this.logger.error('Failed to create superuser');
            }
        } catch (error) {
            this.logger.error(`Error creating superuser: ${error.message}`);
        }
    }
}
