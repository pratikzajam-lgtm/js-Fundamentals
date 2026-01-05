import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller'
import { User } from 'src/entities/user.entities';

@Module({


  imports: [
    TypeOrmModule.forFeature([User])
  ],


  providers: [AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule]
})
export class AuthModule { }
