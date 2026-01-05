import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [CronjobService],
})
export class CronjobModule { }
