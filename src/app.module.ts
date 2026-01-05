import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import {ConfigModule } from '@nestjs/config'
import {databaseConfig} from './config/database.config' 
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { CronjobModule } from './cronjob/cronjob.module';



@Module({
  imports: [HttpModule,AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
      load:[databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    UsersModule,
    ProductsModule,
    InventoryModule,
    CronjobModule,
  ]
})

export class AppModule { }
