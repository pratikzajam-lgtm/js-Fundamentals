import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { Product } from 'src/entities/product.entity';
import { Inventory } from 'src/entities/inventory.entity';

console.log(process.env.DB_PASSWORD);

export const databaseConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    entities: [User, Product, Inventory],
    migrations: ['dist/migrations/*.js'],
    migrationsRun: false,

    synchronize: false,
    logging: true,
});
