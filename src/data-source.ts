import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from './entities/user.entities';
import { Product } from './entities/product.entity';
import { Inventory } from './entities/inventory.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'inventory_management',
    entities: [User, Product, Inventory],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
