import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pratik99',
      database: 'masai',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  // controllers: [AppController, UsersController],
  // providers: [AppService, UsersService],
})
export class AppModule { }
